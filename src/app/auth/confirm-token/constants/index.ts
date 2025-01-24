import { z } from 'zod'
import { State } from "../types";

export const initialState: State = {
  message: null,
  success: false,
  errors: null,
  errorCode: null,
}

export const schema = z
  .object({
    token: z
      .string()
      .regex(/^\d+$/, { message: 'Code should contain only numbers.' })
      .min(6, { message: 'Code should have at least 6 characters.' })
      .max(6, { message: 'Code should have at most 6 characters.' }),
  })
