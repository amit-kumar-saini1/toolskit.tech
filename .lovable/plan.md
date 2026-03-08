

## Problem
Desktop sidebar में ads load नहीं हो रहे तो भी empty white boxes दिख रहे हैं। User चाहता है कि ads आएं तो space लें, नहीं आएं तो कुछ न दिखे।

## Solution
`AdBanner` component को update करेंगे — ad load होने तक container hidden रहेगा, load होने पर visible हो जाएगा।

### Changes:

**`src/components/AdBanner.tsx`**:
- एक `isVisible` state add करेंगे (default `false`)
- जब ad successfully push हो जाए (`adsbygoogle.push({})`), तब `isVisible = true` set करेंगे
- Container पर conditional class: `isVisible ? 'block' : 'hidden'`

**`src/components/tools/ToolLayout.tsx`**:
- Sidebar `<aside>` के अंदर के glass-card wrappers और "Advertisement" labels को `AdBanner` के अंदर move करेंगे, या sidebar container को भी conditionally hide करेंगे
- Simpler approach: AdBanner खुद hide/show handle करेगा, तो sidebar के glass-card divs automatically empty होंगे — हम AdBanner में ही wrapper + label include कर देंगे

**Simplest approach**: AdBanner component में ad load न हो तो पूरा container hidden रखो। Sidebar में glass-card + "Advertisement" label AdBanner के अंदर ही रखो ताकि load न हो तो कुछ न दिखे।

