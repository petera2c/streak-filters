// src/state/keyboardListenerState.ts
import { atom } from "recoil";

export const keyboardListenerStackState = atom<string[]>({
  key: "keyboardListenerStack",
  default: [],
});
