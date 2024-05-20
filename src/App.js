import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Notes from "./components/Notes";

const App = () => {
  const [videoId, setVideoId] = useState("r7qovpFAGrQ");
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  useEffect(() => {
    localStorage.setItem(videoId, JSON.stringify(notes));
  }, [videoId, notes]);

  const handleAddNote = (content) => {
    const timestamp = playerRef.current.getCurrentTime();
    const newNote = {
      timestamp,
      content,
      date: new Date().toLocaleDateString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (timestamp) => {
    const updatedNotes = notes.filter((note) => note.timestamp !== timestamp);
    setNotes(updatedNotes);
  };

  const handleEditNote = (timestamp, newContent) => {
    const updatedNotes = notes.map((note) =>
      note.timestamp === timestamp ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
  };

  const jumpToTimestamp = (timestamp) => {
    playerRef.current.seekTo(timestamp);
  };

  const extractVideoId = (urlOrId) => {
    const urlPattern =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = urlOrId.match(urlPattern);
    return match ? match[1] : urlOrId;
  };

  const handleChangeVideo = () => {
    const extractedVideoId = extractVideoId(inputValue);
    setVideoId(extractedVideoId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex flex-col md:flex-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter YouTube Video ID or Link"
            className="flex-grow p-2 border border-gray-700 rounded-md mb-2 md:mb-0 md:mr-2 bg-gray-800 text-white"
          />
          <button
            onClick={handleChangeVideo}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Change Video
          </button>
        </div>
        <VideoPlayer videoId={videoId} onReady={handleReady} />
        <Notes
          notes={notes}
          addNote={handleAddNote}
          deleteNote={handleDeleteNote}
          editNote={handleEditNote}
          jumpToTimestamp={jumpToTimestamp}
        />
      </div>
    </div>
  );
};

export default App;
