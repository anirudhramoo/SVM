import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Input.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Input(props) {
  const { inputList, setInputList, setTheta, setb, setAccuracy } = props;
  const [submit, setSubmit] = useState(false);

  const validate = () => {
    let true_points = 0;
    let false_points = 0;

    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].x === "" || inputList[i].y === "") {
        // alert("Please enter proper values");
        return false;
      }
      if (inputList[i].label === true) true_points++;
      else false_points++;
    }
    if (true_points === 0 || false_points === 0) {
      console.log(true_points);
      // alert("There must be at least 2 classes");
      return false;
    }
    return true;
  };

  const handleInputChange = async (e, i) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[i][name] = value;
    setInputList(list);
    console.log(inputList);
    let result = validate();
    if (!result) {
      return;
    }
    try {
      setSubmit(true);
      let res = await axios.post(process.env.REACT_APP_apiUrl, inputList);
      res = res.data;
      setTheta([res[0], res[1]]);
      setb(res[2]);
      setAccuracy(res[3] * 100);
      console.log(res);
      setSubmit(false);
    } catch {}
  };

  const handlecheckChange = async (e, i) => {
    let val = e.target.checked;
    const list = [...inputList];
    list[i]["label"] = val;
    setInputList(list);
    let result = validate();
    if (!result) {
      return;
    }
    try {
      setSubmit(true);
      let res = await axios.post(process.env.REACT_APP_apiUrl, inputList);
      res = res.data;
      setTheta([res[0], res[1]]);
      setb(res[2]);
      setAccuracy(res[3] * 100);
      console.log(res);
      setSubmit(false);
    } catch {}
  };

  const handleRemoveClick = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { x: "", y: "", label: false }]);
  };
  return (
    <>
      <h2>Select your points</h2>
      {inputList.map((point, i) => {
        return (
          <div className="input_div">
            <TextField
              size="small"
              name="x"
              value={point.x}
              onChange={(e) => handleInputChange(e, i)}
              placeholder="X-coordinate"
              type="number"
              className="x"
              style={{ marginRight: "2%" }}
            />
            <TextField
              size="small"
              name="y"
              value={point.y}
              onChange={(e) => handleInputChange(e, i)}
              placeholder="Y-coordinate"
              type="number"
              className="y"
              style={{ marginLeft: "1%", marginRight: "1%" }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  type="checkbox"
                  name="label"
                  onChange={(e) => handlecheckChange(e, i)}
                />
              }
              label="Positively classified"
            />

            {/* <label>Positively classified</label>
            <input
              type="checkbox"
              name="label"
              onChange={(e) => handlecheckChange(e, i)}
            /> */}

            {inputList.length !== 1 && (
              // <button onClick={() => handleRemoveClick(i)} className="remove">
              //   Remove
              // </button>
              <Button
                onClick={() => handleRemoveClick(i)}
                className="remove"
                variant="outlined"
                style={{ marginLeft: "2%" }}
              >
                Remove
              </Button>
            )}
            {inputList.length - 1 === i && (
              <div className="add">
                {/* <button onClick={handleAddClick}>Add</button> */}
                <Button onClick={handleAddClick} variant="outlined">
                  Add
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {/* <input type="submit"></input> */}
    </>
  );
}
