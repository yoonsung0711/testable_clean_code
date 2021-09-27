export const updateThreadedComment = (list: any, stack: any[]) => {
  for (const e of list) {
    const keys = Object.keys(e)
    for (const k of keys) {
      stack.push(k)
      if (e[k].length == 0) {
        const target = [...stack]
        for (let i = target.length - 2; i >= 0; i--) {
          console.log(target[i], target[i + 1])
        }
      }
      updateThreadedComment(e[k], stack)
      stack.pop()
    }
  }
}
