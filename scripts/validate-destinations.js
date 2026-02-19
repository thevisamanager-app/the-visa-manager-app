/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../src/assets/data/destinations.js");
let content = fs.readFileSync(filePath, "utf8");

// Optional helper mode:
// node scripts/validate-destinations.js --fix
if (process.argv.includes("--fix")) {
  const fixed = content.replace(
    /(countryType:\s*["'][^"']+["'])(\s*\n\s*bullets\s*:)/g,
    "$1,$2"
  );

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, "utf8");
    content = fixed;
    console.log("Auto-fix applied: inserted missing comma before bullets.");
  } else {
    console.log("No auto-fix changes needed.");
  }
}

const errors = [];
const lines = content.split(/\r?\n/);

for (let i = 0; i < lines.length - 1; i += 1) {
  const current = lines[i];
  const next = lines[i + 1];

  // Common breakage: missing comma before bullets.
  if (/countryType:\s*["'][^"']+["']\s*$/.test(current) && /^\s*bullets\s*:/.test(next)) {
    errors.push(
      `Line ${i + 1}: Missing comma after countryType before bullets.`
    );
  }
}

try {
  // Validate that the JS file can be parsed as a function body.
  // Strip ESM export for parser compatibility in this validator.
  const parseTarget = content.replace(/^\s*export\s+default\s+\w+\s*;?\s*$/m, "");
  // eslint-disable-next-line no-new-func
  new Function(parseTarget);
} catch (err) {
  errors.push(`JS parse error: ${err.message}`);
}

if (errors.length > 0) {
  console.error("destinations.js validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("destinations.js validation passed.");
