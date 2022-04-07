import Tracker from "@openreplay/tracker/cjs";
import { defineNuxtPlugin } from "#app";
import { nanoid } from "nanoid";

export default defineNuxtPlugin(async () => {
  const tracker = new Tracker.default({
    projectKey: process.env.OPENREPLAY_KEY ?? "",
  });

  await tracker.start();
  tracker.setUserID(nanoid(4));

  return {
    provide: {
      tracker,
    },
  };
});
