import { clone } from './utils'

export const buildMergeSteps = (origin) => {
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

  addStep([], [], '初始数组，开始归并排序（分治）。')

  const merge = (left, mid, right) => {
    const leftPart = arr.slice(left, mid + 1)
    const rightPart = arr.slice(mid + 1, right + 1)
    let i = 0
    let j = 0
    let k = left

    addStep(
      Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      [],
      `合并区间 [${left}, ${mid}] 与 [${mid + 1}, ${right}]。`,
    )

    while (i < leftPart.length && j < rightPart.length) {
      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i]
        i += 1
      } else {
        arr[k] = rightPart[j]
        j += 1
      }
      addStep([k], [], `写回索引 ${k}。`)
      k += 1
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i]
      i += 1
      addStep([k], [], `左半部分剩余元素写回索引 ${k}。`)
      k += 1
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j]
      j += 1
      addStep([k], [], `右半部分剩余元素写回索引 ${k}。`)
      k += 1
    }

    addStep(
      Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      `区间 [${left}, ${right}] 已有序。`,
    )
  }

  const sort = (left, right) => {
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    sort(left, mid)
    sort(mid + 1, right)
    merge(left, mid, right)
  }

  sort(0, arr.length - 1)
  addStep([], '排序完成。')

  return steps
}
