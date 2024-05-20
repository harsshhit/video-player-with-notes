import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId, onReady }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && playerRef.current.internalPlayer) {
      playerRef.current.internalPlayer.loadVideoById(videoId);
    }
  }, [videoId]);

  const handleReady = (event) => {
    playerRef.current = event.target;
    if (onReady) {
      onReady(event);
    }
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-3xl sm:w-auto aspect-w-16 aspect-h-9 bg-black shadow-lg rounded-lg overflow-hidden">
        <YouTube
          videoId={videoId}
          opts={{
            height: window.innerWidth < 768 ? "240" : "390",
            width: window.innerWidth < 768 ? "360" : "640",
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={handleReady}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
