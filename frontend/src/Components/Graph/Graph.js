import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";

export default function Graph(props) {
  const { inputList, setInputList, theta, b, setAccuracy } = props;
  const [pos_x, setPos_x] = useState([]);
  const [pos_y, setPos_y] = useState([]);

  const [neg_x, setNeg_x] = useState([]);
  const [neg_y, setNeg_y] = useState([]);

  const [greatestx, setGreatest] = useState("");
  const [leastx, setLeast] = useState("");

  const [boundary, setBoundary] = useState({});

  const handle_points = () => {
    let temp_pos_x = [];
    let temp_pos_y = [];

    let temp_neg_x = [];
    let temp_neg_y = [];
    let true_points = 0;
    let false_points = 0;

    let greatest = 0;
    let least = 100000000000;
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].x === "" || inputList[i].y === "") {
        setBoundary({});
        setAccuracy("");
        return;
      }
      if (inputList[i].label === true) {
        temp_pos_x.push(inputList[i].x);
        temp_pos_y.push(inputList[i].y);
        true_points++;
      } else {
        temp_neg_x.push(inputList[i].x);
        temp_neg_y.push(inputList[i].y);
        false_points++;
      }
      if (inputList[i].x > greatest) greatest = inputList[i].x;
      if (inputList[i].x < least) least = inputList[i].x;
      if (true_points === 0 || false_points == 0) {
        setBoundary({});
        setAccuracy("");
      }
    }
    setPos_x(temp_pos_x);
    setPos_y(temp_pos_y);

    setNeg_x(temp_neg_x);
    setNeg_y(temp_neg_y);
    setGreatest(greatest);
    setLeast(least);
  };
  useEffect(() => {
    if (theta.length === 0 || b === "") return;
    let greatest_y = (greatestx * -1 * theta[0] - b) / theta[1];
    let least_y = (leastx * -1 * theta[0] - b) / theta[1];
    setBoundary({
      x: [leastx, greatestx],
      y: [least_y, greatest_y],
      type: "scatter",
      name: "Boundary",
    });
  }, [theta, b]);

  useEffect(() => {
    if (
      inputList.length === 1 &&
      inputList[0].x === "" &&
      inputList[0].y === "" &&
      inputList[0].label === false
    )
      return;
    else {
      handle_points();
    }
  }, [inputList]);

  let data = [
    {
      x: pos_x,
      y: pos_y,
      type: "scatter",
      mode: "markers",
      name: "Positively classified",
    },
    {
      x: neg_x,
      y: neg_y,
      type: "scatter",
      mode: "markers",
      name: "Negatively classified",
    },
  ];
  if (boundary !== {}) {
    data.push(boundary);
  } else {
    // console.log("hello");
  }

  let layout = { width: 800, height: 600 };

  return <Plot data={data} layout={layout} config={{ scrollZoom: true }} />;
}
