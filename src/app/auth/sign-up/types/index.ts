import { z } from "zod";

import { ErrorCode } from "@/enums/error-code";
import { SignUpResponse } from "@/http/sign-up";

import { schema } from "../constants";

type Keys = z.infer<typeof schema>;

export type State = {
  success: boolean;
  errors: Partial<Record<keyof Keys, string[]>> | null;
  message: string | null;
  errorCode: ErrorCode | null;
  response: SignUpResponse | null;
}