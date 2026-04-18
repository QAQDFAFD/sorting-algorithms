import { algorithmCodeExplain } from '../data/algorithmExplain'
import { interviewHotList } from '../data/interviewHotList'

export default function ExplainPanel({ algorithm, currentMeta }) {
  const currentExplain = algorithmCodeExplain[algorithm] ?? []

  return (
    <aside className="panel explain">
      <h3>核心代码</h3>
      <pre>
        <code>{currentMeta.code}</code>
      </pre>

      <h3>代码解释</h3>
      <ul>
        {currentExplain.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>如何理解</h3>
      <ul>
        <li>红色柱：当前正在比较或处理的元素。</li>
        <li>绿色柱：当前位置已经有序或已确认。</li>
        <li>拖动速度滑块，可以更慢地观察细节步骤。</li>
      </ul>

      <h3>面试高频排序算法</h3>
      <ul>
        {interviewHotList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}
