import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectSubmissions } from "../../store/submissions/selectors";
import { selectChallenges } from "../../store/challenges/selectors";
import Select from "react-select";
export default function Galery() {
  const submissions = useSelector(selectSubmissions);
  const [filteredData, setFilteredData] = useState([]);
  let result = [...submissions];
  const challenges = useSelector(selectChallenges);
  const taskOption = challenges.map((ch, i) => {
    return { value: i, label: ch.name };
  });
  function handleChange(e) {
    let value = e.label;
    let result = [];
    console.log(value);

    result = submissions.filter((sub) => {
      return sub.challenge.name === value;
    });
    setFilteredData(result);
  }
  return (
    <div>
      {
        <div style={{ marginTop: "1vw", textAlign: "center" }}>
          <Select
            options={taskOption ? taskOption : null}
            onChange={handleChange}
          />
        </div>
      }
      {filteredData
        ? filteredData.map((sub, i) => (
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
                alt="yes"
                src={sub.imageUrl}
              ></img>
              <p>Name: Marijan</p>
              <p>
                Task: {sub.challenge.name} | | | Score:{Math.round(sub.score)}
              </p>
            </div>
          ))
        : null}
    </div>
  );
}
