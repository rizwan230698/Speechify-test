import { useEffect, useRef, useState } from "react";

import { PlayingState, SpeechEngine, createSpeechEngine } from "./speech";

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

  const speechEngineRef = useRef<SpeechEngine | null>(null);

  useEffect(() => {
    if (sentences.length) {
      const engine = createSpeechEngine({
        onEnd: handleEnd,
        onBoundary: (e) => {
          setCurrentWordRange([e.charIndex, e.charLength]);
        },
        onStateUpdate: handleOnStateUpdate,
      });
      speechEngineRef.current = engine;
    }
  }, [sentences]);

  function handleEnd(e: any) {
    setCurrentSentenceIdx((prev) => {
      if (prev + 1 <= sentences.length - 1) return prev + 1;
      return 0;
    });
    setCurrentWordRange([0, 0]);
  }

  function handleOnStateUpdate(state: PlayingState) {
    setPlaybackState(state);
  }

  useEffect(() => {
    if (!sentences.length) return;
    setCurrentWordRange([0, 0]);
    setCurrentSentenceIdx(0);
  }, [sentences]);

  useEffect(() => {
    if (!sentences.length) return;
    speechEngineRef.current?.load(sentences[currentSentenceIdx]);
  }, [sentences, currentSentenceIdx]);

  useEffect(() => {
    if (playbackState === "paused") {
      speechEngineRef.current?.pause();
    }
    if (playbackState === "playing") {
      speechEngineRef.current?.play();
    }
  }, [playbackState]);

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
