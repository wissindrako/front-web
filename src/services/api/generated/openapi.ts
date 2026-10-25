// Generated from the API's OpenAPI contract: do not edit.
// npm run generate:api (see scripts/generate-api-types.mjs)

export interface paths {
  "/api/v1/publicaciones": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["PublicacionesController_findAll_v1"];
    put?: never;
    post: operations["PublicacionesController_create_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/publicaciones/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["PublicacionesController_findById_v1"];
    put?: never;
    post?: never;
    delete: operations["PublicacionesController_remove_v1"];
    options?: never;
    head?: never;
    patch: operations["PublicacionesController_update_v1"];
    trace?: never;
  };
  "/api/v1/menu-items": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["MenuItemsController_findAll_v1"];
    put?: never;
    post: operations["MenuItemsController_create_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/menu-items/tree": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["MenuItemsController_findTree_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/menu-items/permissions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["MenuItemsController_findPermissions_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/menu-items/order": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations["MenuItemsController_reorder_v1"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/menu-items/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["MenuItemsController_findById_v1"];
    put?: never;
    post?: never;
    delete: operations["MenuItemsController_remove_v1"];
    options?: never;
    head?: never;
    patch: operations["MenuItemsController_update_v1"];
    trace?: never;
  };
  "/api/v1/menu": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["MenuController_findMine_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/settings/public": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["SettingsController_getPublic_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/settings": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["SettingsController_findAll_v1"];
    put?: never;
    post: operations["SettingsController_create_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/settings/key/{key}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["SettingsController_findByKey_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/settings/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["SettingsController_findById_v1"];
    put?: never;
    post?: never;
    delete: operations["SettingsController_remove_v1"];
    options?: never;
    head?: never;
    patch: operations["SettingsController_update_v1"];
    trace?: never;
  };
  "/api/v1/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["UsersController_findAll_v1"];
    put?: never;
    post: operations["UsersController_create_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/users/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["UsersController_findOne_v1"];
    put?: never;
    post?: never;
    delete: operations["UsersController_remove_v1"];
    options?: never;
    head?: never;
    patch: operations["UsersController_update_v1"];
    trace?: never;
  };
  "/api/v1/files/upload": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["FilesLocalController_uploadFile_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/roles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["RolesController_findAll_v1"];
    put?: never;
    post: operations["RolesController_create_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/roles/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["RolesController_findById_v1"];
    put?: never;
    post?: never;
    delete: operations["RolesController_remove_v1"];
    options?: never;
    head?: never;
    patch: operations["RolesController_update_v1"];
    trace?: never;
  };
  "/api/v1/auth/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["AuthMeController_me_v1"];
    put?: never;
    post?: never;
    delete: operations["AuthController_delete_v1"];
    options?: never;
    head?: never;
    patch: operations["AuthController_update_v1"];
    trace?: never;
  };
  "/api/v1/auth/email/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_login_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/email/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_register_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/email/confirm": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_confirmEmail_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/email/confirm/new": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_confirmNewEmail_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/forgot/password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_forgotPassword_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/reset/password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_resetPassword_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_refresh_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_logout_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/auth/google/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthGoogleController_login_v1"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["HomeController_appInfo"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/audit-logs/tables": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["AuditLogsController_findAuditedTables_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/audit-logs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["AuditLogsController_findAll_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/health": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["HealthController_check"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/permissions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["PermissionsController_findAll_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/permissions/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["PermissionsController_me_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/permissions/me/access": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["PermissionsController_access_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/users/{userId}/permissions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["UserPermissionsController_explain_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/users/{userId}/permissions/{code}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations["UserPermissionsController_set_v1"];
    post?: never;
    delete: operations["UserPermissionsController_remove_v1"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v1/identity": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["IdentityController_settings_v1"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    CreatePublicacionDto: {
      /** Format: date-time */
      publicadaEn?: string | null;
      /**
       * @default borrador
       * @enum {string}
       */
      estado?: "borrador" | "publicada" | "archivada";
      contenido: string;
      resumen?: string | null;
      titulo: string;
    };
    Publicacion: {
      /** Format: date-time */
      publicadaEn: string | null;
      estado: string;
      contenido: string;
      resumen: string | null;
      titulo: string;
      id: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
    };
    InfinityPaginationPublicacionResponseDto: {
      data: components["schemas"]["Publicacion"][];
      /** @example true */
      hasNextPage: boolean;
    };
    UpdatePublicacionDto: {
      /** Format: date-time */
      publicadaEn?: string | null;
      /**
       * @default borrador
       * @enum {string}
       */
      estado?: "borrador" | "publicada" | "archivada";
      contenido?: string;
      resumen?: string | null;
      titulo?: string;
    };
    CreateMenuItemDto: {
      /** @description Group it belongs to (a top-level entry); null = top level */
      parentId?: string | null;
      /** @default true */
      isActive?: boolean;
      /**
       * @description Position among its siblings (ascending)
       * @default 0
       */
      order?: number;
      /**
       * @description Permission code required to see it; null = any user
       * @example users.read
       */
      permission?: string | null;
      /**
       * @description Icon name (lucide.dev, kebab-case)
       * @example users
       */
      icon?: string | null;
      /**
       * @description App path (/...) or external URL (https://...); null = group
       * @example /admin-panel/users
       */
      url?: string | null;
      /**
       * @description Translation key ("namespace:key") shown instead of label
       * @example common:navigation.users
       */
      labelKey?: string | null;
      /** @example Users */
      label: string;
    };
    MenuItem: {
      /** @description Group it belongs to (null = top level) */
      parentId: string | null;
      isActive: boolean;
      order: number;
      /**
       * @description Permission code required to see it; null = any user
       * @example users.read
       */
      permission: string | null;
      /**
       * @description Icon name (lucide.dev, kebab-case)
       * @example users
       */
      icon: string | null;
      /**
       * @description App path (/...) or external URL; null = group
       * @example /admin-panel/users
       */
      url: string | null;
      /**
       * @description Translation key the frontend uses instead of label
       * @example common:navigation.users
       */
      labelKey: string | null;
      label: string;
      id: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
    };
    InfinityPaginationMenuItemResponseDto: {
      data: components["schemas"]["MenuItem"][];
      /** @example true */
      hasNextPage: boolean;
    };
    MenuItemTree: {
      /** @description Group it belongs to (null = top level) */
      parentId: string | null;
      isActive: boolean;
      order: number;
      /**
       * @description Permission code required to see it; null = any user
       * @example users.read
       */
      permission: string | null;
      /**
       * @description Icon name (lucide.dev, kebab-case)
       * @example users
       */
      icon: string | null;
      /**
       * @description App path (/...) or external URL; null = group
       * @example /admin-panel/users
       */
      url: string | null;
      /**
       * @description Translation key the frontend uses instead of label
       * @example common:navigation.users
       */
      labelKey: string | null;
      label: string;
      id: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      children: components["schemas"]["MenuItemTree"][];
    };
    MenuItemPositionDto: {
      id: string;
      parentId?: string | null;
      order: number;
    };
    ReorderMenuItemsDto: {
      items: components["schemas"]["MenuItemPositionDto"][];
    };
    UpdateMenuItemDto: {
      /** @description Group it belongs to (a top-level entry); null = top level */
      parentId?: string | null;
      /** @default true */
      isActive?: boolean;
      /**
       * @description Position among its siblings (ascending)
       * @default 0
       */
      order?: number;
      /**
       * @description Permission code required to see it; null = any user
       * @example users.read
       */
      permission?: string | null;
      /**
       * @description Icon name (lucide.dev, kebab-case)
       * @example users
       */
      icon?: string | null;
      /**
       * @description App path (/...) or external URL (https://...); null = group
       * @example /admin-panel/users
       */
      url?: string | null;
      /**
       * @description Translation key ("namespace:key") shown instead of label
       * @example common:navigation.users
       */
      labelKey?: string | null;
      /** @example Users */
      label?: string;
    };
    CreateSettingDto: {
      /**
       * @example string
       * @enum {string}
       */
      type: "string" | "number" | "boolean" | "json";
      /** @default false */
      isPublic?: boolean;
      description?: string;
      value: string;
      /**
       * @description Letters and numbers separated by dots, dashes or underscores
       * @example app.name
       */
      key: string;
    };
    Setting: {
      /** @enum {string} */
      type: "string" | "number" | "boolean" | "json";
      /** @default false */
      isPublic: boolean;
      description: string | null;
      value: string;
      key: string;
      id: string;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
    };
    InfinityPaginationSettingResponseDto: {
      data: components["schemas"]["Setting"][];
      /** @example true */
      hasNextPage: boolean;
    };
    UpdateSettingDto: {
      /**
       * @example string
       * @enum {string}
       */
      type?: "string" | "number" | "boolean" | "json";
      /** @default false */
      isPublic?: boolean;
      description?: string;
      value?: string;
      /**
       * @description Letters and numbers separated by dots, dashes or underscores
       * @example app.name
       */
      key?: string;
    };
    FileDto: {
      id: string;
    };
    RoleDto: {
      /** @example 2 */
      id: number;
    };
    StatusDto: {
      /** @example 1 */
      id: number;
    };
    CreateUserDto: {
      /** @example test1@example.com */
      email: string;
      password: string;
      /** @example John */
      firstName: string;
      /** @example Doe */
      lastName: string;
      photo?: components["schemas"]["FileDto"];
      role?: components["schemas"]["RoleDto"];
      status?: components["schemas"]["StatusDto"];
    };
    FileType: {
      /** @example cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae */
      id: string;
      /** @example https://example.com/path/to/file.jpg */
      path: string;
    };
    Role: {
      id: number;
      /** @example admin */
      name: string;
      description?: string | null;
      /** @description Admin and User: cannot be deleted or renamed */
      isSystem?: boolean;
      /**
       * @description Not listed for Admin, which always has every permission
       * @example [
       *       "users.read",
       *       "audit.read"
       *     ]
       */
      permissions?: string[];
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
    };
    Status: {
      id: number;
      /** @example active */
      name: string;
    };
    User: {
      id: number;
      /** @example john.doe@example.com */
      email?: string | null;
      /** @example email */
      provider?: string;
      /** @example 1234567890 */
      socialId?: string | null;
      /** @example John */
      firstName: string | null;
      /** @example Doe */
      lastName: string | null;
      photo?: components["schemas"]["FileType"] | null;
      role?: components["schemas"]["Role"] | null;
      status?: components["schemas"]["Status"];
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      /** Format: date-time */
      deletedAt: string | null;
    };
    InfinityPaginationUserResponseDto: {
      data: components["schemas"]["User"][];
      /** @example true */
      hasNextPage: boolean;
    };
    UpdateUserDto: {
      /** @example test1@example.com */
      email?: string;
      password?: string;
      /** @example John */
      firstName?: string;
      /** @example Doe */
      lastName?: string;
      photo?: components["schemas"]["FileDto"];
      role?: components["schemas"]["RoleDto"];
      status?: components["schemas"]["StatusDto"];
    };
    FileResponseDto: {
      file: components["schemas"]["FileType"];
    };
    CreateRoleDto: {
      /** @example Supervisor */
      name: string;
      /** @example Reviews users and the audit log */
      description?: Record<string, never>;
      /**
       * @example [
       *       "users.read",
       *       "audit.read"
       *     ]
       */
      permissions: string[];
    };
    UpdateRoleDto: {
      /** @example Supervisor */
      name?: string;
      /** @example Reviews users and the audit log */
      description?: Record<string, never>;
      /**
       * @example [
       *       "users.read",
       *       "audit.read"
       *     ]
       */
      permissions?: string[];
    };
    AuthEmailLoginDto: {
      /** @example test1@example.com */
      email: string;
      password: string;
    };
    LoginResponseDto: {
      token: string;
      refreshToken: string;
      tokenExpires: number;
      user: components["schemas"]["User"];
    };
    AuthRegisterLoginDto: {
      /** @example test1@example.com */
      email: string;
      password: string;
      /** @example John */
      firstName: string;
      /** @example Doe */
      lastName: string;
    };
    AuthConfirmEmailDto: {
      hash: string;
    };
    AuthForgotPasswordDto: {
      /** @example test1@example.com */
      email: string;
    };
    AuthResetPasswordDto: {
      password: string;
      hash: string;
    };
    RefreshResponseDto: {
      token: string;
      refreshToken: string;
      tokenExpires: number;
    };
    AuthUpdateDto: {
      photo?: components["schemas"]["FileDto"];
      /** @example John */
      firstName?: string;
      /** @example Doe */
      lastName?: string;
      /** @example new.email@example.com */
      email?: string;
      password?: string;
      oldPassword?: string;
    };
    AuthGoogleLoginDto: {
      /** @example abc */
      idToken: string;
    };
    AuditLogUser: {
      /** @example 1 */
      id: number;
      /** @example john@example.com */
      email: string | null;
      /** @example John */
      firstName: string | null;
      /** @example Doe */
      lastName: string | null;
    };
    AuditLog: {
      /** @example 42 */
      id: string;
      /** Format: date-time */
      createdAt: string;
      /** @example user */
      tableName: string;
      /** @example 3 */
      recordId: string | null;
      /** @enum {string} */
      action: "INSERT" | "UPDATE" | "DELETE" | "SOFT_DELETE" | "RESTORE";
      /** @description App user who made the change; null for anonymous or SQL */
      userId: number | null;
      /** @description Who userId is (null when unknown or deleted) */
      user: components["schemas"]["AuditLogUser"] | null;
      /** @example ::1 */
      ip: string | null;
      /** @description Database role that ran it */
      dbUser: string;
      /**
       * @description Previous values; only changed columns on UPDATE
       * @example {
       *       "lastName": "Test"
       *     }
       */
      oldValues: {
        [key: string]: unknown;
      } | null;
      /**
       * @description New values; only changed columns on UPDATE
       * @example {
       *       "lastName": "Changed"
       *     }
       */
      newValues: {
        [key: string]: unknown;
      } | null;
    };
    InfinityPaginationAuditLogResponseDto: {
      data: components["schemas"]["AuditLog"][];
      /** @example true */
      hasNextPage: boolean;
    };
    Permission: {
      /** @example users.read */
      code: string;
      /** @example View users */
      description: string | null;
    };
    AccessPermission: {
      /** @example users.read */
      code: string;
      /** @example read */
      action: string;
      /** @example View users */
      description: string;
    };
    AccessModule: {
      /** @example users */
      name: string;
      permissions: components["schemas"]["AccessPermission"][];
    };
    UserAccess: {
      /**
       * @description Where roles and permissions are managed: the identity center or this API
       * @enum {string}
       */
      managedBy: "identity" | "local";
      /**
       * @example [
       *       "Administrador"
       *     ]
       */
      roles: string[];
      modules: components["schemas"]["AccessModule"][];
    };
    UserPermission: {
      id: number;
      userId: number;
      /** @example audit.read */
      permissionCode: string;
      /** @enum {string} */
      effect: "grant" | "deny";
      /** @example Year-end review */
      reason: string | null;
      /** Format: date-time */
      expiresAt: string | null;
      grantedById: number | null;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
    };
    ExplainedPermission: {
      /** @example users.read */
      code: string;
      /** @example View users */
      description: string;
      granted: boolean;
      /**
       * @description Why: the admin role, the role, a grant or deny privilege, or nothing
       * @enum {string}
       */
      source: "admin" | "role" | "grant" | "deny" | "none";
      privilege?: components["schemas"]["UserPermission"];
    };
    UserPermissionsExplanation: {
      roleId: number;
      permissions: components["schemas"]["ExplainedPermission"][];
    };
    UpsertUserPermissionDto: {
      /**
       * @description grant: add a permission the role lacks; deny: remove one the role has
       * @enum {string}
       */
      effect: "grant" | "deny";
      /** @example Covering for a colleague on vacation */
      reason?: string;
      /**
       * Format: date-time
       * @description The privilege stops applying after this date
       * @example 2026-12-31T23:59:59Z
       */
      expiresAt?: string;
    };
    IdentitySettingsDto: {
      enabled: boolean;
      /** @example http://localhost:3004/api/auth */
      issuer?: string;
      /** @example http://localhost:3004/manager */
      managementUrl?: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  PublicacionesController_findAll_v1: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
      };
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InfinityPaginationPublicacionResponseDto"];
        };
      };
      /** @description Requires: publicaciones.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  PublicacionesController_create_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePublicacionDto"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Publicacion"];
        };
      };
      /** @description Requires: publicaciones.create */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  PublicacionesController_findById_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Publicacion"];
        };
      };
      /** @description Requires: publicaciones.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  PublicacionesController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: publicaciones.delete */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  PublicacionesController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdatePublicacionDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Publicacion"];
        };
      };
      /** @description Requires: publicaciones.update */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_findAll_v1: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
      };
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InfinityPaginationMenuItemResponseDto"];
        };
      };
      /** @description Requires: menu-items.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_create_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateMenuItemDto"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItem"];
        };
      };
      /** @description Requires: menu-items.create */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_findTree_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItemTree"][];
        };
      };
      /** @description Requires: menu-items.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_findPermissions_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            code?: string;
            description?: string;
          }[];
        };
      };
      /** @description Requires: menu-items.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_reorder_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReorderMenuItemsDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItemTree"][];
        };
      };
      /** @description Requires: menu-items.update */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_findById_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItem"];
        };
      };
      /** @description Requires: menu-items.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: menu-items.delete */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuItemsController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateMenuItemDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItem"];
        };
      };
      /** @description Requires: menu-items.update */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  MenuController_findMine_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MenuItemTree"][];
        };
      };
    };
  };
  SettingsController_getPublic_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Public settings as { key: value }, values already typed */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            [key: string]: unknown;
          };
        };
      };
    };
  };
  SettingsController_findAll_v1: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
      };
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InfinityPaginationSettingResponseDto"];
        };
      };
      /** @description Requires: settings.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  SettingsController_create_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateSettingDto"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Setting"];
        };
      };
      /** @description Requires: settings.create */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  SettingsController_findByKey_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        key: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Setting"];
        };
      };
      /** @description Requires: settings.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  SettingsController_findById_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Setting"];
        };
      };
      /** @description Requires: settings.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  SettingsController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: settings.delete */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  SettingsController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateSettingDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Setting"];
        };
      };
      /** @description Requires: settings.update */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UsersController_findAll_v1: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
        filters?: string;
        sort?: string;
      };
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InfinityPaginationUserResponseDto"];
        };
      };
      /** @description Requires: users.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UsersController_create_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserDto"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Requires: users.create */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UsersController_findOne_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Requires: users.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UsersController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: users.delete */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UsersController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Requires: users.update */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  FilesLocalController_uploadFile_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file?: string;
        };
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["FileResponseDto"];
        };
      };
    };
  };
  RolesController_findAll_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Role"][];
        };
      };
      /** @description Requires: roles.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  RolesController_create_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateRoleDto"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
      /** @description Requires: roles.manage */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  RolesController_findById_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
      /** @description Requires: roles.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  RolesController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: roles.manage */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  RolesController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateRoleDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Role"];
        };
      };
      /** @description Requires: roles.manage */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthMeController_me_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
  AuthController_delete_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_update_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthUpdateDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
  AuthController_login_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthEmailLoginDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponseDto"];
        };
      };
    };
  };
  AuthController_register_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthRegisterLoginDto"];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_confirmEmail_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthConfirmEmailDto"];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_confirmNewEmail_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthConfirmEmailDto"];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_forgotPassword_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthForgotPasswordDto"];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_resetPassword_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthResetPasswordDto"];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthController_refresh_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["RefreshResponseDto"];
        };
      };
    };
  };
  AuthController_logout_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuthGoogleController_login_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthGoogleLoginDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LoginResponseDto"];
        };
      };
    };
  };
  HomeController_appInfo: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuditLogsController_findAuditedTables_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string[];
        };
      };
      /** @description Requires: audit.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  AuditLogsController_findAll_v1: {
    parameters: {
      query?: {
        page?: number;
        limit?: number;
        tableName?: string;
        recordId?: string;
        userId?: number;
        action?: "INSERT" | "UPDATE" | "DELETE" | "SOFT_DELETE" | "RESTORE";
        /** @description From this date (inclusive) */
        from?: string;
        /** @description Until this date (exclusive) */
        to?: string;
      };
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["InfinityPaginationAuditLogResponseDto"];
        };
      };
      /** @description Requires: audit.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  HealthController_check: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description The Health Check is successful */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example ok
             * @enum {string}
             */
            status?: "ok" | "degraded";
            /**
             * @example {
             *       "database": {
             *         "status": "up",
             *         "responseTime": 12
             *       }
             *     }
             */
            info?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            } | null;
            /** @example {} */
            error?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            } | null;
            /**
             * @example {
             *       "database": {
             *         "status": "up",
             *         "responseTime": 12
             *       }
             *     }
             */
            details?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            };
          };
        };
      };
      /** @description The Health Check is not successful */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example error
             * @enum {string}
             */
            status?: "error" | "shutting_down";
            /**
             * @example {
             *       "database": {
             *         "status": "up",
             *         "responseTime": 12
             *       }
             *     }
             */
            info?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            } | null;
            /**
             * @example {
             *       "redis": {
             *         "status": "down",
             *         "message": "Could not connect",
             *         "responseTime": 3005
             *       }
             *     }
             */
            error?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            } | null;
            /**
             * @example {
             *       "database": {
             *         "status": "up",
             *         "responseTime": 12
             *       },
             *       "redis": {
             *         "status": "down",
             *         "message": "Could not connect",
             *         "responseTime": 3005
             *       }
             *     }
             */
            details?: {
              [key: string]: {
                /** @enum {string} */
                status: "up" | "degraded" | "down";
                /** @description Time the health indicator took to respond, in ms */
                responseTime?: number;
              } & {
                [key: string]: unknown;
              };
            };
          };
        };
      };
    };
  };
  PermissionsController_findAll_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Permission"][];
        };
      };
      /** @description Requires: roles.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  PermissionsController_me_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string[];
        };
      };
    };
  };
  PermissionsController_access_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserAccess"];
        };
      };
    };
  };
  UserPermissionsController_explain_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        userId: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserPermissionsExplanation"];
        };
      };
      /** @description Requires: users.read */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UserPermissionsController_set_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        userId: number;
        code: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpsertUserPermissionDto"];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserPermission"];
        };
      };
      /** @description Requires: users.permissions.manage */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  UserPermissionsController_remove_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path: {
        userId: number;
        code: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Requires: users.permissions.manage */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  IdentityController_settings_v1: {
    parameters: {
      query?: never;
      header?: {
        "x-custom-lang"?: unknown;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IdentitySettingsDto"];
        };
      };
    };
  };
}
