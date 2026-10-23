// The signed-in user's roles and permissions, grouped by module
// ("users.read" is action "read" of module "users")
export type UserAccess = {
  // Where they are managed: the identity center or the API itself
  managedBy: "identity" | "local";
  roles: string[];
  modules: {
    name: string;
    permissions: { code: string; action: string; description: string }[];
  }[];
};
