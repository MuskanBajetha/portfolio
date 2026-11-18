import { setup, assign } from "xstate";
import { BOOPS, WAKES } from "./data";

const boop = assign(({ context }) => ({ boops: context.boops + 1, say: BOOPS[context.boops % BOOPS.length] }));
const wake = assign(({ context }) => ({ boops: context.boops + 1, say: WAKES[context.boops % WAKES.length] }));

export const storyMachine = setup({}).createMachine({
  id: "miso", type: "parallel",
  context: { node: "opener", boops: 0, say: "" },
  states: {
    story: { initial: "intro", states: {
      intro: { on: { CONTINUE: "chat" } },
      chat: { on: { PICK: [
        { guard: ({ event }) => !!event.next, actions: assign({ node: ({ event }) => event.next, say: "" }) },
        { target: "view", actions: assign({ say: "" }) },
      ] } },
      view: { on: { ROUTE_HOME: { target: "chat", actions: assign({ node: "opener", say: "" }) } } },
    } },
    presence: { initial: "awake", states: {
      awake: { after: { 30000: "asleep" }, on: { ACTIVITY: { target: "awake", reenter: true }, BOOP: { actions: boop, target: "awake", reenter: true } } },
      asleep: { on: { BOOP: { target: "awake", actions: wake } } },
    } },
  },
  on: {
    NAP: { target: ".presence.asleep" },
    SAY: { actions: assign({ say: ({ event }) => event.say }) },
    RESET: { target: ".story.intro", actions: assign({ node: "opener", say: "" }) },
  },
});
