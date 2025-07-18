// Configuration file for backend settings
// Loads environment variables and exports configuration for use throughout the backend

require("dotenv").config();

module.exports = {
  // Port for the backend server
  PORT: process.env.PORT || 5000,
  // SMTP configuration for sending emails (e.g., OTPs)
  SMTP: {
    host: process.env.SMTP_HOST || "smtp.example.com", // dummy fallback
    port: process.env.SMTP_PORT || 587, // dummy fallback
    user: process.env.SMTP_USER || "user@example.com", // dummy fallback
    pass: process.env.SMTP_PASS || "password", // dummy fallback
  },
  // List of email domains that are restricted from registering
  restrictedDomains: process.env.RESTRICTED_DOMAINS
    ? process.env.RESTRICTED_DOMAINS.split(",")
    : ["test.com", "yahoo.com"],
};
//
// Required .env variables:
// PORT=5000
// SMTP_HOST=smtp.example.com
// SMTP_PORT=587
// SMTP_USER=user@example.com
// SMTP_PASS=password
// RESTRICTED_DOMAINS=test.com,yahoo.com
