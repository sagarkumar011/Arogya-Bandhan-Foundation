// ===============================================================
// AROGYA BANDHAN FOUNDATION - PRODUCTION AUTHENTICATION TEST SUITE
// Usage: node scripts/test-auth.js [URL]
// Example: node scripts/test-auth.js https://your-backend.onrender.com
// ===============================================================

const http = require("http");
const https = require("https");
const { URL } = require("url");

const targetUrl = process.argv[2] || process.env.TEST_API_URL || "http://127.0.0.1:5000";
const parsedUrl = new URL(targetUrl);
const client = parsedUrl.protocol === "https:" ? https : http;

function request(path, method = "GET", headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
      path,
      method,
      headers: {
        "User-Agent": "ABF-Auth-Verification-Agent/1.0",
        ...headers,
      },
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data ? JSON.parse(data) : null,
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            rawBody: data,
          });
        }
      });
    });

    req.on("error", reject);

    if (body) {
      const payload = typeof body === "string" ? body : JSON.stringify(body);
      req.write(payload);
    }

    req.end();
  });
}

async function runTests() {
  console.log("==================================================");
  console.log("AROGYA BANDHAN FOUNDATION - AUTH TEST SUITE");
  console.log(`Target Backend: ${parsedUrl.origin}`);
  console.log("==================================================");

  let passed = 0;
  let total = 0;

  async function assertTest(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}: ${err.message}`);
    }
  }

  let adminToken = null;
  let userToken = null;

  // 1. Health check
  await assertTest("Health Check (/health)", async () => {
    const res = await request("/health");
    if (res.statusCode !== 200 && res.statusCode !== 503) {
      throw new Error(`Unexpected status ${res.statusCode}`);
    }
  });

  // 2. Admin Demo Login
  await assertTest("Admin Demo Login (admin@arogyabandhan.org)", async () => {
    const res = await request(
      "/api/auth/login",
      "POST",
      { "Content-Type": "application/json" },
      { email: "admin@arogyabandhan.org", password: "Admin@12345" }
    );

    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    if (!res.body?.success) throw new Error("Expected success: true");
    if (res.body.user.role !== "SUPER_ADMIN" && res.body.user.role !== "ADMIN") {
      throw new Error(`Expected admin role, got ${res.body.user.role}`);
    }
    if (!res.body.token) throw new Error("Missing token in JSON body");
    adminToken = res.body.token;

    const setCookie = res.headers["set-cookie"];
    if (!setCookie || !setCookie[0].includes("abf_auth_token")) {
      throw new Error("Missing abf_auth_token cookie");
    }
  });

  // 3. User Demo Login
  await assertTest("User Demo Login (user@arogyabandhan.org)", async () => {
    const res = await request(
      "/api/auth/login",
      "POST",
      { "Content-Type": "application/json" },
      { email: "user@arogyabandhan.org", password: "User@12345" }
    );

    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    if (!res.body?.success) throw new Error("Expected success: true");
    if (res.body.user.role !== "USER") {
      throw new Error(`Expected role USER, got ${res.body.user.role}`);
    }
    if (!res.body.token) throw new Error("Missing token in JSON body");
    userToken = res.body.token;
  });

  // 4. Bad Password Rejection
  await assertTest("Bad Password Rejection (Status 401)", async () => {
    const res = await request(
      "/api/auth/login",
      "POST",
      { "Content-Type": "application/json" },
      { email: "admin@arogyabandhan.org", password: "WrongPassword!999" }
    );

    if (res.statusCode !== 401) {
      throw new Error(`Expected 401, got ${res.statusCode}`);
    }
  });

  // 5. Admin Session Persistence via /api/auth/me
  await assertTest("Admin Session Persistence (/api/auth/me)", async () => {
    const res = await request("/api/auth/me", "GET", {
      Authorization: `Bearer ${adminToken}`,
    });

    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body?.authenticated || !res.body?.user) throw new Error("Expected authenticated: true");
    if (res.body.user.email !== "admin@arogyabandhan.org") {
      throw new Error(`Expected admin email, got ${res.body.user.email}`);
    }
  });

  // 6. User Session Persistence via /api/auth/me
  await assertTest("User Session Persistence (/api/auth/me)", async () => {
    const res = await request("/api/auth/me", "GET", {
      Authorization: `Bearer ${userToken}`,
    });

    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body?.authenticated || !res.body?.user) throw new Error("Expected authenticated: true");
    if (res.body.user.email !== "user@arogyabandhan.org") {
      throw new Error(`Expected user email, got ${res.body.user.email}`);
    }
  });

  // 7. Protected Admin Endpoint Access with Admin Token
  await assertTest("Admin Endpoint Access with Admin Token (/api/admin/audit-logs)", async () => {
    const res = await request("/api/admin/audit-logs", "GET", {
      Authorization: `Bearer ${adminToken}`,
    });

    if (res.statusCode !== 200) {
      throw new Error(`Expected 200, got ${res.statusCode}: ${JSON.stringify(res.body)}`);
    }
  });

  // 8. Protected Admin Endpoint Rejection for Normal User (403 Forbidden)
  await assertTest("Protected Admin Endpoint Rejection for User (Status 403)", async () => {
    const res = await request("/api/admin/audit-logs", "GET", {
      Authorization: `Bearer ${userToken}`,
    });

    if (res.statusCode !== 403) {
      throw new Error(`Expected 403 Forbidden, got ${res.statusCode}`);
    }
  });

  // 9. Protected Admin Endpoint Rejection without Token (401 Unauthorized)
  await assertTest("Protected Admin Endpoint Rejection without Token (Status 401)", async () => {
    const res = await request("/api/admin/audit-logs", "GET");

    if (res.statusCode !== 401) {
      throw new Error(`Expected 401 Unauthorized, got ${res.statusCode}`);
    }
  });

  // 10. Logout Endpoint
  await assertTest("Logout Endpoint (/api/auth/logout)", async () => {
    const res = await request("/api/auth/logout", "POST");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const setCookie = res.headers["set-cookie"];
    if (!setCookie || !setCookie[0].includes("abf_auth_token=")) {
      throw new Error("Missing cleared cookie header");
    }
  });

  console.log("\n==================================================");
  console.log(`RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log("==================================================");

  if (passed === total) {
    console.log("🎉 ALL AUTHENTICATION FLOW TESTS PASSED SUCCESSFULLY!\n");
    process.exit(0);
  } else {
    console.error("⚠️ Some tests failed. Review logs above.\n");
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution fatal error:", e);
  process.exit(1);
});
