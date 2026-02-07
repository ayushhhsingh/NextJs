  import {z} from 'zod';

export const messagesachema = z.object({
    content: z.string()
    .min(5," content must be 5 char")
    .max(300,"content must be maximum 300")
})

