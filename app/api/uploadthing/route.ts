import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Apply an (optional) custom config:
  // config: { ... },
});
// export const dynamic = "force-dynamic"; // Force dynamic rendering for this route
