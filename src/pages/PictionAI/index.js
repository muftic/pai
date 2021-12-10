import { useState } from "react";

import Select from "react-select";
import { selectChallenges } from "../../store/challenges/selectors";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import gif from "../../gif.gif";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as ml5 from "ml5";
// When the model is loaded
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

let image = document.getElementById(`thisOne`);

function modelLoaded() {
  console.log("Model Loaded!");
  if (image === null) {
    image = document.getElementById(`thisOne`); //oyvey DONT DELETE
  }
}

export default function PictionAI() {
  const [challengeId, setChallengeId] = useState(0);

  function handleChange(e) {
    let value = e.value;

    console.log(e);
    setChallengeId(value + 1);
    console.log(challengeId);
  }
  const challenges = useSelector(selectChallenges);
  const taskOption = challenges.map((ch, i) => {
    return { value: i, label: ch.name };
  });
  const dispatch = useDispatch();

  const [imageData, setImageData] = useState();
  //const [playerName, setPlayerName] = useState("");

  function classFunc() {
    let classification;
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

        classification = JSON.stringify({ ...results });
        myFunc();
      });
    async function myFunc() {
      const response = await axios.post(`${apiUrl}/submissions`, {
        score: 100,
        imageUrl: imageData,
        classification: classification,
        userId: 1,
        challengeId: challengeId,
      });

      dispatch({ type: "subs/add", payload: response.data.submission });
      window.alert(`you scored ${response.data.submission.score}`);
    }
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "c5h84nci");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/muftic/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImageData(file.url); //put the url in local state, next step you can send it to the backend
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <Select
        options={taskOption ? taskOption : null}
        onChange={handleChange}
      />
      {/*   <p>
        if you want to play, enter your name and click to continue!
        <input onChange={(event) => setPlayerName(event.target.value)} />
        <Button style={{ height: "30px", width: "100px" }}>Continue</Button>
      </p> */}
      <img alt="robot" src={gif} />
      <div
        style={{
          display: "inline-block",
          border: "1px solid black",
          width: "50%",
        }}
      >
        <input type="file" onChange={uploadImage} />
        <div style={{ textAlign: "center" }}>
          <Image
            id="thisOne"
            crossOrigin="anonymous"
            style={{ height: "50px", width: "50px" }}
            src={
              imageData
                ? imageData
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
          />
          {image ? <h1 style={{ fontSize: 20 }}>Succesfully uploaded!</h1> : ""}
        </div>
        <Button onClick={classFunc}>SUBMIT</Button>
      </div>{" "}
    </div>
  );
}
