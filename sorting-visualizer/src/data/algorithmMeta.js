import {
  buildBubbleSteps,
  buildSelectionSteps,
  buildInsertionSteps,
  buildMergeSteps,
  buildQuickSteps,
  buildShellSteps,
  buildHeapSteps,
  buildCountingSteps,
  buildRadixSteps,
} from '../algorithms'

export const algorithmMeta = {
  bubble: {
    name: '冒泡排序',
    complexity: '平均 O(n²)，稳定',
    description: '不断比较相邻元素，把较大的值"冒泡"到右侧。实现简单，适合教学入门。',
    code: `function bubbleSort(arr) {
  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
  return arr
}`,
    stepBuilder: buildBubbleSteps,
  },
  selection: {
    name: '选择排序',
    complexity: '平均 O(n²)，不稳定',
    description: '每轮从未排序区间选出最小值，放到当前起始位置。比较次数固定。',
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j
    }
    [arr[i], arr[min]] = [arr[min], arr[i]]
  }
  return arr
}`,
    stepBuilder: buildSelectionSteps,
  },
  insertion: {
    name: '插入排序',
    complexity: '平均 O(n²)，稳定',
    description: '将当前元素插入到左侧已排序子数组的正确位置，近乎有序时性能较好。',
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
  return arr
}`,
    stepBuilder: buildInsertionSteps,
  },
  merge: {
    name: '归并排序',
    complexity: '平均 O(n log n)，稳定',
    description: '分治思想：先递归拆分，再按顺序合并。时间复杂度稳定，适合大数据。',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}`,
    stepBuilder: buildMergeSteps,
  },
  quick: {
    name: '快速排序',
    complexity: '平均 O(n log n)，不稳定',
    description: '通过基准值分区，把小于基准的放左边，大于基准的放右边，再递归处理。',
    code: `function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return arr
  const p = partition(arr, l, r)
  quickSort(arr, l, p - 1)
  quickSort(arr, p + 1, r)
  return arr
}`,
    stepBuilder: buildQuickSteps,
  },
  shell: {
    name: '希尔排序',
    complexity: '平均约 O(n^1.3) 到 O(n²)，不稳定',
    description: '按增量分组做插入排序，先让数组"基本有序"，最后再做小步长排序。',
    code: `function shellSort(arr) {
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i]
      let j = i
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
  }
  return arr
}`,
    stepBuilder: buildShellSteps,
  },
  heap: {
    name: '堆排序',
    complexity: '平均 O(n log n)，不稳定',
    description: '先构建大顶堆，再反复把堆顶最大值换到数组末尾并重建堆。',
    code: `function heapSort(arr) {
  buildMaxHeap(arr)
  for (let end = arr.length - 1; end > 0; end--) {
    ;[arr[0], arr[end]] = [arr[end], arr[0]]
    siftDown(arr, 0, end - 1)
  }
  return arr
}`,
    stepBuilder: buildHeapSteps,
  },
  counting: {
    name: '计数排序',
    complexity: 'O(n + k)，可稳定（前缀和写法）',
    description: '统计每个值出现次数，再按计数写回。适合整数范围不大的场景。',
    code: `function countingSort(arr) {
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const count = Array(max - min + 1).fill(0)
  for (const v of arr) count[v - min]++
  let i = 0
  for (let v = min; v <= max; v++) {
    while (count[v - min]-- > 0) arr[i++] = v
  }
  return arr
}`,
    stepBuilder: buildCountingSteps,
  },
  radix: {
    name: '基数排序',
    complexity: 'O(d * (n + k))，稳定',
    description: '从个位到高位逐位排序，每一位使用稳定计数分配，常用于非负整数。',
    code: `function radixSort(arr) {
  const max = Math.max(...arr)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingByDigit(arr, exp) // 稳定
  }
  return arr
}`,
    stepBuilder: buildRadixSteps,
  },
}
