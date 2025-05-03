import { z } from "zod";

export const CreateWaitlist = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});