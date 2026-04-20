// src/components/InfoBanner.jsx
// ─────────────────────────────────────────────────────────────────
// Dismissible informational banner at the top of the page.
// Explains what tax loss harvesting is in plain language.
// ─────────────────────────────────────────────────────────────────

import { useState } from 'react'

export default function InfoBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex gap-4
      items-start mb-6">
      {/* Icon */}
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center
        flex-shrink-0 mt-0.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#3B82F6" strokeWidth="1.5"/>
          <path d="M7 6v4M7 4.5v.5" stroke="#3B82F6" strokeWidth="1.5"
            strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-blue-900 mb-0.5">
          What is Tax Loss Harvesting?
        </p>
        <p className="text-xs text-blue-700 leading-relaxed">
          Tax loss harvesting lets you sell crypto assets that are currently at a loss to
          generate a <strong>realized capital loss</strong>. That loss then offsets your
          existing capital gains — reducing your total taxable income and saving you money.
          Select assets below to simulate the impact on your tax bill.
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="text-blue-400 hover:text-blue-600 transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
