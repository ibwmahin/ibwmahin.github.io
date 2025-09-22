import { Post } from "../posts";

export const post: Post = {
  slug: "framer-motion-animations",
  title: "Animating with Framer Motion",
  date: "2025-09-05",
  excerpt:
    "How to add smooth, delightful animations to your React components — from fundamentals  to production-ready patterns.",
  cover:
    "https://shakuro.com/_next/image?url=https%3A%2F%2Fshakuro.com%2F__blog%2Fwp-content%2Fuploads%2F2019%2F12%2Fframer-motion.jpg&w=2560&q=98",
  content: `
# Animating with Framer Motion

**Author:** Abdulla Al Mahin  
**Published:** 2025-09-05

Framer Motion is the go-to animation library for React
developers who want expressive, production-quality motion with a developer-friendly API. In this post we'll cover the *why*, *how*, and *when* of using Framer Motion, walk through practical examples (from micro-interactions to layout animations), and offer production tips for performance, accessibility, and testing.

---

## Table of contents

1. Introduction and mindset  
2. Core concepts (motion components, props, transitions, variants)  
3. Micro-interactions: hover, tap, and gestures  
4. Mount/unmount and presence animations  
5. Layout animations and \`layout\` prop  
6. Advanced patterns: orchestration, stagger, and shared layout  
7. Performance considerations  
8. Accessibility & motion preferences  
9. Testing and debugging animations  
10. Deploying to production & common pitfalls  
11. Example app: small component library with Framer Motion  
12. Resources and next steps

---

## 1. Introduction and mindset

Motion is not decoration. Well-crafted animation improves comprehension, provides meaningful feedback, and makes interfaces feel natural and responsive. Framer Motion gives you building blocks to express motion in a declarative way that fits React's mental model.

Key mindset points:
- Use motion to clarify state changes, not to distract.
- Favor subtlety: short durations, gentle easings.
- Prefer composable, reusable patterns (variants) over one-off inline animations.

---

## 2. Core concepts

### motion components
Framer Motion exposes wrappers for standard DOM elements. Import the \`motion\` object and use components like \`motion.div\`, \`motion.button\`, etc.

\`\`\`ts
import { motion } from "framer-motion";

<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
\`\`\`

### Key props
- **initial** — starting state when component mounts.
- **animate** — target state to animate to.
- **exit** — state to animate to when the component unmounts (works with \`AnimatePresence\`).
- **whileHover** / **whileTap** — transient states for gestures.
- **transition** — controls timing, easing, type (spring/tween).
- **variants** — a powerful, reusable way to define multiple named states.
- **layout** — opt-in for layout-based animations.

### transitions
Framer has two primary families: **spring** and **tween**.

\`\`\`ts
transition={{ type: "spring", stiffness: 200, damping: 20 }}
transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
\`\`\`

Springs feel more organic for UI motion (cards, drag), tweens are fine for micro interactions (fade, slide).

---

## 3. Micro-interactions: hover, tap, and gestures

Micro-interactions provide instant feedback. Use \`whileHover\`, \`whileTap\`, and gesture props:

\`\`\`tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 28 }}
  className="px-4 py-2 rounded"
>
  Save
</motion.button>
\`\`\`

For drag interactions:

\`\`\`tsx
<motion.div drag dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}>
  Drag me
</motion.div>
\`\`\`

Tip: use \`dragElastic\` and \`dragConstraints\` to keep motion predictable.

---

## 4. Mount/unmount and presence animations

To animate elements as they enter or leave the tree, use \`AnimatePresence\`. This is essential for graceful exit animations.

\`\`\`tsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
\`\`\`

Important: children must have unique keys, and the \`AnimatePresence\` must remain mounted when items mount/unmount.

---

## 5. Layout animations with \`layout\`

Framer Motion can animate layout changes when elements change position or size. Simply add the \`layout\` prop.

\`\`\`tsx
<motion.div layout>
  {items.map(item => (
    <motion.div layout key={item.id}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
\`\`\`

This makes reflow smooth when items are added/removed or the container's size changes.

For element-to-element shared layout transitions, use **Shared Layout Animations** (see next section).

Performance tip: \`layout\` computes layout on the main thread — use it judiciously for large lists or complex UIs.

---

## 6. Advanced patterns: variants, orchestration, and shared layout

### Variants (recommended)
Variants are named animation states. Define them once and reuse:

\`\`\`ts
const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
};

<motion.div variants={cardVariants} initial="hidden" animate="visible" />
\`\`\`

Variants are great for orchestrating complex children animations by attaching variants at parent and child levels.

### Staggered children
Orchestrate entrance of a list with the \`staggerChildren\` option:

\`\`\`ts
const listVariants = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

<motion.ul variants={listVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>{item.text}</motion.li>
  ))}
</motion.ul>
\`\`\`

### Shared layout (layoutId)
Use \`layoutId\` to seamlessly animate between component states (e.g., list item to detail view):

\`\`\`tsx
{items.map(item => (
  <motion.div layoutId={\\\`item-\\\${item.id}\\\`} key={item.id}>
    {/* item preview */}
  </motion.div>
))}

{/* Later, when showing detail */}
<motion.div layoutId={\\\`item-\\\${selected.id}\\\`}>
  {/* detail view */}
</motion.div>
\`\`\`

This produces a smooth transform from one element to another.

---

## 7. Performance considerations

Animations can be cheap or expensive depending on what they touch.

- **Prefer transforms and opacity**: \`transform: translate3d\`, \`scale\`, and \`opacity\` are GPU-accelerated and smooth.
- **Avoid layout-thrashing** for frequent updates — prefer transforms to change visual position instead of modifying layout properties like \`top\`, \`left\`.
- **Limit simultaneous heavy animations**: staggering or limiting the number of animated items keeps frame-rates high.
- **Use will-change sparingly**: it can hint browsers to promote layers but overuse consumes memory.
- **Test on low-end devices**: profile in Chrome DevTools and test on real hardware.

---

## 8. Accessibility & motion preferences

Respect user preferences and provide accessible motion experiences.

- Detect prefers-reduced-motion:

\`\`\`ts
import { usePrefersReducedMotion } from "framer-motion";

const reduce = usePrefersReducedMotion();
return <motion.div animate={reduce ? undefined : { opacity: 1 }} />;
\`\`\`

If users prefer reduced motion, reduce or disable non-critical animations. This is important for users with vestibular disorders.

Also:
- Keep motion short and predictable.
- Avoid rapid flashes or very large transforms that can disorient.

---

## 9. Testing and debugging animations

### Visual testing
- Snapshot testing can capture the DOM, but not the animation lifecycle. Use integration tests (Cypress / Playwright) to assert final states after animations complete.
- Use \`motion\`'s \`onAnimationComplete\` or \`onUpdate\` callbacks to hook test-friendly signals or state.

### Debugging
- Use the React DevTools to inspect props.
- Log transitions and durations in development to ensure they match your design tokens.
- Temporarily set slow-motion to analyze motion: set \`transition: { duration: 2 }\` while iterating.

---

## 10. Deploying to production & common pitfalls

- **Bundle size**: Framer Motion adds to your bundle. Use code-splitting for large animation-heavy pages.
- **SSR**: When server-rendering, ensure any motion that depends on window or layout runs only on the client to avoid hydration mismatches.
- **Sanitize HTML** if you animate user-provided content (XSS concerns).
- **Inconsistent initial states**: Always set \`initial\` explicitly for dynamic content to avoid flicker.

---

## 11. Example: small component library patterns

Below are several practical components and patterns you can adopt in your component library.

### A. Animated button (reusable)
\`\`\`tsx
import { motion } from "framer-motion";

export function AnimatedButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className="px-4 py-2 rounded-md"
      {...props}
    >
      {children}
    </motion.button>
  );
}
\`\`\`

### B. Collapse / accordion
\`\`\`tsx
const collapseVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

<motion.div initial="collapsed" animate={isOpen ? "expanded" : "collapsed"} variants={collapseVariants} transition={{ duration: 0.35 }}>
  <div>{content}</div>
</motion.div>
\`\`\`

### C. Modal with backdrop
\`\`\`tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
      <motion.div className="modal" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}>
        Modal content
      </motion.div>
    </>
  )}
</AnimatePresence>
\`\`\`

---

## 12. Resources and next steps

- Official docs: https://www.framer.com/motion/ — excellent examples and API reference.  
- Example repos: search for “framer-motion gallery”, “framer-motion examples” on GitHub.  
- Books & courses: look for courses that teach motion design for web UI — pairing design principles with Framer Motion is a force multiplier.

---

## Conclusion

Framer Motion is a concise, powerful tool for building animations that feel natural and polished. Start by animating the meaningful parts of your UI: entry/exit, layout changes, and micro-interactions. Use variants to keep your code DRY, respect users' motion preferences, and always test performance on target devices.

If you follow the patterns above, you'll move from “nice-to-have” flourishes to consistent, accessible motion that improves the entire product experience.

---

### TL;DR
- Use \`variants\` for reusable stateful animations.  
- Prefer transforms & opacity for performance.  
- Use \`AnimatePresence\` for exit animations and \`layout\` for smooth reflows.  
- Respect \`prefers-reduced-motion\`.  
- Test animations on real devices.

---
`,
};
