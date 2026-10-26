import type { Schemas } from "./schemas";

export enum AuditActionEnum {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SOFT_DELETE = "SOFT_DELETE",
  RESTORE = "RESTORE",
}

// From the API's contract (npm run generate:api). oldValues has only the
// changed columns on UPDATE.
export type AuditLog = Schemas["AuditLog"];
