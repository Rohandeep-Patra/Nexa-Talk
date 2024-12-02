const IS_PROD = process.env.NODE_ENV === "production"; // Automatically detects production environment
const server = IS_PROD
  ? "https://apnacollegebackend.onrender.com"
  : "http://localhost:8080";

export default server;
