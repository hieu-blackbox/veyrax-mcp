import axios from "axios";

const VEYRAX_API_KEY = process.env.VEYRAX_API_KEY || '.';

if (!VEYRAX_API_KEY) {
  throw new Error("VEYRAX_API_KEY environment variable is not set");
}

export const veyraxClient = axios.create({
  baseURL: "https://veyraxapp.com",
  headers: {
    "VEYRAX_API_KEY": VEYRAX_API_KEY,
    "Content-Type": "application/json",
  },
});