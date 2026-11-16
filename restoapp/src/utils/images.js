// Shown when a dish has no photo, or its photo link is broken.
export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'

export const imageOrPlaceholder = (src) => src || PLACEHOLDER_IMAGE

// Use as onError on a dish <img> to swap a broken photo for the placeholder.
export function showPlaceholder(event) {
  const img = event.currentTarget
  if (!img.src.endsWith(PLACEHOLDER_IMAGE)) img.src = PLACEHOLDER_IMAGE
}
