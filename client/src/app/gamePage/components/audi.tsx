import React, { useState, useEffect } from "react";

const Player: React.FC<{ track: string }> = ({ track }) => {
  const [audio] = useState(new Audio(track));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    const handleEnded = () => setPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Sound Off" : "Sound On"} </button>
    </div>
  );
};

export default Player;
