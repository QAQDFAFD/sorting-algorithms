import { useEffect, useState } from 'react'

const ARRAY_SIZE = 22
const MIN_VALUE = 10
const MAX_VALUE = 120

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const createRandomArray = (size = ARRAY_SIZE) =>
  Array.from({ length: size }, () => randomInt(MIN_VALUE, MAX_VALUE))

export function useArrayInput() {
  const [sourceArray, setSourceArray] = useState(() => createRandomArray())
  const [customArrayText, setCustomArrayText] = useState('')
  const [randomLengthText, setRandomLengthText] = useState(String(ARRAY_SIZE))
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    setCustomArrayText(sourceArray.join(', '))
    setRandomLengthText(String(sourceArray.length))
  }, [sourceArray])

  const handleApplyCustomArray = () => {
    const parts = customArrayText
      .split(/[\s,，]+/)
      .map((item) => item.trim())
      .filter(Boolean)

    if (parts.length < 2 || parts.length > 80) {
      setInputError('请输入 2 到 80 个整数。')
      return
    }

    const values = parts.map((item) => Number(item))
    const hasInvalid = values.some(
      (value) => !Number.isInteger(value) || value < 1 || value > 999,
    )

    if (hasInvalid) {
      setInputError('只支持 1 到 999 的正整数，且用逗号或空格分隔。')
      return
    }

    setInputError('')
    setSourceArray(values)
  }

  const handleRandomByLength = () => {
    const parsedLength = Number.parseInt(randomLengthText, 10)
    const nextLength = Math.min(
      80,
      Math.max(2, Number.isNaN(parsedLength) ? ARRAY_SIZE : parsedLength),
    )
    setRandomLengthText(String(nextLength))
    setInputError('')
    setSourceArray(createRandomArray(nextLength))
  }

  return {
    sourceArray,
    customArrayText,
    setCustomArrayText,
    randomLengthText,
    setRandomLengthText,
    inputError,
    handleApplyCustomArray,
    handleRandomByLength,
  }
}
