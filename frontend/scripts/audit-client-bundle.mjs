/**
 * Post-build check: fail if likely secrets appear in client JS bundles.
 * Run after `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BUILD_DIR = join(process.cwd(), ".next", "static");
const FORBIDDEN = [
  /GEMINI_API_KEY\s*[:=]\s*["'][A-Za-z0-9_-]{10,}/,
  /HF_TOKEN\s*[:=]\s*["'][A-Za-z0-9_-]{10,}/,
  /sk-[A-Za-z0-9]{20,}/,
  /AIza[0-9A-Za-z_-]{20,}/,
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (path.endsWith(".js")) files.push(path);
  }
  return files;
}

let violations = 0;

for (const file of walk(BUILD_DIR)) {
  const content = readFileSync(file, "utf8");
  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) {
      console.error(`Possible secret in client bundle: ${file}`);
      violations += 1;
    }
  }
}

if (violations > 0) {
  console.error(`audit-client-bundle: ${violations} violation(s)`);
  process.exit(1);
}

console.log("audit-client-bundle: no secrets found in client bundles");
