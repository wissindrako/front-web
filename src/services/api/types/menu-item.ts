import type { Schemas } from "./schemas";

// Entry of the navigation menu, managed in the API (Admin panel > Menu):
// labelKey is a translation key ("namespace:key") shown instead of label,
// url an app path or external URL (null = group), icon a lucide.dev name,
// permission the code required to see it (null = any signed-in user).
// From the API's contract (npm run generate:api).
export type MenuItem = Schemas["MenuItem"];

export type MenuItemTree = Schemas["MenuItemTree"];

export type MenuPermission = Schemas["Permission"];
