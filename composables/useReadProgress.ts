import { useState } from "#app";

export function useReadProgress() {
  return useState<number>("progress", () => 0);
}
