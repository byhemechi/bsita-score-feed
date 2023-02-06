import type { DiscordMessage } from "https://deno.land/x/discordeno@18.0.1/types/discord.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");

export const sendMessage = ({
  message,
}: {
  message: Partial<DiscordMessage>;
}) => {
  const body = JSON.stringify(message);

  return fetch(WEBHOOK_URL ?? "", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body,
  });
};
