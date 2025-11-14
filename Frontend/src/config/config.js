const AUTH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const GEMENI_API_KEY = import.meta.env.VITE_GEMENI_API_KEY;
// Provide a safe default so the app still calls the backend at localhost:5000
// if the VITE_APP_URL environment variable is missing during development.
const VITE_APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5000/";

export { AUTH_KEY, API_KEY, GEMENI_API_KEY, VITE_APP_URL };
