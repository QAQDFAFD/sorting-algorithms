import { clone } from './utils'

export const buildSelectionSteps = (origin) => {
  const arr = clone(origin)
  const steps = []
  const sortedSet = new Set()

  const addStep = (active = [], message = '') => {
    steps.push({
      array: clone(arr),
      active,
      sorted: Array.from(sortedSet),
      message,
    })
  }

  addStep([], '初始数组，准备开始选择排序。')

  for (let i = 0; i < arr.length; i += 1) {
    let minIndex = i
    addStep([i], `从索引 ${i} 开始找最小值。`)

    for (let j = i + 1; j < arr.length; j += 1) {
      addStep([minIndex, j], `比较当前最小值索引 ${minIndex} 与索引 ${j}。`)
      if (arr[j] < arr[minIndex]) {
        minIndex = j
        addStep([i, minIndex], `发现更小值，更新最小值索引为 ${minIndex}。`)
      }
    }

    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
      addStep([i, minIndex], `交换索引 ${i} 与 ${minIndex}。`)
    }

    sortedSet.add(i)
    addStep([i], `索引 ${i} 位置确定。`)
  }

  addStep([], '排序完成。')
  return steps
}
