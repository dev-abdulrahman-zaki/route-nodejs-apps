import "dotenv/config";
import * as Sentry from "@sentry/node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    environment: "production",
    sendDefaultPii: true,
  });
}