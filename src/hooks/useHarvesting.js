// src/hooks/useHarvesting.js
// ─────────────────────────────────────────────────────────────────
// Custom React hook — separates ALL business logic from UI.
// Components just call this hook and render; no logic lives in JSX.
//
// Why a custom hook?
//   • Testable without rendering anything
//   • Easy to swap the data source (mock → real API) later
//   • Keeps components clean and readable
// ─────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import { holdingsData, preHarvestingGains } from '../data/holdings'
import { calculatePostHarvestGains, isHarvestable } from '../utils/taxCalculations'

export function useHarvesting() {
  // ── State ──────────────────────────────────────────────────────
  // A Set of asset IDs that the user has checked (selected for harvesting)
  const [selectedIds, setSelectedIds] = useState(new Set())

  // Toggle to show/hide assets that have gains (not just losses)
  const [showGainsAssets, setShowGainsAssets] = useState(false)

  // ── Derived data ───────────────────────────────────────────────
  // useMemo ensures these recalculate only when dependencies change,
  // not on every render.

  // Assets filtered for the table based on the toggle
  const visibleHoldings = useMemo(() => {
    if (showGainsAssets) return holdingsData
    return holdingsData.filter((asset) => isHarvestable(asset))
  }, [showGainsAssets])

  // The actual asset objects that are currently selected
  const selectedAssets = useMemo(() => {
    return holdingsData.filter((asset) => selectedIds.has(asset.id))
  }, [selectedIds])

  // Post-harvest tax numbers, recomputed whenever selections change
  const postHarvestGains = useMemo(() => {
    return calculatePostHarvestGains(preHarvestingGains, selectedAssets)
  }, [selectedAssets])

  // ── Actions ────────────────────────────────────────────────────

  /**
   * Toggle an individual asset on/off.
   * We spread the Set into a new Set so React detects the state change.
   */
  function toggleAsset(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  /** Select ALL harvestable (loss-making) assets at once. */
  function selectAll() {
    const harvestableIds = holdingsData
      .filter(isHarvestable)
      .map((a) => a.id)
    setSelectedIds(new Set(harvestableIds))
  }

  /** Deselect everything. */
  function clearAll() {
    setSelectedIds(new Set())
  }

  // ── Return public API ──────────────────────────────────────────
  return {
    // data
    preHarvestingGains,
    visibleHoldings,
    selectedIds,
    postHarvestGains,
    selectedCount: selectedIds.size,

    // actions
    toggleAsset,
    selectAll,
    clearAll,

    // toggle
    showGainsAssets,
    setShowGainsAssets,
  }
}
