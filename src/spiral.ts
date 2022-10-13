type Array2D = number[][];

export default function spiral(arr: Array2D): number[] {
  if (arr.length === 0 || arr[0].length === 0) {
    return [];
  }

  const resultLength = arr.length * arr[0].length;
  const copiedArr: Array2D | null[][] = arr.map((row) => [...row]);
  const result: number[] = [];

  function moveRight(curRow: number, curCol: number): number {
    const row = curRow;
    let col = curCol;
    while (copiedArr[row][col] != null) {
      result.push(copiedArr[row][col] as number);
      copiedArr[row][col] = null;
      col++;
    }
    return col - 1;
  }

  function moveLeft(curRow: number, curCol: number): number {
    const row = curRow;
    let col = curCol;
    while (copiedArr[row][col] != null) {
      result.push(copiedArr[row][col] as number);
      copiedArr[row][col] = null;
      col--;
    }
    return col + 1;
  }

  function moveDown(curRow: number, curCol: number): number {
    let row = curRow;
    const col = curCol;
    while (copiedArr[row]?.[col] != null) {
      result.push(copiedArr[row][col] as number);
      copiedArr[row][col] = null;
      row--;
    }
    return row + 1;
  }

  function moveUp(curRow: number, curCol: number): number {
    let row = curRow;
    const col = curCol;
    while (copiedArr[row]?.[col] != null) {
      result.push(copiedArr[row][col] as number);
      copiedArr[row][col] = null;
      row++;
    }
    return row - 1;
  }

  let curRow = 0;
  let curCol = -1;
  while (result.length < resultLength) {
    curCol = moveRight(curRow, curCol + 1);
    curRow = moveUp(curRow + 1, curCol);
    curCol = moveLeft(curRow, curCol - 1);
    curRow = moveDown(curRow - 1, curCol);
  }

  return result;
}
