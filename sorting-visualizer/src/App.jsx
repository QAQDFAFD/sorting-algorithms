import { useState } from 'react'
import './App.css'
import { useArrayInput } from './hooks/useArrayInput'
import { useSortingPlayer } from './hooks/useSortingPlayer'
import AlgorithmSelector from './components/AlgorithmSelector'
import SortingVisualizer from './components/SortingVisualizer'
import ControlPanel from './components/ControlPanel'
import ExplainPanel from './components/ExplainPanel'

function App() {
  const [algorithm, setAlgorithm] = useState('bubble')
  const arrayInput = useArrayInput()
  const player = useSortingPlayer(algorithm, arrayInput.sourceArray)

  return (
    <div className="page">
      <header className="hero">
        <p className="hero-tag">算法可视化实验室</p>
        <h1>排序算法：代码 + 动画 + 解释</h1>
        <p className="hero-sub">
          通过逐帧播放每一步变化，直观看懂"比较、交换、归位"到底发生了什么。
        </p>
      </header>

      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />

      <section className="grid">
        <div className="left-column">
          <SortingVisualizer
            currentMeta={player.currentMeta}
            currentStep={player.currentStep}
            maxValue={player.maxValue}
            progress={player.progress}
            safeIndex={player.safeIndex}
            totalSteps={player.steps.length}
          />
          <ControlPanel arrayInput={arrayInput} player={player} />
        </div>
        <ExplainPanel algorithm={algorithm} currentMeta={player.currentMeta} />
      </section>
    </div>
  )
}

export default App
