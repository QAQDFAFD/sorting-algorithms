import { clone } from './utils'

export const buildQuickSteps = (origin) => {
  const arr = clone(origin)
  const steps = []
  const fixedSet = new Set()

  const addStep = (active = [], message = '') => {
    steps.push({
      array: clone(arr),
      active,
      sorted: Array.from(fixedSet),
      message,
    })
  }

  addStep([], '初始数组，开始快速排序。')

  const partition = (left, right) => {
    const pivot = arr[right]
    let i = left
    addStep([right], `选择索引 ${right} 的值 ${pivot} 作为基准。`)

    for (let j = left; j < right; j += 1) {
      addStep([j, right], `比较 ${arr[j]} 与基准 ${pivot}。`)
      if (arr[j] < pivot) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        addStep([i, j], `小于基准，交换索引 ${i} 和 ${j}。`)
        i += 1
      }
    }

    ;[arr[i], arr[right]] = [arr[right], arr[i]]
    fixedSet.add(i)
    addStep([i], `基准放到最终位置 ${i}。`)

    return i
  }

  const sort = (left, right) => {
    if (left > right) return
    if (left === right) {
      fixedSet.add(left)
      addStep([left], `单元素区间 [${left}, ${right}] 天然有序。`)
      return
    }

    const pivotIndex = partition(left, right)
    sort(left, pivotIndex - 1)
    sort(pivotIndex + 1, right)
  }

  sort(0, arr.length - 1)
  addStep([], '排序完成。')

  return steps
}
