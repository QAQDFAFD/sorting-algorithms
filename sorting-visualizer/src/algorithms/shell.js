import { clone } from './utils'

export const buildShellSteps = (origin) => {
  const arr = clone(origin)
  const steps = []

  const addStep = (active = [], sorted = [], message = '') => {
    steps.push({
      array: clone(arr),
      active,
      sorted,
      message,
    })
  }

  addStep([], [], '初始数组，开始希尔排序。')

  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    addStep([], [], `当前增量 gap = ${gap}。`)

    for (let i = gap; i < arr.length; i += 1) {
      const temp = arr[i]
      let j = i
      addStep([i], [], `取出索引 ${i} 的值 ${temp}，进行 gap 插入。`)

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        addStep([j - gap, j], [], `元素 ${arr[j]} 后移到索引 ${j}。`)
        j -= gap
      }

      arr[j] = temp
      addStep([j], [], `将 ${temp} 放入索引 ${j}。`)
    }
  }

  addStep([], Array.from({ length: arr.length }, (_, idx) => idx), '排序完成。')
  return steps
}
