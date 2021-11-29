import { useState } from "react";
/* import { h1 } from "../styled/h1.style";
import { Image } from "../styled/Image.styled";
import { Button } from "../styled/Button.style";
 */
import axios from "axios";
import { apiUrl } from "../../config/constants";
import gif from "../../gif.gif";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as ml5 from "ml5";
import { selectToken } from "../../store/user/selectors";
// When the model is loaded
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

let image = document.getElementById(`thisOne`);

function modelLoaded() {
  console.log("Model Loaded!");
  if (image === null) {
    image = document.getElementById(`thisOne`); //oyvey DONT DELETE
  }
}

export default function Cloudinary() {
  const token = useSelector(selectToken);
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
  const [prediction, setPrediction] = useState([]);
  const [imageClassification, setImageClassification] = useState({});
  const [isPredicted, setIsPredicted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [imageData, setImageData] = useState();
  const [playerName, setPlayerName] = useState("");

  function classFunc() {
    async function myFunc() {
      //console.log(JSON.stringify(imageClassification));
      const response = await axios.post(`${apiUrl}/submissions`, {
        score: 100,
        imageUrl: imageData,
        classification: JSON.stringify(imageClassification),
        userId: 1,
        challengeId: 1,
      });
      console.log(response);
    }

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
        setImageClassification({ ...results });
        console.log(imageClassification);
        myFunc();
      });
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
      <p>
        if you want to play, enter your name and click to continue!
        <input onChange={(event) => setPlayerName(event.target.value)} />
        <Button style={{ height: "30px", width: "100px" }}>Continue</Button>
      </p>
      <img src={gif} />
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
        <button
          onClick={async () => {
            const response = await axios.post(
              `${apiUrl}/submissions`,
              {
                score: 100,
                imageUrl: imageData,
                classification: JSON.stringify(imageClassification),
                userId: 1,
                challengeId: 1,
              },
              {}
            );
          }}
        >
          CREATE
        </button>
      </div>{" "}
    </div>
  );
}
