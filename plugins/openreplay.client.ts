import Tracker from "@openreplay/tracker/cjs";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async () => {
  const tracker = new Tracker.default({
    projectKey: process.env.OPENREPLAY_KEY ?? "",
  });

  await tracker.start();

  return {
    provide: {
      tracker,
    },
  };
});
