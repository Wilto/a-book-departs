---
title: Notes
---

### Containment Itself

> The aim of the CSS Containment specification is to improve performance of web pages by allowing the browser to isolate a subtree of the page from the rest of the page. If the browser knows that a part of the page is independent, rendering can be optimized and performance improved. 
-[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)

#### Basic containment values

> The contain CSS property indicates that an element and its contents are, as much as possible, independent from the rest of the document tree. Containment enables isolating a subsection of the DOM, providing performance benefits by limiting calculations of layout, style, paint, size, or any combination to a DOM subtree rather than the entire page. Containment can also be used to scope CSS counters and quotes. 

> * contain: none;
> * contain: strict;
> * contain: content;
> * contain: size;
> * `contain: inline-size;`
> * contain: layout;
> * contain: style;
> * contain: paint;


```html
<nav class="topic-nav container" aria-labelledby="topic-nav">
  <h2 id="topic-nav" class="topic-nav__hed">Topics:</h2>
  <ul class="topic-nav__list">
    <li class="topic-nav__item" aria-hidden="true"><a href="#" class="topic-nav__link"></li>
  </ul>
</nav>
```