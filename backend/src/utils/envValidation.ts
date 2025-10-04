import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export default cleanEnv(process.env, {
  MONGODB_URL: str(),
  PORT: port(),
});
