import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractText(fileUrl: string): Promise<string> {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch/download PDF: ${response.statusText}`);
    }
    const pdfBlob = await response.blob();
    const pdfArrayBuffer = await pdfBlob.arrayBuffer();
    const loader = new PDFLoader(new Blob([pdfArrayBuffer]));
    const documents = await loader.load();
    return documents.map((doc) => doc.pageContent).join("\n");
    // If you want to return the entire PDFLoader object instead of just text:
    // return loader;
  } catch (error) {
    console.error("Error fetching or extracting text from PDF:", error);
    throw error;
  }
}
