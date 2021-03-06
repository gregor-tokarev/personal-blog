import Tracker from "@openreplay/tracker/cjs";
import { defineNuxtPlugin } from "#app";
import { nanoid } from "nanoid";

function getUserId() {
  const ID = localStorage.getItem("userId");
  if (ID) {
    return ID;
  } else {
    const newUserId = nanoid(4);
    localStorage.setItem("userId", newUserId);

    return newUserId;
  }
}

export default defineNuxtPlugin(async ({ $config }) => {
  const tracker = new Tracker({
    projectKey: $config.OPENREPLAY_KEY,
  });
  await tracker.start();
  tracker.setUserID(getUserId());

  return {
    provide: {
      tracker,
    },
  };
});
