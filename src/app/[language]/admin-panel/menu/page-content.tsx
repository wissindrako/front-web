"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import GripVertical from "lucide-react/dist/esm/icons/grip-vertical";
import ListTree from "lucide-react/dist/esm/icons/list-tree";
import Pencil from "lucide-react/dist/esm/icons/pencil";
import Plus from "lucide-react/dist/esm/icons/plus";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import { useMemo, useState } from "react";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { MenuIcon } from "@/components/menu-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/hooks/use-snackbar";
import {
  useDeleteMenuItemService,
  useGetMenuPermissionsService,
  useGetMenuTreeService,
  usePatchMenuItemService,
  usePutMenuOrderService,
} from "@/services/api/services/menu";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { MenuItemTree } from "@/services/api/types/menu-item";
import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import { useMenuLabel } from "@/services/menu/use-menu-label";
import { MY_MENU_QUERY_KEY } from "@/services/menu/use-my-menu";
import MenuItemDialog from "./menu-item-dialog";

const TREE_QUERY_KEY = ["menu", "tree"];

type DialogState = {
  item?: MenuItemTree;
  defaultParentId?: string | null;
} | null;

// What a user with these permissions would see (same rules as the API)
const visibleFor = (
  tree: MenuItemTree[],
  permissions: Set<string>
): MenuItemTree[] =>
  tree
    .filter(
      (item) =>
        item.isActive && (!item.permission || permissions.has(item.permission))
    )
    .map((item) => ({
      ...item,
      children: visibleFor(item.children, permissions),
    }))
    .filter((item) => item.url || item.children.length);

function SortableRow(props: {
  item: MenuItemTree;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onAddChild?: () => void;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("admin-panel-menu");
  const label = useMenuLabel();
  const sortable = useSortable({
    id: props.item.id,
    disabled: !props.canEdit,
  });
  const isGroup = !props.item.url;

  return (
    <li
      ref={sortable.setNodeRef}
      style={{
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
      }}
      className={`rounded-md border bg-card ${sortable.isDragging ? "z-10 opacity-70 shadow-lg" : ""}`}
      data-testid="menu-row"
      data-label={props.item.label}
    >
      <div className="flex items-center gap-2 p-2">
        {props.canEdit && (
          <button
            type="button"
            className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-accent active:cursor-grabbing"
            aria-label={t("admin-panel-menu:actions.drag")}
            data-testid="menu-drag"
            {...sortable.attributes}
            {...sortable.listeners}
          >
            <GripVertical className="size-4" />
          </button>
        )}
        <span className="flex size-6 items-center justify-center text-muted-foreground">
          <MenuIcon name={props.item.icon} className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-medium ${props.item.isActive ? "" : "text-muted-foreground line-through"}`}
            >
              {label(props.item)}
            </span>
            {isGroup && (
              <Badge variant="outline">
                {t("admin-panel-menu:list.group")}
              </Badge>
            )}
            {!props.item.isActive && (
              <Badge variant="secondary">
                {t("admin-panel-menu:list.inactive")}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {props.item.url && (
              <span className="font-mono">{props.item.url}</span>
            )}
            <span>
              {props.item.permission
                ? t("admin-panel-menu:list.requires", {
                    permission: props.item.permission,
                  })
                : t("admin-panel-menu:list.everyone")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isGroup && props.canCreate && props.onAddChild && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("admin-panel-menu:actions.addChild")}
              title={t("admin-panel-menu:actions.addChild")}
              onClick={props.onAddChild}
            >
              <Plus />
            </Button>
          )}
          {props.canEdit && (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  props.item.isActive
                    ? t("admin-panel-menu:actions.deactivate")
                    : t("admin-panel-menu:actions.activate")
                }
                title={
                  props.item.isActive
                    ? t("admin-panel-menu:actions.deactivate")
                    : t("admin-panel-menu:actions.activate")
                }
                onClick={props.onToggle}
              >
                {props.item.isActive ? <EyeOff /> : <Eye />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("admin-panel-menu:actions.edit")}
                title={t("admin-panel-menu:actions.edit")}
                onClick={props.onEdit}
                data-testid="menu-edit"
              >
                <Pencil />
              </Button>
            </>
          )}
          {props.canDelete && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("admin-panel-menu:actions.delete")}
              title={t("admin-panel-menu:actions.delete")}
              onClick={props.onDelete}
              data-testid="menu-delete"
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      {props.children}
    </li>
  );
}

function SortableLevel(props: {
  items: MenuItemTree[];
  onReorder: (items: MenuItemTree[]) => void;
  renderItem: (item: MenuItemTree) => React.ReactNode;
  className?: string;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = props.items.findIndex((item) => item.id === active.id);
    const to = props.items.findIndex((item) => item.id === over.id);
    if (from < 0 || to < 0) return;
    props.onReorder(arrayMove(props.items, from, to));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={props.items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={props.className}>{props.items.map(props.renderItem)}</ul>
      </SortableContext>
    </DndContext>
  );
}

function Preview(props: { tree: MenuItemTree[] }) {
  const { t } = useTranslation("admin-panel-menu");
  const label = useMenuLabel();
  const used = useMemo(
    () =>
      Array.from(
        new Set(
          props.tree
            .flatMap((item) => [item, ...item.children])
            .map((item) => item.permission)
            .filter((permission): permission is string => !!permission)
        )
      ).sort(),
    [props.tree]
  );
  const [granted, setGranted] = useState<Set<string> | null>(null);
  const current = granted ?? new Set(used);
  const visible = visibleFor(props.tree, current);

  return (
    <aside
      className="flex flex-col gap-4 rounded-md border bg-card p-4"
      data-testid="menu-preview"
    >
      <div>
        <h4 className="font-semibold">{t("admin-panel-menu:preview.title")}</h4>
        <p className="text-xs text-muted-foreground">
          {t("admin-panel-menu:preview.description")}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {used.map((permission) => (
          <div key={permission} className="flex items-center gap-2">
            <Checkbox
              id={`preview-${permission}`}
              checked={current.has(permission)}
              onCheckedChange={(checked) => {
                const next = new Set(current);
                if (checked) next.add(permission);
                else next.delete(permission);
                setGranted(next);
              }}
            />
            <Label
              htmlFor={`preview-${permission}`}
              className="font-mono text-xs"
            >
              {permission}
            </Label>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-1 rounded-md bg-muted/50 p-2 text-sm">
        {visible.map((item) => (
          <li key={item.id}>
            <span className="flex items-center gap-2">
              <MenuIcon name={item.icon} className="size-4" />
              {label(item)}
            </span>
            {!!item.children.length && (
              <ul className="ms-6 mt-1 flex flex-col gap-1 border-s ps-2">
                {item.children.map((child) => (
                  <li key={child.id} className="flex items-center gap-2">
                    <MenuIcon name={child.icon} className="size-4" />
                    {label(child)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {!visible.length && (
          <li className="text-muted-foreground">
            {t("admin-panel-menu:preview.empty")}
          </li>
        )}
      </ul>
    </aside>
  );
}

function MenuEditor() {
  const { t } = useTranslation("admin-panel-menu");
  const { permissions } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { confirmDialog } = useConfirmDialog();
  const fetchTree = useGetMenuTreeService();
  const fetchPermissions = useGetMenuPermissionsService();
  const fetchOrder = usePutMenuOrderService();
  const fetchPatch = usePatchMenuItemService();
  const fetchDelete = useDeleteMenuItemService();
  const [dialog, setDialog] = useState<DialogState>(null);
  const label = useMenuLabel();

  const canCreate = permissions.includes("menu-items.create");
  const canEdit = permissions.includes("menu-items.update");
  const canDelete = permissions.includes("menu-items.delete");

  const treeQuery = useQuery({
    queryKey: TREE_QUERY_KEY,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetchTree({ signal });
      if (status !== HTTP_CODES_ENUM.OK) throw new Error(String(status));
      return data;
    },
  });
  const permissionsQuery = useQuery({
    queryKey: ["menu", "permissions"],
    queryFn: async ({ signal }) => {
      const { status, data } = await fetchPermissions({ signal });
      return status === HTTP_CODES_ENUM.OK ? data : [];
    },
  });
  const tree = treeQuery.data ?? [];

  // The editor and the sidebar show the change right away
  const refresh = async (nextTree?: MenuItemTree[]) => {
    if (nextTree) queryClient.setQueryData(TREE_QUERY_KEY, nextTree);
    else await queryClient.invalidateQueries({ queryKey: TREE_QUERY_KEY });
    await queryClient.invalidateQueries({ queryKey: MY_MENU_QUERY_KEY });
  };

  const reorder = async (parentId: string | null, items: MenuItemTree[]) => {
    const previous = tree;
    // Optimistic: the rows stay where they were dropped
    queryClient.setQueryData<MenuItemTree[]>(TREE_QUERY_KEY, (current) =>
      parentId
        ? current?.map((group) =>
            group.id === parentId ? { ...group, children: items } : group
          )
        : items.map((item) => current?.find((c) => c.id === item.id) ?? item)
    );
    const { status, data } = await fetchOrder({
      items: items.map((item, order) => ({ id: item.id, parentId, order })),
    });
    if (status === HTTP_CODES_ENUM.OK) {
      await refresh(data);
    } else {
      queryClient.setQueryData(TREE_QUERY_KEY, previous);
      enqueueSnackbar(t("admin-panel-menu:alerts.error"), { variant: "error" });
    }
  };

  const toggle = async (item: MenuItemTree) => {
    const { status } = await fetchPatch({
      id: item.id,
      data: { isActive: !item.isActive },
    });
    if (status === HTTP_CODES_ENUM.OK) await refresh();
    else
      enqueueSnackbar(t("admin-panel-menu:alerts.error"), { variant: "error" });
  };

  const remove = async (item: MenuItemTree) => {
    const isConfirmed = await confirmDialog({
      title: t("admin-panel-menu:confirm.delete.title", { label: label(item) }),
      message: item.children.length
        ? t("admin-panel-menu:confirm.delete.groupMessage", {
            count: item.children.length,
          })
        : t("admin-panel-menu:confirm.delete.message"),
    });
    if (!isConfirmed) return;
    const { status } = await fetchDelete({ id: item.id });
    if (status === HTTP_CODES_ENUM.NO_CONTENT) {
      await refresh();
      enqueueSnackbar(t("admin-panel-menu:alerts.deleted"), {
        variant: "success",
      });
    } else {
      enqueueSnackbar(t("admin-panel-menu:alerts.error"), { variant: "error" });
    }
  };

  const row = (item: MenuItemTree) => (
    <SortableRow
      key={item.id}
      item={item}
      canEdit={canEdit}
      canDelete={canDelete}
      canCreate={canCreate}
      onEdit={() => setDialog({ item })}
      onDelete={() => remove(item)}
      onToggle={() => toggle(item)}
      onAddChild={() => setDialog({ defaultParentId: item.id })}
    >
      {!item.url && !!item.children.length && (
        <SortableLevel
          items={item.children}
          onReorder={(children) => reorder(item.id, children)}
          className="flex flex-col gap-1 px-2 pb-2 ps-10"
          renderItem={(child) => (
            <SortableRow
              key={child.id}
              item={child}
              canEdit={canEdit}
              canDelete={canDelete}
              canCreate={canCreate}
              onEdit={() => setDialog({ item: child })}
              onDelete={() => remove(child)}
              onToggle={() => toggle(child)}
            />
          )}
        />
      )}
      {!item.url && !item.children.length && (
        <p className="px-2 pb-2 ps-10 text-xs text-muted-foreground">
          {t("admin-panel-menu:list.emptyGroup")}
        </p>
      )}
    </SortableRow>
  );

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-3xl font-semibold">
              <ListTree className="size-7" />
              {t("admin-panel-menu:title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("admin-panel-menu:description")}
            </p>
          </div>
          {canCreate && (
            <Button onClick={() => setDialog({})} data-testid="menu-new">
              <Plus />
              {t("admin-panel-menu:actions.create")}
            </Button>
          )}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            {treeQuery.isPending && (
              <p className="text-sm text-muted-foreground">
                {t("admin-panel-menu:list.loading")}
              </p>
            )}
            {treeQuery.isError && (
              <p className="text-sm text-destructive">
                {t("admin-panel-menu:alerts.loadError")}
              </p>
            )}
            {treeQuery.isSuccess && !tree.length && (
              <p className="text-sm text-muted-foreground">
                {t("admin-panel-menu:list.empty")}
              </p>
            )}
            <SortableLevel
              items={tree}
              onReorder={(items) => reorder(null, items)}
              className="flex flex-col gap-2"
              renderItem={row}
            />
            {canEdit && !!tree.length && (
              <p className="mt-3 text-xs text-muted-foreground">
                {t("admin-panel-menu:list.dragHint")}
              </p>
            )}
          </div>
          <Preview tree={tree} />
        </div>
      </div>

      <MenuItemDialog
        open={!!dialog}
        onOpenChange={(open) => !open && setDialog(null)}
        item={dialog?.item}
        defaultParentId={dialog?.defaultParentId}
        tree={tree}
        permissions={permissionsQuery.data ?? []}
        onSaved={async () => {
          await refresh();
          enqueueSnackbar(t("admin-panel-menu:alerts.saved"), {
            variant: "success",
          });
        }}
      />
    </div>
  );
}

export default withPageRequiredAuth(MenuEditor, {
  permissions: ["menu-items.read"],
});
