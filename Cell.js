import React, { useState } from "react";
import "./Cell.css";
function Cell({ item }) {
  return (
    <div
      className={`cell ${item === "C" && "center"} ${item === "G" && "green"}`}
    >
      {item === "C" ? "C" : "G"}
    </div>
  );
}

export default Cell;
