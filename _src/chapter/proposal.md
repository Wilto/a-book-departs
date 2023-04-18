---
title: Proposal
omit: true
---

## Elevator pitch (2-3 sentences, aimed at a prospective reader)

We have a lot of books that touch on performance (Responsible Responsive, Sustainable Web Dev) and a couple that deep-dive on specific topics (Responsible JavaScript, Webfont Handbook, my images book), but nothing about the holistic practice of testing, auditing, and fixing issues with front-end performance. 

We’ve got “do this thing right and it’ll help the page go fast” covered—I think we need a holistic “now make it go faster” book about workflows and standards dedicated to exactly that.

## Who is the primary intended audience?

Workaday developers; the ones moving the semicolons around on the front-end.

## What secondary audiences might also appreciate this book?

It’s a concern that touches every phase of a site—the focus is on _building_ a fast front-end, but like accessibility, some design patterns do the kind of damage that a developer can only mitigate at best. Approaching the front-end holistically (rather than diving into nanosecond-shaving JavaScript microoptimizations, for example) makes this book accessible to any designer-by-trade that’s fairly comfortable tinkering with a little CSS, even if not all of it resonates with their daily work and they skip a few pages here and there. The takeaway, for them, would be the ability to see how their decisions might impact the performance work done by the dev team, avoid potential issues altogether, and help them to generally feel more confident approaching and discussing the topic.

While it wouldn’t be written _for_ them, perspective wise, I imagine this book would see some interest from CTO and engineering manager types—the kind of folks that normally engage me to audit their site, outline steps to remediate found performance issues, and use those tasks as an opportunity to train their dev teams on the topic.

## What are three reasons that readers would buy this book?

While performance is a persistent concern, the methods to address that concern aren’t always clear, and shift as quickly as browsers and standards do. First and foremost, this book aims to introduce modern front-end performance techniques in an approachable, measurable, and verifiable way.

For dev teams I’ve worked with with partial knowledge, some performance topics can feel unsettlingly vibes-based. “This approach isn’t measurably faster, but can _feel_ faster to users, whereas this approach _is_ measurably faster, but feels slower, so which is the right approach?” This book aims 

Industry efforts to make the topic more approachable have created a barrier of its own: a cascade of interconnected but not always directly related concerns, buried in (useful, once understood) acronyms, with the fine details almost completely obscured by (useful, once understood) numerical scores rendered in shades from you-messed-this-up red to don’t-mess-this-up green.

In sum, these three things leave the average developer with the following: a good whatever-LCP-stands-for score can be—but isn’t always—a better measure of overall perceived performance than the whatever-CLS-stands-for score, but the latter can have a greater impact on UX, and there’s a new standard (does it need a polyfill?) that can drastically improve our score for CLS, but it can have such an negative impact on LCP that you likely would have been better off not trying to address it in the first place, though it also saves bandwidth, but is saving 150kb worth of transfer worth as much or more than fifty points off a CLS score, and what’s a good _enough_ score, but, and, but, and, and so on, and so on.

This sucks, and I want to make it better.

## What are some other books on the market that address your topic? How will your book be different?

SitePoint has a “Front-end Performance” book, which I skimmed, and is not great. Jeremy Wagner has _Web Performance in Action_ with Manning, which is solid, of course, but a half-decade out-of-date—it predates a lot of the standards developed with performance as the end goal, so it necessarily spends time on developer-led workarounds like Critical CSS and Picturefill.


## Describe the sources you'll be using for your book. For example, will you be showing your own work as case studies? Conducting academic research? Interviewing other practitioners?

My own work, specs and standards, pestering peers, the usual.

## List some experts in the topic of your book who you could ask to conduct a technical or peer review of your manuscript.

Scott Jehl and/or Tim Kadlec over at WebPageTest would be great; anyone over there, honestly. Eric Portis any time I go near images or CDNs, of course—which, tragically, I’ll have to touch on again. Jake Archibald would be good for the gritty detail, or Rachel Andrew for overall perspective, since I’ll need to hew to Google’s party line on some of this stuff—can’t avoid spending a lot of time on Core Web Vitals, and I wouldn’t want to anyway.






