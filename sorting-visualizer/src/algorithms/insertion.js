import { clone } from './utils'

export const buildInsertionSteps = (origin) => {
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

  addStep([], [0], '初始数组，插入排序从第二个元素开始。')

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i]
    let j = i - 1

    addStep([i], Array.from({ length: i }, (_, idx) => idx), `取出值 ${key} 作为待插入元素。`)

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      addStep([j, j + 1], Array.from({ length: i }, (_, idx) => idx), `元素 ${arr[j]} 向右移动。`)
      j -= 1
    }

    arr[j + 1] = key
    addStep([j + 1], Array.from({ length: i + 1 }, (_, idx) => idx), `将 ${key} 插入到索引 ${j + 1}。`)
  }

  addStep([], Array.from({ length: arr.length }, (_, idx) => idx), '排序完成。')
  return steps
}
