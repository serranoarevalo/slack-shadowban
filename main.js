const { App } = require("@slack/bolt");

const blacklist = [];

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(async ({ channel, user, ts }) => {
  if (blacklist.includes(user)) {
    await app.client.chat.delete({
      ts,
      channel,
    });
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
