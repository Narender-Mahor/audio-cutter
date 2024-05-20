"use client";
import React, { useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const MainContent = () => {
  const [wavesurfer, setWaveSurfer] = useState(null);
  const wavesurferRef = useRef(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    loadAudio(file);
  };

  const loadAudio = (file) => {
    if (!file) return;

    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "white",
    });

    wavesurfer.loadBlob(file);
    wavesurfer.on("ready", () => {
      console.log("Audio loaded");
      setWaveSurfer(wavesurfer);
    });
  };

  const handlePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying(wavesurfer.isPlaying());
    }
  };

  // const handleTrim = () => {
  //   if (wavesurfer && wavesurfer.backend && wavesurfer.backend.buffer) {
  //     const audioDuration = wavesurfer.getDuration();

  //     // Convert trimStart and trimEnd from seconds to audio samples
  //     const start =
  //       Math.min(trimStart, trimEnd) * wavesurfer.backend.ac.sampleRate;
  //     const end =
  //       Math.max(trimStart, trimEnd) * wavesurfer.backend.ac.sampleRate;

  //     // Trim audio
  //     const trimmedBuffer = wavesurfer.backend.buffer.slice(start, end);

  //     // Create a Blob from the trimmed audio data
  //     const trimmedBlob = new Blob([trimmedBuffer], { type: "audio/wav" });

  //     // Generate a URL for downloading the trimmed audio file
  //     const trimmedAudioURL = URL.createObjectURL(trimmedBlob);

  //     // Create a temporary <a> element to trigger the download
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = trimmedAudioURL;
  //     downloadLink.download = "trimmed_audio.wav"; // You can set any desired filename here
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  //     // Cleanup
  //     URL.revokeObjectURL(trimmedAudioURL);
  //     console.log("url", trimmedAudioURL);
  //     document.body.removeChild(downloadLink);
  //     console.log(downloadLink);
  //   }
  // };
  const handleTrim = () => {
    if (wavesurfer && wavesurfer.backend && wavesurfer.backend.buffer) {
      const audioDuration = wavesurfer.getDuration();

      // Convert trimStart and trimEnd from seconds to audio samples
      const start =
        Math.min(trimStart, trimEnd) * wavesurfer.backend.ac.sampleRate;
      const end =
        Math.max(trimStart, trimEnd) * wavesurfer.backend.ac.sampleRate;

      // Trim audio
      const trimmedBuffer = wavesurfer.backend.buffer.slice(start, end);

      // Create a Blob from the trimmed audio data
      const trimmedBlob = new Blob([trimmedBuffer], { type: "audio/wav" });

      // Create a temporary <a> element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(trimmedBlob);
      downloadLink.download = "trimmed_audio.wav"; // You can set any desired filename here
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Cleanup
      URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden w-full">
        <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center p-4">
          <div className=" lg:flex items-center justify-between w-52 mb-10 hidden">
            <p className=" uppercase font-medium">How it works</p>
            <p className=" uppercase font-medium">joiner</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold">Audio Cutter</h1>
          <p className=" text-2xl mt-4">
            Free editor to trim and cut any audio file online
          </p>
          <label
            htmlFor="fileInput"
            className="mt-6 px-4 py-2 bg-purple-600 rounded cursor-pointer hover:bg-purple-800"
          >
            Browse my files
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="audio/*"
            onChange={handleFileChange}
          />

          <div className=" flex flex-col gap-3">
            <div ref={wavesurferRef}></div>
            <div>
              <label className=" mt-2 mb-4 inline-block">
                Trim Start:
                <input
                  type="number"
                  step="0.1"
                  value={trimStart}
                  onChange={(e) => setTrimStart(parseFloat(e.target.value))}
                />
              </label>
              <br />
              <label className="">
                Trim End:
                <input
                  type="number"
                  step="0.1"
                  value={trimEnd}
                  className="caret-black"
                  onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className=" mt-3">
              <button
                className=" px-4 py-2 bg-purple-600 rounded cursor-pointer hover:bg-purple-800"
                onClick={handlePlay}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                className=" mt-3 ml-5 px-4 py-2 bg-purple-600 rounded cursor-pointer hover:bg-purple-800"
                onClick={handleTrim}
              >
                Trim Audio & Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
