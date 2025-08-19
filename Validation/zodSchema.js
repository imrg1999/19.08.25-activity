import {z} from 'zod';

export const validationSchema = z.object({
    name: z.string().min(1, {
        message: "Invalid Name"
    }),
    email: z.string().email({
        message: "Invalid mail Id"
    }).regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
      message: "Only Gmail addresses are allowed",
    }),
    age: z.coerce.number().min(18, {
        message: "Below age criteria"
    }),
    contact: z.string().length(10, {
        message: "Invalid Number"
    }),
    password: z.string().min(8, {
        message: "Invalid password format"
    })
});