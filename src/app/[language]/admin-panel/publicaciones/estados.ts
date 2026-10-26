// States of a publication, as the API accepts them
export const PUBLICACION_ESTADOS = [
  "borrador",
  "publicada",
  "archivada",
] as const;

export type PublicacionEstado = (typeof PUBLICACION_ESTADOS)[number];

// The radio group works with objects
export type EstadoOption = { id: PublicacionEstado };

export const ESTADO_OPTIONS: EstadoOption[] = PUBLICACION_ESTADOS.map((id) => ({
  id,
}));

export const toEstadoOption = (estado?: string | null): EstadoOption =>
  ESTADO_OPTIONS.find((option) => option.id === estado) ?? ESTADO_OPTIONS[0];
