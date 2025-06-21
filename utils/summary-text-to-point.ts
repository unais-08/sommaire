export const convertSummaryTextToPoints = (text: string): string[] => {
  if (!text) {
    return [];
  }

  // Split the entire summary text into individual lines
  const lines = text.split("\n");

  const extractedPoints: string[] = [];

  // Regex to identify lines that are points.
  // It looks for:
  // - '^•': Starts with a bullet point character.
  // - '\\s*': Followed by zero or more whitespace characters.
  // - '(\\S+)': Captures one or more non-whitespace characters (this is where the emoji should be).
  // - '\\s*': Followed by zero or more whitespace characters.
  // - '(.*)$': Captures the rest of the line's content.
  const pointRegex = /^•\s*(\S+)\s*(.*)$/;

  for (const line of lines) {
    const trimmedLine = line.trim(); // Trim leading/trailing whitespace from the line

    // Try to match the line against our point regex
    const match = trimmedLine.match(pointRegex);

    if (match) {
      // match[2] contains the captured content after the bullet and emoji
      let content = match[2].trim();

      // The previous version of convertSummaryTextToPoints removed trailing punctuation.
      // We maintain this behavior for consistency with how your SummaryContentCard might expect the points.
      if (content.length > 1 && /[.!?]$/.test(content)) {
        content = content.slice(0, -1); // Remove the trailing punctuation (e.g., period, exclamation mark)
      }

      extractedPoints.push(content);
    }
    // Lines that do not match the pointRegex (e.g., markdown titles, paragraphs, or other non-point lines)
    // will be ignored and not added to extractedPoints.
  }

  return extractedPoints;
};
