---
title: Outline
order: 0
---
### Introduction
- The Critical Rendering Path
- Measuring Performance
  + Testing tools and fundamentals
    * CWV
      - ~First Contentful Paint (FCP)~ -> Largest Contentful Paint (LCP)
      - First Input Delay (FID)/Total Blocking Time (TBT) 
      - Cumulative Layout Shift (CLS) 
      - Time to Interactive (TTI)
        + Interaction to Next Paint (INP)
    * Lighthouse
    * WebPageTest
  + Setting goals 

### Total Transfer Size
  - `cache-control`
  - Service Worker
  - ugh images
    + Impact
      * CLS
        - “new” `width`/`height` attr
      * LCP
    + Priority hints; `loading`, `fetchpriority` (experimental)
    + SVG
      * SVGOMG
    + Raster
      * “format” use cases only, no encoding details, go read the other book if you want that
        - WebP/AVIF/JPEG-XL
    + respimg by use case
      * Descriptive use case
      * Prescriptive use case
      * “What about container queries?”
        - `source[container]`/`img[loading="lazy"][sizes="auto"]` proposals
  - JavaScript
    + Impact
      * Total Transfer (smaller, but more damage per byte, to be covered in Render Performance)
    + Basics; minification, uglification
    + Dependency [mis-]management
      * Bundlers
        - Webpack, probably
  - CSS
    + Just the basics
    + Webfonts
      * WOFF/WOFF2 only
      * Subsetting workflows
        - Glyphhanger[?]

### Startup performance
  - Blocking assets
    + HTTP/1.1, HTTP/2 (nee. SPDY), HTTP/3
    + async/defer
    + Resource priority
      * `preconnect`/~`dns-prefetch`~/`prefetch`/`prerender`
      * Client hints
  - `img[decoding]`/[`img[preparse]`/`img[prerender]` here, or above?
  - JavaScript (go read Responsible JavaScript for more details)
    + Impacts
      * Client-side rendering is slower, full stop
    + The Main Thread
      * Frames and tasks
        - JS/style/layout/paint/composite breakdown
          + Revisit TTI/FID/[TBT?]
        - Performance Profiling
          + Using Chrome’s profiler
          + WebPageTest charts
        - “Budgeting”
          + Layout/paint/composite-only properties
        - `requestIdleCallback`/`requestAnimationFrame` (?)
    + Worker Thread

### Runtime Performance
  - FPS
  - Interaction to Next Paint (INP)
  - Back to JavaScript
    + Performance profiling redux
    + Revisit JS/style/layout/paint/composite breakdown
      * Remind of `requestIdleCallback`/`requestAnimationFrame`
    + Compositor Thread
      * Composite-only properties/tasks
  - Revisit CLS
  - CSS
    + `will-change`
    + `contain`
    + Fonts
      * `preload`, potential impact on LCP
      * FoUT/FoIT w/`font-display`
      * CLS w/`size-adjust`

### Case study? Audit? Start-to-finish prototype project?
### Conclusion