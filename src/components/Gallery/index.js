import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useState } from "react";
import { selectSubmissions } from "../../store/submissions/selectors";
export default function Galery() {
  const submissions = useSelector(selectSubmissions);
  console.log(submissions);
  return (
    <div>
      {submissions.map((sub, i) => (
        <div
          style={{
            marginTop: "3vw",
            marginLeft: "2vw",
            marginRight: "1vw",
            display: "inline-block",
            height: "20vw",
            width: "30vw",
            backgroundColor: "teal",
            border: "1px solid black",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            style={{
              textAlign: "center",
              alignItems: "cente",
              height: "15vw",
              width: "15vw",
            }}
            src={sub.imageUrl}
          ></img>
          <p>Name: Marijan</p>
          <p>Task: Soccer ball | | | Score:{Math.round(sub.score)}</p>
        </div>
      ))}
    </div>
  );
}
