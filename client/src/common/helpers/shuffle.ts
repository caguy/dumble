export default function shuffle<T>(arr: T[]) {
  const poolArray = [...arr];
  const suffledArray: typeof arr = [];

  while (poolArray.length > 0) {
    const pickedIndex = Math.floor(Math.random() * poolArray.length);
    suffledArray.push(poolArray.splice(pickedIndex, 1)[0]);
  }

  return suffledArray;
}
