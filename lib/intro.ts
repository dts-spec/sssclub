/**
 * A tiny pub/sub so the homepage Hero can animate its copy in at the exact
 * moment the intro overlay finishes (the last image zooming to fill the screen).
 *
 * Module state resets on a full page load, so the intro replays on every refresh.
 */

let revealed = false;
const listeners = new Set<() => void>();

export const introReveal = {
  /** Has the intro already revealed (or been skipped)? */
  done: () => revealed,
  /** Fire the reveal — the Hero copy animates in. Idempotent. */
  fire() {
    if (revealed) return;
    revealed = true;
    listeners.forEach((l) => l());
  },
  /** Reset before a fresh intro play (e.g. client-side nav back to home). */
  reset() {
    revealed = false;
  },
  /** Subscribe to the reveal; returns an unsubscribe fn. */
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
