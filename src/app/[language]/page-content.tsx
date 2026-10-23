"use client";

import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import LogIn from "lucide-react/dist/esm/icons/log-in";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import UserRound from "lucide-react/dist/esm/icons/user-round";
import Link from "@/components/link";
import { MenuIcon } from "@/components/menu-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuItemTree } from "@/services/api/types/menu-item";
import { OIDC_ACCOUNT_URL } from "@/services/auth/oidc";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import { useMenuLabel } from "@/services/menu/use-menu-label";
import { useMyMenu } from "@/services/menu/use-my-menu";

const isExternal = (url: string) => /^https?:\/\//.test(url);

type Shortcut = { item: MenuItemTree; group: MenuItemTree | null };

// Every link of the user's menu except Home, with the group it belongs to
function toShortcuts(tree: MenuItemTree[]): Shortcut[] {
  return tree.flatMap((item): Shortcut[] =>
    item.url
      ? item.url === "/"
        ? []
        : [{ item, group: null }]
      : item.children
          .filter((child) => child.url)
          .map((child) => ({ item: child, group: item }))
  );
}

function ShortcutCard({ item, group }: Shortcut) {
  const label = useMenuLabel();
  const url = item.url ?? "/";
  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <MenuIcon name={item.icon} className="size-4" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{label(item)}</span>
        {group && (
          <span className="truncate text-xs text-muted-foreground">
            {label(group)}
          </span>
        )}
      </span>
      {isExternal(url) && (
        <ExternalLink className="ms-auto size-3 shrink-0 opacity-50" />
      )}
    </>
  );
  const className =
    "flex items-center gap-3 rounded-md border bg-card p-3 text-sm transition-colors hover:bg-accent";

  return isExternal(url) ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-testid="home-shortcut"
    >
      {content}
    </a>
  ) : (
    <Link href={url} className={className} data-testid="home-shortcut">
      {content}
    </Link>
  );
}

function SignedIn() {
  const { t } = useTranslation("home");
  const { user } = useAuth();
  const { logOut } = useAuthActions();
  const menu = useMyMenu();

  if (!user) return null;

  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
  const shortcuts = toShortcuts(menu.data ?? []);

  return (
    <div className="flex flex-col gap-8" data-testid="home-signed-in">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="size-14 rounded-lg">
          <AvatarImage src={user.photo?.path} alt={fullName} />
          <AvatarFallback className="rounded-lg text-lg">
            {initials || <UserRound />}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <h1
            className="truncate text-2xl font-semibold"
            data-testid="home-title"
          >
            {t("home:signedIn.greeting", {
              name: user.firstName || user.email,
            })}
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {t("home:signedIn.description", { email: user.email })}
          </p>
        </div>
        <div className="flex gap-2">
          {OIDC_ACCOUNT_URL && (
            <Button asChild variant="outline">
              <a href={OIDC_ACCOUNT_URL} target="_blank" rel="noreferrer">
                {t("home:signedIn.account")}
                <ExternalLink />
              </a>
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => logOut()}
            data-testid="home-logout"
          >
            <LogOut />
            {t("home:signedIn.logout")}
          </Button>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t("home:signedIn.shortcuts")}
        </h2>
        {menu.isPending ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <Skeleton key={key} className="h-16" />
            ))}
          </div>
        ) : shortcuts.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((shortcut) => (
              <ShortcutCard key={shortcut.item.id} {...shortcut} />
            ))}
          </div>
        ) : (
          <p className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            {t("home:signedIn.noShortcuts")}
          </p>
        )}
      </section>
    </div>
  );
}

function SignedOut() {
  const { t } = useTranslation("home");

  return (
    <div
      className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-lg border bg-card p-8 text-center"
      data-testid="home-signed-out"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <LogIn className="size-5 text-muted-foreground" />
      </span>
      <h1 className="text-2xl font-semibold" data-testid="home-title">
        {t("home:signedOut.title")}
      </h1>
      <p className="text-sm text-muted-foreground">
        {t("home:signedOut.description")}
      </p>
      <Button asChild size="lg" data-testid="home-sign-in">
        <Link href="/sign-in">{t("home:signedOut.action")}</Link>
      </Button>
    </div>
  );
}

// Home: a sign-in prompt while signed out; who is signed in, their
// shortcuts (their menu) and sign-out once signed in
export default function HomeContent() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }

  return <div>{user ? <SignedIn /> : <SignedOut />}</div>;
}
