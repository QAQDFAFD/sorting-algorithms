import { useEffect, useMemo, useState } from 'react'
import { algorithmMeta } from '../data/algorithmMeta'

const SPEED_MIN = 90
const SPEED_MAX = 800

export function useSortingPlayer(algorithm, sourceArray) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(280)

  const currentMeta = algorithmMeta[algorithm]
  const steps = useMemo(() => currentMeta.stepBuilder(sourceArray), [currentMeta, sourceArray])

  const safeIndex = Math.min(stepIndex, steps.length - 1)
  const currentStep = steps[safeIndex] ?? {
    array: sourceArray,
    active: [],
    sorted: [],
    message: '等待生成排序步骤。',
  }

  const isFirstStep = safeIndex === 0
  const isLastStep = safeIndex >= steps.length - 1
  const progress = ((safeIndex + 1) / steps.length) * 100
  const maxValue = Math.max(...currentStep.array)

  useEffect(() => {
    setStepIndex(0) // eslint-disable-line react-hooks/set-state-in-effect -- reset on input change is intentional
    setIsPlaying(false)
  }, [algorithm, sourceArray])

  useEffect(() => {
    if (!isPlaying || safeIndex >= steps.length - 1) {
      if (isPlaying && safeIndex >= steps.length - 1) {
        setIsPlaying(false) // eslint-disable-line react-hooks/set-state-in-effect -- stop at end
      }
      return undefined
    }

    const delay = SPEED_MIN + SPEED_MAX - speed
    const timer = window.setTimeout(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isPlaying, safeIndex, speed, steps.length])

  const toggle = () => setIsPlaying((v) => !v)
  const prev = () => setStepIndex((s) => Math.max(0, s - 1))
  const next = () => setStepIndex((s) => Math.min(steps.length - 1, s + 1))
  const reset = () => setStepIndex(0)

  return {
    steps,
    currentStep,
    currentMeta,
    safeIndex,
    isFirstStep,
    isLastStep,
    isPlaying,
    progress,
    maxValue,
    speed,
    speedMin: SPEED_MIN,
    speedMax: SPEED_MAX,
    setSpeed,
    toggle,
    prev,
    next,
    reset,
  }
}
