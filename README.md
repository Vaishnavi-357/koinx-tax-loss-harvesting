# KoinX — Tax Loss Harvesting Tool


## SetUp

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

## Working

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

---

## Real API

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

---

## 🚢 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```


