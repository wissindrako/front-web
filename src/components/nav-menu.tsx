"use client";

import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import { usePathname } from "next/navigation";
import { ComponentProps, useState } from "react";
import Link from "@/components/link";
import { MenuIcon } from "@/components/menu-icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { MenuItemTree } from "@/services/api/types/menu-item";
import useAuth from "@/services/auth/use-auth";
import { useTranslation } from "@/services/i18n/client";
import useLanguage from "@/services/i18n/use-language";
import { useMenuLabel } from "@/services/menu/use-menu-label";
import { useMyMenu } from "@/services/menu/use-my-menu";

const isExternal = (url: string) => /^https?:\/\//.test(url);

// Path without the language prefix ("/es/admin-panel" -> "/admin-panel")
function useCurrentPath() {
  const pathname = usePathname();
  const language = useLanguage();
  const path = pathname.replace(new RegExp(`^/${language}(?=/|$)`), "");
  return path || "/";
}

const isActive = (url: string | null, path: string) =>
  !!url &&
  !isExternal(url) &&
  (url === "/" ? path === "/" : path === url || path.startsWith(`${url}/`));

// Receives the sidebar button's props (class, data-active...) through asChild
function EntryLink({
  item,
  children,
  ...props
}: ComponentProps<"a"> & { item: MenuItemTree }) {
  const url = item.url ?? "/";
  if (isExternal(url)) {
    return (
      <a {...props} href={url} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLink className="ms-auto size-3 opacity-50" />
      </a>
    );
  }
  return (
    <Link {...props} href={url}>
      {children}
    </Link>
  );
}

function Group(props: { item: MenuItemTree; path: string }) {
  const label = useMenuLabel();
  const hasActiveChild = props.item.children.some((child) =>
    isActive(child.url, props.path)
  );
  const [isOpen, setIsOpen] = useState(true);
  const open = isOpen || hasActiveChild;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setIsOpen(!open)}
        aria-expanded={open}
        data-testid="nav-group"
      >
        <MenuIcon name={props.item.icon} />
        <span>{label(props.item)}</span>
        <ChevronRight
          className={`ms-auto size-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </SidebarMenuButton>
      {open && (
        <SidebarMenuSub>
          {props.item.children.map((child) => (
            <SidebarMenuSubItem key={child.id}>
              <SidebarMenuSubButton
                asChild
                isActive={isActive(child.url, props.path)}
              >
                <EntryLink item={child}>
                  <MenuIcon name={child.icon} />
                  <span>{label(child)}</span>
                </EntryLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

// Sidebar entries from the API's menu (only what the user may open)
export default function NavMenu() {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const label = useMenuLabel();
  const path = useCurrentPath();
  const menu = useMyMenu();

  // Signed out (or the menu could not be loaded): just the home page
  if (!isLoaded || !user || menu.isError) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={path === "/"}>
          <Link href="/">{t("common:navigation.home")}</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (menu.isPending) {
    return (
      <>
        {[0, 1, 2].map((index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      {menu.data.map((item) =>
        item.url ? (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={isActive(item.url, path)}>
              <EntryLink item={item}>
                <MenuIcon name={item.icon} />
                <span>{label(item)}</span>
              </EntryLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          <Group key={item.id} item={item} path={path} />
        )
      )}
    </>
  );
}
