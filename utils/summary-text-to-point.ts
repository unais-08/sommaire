export const convertSummaryTextToPoints = (text: string): string[] => {
  if (!text) {
    return [];
  }

  // This regex splits the text by:
  // 1. A punctuation mark (. ! ?) followed by zero or more whitespace characters (`\s*`).
  //    The positive lookbehind `(?<=[.?!])` ensures the punctuation is included with the preceding sentence.
  // 2. OR by one or more newline characters (`\n+`).
  // This handles both paragraph-style sentences and explicitly newlined list items.
  const rawPoints = text.split(/(?<=[.?!])\s*|\n+/);

  const cleanedPoints = rawPoints
    .map((point) => {
      let trimmedPoint = point.trim();

      // Remove leading markdown list indicators (e.g., "- ", "* ", "1. ") if present.
      // This is useful if Gemini generates markdown-style lists.
      trimmedPoint = trimmedPoint.replace(/^(\*|-|\d+\.)\s*/, "");

      // Remove trailing punctuation if it's the very last character and not part of an abbreviation.
      // (e.g., "Sentence." becomes "Sentence").
      // We check `length > 1` to avoid removing punctuation from standalone symbols if any.
      if (trimmedPoint.length > 1 && /[.!?]$/.test(trimmedPoint)) {
        trimmedPoint = trimmedPoint.slice(0, -1);
      }
      return trimmedPoint;
    })
    .filter((point) => point.length > 0); // Filter out any empty strings that might result from splitting

  return cleanedPoints;
};
