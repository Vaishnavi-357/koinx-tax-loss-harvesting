// src/components/HoldingsTable.jsx
// ─────────────────────────────────────────────────────────────────
// The main interactive table where users select assets to harvest.
//
// Props:
//   holdings        – array of asset objects to display
//   selectedIds     – Set of currently selected asset IDs
//   onToggle        – (id) => void — called when a checkbox changes
//   showGainsAssets – boolean toggle state
//   onToggleGains   – () => void — flip the showGainsAssets toggle
//   onSelectAll     – () => void
//   onClearAll      – () => void
//   selectedCount   – number of currently selected assets
// ─────────────────────────────────────────────────────────────────

import { formatUSD, formatGainLoss, isHarvestable, getHarvestableAmount }
  from '../utils/taxCalculations'

// ── Sub-component: coin avatar ────────────────────────────────────
function CoinAvatar({ name, symbol, color, bgColor }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
        style={{ backgroundColor: bgColor, color }}
      >
        {symbol.slice(0, 2)}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 leading-none">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{symbol}</p>
      </div>
    </div>
  )
}

// ── Sub-component: gain/loss cell ─────────────────────────────────
function GainCell({ value }) {
  if (value === 0) return <span className="text-gray-400 text-sm">—</span>
  const isPositive = value > 0
  return (
    <span className={`text-sm font-medium ${isPositive ? 'text-red-500' : 'text-green-600'}`}>
      {formatGainLoss(value)}
    </span>
  )
}

// ── Sub-component: toggle switch ──────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          onClick={onChange}
          className={`w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer
            ${checked ? 'bg-blue-500' : 'bg-gray-200'}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow
              transition-transform duration-200
              ${checked ? 'translate-x-4' : 'translate-x-0'}`}
          />
        </div>
      </div>
    </label>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function HoldingsTable({
  holdings,
  selectedIds,
  onToggle,
  showGainsAssets,
  onToggleGains,
  onSelectAll,
  onClearAll,
  selectedCount,
}) {
  const columns = [
    { key: 'checkbox',        label: '',                    className: 'w-10' },
    { key: 'asset',           label: 'Asset',               className: 'min-w-[160px]' },
    { key: 'currentPrice',    label: 'Current price',       className: 'text-right' },
    { key: 'totalHolding',    label: 'Total holding ($)',   className: 'text-right' },
    { key: 'avgBuyPrice',     label: 'Avg buy price',       className: 'text-right' },
    { key: 'stGainLoss',      label: 'Short-term G/L',      className: 'text-right' },
    { key: 'ltGainLoss',      label: 'Long-term G/L',       className: 'text-right' },
    { key: 'amountToHarvest', label: 'Amount to harvest',   className: 'text-right' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

      {/* Table toolbar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50 flex-wrap gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Holdings</h2>
          {selectedCount > 0 && (
            <p className="text-xs text-blue-600 mt-0.5">
              {selectedCount} asset{selectedCount > 1 ? 's' : ''} selected for harvesting
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Quick actions */}
          <button
            onClick={onSelectAll}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Select all losses
          </button>
          {selectedCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
            >
              Clear selection
            </button>
          )}
          {/* Toggle */}
          <Toggle
            checked={showGainsAssets}
            onChange={onToggleGains}
            label="Show assets with gains"
          />
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold text-gray-500
                    uppercase tracking-wider whitespace-nowrap ${col.className}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {holdings.map((asset) => {
              const isSelected  = selectedIds.has(asset.id)
              const canHarvest  = isHarvestable(asset)
              const harvestAmt  = getHarvestableAmount(asset)
              const holdingValue = asset.currentPrice * asset.totalHolding

              return (
                <tr
                  key={asset.id}
                  onClick={() => canHarvest && onToggle(asset.id)}
                  className={`transition-colors duration-100
                    ${canHarvest ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                    ${isSelected ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!canHarvest}
                      onChange={() => onToggle(asset.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </td>

                  {/* Asset name + icon */}
                  <td className="px-4 py-3.5">
                    <CoinAvatar
                      name={asset.name}
                      symbol={asset.symbol}
                      color={asset.color}
                      bgColor={asset.bgColor}
                    />
                  </td>

                  {/* Current price */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-gray-700">{formatUSD(asset.currentPrice)}</span>
                  </td>

                  {/* Total holding value */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-gray-700">{formatUSD(holdingValue)}</span>
                  </td>

                  {/* Avg buy price */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-gray-700">{formatUSD(asset.avgBuyPrice)}</span>
                  </td>

                  {/* Short-term gain/loss */}
                  <td className="px-4 py-3.5 text-right">
                    <GainCell value={asset.stGainLoss} />
                  </td>

                  {/* Long-term gain/loss */}
                  <td className="px-4 py-3.5 text-right">
                    <GainCell value={asset.ltGainLoss} />
                  </td>

                  {/* Harvestable amount badge */}
                  <td className="px-4 py-3.5 text-right">
                    {canHarvest ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full
                        text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                        {formatGainLoss(harvestAmt)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full
                        text-xs font-medium bg-gray-100 text-gray-400">
                        No loss
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Empty state */}
        {holdings.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-400">
            No assets to display. Toggle "Show assets with gains" to see all holdings.
          </div>
        )}
      </div>
    </div>
  )
}
