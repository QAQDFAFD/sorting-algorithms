import { clone } from './utils'

export const buildRadixSteps = (origin) => {
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

  addStep([], [], '初始数组，开始基数排序（LSD）。')

  const maxValue = Math.max(...arr)
  for (let exp = 1; Math.floor(maxValue / exp) > 0; exp *= 10) {
    const output = Array(arr.length).fill(0)
    const counts = Array(10).fill(0)
    addStep([], [], `按位权 ${exp} 进行一轮稳定计数。`)

    for (let i = 0; i < arr.length; i += 1) {
      const digit = Math.floor(arr[i] / exp) % 10
      counts[digit] += 1
      addStep([i], [], `读取值 ${arr[i]} 的当前位数字 ${digit}。`)
    }

    for (let i = 1; i < 10; i += 1) {
      counts[i] += counts[i - 1]
    }

    for (let i = arr.length - 1; i >= 0; i -= 1) {
      const digit = Math.floor(arr[i] / exp) % 10
      output[counts[digit] - 1] = arr[i]
      counts[digit] -= 1
    }

    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = output[i]
      addStep([i], [], `按当前位重排后写回索引 ${i}。`)
    }
  }

  addStep([], Array.from({ length: arr.length }, (_, idx) => idx), '排序完成。')
  return steps
}
