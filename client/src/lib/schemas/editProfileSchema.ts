import {z} from "zod";
import {requiredString} from "../util/util.ts";

export const editProfileSchema = z.object({
    displayName: requiredString('DisplayName'),
    bio: z.string().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;