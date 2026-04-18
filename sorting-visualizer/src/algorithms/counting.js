import { clone } from './utils'

export const buildCountingSteps = (origin) => {
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

  const minValue = Math.min(...arr)
  const maxValue = Math.max(...arr)
  const counts = Array(maxValue - minValue + 1).fill(0)

  addStep([], [], `初始数组，计数范围 [${minValue}, ${maxValue}]。`)

  for (let i = 0; i < arr.length; i += 1) {
    counts[arr[i] - minValue] += 1
    addStep([i], [], `统计值 ${arr[i]} 的出现次数。`)
  }

  let writeIndex = 0
  for (let value = minValue; value <= maxValue; value += 1) {
    while (counts[value - minValue] > 0) {
      arr[writeIndex] = value
      addStep(
        [writeIndex],
        Array.from({ length: writeIndex + 1 }, (_, idx) => idx),
        `按计数写回值 ${value} 到索引 ${writeIndex}。`,
      )
      writeIndex += 1
      counts[value - minValue] -= 1
    }
  }

  addStep([], Array.from({ length: arr.length }, (_, idx) => idx), '排序完成。')
  return steps
}
