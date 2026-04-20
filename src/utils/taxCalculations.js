// src/utils/taxCalculations.js
// ─────────────────────────────────────────────────────────────────
// Pure utility functions — no React, no side-effects.
// Easy to unit-test independently.
// ─────────────────────────────────────────────────────────────────

/**
 * Format a number as a USD currency string.
 * e.g.  42000  →  "$42,000"
 *       0.42   →  "$0.42"
 */
export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a gain/loss with a +/- prefix and USD sign.
 * e.g.  -2200  →  "-$2,200"
 *        180   →  "+$180"
 */
export function formatGainLoss(value) {
  const abs = Math.abs(value)
  const prefix = value >= 0 ? '+' : '-'
  return `${prefix}${formatUSD(abs)}`
}

/**
 * Determine if an asset has ANY harvestable (negative) unrealized loss.
 * Only assets at a loss can be used for tax loss harvesting.
 */
export function isHarvestable(asset) {
  return asset.stGainLoss < 0 || asset.ltGainLoss < 0
}

/**
 * Calculate the total unrealized loss that could be harvested from an asset.
 * We only count the negative portions (losses), never the positive (gains).
 *
 * Example:
 *   stGainLoss = -2200, ltGainLoss = -800  →  total harvestable = -3000
 *   stGainLoss = -900,  ltGainLoss =  300  →  total harvestable = -900  (LT gain ignored)
 */
export function getHarvestableAmount(asset) {
  return Math.min(0, asset.stGainLoss) + Math.min(0, asset.ltGainLoss)
}

/**
 * Core tax calculation — computes post-harvest gains after selecting assets.
 *
 * How IRS netting works (simplified):
 *   1. Short-term losses first offset short-term gains.
 *   2. Long-term losses first offset long-term gains.
 *   3. Any excess loss from one category can further reduce the other.
 *
 * For this tool we apply each category's losses directly to the same
 * category's pre-harvest gains and floor at 0 (no negative tax liability).
 *
 * @param {object} preGains  – { shortTerm: number, longTerm: number }
 * @param {Array}  selectedAssets – array of holding objects that are checked
 * @returns {object} – { shortTerm, longTerm, total, savings }
 */
export function calculatePostHarvestGains(preGains, selectedAssets) {
  // Sum up losses by category across all selected assets
  let harvestedST = 0
  let harvestedLT = 0

  selectedAssets.forEach((asset) => {
    harvestedST += Math.min(0, asset.stGainLoss)  // only negative values
    harvestedLT += Math.min(0, asset.ltGainLoss)  // only negative values
  })

  // Apply harvested losses to the pre-existing gains; can't go below 0
  const postShortTerm = Math.max(0, preGains.shortTerm + harvestedST)
  const postLongTerm  = Math.max(0, preGains.longTerm  + harvestedLT)

  const preTotalGains  = preGains.shortTerm + preGains.longTerm
  const postTotalGains = postShortTerm + postLongTerm
  const savings        = preTotalGains - postTotalGains

  return {
    shortTerm: postShortTerm,
    longTerm:  postLongTerm,
    total:     postTotalGains,
    savings,
  }
}
