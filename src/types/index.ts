import { ErrorCode } from "@/enums/error-code";

export type Errors = {
  [key in ErrorCode]: { title: string; description: string; text?: string; };
};