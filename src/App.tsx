import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIdx, controls } =
    useSpeech(sentences);

  useEffect(() => {
    loadNewContent();
  }, []);

  const loadNewContent = () => {
    fetchContent().then((data) =>
      setSentences(parseContentIntoSentences(data))
    );
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls {...controls} loadNewContent={loadNewContent} />
      </div>
    </div>
  );
}

export default App;
