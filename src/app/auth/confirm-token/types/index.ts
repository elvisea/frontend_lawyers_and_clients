import { z } from "zod";

import { ErrorCode } from "@/enums/error-code";

import { schema } from "../constants";

export type Keys = z.infer<typeof schema>;

export type Form = {
  token: string;
};

export type State = {
  success: boolean;
  errors: Partial<Record<keyof Keys, string[]>> | null;
  message: string | null;
  errorCode: ErrorCode | null;
};
