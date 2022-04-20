import React from "react";

import { ReactComponent as Play } from "./Assets/Icons/play.svg";
import { ReactComponent as Pause } from "./Assets/Icons/pause.svg";
import { ReactComponent as Replay10 } from "./Assets/Icons/replay_10.svg";
import { ReactComponent as Forward10 } from "./Assets/Icons/forward_10.svg";
import { ReactComponent as FullscreenExit } from "./Assets/Icons/fullscreen_exit.svg";
import { ReactComponent as Fullscreen } from "./Assets/Icons/fullscreen.svg";
import { ReactComponent as VolumeDown } from "./Assets/Icons/volume_down.svg";
import { ReactComponent as VolumeUp } from "./Assets/Icons/volume_up.svg";
import { ReactComponent as VolumeMute } from "./Assets/Icons/volume_mute.svg";

import { useState, useEffect, useRef } from "react";
import useVideoPlayer from "./Hooks/useVideoPlayer";
import Spinner from "./Components/Spinner";
import "./styles.css";

const VideoPlayer = ({ properties }) => {
  const videoElement = useRef();
  const {
    isPlaying,
    progress,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleSkipForward,
    handleSkipBack,
    handleVolumeChange,
    volume,
  } = useVideoPlayer(videoElement);

  const fullscreen = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (fullscreen.current.requestFullscreen) {
        fullscreen.current.requestFullscreen();
      } else if (fullscreen.current.webkitRequestFullscreen) {
        /* Safari */
        fullscreen.current.webkitRequestFullscreen();
      } else if (fullscreen.current.msRequestFullscreen) {
        /* IE11 */
        fullscreen.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const resolveVolumeIcon = () => {
    if (volume === 0) {
      return <VolumeMute width={50} height={50} />;
    } else if (volume < 0.5) {
      return <VolumeDown width={50} height={50} />;
    }

    return <VolumeUp width={50} height={50} />;
  };

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    videoElement.current.addEventListener("loadeddata", () =>
      setShowLoading(false)
    );
  }, []);

  useEffect(() => {
    videoElement.current.addEventListener("waiting", () =>
      setShowLoading(true)
    );
  });

  useEffect(() => {
    videoElement.current.addEventListener("playing", () =>
      setShowLoading(false)
    );
  });

  //show or hide controls based on
  const [showControls, setShowControls] = useState("flex");

  document.onmousemove = function () {
    setShowControls("flex");
  };

  useEffect(() => {
    let timer = setTimeout(
      () => setShowControls("none"),
      properties.timeout || 10000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [showControls]);

  return (
    <div
      className="container"
      ref={fullscreen}
      style={{
        height: properties.height || "100vh",
        width: properties.width || "100vw",
      }}
    >
      {showLoading && <Spinner />}

      <video
        className="video-player"
        height="99.6%"
        width="100%"
        src={properties.url}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        loop={properties.loop || false}
        onClick={togglePlay}
      />

      <div
        className="bottom-bar"
        style={{
          display: showControls,
        }}
      >
        <input
          type="range"
          aria-label="Progress"
          min={0}
          max={1}
          step={0.00001}
          value={progress}
          onChange={(e) => handleVideoProgress(e)}
          className="slider"
          style={{
            background: `linear-gradient(
              to right,
              #e50914 0%,
              #e50914 ${progress * 100}%,
              #fff ${progress * 100}%,
              #fff 100%
            )`,
          }}
        />

        <div className="controls">
          <div className="bottom-bar-container">
            <button className="icon-button" onClick={togglePlay}>
              {isPlaying ? (
                <Pause width={50} height={50} />
              ) : (
                <Play width={50} height={50} />
              )}
            </button>

            <button className="icon-button" onClick={handleSkipBack}>
              <Replay10 width={50} height={50} />
            </button>
            <button className="icon-button">
              <Forward10 width={50} height={50} onClick={handleSkipForward} />
            </button>

            <button className="volume-button">
              <div className="volume-container">
                <input
                  type="range"
                  aria-label="Progress"
                  min={0}
                  max={1}
                  step={0.00001}
                  value={volume}
                  onChange={(e) => handleVolumeChange(e)}
                  className="volume-slider"
                  orient="vertical"
                  style={{
                    background: `linear-gradient(
                      to right,
                      #e50914 0%,
                      #e50914 ${volume * 100}%,
                      #fff ${volume * 100}%,
                      #fff 100%
                    )`,
                  }}
                />
              </div>
              {resolveVolumeIcon()}
            </button>
          </div>

          <div
            className="bottom-bar-container"
            style={{ position: "relative", right: "6%" }}
          >
            <h1
              style={{
                fontWeight: 200,
              }}
            >
              {properties.title || "Video Title"}
            </h1>
          </div>

          <div className="bottom-bar-container">
            <button className="icon-button" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <FullscreenExit width={50} height={50} />
              ) : (
                <Fullscreen width={50} height={50} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
