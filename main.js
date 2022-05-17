require("dotenv").config();
const { App } = require("@slack/bolt");

const blacklist = [<USER_ID>, <USER_ID>];

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event(
  "message",
  async ({
    body: {
      event: { user, ts, channel },
    },
  }) => {
    if (blacklist.includes(user)) {
      try {
        await app.client.chat.delete({
          ts,
          channel,
          token: process.env.SLACK_USER_TOKEN,
          as_user: true,
        });
      } catch (e) {
        console.log(e.data);
      }
    }
  }
);

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
