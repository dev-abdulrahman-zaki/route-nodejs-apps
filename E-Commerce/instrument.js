import * as Sentry from "@sentry/node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://9f458f7330ef5ba193103e25e1993cdd@o4509303329718272.ingest.de.sentry.io/4509447311851600",
  
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    environment: "production",
    sendDefaultPii: true,
  });
}