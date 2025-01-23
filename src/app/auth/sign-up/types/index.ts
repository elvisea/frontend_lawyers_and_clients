import { z } from "zod";

import { ErrorCode } from "@/enums/error-code";

import { schema } from "../constants";

export type Keys = z.infer<typeof schema>;

export type Form = {
  name: string;
  email: string;
  password: string;
  confirmation: string;
};

export type State = {
  success: boolean;
  errors: Partial<Record<keyof Keys, string[]>> | null;
  message: string | null;
  errorCode: ErrorCode | null;
};
