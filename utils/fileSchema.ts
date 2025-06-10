import { z } from "zod";

/*
 * This schema validates a file input for an upload form(using ZOD library).
 * It checks that the file is a valid File object,
 * that it is a PDF, and that its size does not exceed 20MB.
 * If the file does not meet these criteria, an error message is returned.
 */

export const schema = z.object({
  file: z
    .instanceof(File, {
      message: "Invalid File or File not provided",
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});
