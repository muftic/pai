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

import Save from "@material-ui/icons/Save";

import { setMessage } from "../../store/appState/actions";
import { Snackbar } from "@mui/material";

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
  const dispatch = useDispatch();
  const [challengeId, setChallengeId] = useState(0);
  const [imageData, setImageData] = useState();
  function handleChange(e) {
    let value = e.value;
    setChallengeId(value + 1); //index fix
  }

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const challenges = useSelector(selectChallenges);
  const taskOption = challenges.map((ch, i) => {
    return { value: i, label: ch.name };
  });

  function imageClassification() {
    let classification;
    classifier
      .predict(image, 3, function (err, results) {
        //ml5 async predict
        if (err) {
          console.log(err);
        }
        return results;
      })
      .then((results) => {
        classification = JSON.stringify({ ...results });
        submit();
        setOpen(true);
      });
    async function submit() {
      const response = await axios.post(`${apiUrl}/submissions`, {
        score: 100,
        imageUrl: imageData,
        classification: classification,
        userId: 1,
        challengeId: challengeId,
      });

      dispatch({ type: "subs/add", payload: response.data.submission });

      dispatch(setMessage("info", true, "Submitted!"));
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
        <Button onClick={imageClassification}>SUBMIT</Button>
      </div>{" "}
    </div>
  );
}
