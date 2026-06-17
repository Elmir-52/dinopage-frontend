import z from "zod";

export const UserFormDataSchema = z.object({
    email: z
        .email()
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .trim()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
});