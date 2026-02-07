import {z} from 'zod';

export const verifySchema = z.object({
    code: z.string().length(5," code must be 5 digit")
})