import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "AIzaSyD4qk67tiHpc45q1fvtLu0fVoAIws-nQis";
const CHANNEL_ID = "UC-fshunzytfdyPZtPc-OsYA";
const MAX_RESULTS = 10;

const App = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
      );
      setVideos(response.data.items);
      setFilteredVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube videos", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <header className="header">
        <div className="header-content">
          <h1>Shriramcharitmanas Daily Podcast</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>
      <div className="video-container">
        {filteredVideos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </a>
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
