import React from "react";
import * as ml5 from "ml5";
import { useState } from "react";
import { useEffect } from "react";
import { selectAppLoading } from "../../store/appState/selectors";
export default function Test() {
  // When the model is loaded
  const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
  const [prediction, setPrediction] = useState([]);
  const [isPredicted, setIsPredicted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let image = document.getElementById(`23`);

  function modelLoaded() {
    console.log("Model Loaded!");
    if (image === null) {
      image = document.getElementById(`23`); //oyvey
    }
  }
  function classifyImg() {
    classifier
      .predict(image, 3, function (err, results) {
        if (err) {
          console.log(err);
        }
        return results;
      })
      .then((results) => {
        // set the prediction in state and off the loader
        // this.setLoader(false);
        //this.setPredictions(results);
        console.log(results);
        setPrediction(results);
      })
      .then(() => {
        console.log(prediction);
      });
  }
  return (
    <div>
      <button
        onClick={() => {
          classifier
            .predict(image, 3, function (err, results) {
              if (err) {
                console.log(err);
              }
              return results;
            })
            .then((results) => {
              // set the prediction in state and off the loader
              // this.setLoader(false);
              //this.setPredictions(results);
              console.log(results);
              setPrediction(results);
              console.log(image);
            })
            .then(() => {
              console.log(prediction);
            });
        }}
        style={{ height: "30px", width: `30px` }}
      ></button>
      <img
        crossOrigin="anonymous"
        id="23"
        src="https://res.cloudinary.com/muftic/image/upload/v1638138007/PictionAI/th_rlhkaq.jpg"
      />
      aaa
    </div>
  );
}
