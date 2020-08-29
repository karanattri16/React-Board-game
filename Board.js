import React, { useState } from "react";
import Cell from "./Cell";
import { centerBoard } from "./center";

function Board(props) {
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  let [totalMoves, setTotalMoves] = useState(0);
  let [greenCell, setGreenCell] = useState(0);
  const [arrays, setArray] = useState([]);
  const [visitedArr, setVisitedArr] = useState();
  //let greenCell = 0;
  function boardSetup() {
    var multiArr = [];
    var visited = [];
    if (
      rows !== undefined &&
      columns !== undefined &&
      rows !== "" &&
      columns !== ""
    ) {
      console.log("Grid is changing");
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
      placeCenter(multiArr);
      greenBox(multiArr);
      setVisitedArr([...visited]);
      setArray([...multiArr]);
    }
  }
  function placeCenter(arr) {
    if (rows > 0 && columns >= 0) {
      let { centerX, centerY } = centerBoard(rows, columns);
      arr[centerX][centerY] = "C";
    }
  }

  function greenBox(arr) {
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

      if (arr[row][col] !== "C") {
        arr[row][col] = "G";
        greenCell = greenCell + 1;
      } else {
        arr[row][col] = "C";
      }
      rowArr.splice(rowIndex, 1);
      colArr.splice(colIndex, 1);
    }
    //console.log(greenCell);
    setGreenCell(greenCell);
    console.log("Green Count:", greenCell);
  }

  function startRun(e) {
    e.preventDefault();
    if (rows !== undefined && columns !== undefined) {
      console.log(arrays);
      move(parseInt(rows / 2), parseInt(columns / 2), arrays);
    }
  }

  function move(row, col, arr) {
    //  console.log("green is " + greenCell);
    if (
      row < rows &&
      row >= 0 &&
      col >= 0 &&
      col < columns &&
      !visitedArr[row][col] &&
      greenCell > 0
    ) {
      //console.log("row is " + row, "col is " + col);
      totalMoves = totalMoves + 1;
      console.log("totalMoves", totalMoves);
      setTotalMoves(totalMoves - 1);
      visitedArr[row][col] = true;
      setVisitedArr([...visitedArr]);
      console.log("Row is " + row, "Col is " + col);

      if (arr[row][col] === "G") {
        greenCell = greenCell - 1;

        //(greenCell);
      }

      move(row + 1, col, arr);
      move(row, col + 1, arr);
      move(row - 1, col, arr);
      move(row, col - 1, arr);
    } else if (greenCell === 0) {
      return;
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

        <button onClick={(e) => startRun(e)}>Start Game</button>
        <button onClick={(e) => boardSetup()}>Board</button>
      </div>
      <div>totalMoves:{totalMoves}</div>
      {arrays.map((array) =>
        array.map((item) =>
          item === "br" ? <br key={item} /> : <Cell key={item} item={item} />
        )
      )}
    </div>
  );
}

export default Board;
