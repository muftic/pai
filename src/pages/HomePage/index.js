import React from "react";
import Cloudinary from "../Cloudinary";
import * as ml5 from "ml5";
import { useState } from "react";
import { useEffect } from "react";
import { fetchSubs } from "../../store/submissions/actions";
import { useDispatch, useSelector } from "react-redux";

// When the model is loaded
const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
let image = document.getElementById(`23`);

function modelLoaded() {
  console.log("Model Loaded!");
  if (image === null) {
    image = document.getElementById(`23`); //oyvey
  }
}

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubs());
  }, []);
  return (
    <div class="main">
      <h1>Welcome to PictionAI</h1>
      <div class="about">
        <p>
          Submit your sketch of a given task and receive a score from
          PictionAI's super algorithm{" "}
        </p>
        <p>Today's task is: SOCCER BALL</p>
      </div>
      <Cloudinary />
    </div>
  );
}
