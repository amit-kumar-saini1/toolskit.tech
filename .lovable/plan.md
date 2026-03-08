

## Plan: Clean Centered Header for Tool Pages

**Change**: Replace the current glass-card header (with icon box + left-aligned text) with a clean centered layout matching the reference image.

### File: `src/components/tools/ToolLayout.tsx` (lines 169-180)

**Current**: Glass-card with gradient icon box + left-aligned title/description

**New**:
```jsx
<header className="text-center space-y-2 py-4">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{h1Title}</h1>
  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{seoData?.description || description}</p>
</header>
```

- Remove glass-card background wrapper
- Remove gradient icon box entirely
- Center-align title and description
- No other changes to the page

