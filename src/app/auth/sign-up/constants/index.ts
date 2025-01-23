import { z } from 'zod'
import { State } from "../types";

export const initialState: State = {
  message: null,
  success: false,
  errors: null,
  errorCode: null,
  response: null
}

export const schema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    confirmation: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'Password confirmation does not match.',
    path: ['confirmation'],
  })