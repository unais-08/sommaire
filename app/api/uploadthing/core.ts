import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfRouter: f({ pdf: { maxFileSize: "32MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      let user = null;
      try {
        user = await currentUser();
      } catch (error) {
        console.error("Error fetching current user from Clerk:", error);
        // You might want to throw a specific error here or handle it
        throw new UploadThingError("Authentication service error");
      }

      if (!user) {
        console.warn("Unauthorized access attempt: No user found.");
        throw new UploadThingError("Unauthorized Access");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        userId: metadata.userId,
        file: {
          url: file.ufsUrl,
          name: file.name,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
