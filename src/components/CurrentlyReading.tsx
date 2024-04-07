/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const updateCurrentWord = (sentence: string) => {
    if (!sentence) return "";

    const tempSentence = sentence;
    const [charIndex, charLength] = currentWordRange;

    const startIdx = charIndex;
    const endIdx = charIndex + charLength;

    const updatedSentence =
      tempSentence.slice(0, startIdx) +
      `<span class="currentword" data-testid="current-word">${tempSentence.slice(
        startIdx,
        endIdx
      )}</span>` +
      tempSentence.slice(endIdx);

    return updatedSentence;
  };

  return (
    <div className="currently-reading" data-testid="currently-reading">
      <p
        dangerouslySetInnerHTML={{
          __html: updateCurrentWord(sentences[currentSentenceIdx]),
        }}
        className="currently-reading-text"
        data-testid="current-sentence"
      ></p>
      <div>{sentences.map((sentence) => sentence)}</div>
    </div>
  );
};
