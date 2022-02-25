import "./App.css";
import Graph from "./Components/Graph/Graph";
import Input from "./Components/Input/Input";
import React, { useState, useEffect } from "react";

function App() {
  const [inputList, setInputList] = useState([{ x: "", y: "", label: false }]);
  const [theta, setTheta] = useState([]);
  const [b, setb] = useState("");
  const [accuracy, setAccuracy] = useState("");

  return (
    <div className="App">
      <h1>SVM Generator</h1>

      {accuracy !== "" && <h2>Accuracy: {accuracy}%</h2>}
      {accuracy !== "" && (
        <>
          <h3>
            Theta: [{theta[0].toFixed(2)},{theta[1].toFixed(2)}]
          </h3>
          <h3>B: {b.toFixed(2)}</h3>
        </>
      )}
      <Graph
        inputList={inputList}
        setInputList={setInputList}
        b={b}
        setb={setb}
        theta={theta}
        setTheta={setTheta}
        setAccuracy={setAccuracy}
      />
      <Input
        inputList={inputList}
        setInputList={setInputList}
        b={b}
        setb={setb}
        theta={theta}
        setTheta={setTheta}
        setAccuracy={setAccuracy}
      />

      <div className="instructions">
        <h2>Instructions</h2>
        <p>
          Please enter the points you want the linear SVM to be trained on, as
          well as their labels. Please note that there must be at least 2
          different label classes.
        </p>
        <p>
          Also, note that for the graph, you can pan around by clicking on the
          pan icon, as well as zoom in and out to see all the points. You can
          also save the plot as a png file.
        </p>
      </div>
    </div>
  );
}

export default App;
