import React from "react";
import * as ml5 from "ml5";
import { useState } from "react";
import { useEffect } from "react";
export default function Test() {
  let image = document.getElementById("23");
  const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
  // When the model is loaded
  const [prediction, setPrediction] = useState([]);
  const [isPredicted, setIsPredicted] = useState(false);
  function modelLoaded() {
    console.log("Model Loaded!");
  }

  /*  if (!isPredicted) {
    predictPic();
  } */
  /*  if (!isPredicted) {
    predictPic();
  } */
  //  setTimeout(predictPic, 3000);
  function predictPic() {
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
        setPrediction([results]);
        console.log(prediction);
        setIsPredicted(true);
      });
  }
  useEffect(() => {
    predictPic();
  }, []);
  return (
    <div>
      <img
        crossOrigin="anonymous"
        id="23"
        src="https://res.cloudinary.com/muftic/image/upload/v1637880233/PictionAI/62f3c25323194eca772675d83d330a04ec486547v2_hq_z5ybov.jpg"
      />
      aaa
    </div>
  );
}
