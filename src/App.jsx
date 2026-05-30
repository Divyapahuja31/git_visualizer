import React, { useState } from "react";

function App() {
  const [repoPath, setRepoPath] = useState("");
  const [commits, setCommits] = useState([]);

  const handleRepo = async () => {
    const path = await window.electronAPI.selectRepo();
    if (!path) return;
    setRepoPath(path);

    const history = await window.electronAPI.getGitHistory(path);
    setCommits(history);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Git Tree Visualizer</h1>
      <button onClick={handleRepo}>
        Select Repo
      </button>
      <p>Selected repo:</p>
      <p>{repoPath}</p>
      {commits.map((commit) => (
        <div key={commit.hash}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{commit.message}</h3>
          <p>Hash:{" "}{commit.hash}</p>
          <p>Author: {commit.author}</p>
          <p>Date: {commit.date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;