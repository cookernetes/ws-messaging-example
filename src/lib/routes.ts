export const Routes = {
  home: "/",
  channels: "/channels",

  channel: (channelId: number) => {
    return `/channels/${channelId}`;
  },
} as const;

export type RoutesKey = keyof typeof Routes;
