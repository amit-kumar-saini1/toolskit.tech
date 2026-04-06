

# Etsy Fee & Profit Calculator Tool

## Overview
Etsy sellers ke liye ek comprehensive fee & profit calculator — global audience target karte hue English content ke saath. Seller apna item price, shipping, cost dalega aur instantly dekhega ki Etsy kitna fee katega aur actual profit kitna milega.

## What It Does
- User enters: Item price, shipping cost, item cost, quantity
- Calculator shows: Etsy listing fee, transaction fee, payment processing fee, total fees, net profit, profit margin %
- Currency selector (USD, GBP, EUR, INR, CAD, AUD) for global sellers
- Pre-calculated fee table for common price points ($10, $25, $50, $100)
- Etsy fee breakdown visual (pie/bar chart style cards)

## Etsy Fee Structure (2026)
- **Listing fee**: $0.20 per item
- **Transaction fee**: 6.5% of sale price + shipping
- **Payment processing**: 3% + $0.25 (varies by country)
- **Offsite ads fee**: 15% (optional toggle, for shops < $10K/year)

## Files to Create/Edit

### 1. `src/pages/tools/EtsyFeeCalculator.tsx` (New)
- Currency selector (USD default, with country-specific processing fees)
- Input fields: Item price, Shipping charge, Item cost, Quantity
- Sliders for price range
- Results: Listing fee, Transaction fee, Processing fee, Total Etsy fees, Revenue, Profit, Profit margin %
- Offsite Ads toggle (15% fee)
- Pre-calculated fee table for quick reference
- Tabs: Calculator | Fee Breakdown

### 2. `src/lib/seoData.ts` (Update)
- Add `etsy-fee-calculator` SEO entry with:
  - English title targeting "Etsy Fee Calculator 2026"
  - 20+ keywords (etsy calculator, etsy profit calculator, etsy fees, etsy seller calculator, etc.)
  - 8 FAQs in English (global audience)
  - Article with introduction, howToUse, keyFeatures

### 3. `src/App.tsx` (Update)
- Add lazy import and route `/tools/etsy-fee-calculator`

### 4. `src/pages/AllTools.tsx` (Update)
- Add Etsy Fee Calculator card with ShoppingBag icon

### 5. `src/components/home/ToolsGrid.tsx` (Update)
- Add to tools array

### 6. `public/sitemap.xml` (Update)
- Add URL entry with priority 0.9

## SEO Strategy (Global Traffic Focus)
- Title: "Etsy Fee Calculator 2026 — Calculate Etsy Fees & Profit Instantly"
- Keywords targeting: etsy fee calculator, etsy profit calculator, etsy fees 2026, etsy seller fees, how much does etsy charge, etsy transaction fee, etsy listing fee, etsy payment processing fee, etsy offsite ads fee
- All content in English for global reach
- Structured data with SoftwareApplication schema
- 8 FAQs covering common Etsy seller questions

