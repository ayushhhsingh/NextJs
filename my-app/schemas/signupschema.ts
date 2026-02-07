import {z}  from 'zod';

export const  UsernameValidation = z
.string()
.min(2,"minimun two charecter required ")
.max(20,"username must be less then 20 characters")


export const signupValidation =z.object({
    username:UsernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password:z.string().min(6, {message:"must be 6 character"})
})

