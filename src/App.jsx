import React from "react"

function test(){
    console.log(window.electronAPI)
    alert(window.electronAPI.test())
  };

function App(){
  return(
    <>
    <div>
      <h1>Git tree Visualizer</h1>
      <input type="text" placeholder="Enter repo path" style={{width:"500px",height:"20px"}}></input>
      <button onClick={test}>Button</button>
    </div>
    </>
  )

}

export default App 