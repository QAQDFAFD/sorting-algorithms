# 排序算法可视化（Sorting Visualizer）

一个基于 React + Vite 的排序算法可视化项目，支持逐帧播放排序过程，并结合核心代码与文字讲解，帮助理解每种算法在“比较、交换、归位”时到底发生了什么。

## 功能特性

- 支持 9 种常见排序算法并可一键切换。
- 柱状图动画逐步展示每一步操作。
- 提供播放、暂停、上一步、下一步、重置、随机数组等控制能力。
- 支持手动输入数组或指定长度随机生成数组。
- 右侧展示当前算法的核心代码、代码解释和面试高频要点。

## 支持算法

- 冒泡排序（Bubble Sort）
- 选择排序（Selection Sort）
- 插入排序（Insertion Sort）
- 归并排序（Merge Sort）
- 快速排序（Quick Sort）
- 希尔排序（Shell Sort）
- 堆排序（Heap Sort）
- 计数排序（Counting Sort）
- 基数排序（Radix Sort）

## 技术栈

- React 19
- Vite 8
- JavaScript (ESM)
- ESLint 9

## 快速开始

```bash
cd sorting-visualizer
npm install
npm run dev
```

默认本地地址通常为：`http://localhost:5173`

## 可用脚本

```bash
npm run dev      # 启动开发环境
npm run build    # 生产构建
npm run preview  # 本地预览构建产物
npm run lint     # 代码检查
```

## 使用说明

1. 在顶部选择排序算法。
2. 在控制区手动输入数组，或设置长度后随机生成数组。
3. 使用播放控制按钮观察每一步排序变化。
4. 拖动速度滑块，按需要放慢或加快动画。
5. 结合右侧“核心代码 + 代码解释”理解当前步骤。

## 输入规则

- 数组元素数量：`2 ~ 80`
- 元素取值范围：`1 ~ 999` 的正整数
- 支持中英文逗号或空格分隔输入

## 项目结构

```text
sorting-visualizer/
├─ src/
│  ├─ algorithms/      # 各排序算法的步骤构建逻辑
│  ├─ components/      # 页面组件（选择器、控制面板、可视化、讲解面板）
│  ├─ data/            # 算法元信息、解释文案、面试高频清单
│  ├─ hooks/           # 播放控制与数组输入逻辑
│  ├─ App.jsx          # 页面编排
│  └─ App.css          # 主样式
├─ public/
├─ index.html
└─ package.json
```

## 扩展说明

如果要新增排序算法，推荐按下面步骤扩展：

1. 在 `src/algorithms/` 新增算法步骤构建函数并在 `index.js` 导出。
2. 在 `src/data/algorithmMeta.js` 注册算法名称、复杂度、简介、示例代码和 `stepBuilder`。
3. 在 `src/data/algorithmExplain.js` 补充对应讲解文案。

---

欢迎继续完善：可加入更多数据规模、稳定性对比、时间统计和复杂度可视化等功能。
