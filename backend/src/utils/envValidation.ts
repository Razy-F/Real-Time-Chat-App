import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export default cleanEnv(process.env, {
  MONGODB_URL: str(),
  PORT: port(),
  JWT_SECRET: str(),
  NODE_ENV: str({ choices: ["development", "production"] }),
});
