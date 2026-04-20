// src/components/CapitalGainsCard.jsx
// ─────────────────────────────────────────────────────────────────
// Reusable card that shows a capital gains summary (pre or post).
//
// Props:
//   title       – card heading string
//   shortTerm   – short-term gain amount (number)
//   longTerm    – long-term  gain amount (number)
//   savings     – optional savings amount shown in green (post-harvest only)
//   highlight   – if true, shows a blue left border accent
// ─────────────────────────────────────────────────────────────────

import { formatUSD } from '../utils/taxCalculations'

function GainRow({ label, value, isReduced }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${isReduced ? 'text-green-600' : 'text-red-500'}`}>
        {formatUSD(value)}
      </span>
    </div>
  )
}

export default function CapitalGainsCard({ title, shortTerm, longTerm, savings, highlight }) {
  const total = shortTerm + longTerm

  return (
    <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden
      ${highlight ? 'border-l-4 border-l-blue-500' : ''}`}>

      {/* Card header */}
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>

      {/* Rows */}
      <div className="px-5 py-2">
        <GainRow label="Short-term gains" value={shortTerm} isReduced={false} />
        <GainRow label="Long-term gains"  value={longTerm}  isReduced={false} />
      </div>

      {/* Total footer */}
      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Total capital gains</span>
        <span className="text-sm font-bold text-red-500">{formatUSD(total)}</span>
      </div>

      {/* Savings badge — only shown on the post-harvest card */}
      {savings > 0 && (
        <div className="px-5 py-3 bg-green-50 border-t border-green-100 flex items-center gap-2">
          <span className="text-xs text-green-700 font-medium">
            ✓ You are saving {formatUSD(savings)} in taxes
          </span>
        </div>
      )}
    </div>
  )
}
