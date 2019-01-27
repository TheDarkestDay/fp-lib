export function flatten(arrayLike: any[]): any[] {
  const list = Array.from(arrayLike);
  const result = [];
  const stack = [list];
  const indexes = [0];
  let currentIndex = indexes[0];
  let currentElem;
  let currentArray;

  while (stack[stack.length - 1]) {
    currentArray = stack[stack.length - 1];

    if (currentArray.length === 0) {
      while (currentArray && currentIndex === currentArray.length) {
        indexes.pop();
        stack.pop();

        currentIndex = ++indexes[indexes.length - 1];
        currentArray = stack[stack.length - 1];
      }
    } else {
      currentElem = currentArray[currentIndex];

      if (typeof currentElem === 'object') {
        currentElem = Array.from(currentElem);
      }

      if (!Array.isArray(currentElem)) {
        currentIndex = ++indexes[indexes.length - 1];
        result.push(currentElem);

        while (currentArray && currentIndex === currentArray.length) {
          indexes.pop();
          stack.pop();

          currentIndex = ++indexes[indexes.length - 1];
          currentArray = stack[stack.length - 1];
        }
      } else {
        stack.push(currentElem);
        indexes.push(0);
        currentIndex = 0;
      }
    }
  }

  return result;
}