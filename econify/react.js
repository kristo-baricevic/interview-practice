import React, { useRef, useState, useEffect } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";

/*
TODO
- When the progress bar reaches 100%, make the progress bar color change to green

- Implement the functionality for the cancel button. The button should cancel the progress bar from completing
*/

const App = () => {
  return (
    <div className="box">
      <ProgressBar />
    </div>
  );
};

const ProgressBar = () => {
  const progressRef = useRef();
  const [progress, setProgress] = useState(0);
  const [cancel, setCancel] = useState(false);
  // let cancel = false;

  const handleCancel = () => {
    if (progress === 100) setProgress(0);
    setCancel(!cancel);
  };

  useEffect(() => {
    if (cancel) return;
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prevProgress + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cancel]);

  return (
    <div class="progressContainer">
      <progress
        ref={progressRef}
        className={`${
          cancel
            ? "progress-canceled"
            : progress === 100
            ? "progress-complete"
            : "progress"
        }`}
        value={progress}
        max="100"
      ></progress>
      <button disabled={cancel} onClick={handleCancel}>
        x
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
