// Photos live in the public "photos" bucket. Their public URLs look like
// .../storage/v1/object/public/photos/<user-id>/<file>. getPhotoPath returns
// the "<user-id>/<file>" part, or null when the URL is not a photos URL.
const PHOTO_URL_MARKER = "/storage/v1/object/public/photos/";

export function getPhotoPath(mediaUrl) {
  if (!mediaUrl) return null;
  const index = mediaUrl.indexOf(PHOTO_URL_MARKER);
  if (index === -1) return null;
  const path = mediaUrl.slice(index + PHOTO_URL_MARKER.length).split("?")[0];
  return path || null;
}

// Removes an entry's photo from storage. Call this only after the entry row is
// gone. Failures are logged and never block the user.
export async function removePhoto(supabase, mediaUrl) {
  try {
    const path = getPhotoPath(mediaUrl);
    if (!path) return;
    const { error } = await supabase.storage.from("photos").remove([path]);
    if (error) console.error("Error removing photo:", error);
  } catch (err) {
    console.error("Exception removing photo:", err);
  }
}
