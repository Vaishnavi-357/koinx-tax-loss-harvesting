// src/data/holdings.js
// ─────────────────────────────────────────────────────────────────
// Static mock data representing a user's crypto portfolio.
// Each object simulates what a real API would return.
//
// Fields:
//   id          – unique identifier for React keys & selection state
//   name        – full coin name (displayed in table)
//   symbol      – ticker symbol (BTC, ETH, …)
//   color       – brand hex for the coin icon
//   bgColor     – light bg for the coin avatar circle
//   currentPrice– current market price in USD
//   totalHolding– total quantity held
//   avgBuyPrice – weighted average purchase price (cost basis)
//   stGainLoss  – short-term unrealized gain/loss  (held < 1 year)
//   ltGainLoss  – long-term  unrealized gain/loss  (held > 1 year)
// ─────────────────────────────────────────────────────────────────

export const holdingsData = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    color: '#F7931A',
    bgColor: '#FFF3E0',
    currentPrice: 42000,
    totalHolding: 0.5,
    avgBuyPrice: 48000,
    stGainLoss: -2200,
    ltGainLoss: -800,
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    bgColor: '#EEF2FF',
    currentPrice: 2100,
    totalHolding: 3,
    avgBuyPrice: 2500,
    stGainLoss: -900,
    ltGainLoss: -300,
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945FF',
    bgColor: '#F5F0FF',
    currentPrice: 110,
    totalHolding: 20,
    avgBuyPrice: 95,
    stGainLoss: 180,
    ltGainLoss: 120,
  },
  {
    id: 4,
    name: 'Cardano',
    symbol: 'ADA',
    color: '#0033AD',
    bgColor: '#E8EFFF',
    currentPrice: 0.42,
    totalHolding: 5000,
    avgBuyPrice: 0.65,
    stGainLoss: -720,
    ltGainLoss: -430,
  },
  {
    id: 5,
    name: 'Chainlink',
    symbol: 'LINK',
    color: '#375BD2',
    bgColor: '#EBF0FF',
    currentPrice: 14,
    totalHolding: 100,
    avgBuyPrice: 18,
    stGainLoss: -260,
    ltGainLoss: -140,
  },
  {
    id: 6,
    name: 'Polkadot',
    symbol: 'DOT',
    color: '#E6007A',
    bgColor: '#FEE9F3',
    currentPrice: 7.2,
    totalHolding: 200,
    avgBuyPrice: 6.5,
    stGainLoss: 84,
    ltGainLoss: 56,
  },
  {
    id: 7,
    name: 'Avalanche',
    symbol: 'AVAX',
    color: '#E84142',
    bgColor: '#FFF0F0',
    currentPrice: 28,
    totalHolding: 50,
    avgBuyPrice: 38,
    stGainLoss: -380,
    ltGainLoss: -120,
  },
  {
    id: 8,
    name: 'Polygon',
    symbol: 'MATIC',
    color: '#8247E5',
    bgColor: '#F3EEFF',
    currentPrice: 0.72,
    totalHolding: 3000,
    avgBuyPrice: 0.58,
    stGainLoss: 240,
    ltGainLoss: 180,
  },
]

// ─────────────────────────────────────────────────────────────────
// Pre-harvesting capital gains (already REALIZED this tax year).
// These come from trades already closed — we cannot un-realize them.
// Tax Loss Harvesting reduces these by adding new realized losses.
// ─────────────────────────────────────────────────────────────────
export const preHarvestingGains = {
  shortTerm: 3200,   // gains from assets held < 1 year
  longTerm: 5800,    // gains from assets held > 1 year
  // total is derived: shortTerm + longTerm = 9000
}
