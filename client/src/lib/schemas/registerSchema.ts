import {z} from "zod";
import {requiredString} from "../util/util.ts";

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredString('displayName'),
    password: requiredString('password'),
})

export type RegisterSchema = z.infer<typeof registerSchema>