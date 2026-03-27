import { fromError, MessageBuilder } from "zod-validation-error";
import { ZodError } from "zod-validation-error/v3";

export default function zodFormError(error: ZodError) {
  return fromError(error, {
    messageBuilder,
  }).toString();
}

const messageBuilder: MessageBuilder = (issues) => {
  return issues
    .map((issue) => issue.path.join(".") + "→" + issue.message)
    .join("\n");
};
