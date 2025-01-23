import { z } from 'zod'
import { State } from "../types";

export const initialState: State = {
  success: false,
  message: null,
  errors: null,
}

export const schema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})