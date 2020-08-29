import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { centerBoard } from "./center";

function Board(props) {
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  let [totalMoves, setTotalMoves] = useState(0);
  // const [arrays, setAarray] = useState([]);
  let multiArr = [];
  let visited = [];
  var green = 0;
  var moveCount = 0;

  if (rows !== undefined && columns !== undefined) {
    let count = 0;
    for (let j = 0; j < rows; j++) {
      let arr = [];
      let visit = [];
      for (let i = 0; i < columns; i++) {
        arr[i] = count++;
        visit[i] = false;
      }
      arr.push("br");
      multiArr.push(arr);
      visited.push(visit);
    }
    console.log(multiArr);
    placeCenter();
    greenBox();
  }
  function placeCenter() {
    if (rows > 0 && columns >= 0) {
      let { centerX, centerY } = centerBoard(rows, columns);
      multiArr[centerX][centerY] = "C";
    }
  }

  function greenBox() {
    var rowArr = [];
    var colArr = [];
    for (let i = 0; i < rows; i++) {
      rowArr.push(i);
    }
    for (let i = 0; i < columns; i++) {
      colArr.push(i);
    }
    while (rowArr?.length > 0) {
      var rowIndex = Math.floor(Math.random() * (rowArr.length - 1));
      var colIndex = Math.floor(Math.random() * (colArr.length - 1));
      var row = rowArr[rowIndex];
      var col = colArr[colIndex];

      if (multiArr[row][col] !== "C") {
        multiArr[row][col] = "G";
        green = green + 1;
      } else {
        multiArr[row][col] = "C";
      }
      rowArr.splice(rowIndex, 1);
      colArr.splice(colIndex, 1);
    }
    console.log("Green Count:", green);
  }
  function startRun() {
    if (rows !== undefined && columns !== undefined)
      move(parseInt(rows / 2), parseInt(columns / 2));
  }

  function move(row, col) {
    console.log("green is " + green);
    if (
      row < rows &&
      row >= 0 &&
      col >= 0 &&
      col < columns &&
      !visited[row][col] &&
      green > 0
    ) {
      console.log("totalMoves", totalMoves);
      setTotalMoves(++moveCount - 1);
      visited[row][col] = true;
      console.log("Row is " + row, "Col is " + col);

      if (multiArr[row][col] === "G") {
        green = green - 1;
      }
      // multiArr[row][col] = "C";

      move(row + 1, col);
      move(row, col + 1);
      move(row - 1, col);
      move(row, col - 1);
    }
    return;
  }

  return (
    <div className="board ">
      <div className="inputs">
        <input
          type="text"
          name="rows"
          onChange={(e) => setRows(e.target.value)}
          placeholder="Set Rows"
        />
        <input
          type="text"
          name="columns"
          onChange={(e) => setColumns(e.target.value)}
          placeholder="Set Columns"
        />

        <button onClick={() => startRun()}>Start Game</button>
      </div>
      <div>totalMoves:{totalMoves}</div>
      {multiArr.map((array) =>
        array.map((item) =>
          item === "br" ? <br key={item} /> : <Cell key={item} item={item} />
        )
      )}
    </div>
  );
}

export default Board;
