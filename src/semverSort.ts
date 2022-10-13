type ComparingResult = -1 | 0 | 1;

export function equalizeLength(
  arr1: number[],
  arr2: number[]
): [number[], number[]] {
  if (arr1.length === arr2.length) {
    return [arr1, arr2];
  }

  if (arr1.length > arr2.length) {
    const arr2Copied = [...arr2];
    while (arr2Copied.length < arr1.length) {
      arr2Copied.push(0);
    }
    return [arr1, arr2Copied];
  }

  const arr1Copied = [...arr1];
  while (arr1Copied.length < arr2.length) {
    arr1Copied.push(0);
  }
  return [arr1Copied, arr2];
}

export function compareVersions(verA: string, verB: string): ComparingResult {
  if (verA === verB) {
    return 0;
  }

  const splitVer: (ver: string) => number[] = (ver: string) =>
    ver.split(".").map((str) => +str);

  let arrVerA: number[] = splitVer(verA);
  let arrVerB: number[] = splitVer(verB);

  [arrVerA, arrVerB] = equalizeLength(arrVerA, arrVerB);

  for (let i = 0; i < arrVerA.length; i++) {
    if (arrVerA[i] > arrVerB[i]) {
      return 1;
    }
    if (arrVerA[i] < arrVerB[i]) {
      return -1;
    }
  }

  return 0;
}

export function semverSort(arr: string[]): string[] {
  if (arr.length === 0) {
    return [];
  }

  const sortedArr = [...arr];
  sortedArr.sort(compareVersions);

  return sortedArr;
}
