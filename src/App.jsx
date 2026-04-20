// src/App.jsx
// ─────────────────────────────────────────────────────────────────
// Root component. Composes the full page layout.
//
// Responsibilities:
//   • Calls useHarvesting() to get all state and actions
//   • Passes data/callbacks down to child components as props
//   • Owns page-level layout (padding, max-width, grid)
//
// This component has ZERO business logic — all logic lives in
// useHarvesting() and the utility functions.
// ─────────────────────────────────────────────────────────────────

import Navbar          from './components/Navbar'
import InfoBanner      from './components/InfoBanner'
import CapitalGainsCard from './components/CapitalGainsCard'
import HoldingsTable   from './components/HoldingsTable'
import { useHarvesting } from './hooks/useHarvesting'
import { formatUSD }   from './utils/taxCalculations'

export default function App() {
  const {
    preHarvestingGains,
    visibleHoldings,
    selectedIds,
    postHarvestGains,
    selectedCount,
    toggleAsset,
    selectAll,
    clearAll,
    showGainsAssets,
    setShowGainsAssets,
  } = useHarvesting()

  const preTotalGains = preHarvestingGains.shortTerm + preHarvestingGains.longTerm

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Tax Loss Harvesting</h1>
          <p className="text-sm text-gray-500 mt-1">
            Optimise your crypto tax liability by identifying tax-saving opportunities
          </p>
        </div>

        {/* Info banner */}
        <InfoBanner />

        {/* ── Section: Pre / Post harvesting cards ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          {/* Pre-harvesting — left card */}
          <CapitalGainsCard
            title="Pre-Harvesting Capital Gains"
            shortTerm={preHarvestingGains.shortTerm}
            longTerm={preHarvestingGains.longTerm}
          />

          {/* Post-harvesting — right card, updates live */}
          <CapitalGainsCard
            title="After Harvesting"
            shortTerm={postHarvestGains.shortTerm}
            longTerm={postHarvestGains.longTerm}
            savings={postHarvestGains.savings}
            highlight={postHarvestGains.savings > 0}
          />
        </div>

        {/* ── Section: savings summary strip ──────────────────────── */}
        {postHarvestGains.savings > 0 && (
          <div className="mb-6 px-5 py-4 bg-green-50 border border-green-100 rounded-xl
            flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="#16A34A" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Effective Tax Saving: {formatUSD(postHarvestGains.savings)}
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  Based on {selectedCount} selected asset{selectedCount > 1 ? 's' : ''}.
                  Taxable gains reduced from {formatUSD(preTotalGains)} to{' '}
                  {formatUSD(postHarvestGains.total)}.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-500">Reduction</p>
              <p className="text-lg font-bold text-green-700">
                {preTotalGains > 0
                  ? `${Math.round((postHarvestGains.savings / preTotalGains) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        )}

        {/* ── Section: Holdings table ──────────────────────────────── */}
        <HoldingsTable
          holdings={visibleHoldings}
          selectedIds={selectedIds}
          onToggle={toggleAsset}
          showGainsAssets={showGainsAssets}
          onToggleGains={() => setShowGainsAssets((v) => !v)}
          onSelectAll={selectAll}
          onClearAll={clearAll}
          selectedCount={selectedCount}
        />

        {/* ── Footer disclaimer ────────────────────────────────────── */}
        <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
          * This tool is for informational purposes only and does not constitute
          financial or tax advice. Always consult a qualified tax professional.
        </p>

      </main>
    </div>
  )
}
