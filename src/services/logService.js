// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";


function init() {
  // Sentry.init({
  //   dsn: "https://7a5e668343864d40a0c49dad77dd1ffa@o534435.ingest.sentry.io/5653681",
  //   integrations: [new Integrations.BrowserTracing()],

  //   // We recommend adjusting this value in production, or using tracesSampler
  //   // for finer control
  //   tracesSampleRate: 1.0,
 // });

}

function log(error) {
  console.log(error)
    // Sentry.captureException('loggin error ', error);
}

export default {
  init, log
}