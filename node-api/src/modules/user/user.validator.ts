import { User } from "@prisma/client";
import { z, ZodError } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
});

export function validateUser(data: Omit<User, "id">): {
  success: boolean;
  data?: any;
  error?: ZodError;
} {
  try {
    const validatedData = userSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, error: error as ZodError<any> };
  }
}
