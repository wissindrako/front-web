// Generates src/services/api/generated/openapi.ts from the API's OpenAPI
// contract (base-nest's openapi.json, exported with `npm run
// openapi:export` there). The contract comes from OPENAPI_SPEC, a file path
// or URL, set in the environment or .env.local; by default the sibling
// checkout ../base-nest/openapi.json.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";

const OUTPUT = "src/services/api/generated/openapi.ts";

const fromEnvFile = () => {
  if (!existsSync(".env.local")) return undefined;
  const line = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("OPENAPI_SPEC="));
  return line?.slice("OPENAPI_SPEC=".length).replace(/^"|"$/g, "");
};

const spec =
  process.env.OPENAPI_SPEC || fromEnvFile() || "../base-nest/openapi.json";
const source = /^https?:\/\//.test(spec)
  ? new URL(spec)
  : pathToFileURL(resolve(spec));

if (source.protocol === "file:" && !existsSync(source)) {
  console.error(
    `OpenAPI contract not found: ${spec}\n` +
      "Set OPENAPI_SPEC (environment or .env.local) to base-nest's openapi.json"
  );
  process.exit(1);
}

const ast = await openapiTS(source, {
  // A field with a default (e.g. isActive) is still optional in requests:
  // the API fills it in. Responses list what they always include.
  defaultNonNullable: false,
});
writeFileSync(
  OUTPUT,
  "// Generated from the API's OpenAPI contract: do not edit.\n" +
    "// npm run generate:api (see scripts/generate-api-types.mjs)\n\n" +
    astToString(ast)
);
console.log(`API types written to ${OUTPUT} (from ${spec})`);
