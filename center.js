export function centerBoard(row, column) {
  if (row !== undefined && column !== undefined) {
    let centerX = parseInt(row / 2);
    let centerY = parseInt(column / 2);
    return { centerX, centerY };
  }
}
