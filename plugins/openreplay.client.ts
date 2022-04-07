import Tracker from "@openreplay/tracker/cjs";
import { defineNuxtPlugin } from "#app";
import { nanoid } from "nanoid";

const tracker = new Tracker({
  projectKey: process.env.OPENREPLAY_KEY ?? "",
});

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

export default defineNuxtPlugin(async () => {
  await tracker.start();
  tracker.setUserID(getUserId());

  return {
    provide: {
      tracker,
    },
  };
});
