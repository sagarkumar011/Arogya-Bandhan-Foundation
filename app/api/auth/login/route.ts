import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signToken, setAuthCookieHeader, checkDemoCredentials } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    // 1. Controlled Demo Authentication
    const demoUser = checkDemoCredentials(validated.email, validated.password);
    if (demoUser) {
      const token = signToken({
        userId: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: demoUser,
        token,
      });

      response.headers.set("Set-Cookie", setAuthCookieHeader(token));
      return response;
    }

    // 2. Real PostgreSQL Database Authentication
    try {
      const user = await prisma.user.findUnique({
        where: { email: validated.email.toLowerCase() },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      if (user.status !== "ACTIVE") {
        return NextResponse.json(
          { error: "Your account has been deactivated. Please contact support." },
          { status: 403 }
        );
      }

      const isMatch = await comparePassword(validated.password, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = signToken({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role as any,
      });

      // Record admin activity if admin logs in
      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        await prisma.adminActivityLog.create({
          data: {
            adminId: user.id,
            adminEmail: user.email,
            action: "ADMIN_LOGIN",
            entity: "AUTH",
            details: `Admin ${user.email} logged in successfully`,
          },
        }).catch(() => {});
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        city: user.city,
      };

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: userData,
        token,
      });

      response.headers.set("Set-Cookie", setAuthCookieHeader(token));
      return response;
    } catch (dbErr: any) {
      console.warn("DB login check caught error:", dbErr.message);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
    });

    // Record admin activity if admin logs in
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
      await prisma.adminActivityLog.create({
        data: {
          adminId: user.id,
          adminEmail: user.email,
          action: "ADMIN_LOGIN",
          entity: "AUTH",
          details: `Admin ${user.email} logged in successfully`,
        },
      });
    }

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      city: user.city,
    };

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData,
      token,
    });

    response.headers.set("Set-Cookie", setAuthCookieHeader(token));
    return response;
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
