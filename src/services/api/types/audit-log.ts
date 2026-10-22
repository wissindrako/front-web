export enum AuditActionEnum {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SOFT_DELETE = "SOFT_DELETE",
  RESTORE = "RESTORE",
}

export type AuditLog = {
  id: string;
  createdAt: string;
  tableName: string;
  recordId: string | null;
  action: AuditActionEnum;
  userId: number | null;
  user: {
    id: number;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
  ip: string | null;
  dbUser: string;
  // Only the changed columns on UPDATE
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
};
