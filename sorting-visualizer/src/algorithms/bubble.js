import { clone } from './utils'

export const buildBubbleSteps = (origin) => {
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

  addStep([], '初始数组，准备开始冒泡排序。')

  for (let end = arr.length - 1; end > 0; end -= 1) {
    for (let i = 0; i < end; i += 1) {
      addStep([i, i + 1], `比较索引 ${i} 与 ${i + 1}。`)
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        addStep([i, i + 1], `发生交换：${arr[i]} 与 ${arr[i + 1]}。`)
      }
    }
    sortedSet.add(end)
    addStep([end], `第 ${arr.length - end} 轮结束，索引 ${end} 已归位。`)
  }

  sortedSet.add(0)
  addStep([], '排序完成。')

  return steps
}
