import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const speechEngine = createSpeechEngine({
    onEnd: () => handleEnd,
    onBoundary: () => {},
    onStateUpdate: (state) => setPlaybackState(state),
  });

  const handleEnd = () => {
    if (currentSentenceIdx === sentences.length - 1) {
      setCurrentSentenceIdx(0);
    } else {
      setCurrentSentenceIdx((prev) => prev + 1);
    }
  };

  useEffect(() => {
    speechEngine.load(sentences[currentSentenceIdx]);
  }, [currentSentenceIdx]);

  const play = () => setPlaybackState("playing");
  const pause = () => setPlaybackState("paused");

  return {
    currentSentenceIdx,
    currentWordRange,
    controls: {
      play,
      pause,
      state: playbackState,
    },
  };
};

export { useSpeech };
