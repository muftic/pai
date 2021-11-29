import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectSubmissions } from "../../store/submissions/selectors";
export default function Galery() {
  const submissions = useSelector(selectSubmissions);
  console.log(submissions);
  return <div></div>;
}
