# KoinX — Tax Loss Harvesting Tool

A production-grade React frontend for the [KoinX Frontend Assignment](https://koinx.notion.site/KoinX-Tax-Loss-Harvesting-Assignment-1eeda378a243800b96fcd67178aa77dd).

> **Live Demo:** [Deploy to Vercel/Netlify after cloning]

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/koinx-tax-loss-harvesting.git
cd koinx-tax-loss-harvesting

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for production
```bash
npm run build       # outputs to /dist
npm run preview     # preview the built app locally
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   ├── InfoBanner.jsx       # Dismissible info banner explaining the feature
│   ├── CapitalGainsCard.jsx # Reusable summary card (pre & post harvesting)
│   └── HoldingsTable.jsx    # Main interactive table with checkboxes
│
├── data/
│   └── holdings.js          # Mock portfolio data + pre-harvesting gains
│
├── hooks/
│   └── useHarvesting.js     # Custom hook — all state & business logic
│
├── utils/
│   └── taxCalculations.js   # Pure functions: formatting + tax math
│
├── App.jsx                  # Root component — layout orchestrator
├── main.jsx                 # ReactDOM.createRoot entry point
└── index.css                # Tailwind directives + global styles
```

---

## 🧠 How It Works — Feature Explanation

### What is Tax Loss Harvesting?

Tax Loss Harvesting is a strategy where you **sell underperforming crypto assets** (currently at a loss) to generate a **realized capital loss**. That realized loss then **offsets your existing capital gains**, reducing your total taxable income.

```
Tax Bill = (Capital Gains - Capital Losses) × Tax Rate
```

### The Tool in 3 Steps

| Step | What happens |
|------|-------------|
| **1. See your current tax liability** | The "Pre-Harvesting" card shows already-realized gains from trades closed this year |
| **2. Select assets with unrealized losses** | Check any asset in the Holdings table that's currently below your buy price |
| **3. See your savings** | The "After Harvesting" card recalculates in real time — showing reduced taxable gains |

### Short-Term vs Long-Term

- **Short-term gains** — assets held < 1 year → taxed at ordinary income rate (10–37%)
- **Long-term gains** — assets held > 1 year → taxed at preferential rate (0–20%)

Short-term losses first offset short-term gains (higher tax rate = bigger saving). Long-term losses offset long-term gains.

---

## 🏗️ Architecture Decisions

### 1. Separation of Concerns

| Layer | File | Responsibility |
|-------|------|---------------|
| **Data** | `data/holdings.js` | Static mock data (replace with API call) |
| **Logic** | `utils/taxCalculations.js` | Pure functions, easily unit-tested |
| **State** | `hooks/useHarvesting.js` | All React state in one place |
| **UI** | `components/*.jsx` | Presentational, receive props only |
| **Composition** | `App.jsx` | Wires everything together |

### 2. Custom Hook Pattern

`useHarvesting` encapsulates all stateful logic. This means:
- Components are thin and easy to read
- Logic can be tested without rendering
- Swapping mock data for a real API only changes the hook

### 3. Derived State with `useMemo`

Rather than storing computed values in state (which can get out of sync), we derive them from the source of truth:

```js
// Source of truth
const [selectedIds, setSelectedIds] = useState(new Set())

// Derived — always in sync
const selectedAssets = useMemo(() =>
  holdingsData.filter(a => selectedIds.has(a.id)),
  [selectedIds]
)
```

### 4. Pure Utility Functions

All tax math lives in `taxCalculations.js` as pure functions:

```js
// Input: pre-harvest gains + selected assets
// Output: { shortTerm, longTerm, total, savings }
export function calculatePostHarvestGains(preGains, selectedAssets) { ... }
```

Pure functions have no side effects and are trivially testable.

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool (fast HMR, optimised builds) |
| **Tailwind CSS 3** | Utility-first styling |
| **DM Sans** | Typography (Google Fonts) |

---

## 🔌 Connecting to a Real API

Currently the app uses static mock data. To connect a real API:

1. Open `src/hooks/useHarvesting.js`
2. Replace the import from `../data/holdings` with a `useEffect` + `fetch`:

```js
// Before (mock):
import { holdingsData, preHarvestingGains } from '../data/holdings'

// After (real API):
const [holdings, setHoldings] = useState([])
const [preGains, setPreGains] = useState({ shortTerm: 0, longTerm: 0 })

useEffect(() => {
  fetch('/api/portfolio/holdings')
    .then(r => r.json())
    .then(data => {
      setHoldings(data.holdings)
      setPreGains(data.preHarvestingGains)
    })
}, [])
```

No other files need to change.

---

## 🚢 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag /dist folder to Netlify dashboard
# Or: netlify deploy --prod --dir=dist
```

---

## 📄 License

MIT — free to use for learning and assignment submission.
