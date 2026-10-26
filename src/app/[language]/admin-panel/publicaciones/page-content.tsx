"use client";

import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import { useCallback, useMemo } from "react";
import {
  useGetPublicacionesListQuery,
  publicacionesQueryKeys,
} from "./queries/queries";
import { TableVirtuoso } from "react-virtuoso";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import TableComponents from "@/components/table/table-components";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "@/components/link";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { Publicacion } from "@/services/api/types/publicacion";
import { useDeletePublicacionService } from "@/services/api/services/publicaciones";

function Actions({ entityItem }: { entityItem: Publicacion }) {
  const { confirmDialog } = useConfirmDialog();
  const fetchDeletePublicacion = useDeletePublicacionService();
  const queryClient = useQueryClient();
  const { t } = useTranslation("admin-panel-publicaciones");
  const { permissions } = useAuth();
  const canUpdate = permissions.includes("publicaciones.update");
  const canDelete = permissions.includes("publicaciones.delete");

  const handleDelete = async () => {
    const isConfirmed = await confirmDialog({
      title: t("confirm.delete.title"),
      message: t("confirm.delete.message"),
    });

    if (isConfirmed) {
      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: Publicacion[] }>
      >(publicacionesQueryKeys.list().key);

      await queryClient.cancelQueries({
        queryKey: publicacionesQueryKeys.list().key,
      });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== entityItem.id),
        })),
      };

      queryClient.setQueryData(publicacionesQueryKeys.list().key, newData);

      await fetchDeletePublicacion({
        id: entityItem.id,
      });
    }
  };

  if (!canUpdate && !canDelete) return null;

  if (!canDelete) {
    return (
      <Button asChild size="sm" data-testid="edit-button">
        <Link href={`/admin-panel/publicaciones/edit/${entityItem.id}`}>
          {t("actions.edit")}
        </Link>
      </Button>
    );
  }

  if (!canUpdate) {
    return (
      <Button
        size="sm"
        variant="destructive"
        onClick={handleDelete}
        data-testid="delete-button"
      >
        {t("actions.delete")}
      </Button>
    );
  }

  return (
    <div className="inline-flex items-center">
      <Button
        asChild
        size="sm"
        className="rounded-r-none"
        data-testid="edit-button"
      >
        <Link href={`/admin-panel/publicaciones/edit/${entityItem.id}`}>
          {t("actions.edit")}
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            aria-label="actions"
            data-testid="actions-button"
            className="rounded-l-none border-l border-l-primary-foreground/20 px-2"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            data-testid="delete-button"
          >
            {t("actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function PublicacionesPageContent() {
  const { t } = useTranslation("admin-panel-publicaciones");
  const { permissions } = useAuth();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPublicacionesListQuery();

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tableData = useMemo(() => {
    const result = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-3xl font-semibold" data-testid="index-page-title">
            {t("title")}
          </h3>
          {permissions.includes("publicaciones.create") && (
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="bg-success text-success-foreground hover:bg-success/90"
                data-testid="add-button"
              >
                <Link href="/admin-panel/publicaciones/create">
                  {t("actions.create")}
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <TableVirtuoso
            useWindowScroll
            data={tableData}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            increaseViewportBy={400}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableHead>{t("table.titulo")}</TableHead>

                  <TableHead>{t("table.estado")}</TableHead>

                  <TableHead>{t("table.publicadaEn")}</TableHead>

                  {/* Do not remove this comment. <index-component-head-field />  */}

                  <TableHead style={{ width: 130 }}></TableHead>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableHead colSpan={4} className="p-0">
                      <div className="h-1 w-full overflow-hidden bg-primary/20">
                        <div className="animate-progress-bar h-full w-full origin-left bg-primary" />
                      </div>
                    </TableHead>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(_index, item) => (
              <>
                <TableCell className="font-medium">{item?.titulo}</TableCell>

                <TableCell>
                  {item?.estado && (
                    <Badge
                      variant={
                        item.estado === "publicada" ? "default" : "secondary"
                      }
                    >
                      {t(`estados.${item.estado}`, {
                        defaultValue: item.estado,
                      })}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {item?.publicadaEn
                    ? format(new Date(item.publicadaEn), "dd/MM/yyyy HH:mm")
                    : "—"}
                </TableCell>

                {/* Do not remove this comment. <index-component-body-field />  */}

                <TableCell style={{ width: 130 }} className="text-right">
                  {!!item && <Actions entityItem={item} />}
                </TableCell>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(PublicacionesPageContent, {
  permissions: ["publicaciones.read"],
});
