// Entry of the navigation menu, managed in the API (Admin panel > Menu)
export type MenuItem = {
  id: string;
  parentId: string | null;
  label: string;
  // Translation key ("namespace:key") shown instead of label when it exists
  labelKey: string | null;
  // App path ("/...") or external URL; null = group
  url: string | null;
  // lucide.dev icon name (kebab-case)
  icon: string | null;
  // Permission code required to see it; null = any signed-in user
  permission: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MenuItemTree = MenuItem & { children: MenuItemTree[] };

export type MenuPermission = { code: string; description: string };
