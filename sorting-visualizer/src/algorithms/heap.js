import { clone } from './utils'

export const buildHeapSteps = (origin) => {
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

  addStep([], '初始数组，开始堆排序。')

  const siftDown = (start, end) => {
    let root = start

    while (root * 2 + 1 <= end) {
      let child = root * 2 + 1
      let swap = root

      addStep([root, child], `比较父节点 ${root} 与左子节点 ${child}。`)
      if (arr[swap] < arr[child]) swap = child

      if (child + 1 <= end) {
        addStep([swap, child + 1], `比较当前最大候选与右子节点 ${child + 1}。`)
        if (arr[swap] < arr[child + 1]) swap = child + 1
      }

      if (swap === root) return

      ;[arr[root], arr[swap]] = [arr[swap], arr[root]]
      addStep([root, swap], `交换索引 ${root} 与 ${swap}，维持大顶堆。`)
      root = swap
      child = root * 2 + 1
    }
  }

  for (let start = Math.floor((arr.length - 2) / 2); start >= 0; start -= 1) {
    siftDown(start, arr.length - 1)
  }

  addStep([], '大顶堆构建完成。')

  for (let end = arr.length - 1; end > 0; end -= 1) {
    ;[arr[0], arr[end]] = [arr[end], arr[0]]
    sortedSet.add(end)
    addStep([0, end], `将当前最大值放到索引 ${end}。`)
    siftDown(0, end - 1)
  }

  sortedSet.add(0)
  addStep([], '排序完成。')
  return steps
}
