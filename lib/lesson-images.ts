// No per-lesson artwork exists in assets/images yet (see AGENTS.md "Image
// Generation Rules") — seed a stable Picsum placeholder per lesson instead.
export function getLessonImageUrl(lessonId: string): string {
  return `https://picsum.photos/seed/${lessonId}/800/500`;
}
