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
import { setMessage } from "../../store/appState/actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
  const [result, setResult] = useState([]);
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
        setResult(results);
        dispatch(setMessage("info", true, "Successfully added to Gallery!"));
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell align="right">Confidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row) => (
              <TableRow
                key={row.label}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.confidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {open ? (
          <div>
            <table></table>
          </div>
        ) : null}
      </div>
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
          {imageData ? (
            <h1 style={{ fontSize: 20 }}>Succesfully uploaded!</h1>
          ) : (
            ""
          )}
        </div>
        <Button onClick={imageClassification}>SUBMIT</Button>
      </div>{" "}
    </div>
  );
}
