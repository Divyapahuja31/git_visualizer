import React from "react"
import { useState } from "react";

// function test(){
//     console.log(window.electronAPI)
//     alert(window.electronAPI.test())
//   };

function App(){
  const [repoPath,setRepoPath]=useState('');
  const handleRepo = async ()=>{
    const path = await window.electronAPI.selectRepo();
    if (path){
      setRepoPath(path)
    }
  }
  return(
    <>
    <div>
      <h1>Git tree Visualizer</h1>
      {/* <input type="text" placeholder="Enter repo path" style={{width:"500px",height:"20px"}}></input> */}
      <button onClick={handleRepo}>Select Repo</button>
      <p>Selected repo:</p>
      <div>{repoPath}</div>
    </div>
    </>
  )

}

export default App 