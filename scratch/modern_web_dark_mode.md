
--- Guide for dark-mode ---
# Dark mode

The `color-scheme` property indicates which color schemes (such as light or dark) your page supports. This informs the browser that it can automatically theme native UI elements—like scrollbars, form controls, and the default canvas background—to match your site's design and help minimize white flashes during initial loading.

## Implementation

### 1. Declare supported schemes in HTML

MANDATORY: To help prevent a "flash of un-themed content" (FOUC), place a `<meta>` tag in your `<head>` to ensure the browser knows which themes you support before it even starts rendering. While this `<meta>` tag helps to avoid FOUC by setting the initial canvas color early, it may not completely eliminate flashes in all browsers or loading conditions.

```html
<!-- MANDATORY: Declare support for both light and dark themes -->
<meta name="color-scheme" content="light dark">
```

### 2. Apply page-wide color scheme to CSS :root or html

MANDATORY: Apply the `color-scheme` property to the `html` element or the `:root` pseudo-class. Browsers specifically look to the root element to determine the theme for the entire viewport—including the root scrollbars and the initial "canvas" background. If applied only to the `body`, these global UI surfaces may remain in light mode because the `body` does not control the window's rendering context.

```css
/* MANDATORY: Apply color-scheme to :root or html for viewport-wide theming */
:root {
  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;
}
```

### 3. Define light and dark color tokens

You can use the `light-dark()` function to define color tokens that automatically adapt to different `color-scheme` values.

It is recommended that you also keep the raw color values in separate custom properties, which makes it easier to combine them in different ways (and makes fallback behavior easier, if needed).

For more control over the colors of built-in UI such as `accent-color` or `scrollbar-color`, authors **can optionally** add their own dynamic colors with use of custom properties and/or the `light-dark()` function. This function automatically picks the correct color based on the computed `color-scheme` of the element and eliminates the need for redundant media queries, but is not required for a basic implementation.

```css
:root {
  --color-brand-light: oklch(45% 0.23 270);
  --color-brand-dark: oklch(85% 0.15 210);
  --color-brand-text-light: white;
  --color-brand-text-dark: oklch(40% 0.23 270);

  --color-brand: light-dark(var(--color-brand-light), var(--color-brand-dark));
  --color-brand-text: light-dark(var(--color-brand-text-light), var(--color-brand-text-dark));

  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;
}

button.primary {
  /* These automatically adapt to color scheme */
  background-color: var(--color-brand);
  color: var(--color-brand-text);
}
```

OPTIONAL: A number of system colors are available, which also automatically adapt to the used color scheme (and other color modes, e.g. forced colors), such as `canvas`, `canvastext`, `accentcolor` (check support) , `buttonborder` etc. These are typically too limited to be useful, beyond very specific cases where you need to exactly match certain default browser UI or as fallbacks/defaults.

#### OPTIONAL: Tailor color pairs to context

Even when overriding the system default, it can be useful to use the `prefers-color-scheme` media query to define **different** color pairs that take into account the colors of the browser and OS chrome around the page (or of the surrounding page, when the page is used as an iframe).

For example, use a slightly dimmer light theme when the system setting is `dark`, or a more contrasting dark theme when the system setting is `light`, so the page is not visually overpowered by the surrounding UI.


## Fine-grained browser UI customization

Setting `color-scheme` already adapts browser UI to the used color scheme, but this will use OS defaults and/or system colors that may not perfectly align with the website design.
Modern browsers expose several fine-grained customization hooks for these.
Do not reimplement native controls simply to customize their appearance without exhausting the customization hooks modern browsers provide.

### Setting the accent color

Some browser UI (e.g. checked checkboxes or sliders) uses an accent color.
This resolves to the OS setting by default, but you can use the `accent-color` property to set it to a color that better aligns with the page, such as the page's brand color.

```css
html {
  accent-color: light-dark(var(--color-accent-light), var(--color-accent-dark));
}
```

### Issues to be aware of when using accent-color

Browser rendering of `accent-color` varies.
For indicators generally painted over an accent color background, such as checkbox marks and radio-button dots, browsers may apply different treatments:
- **Chromium** and **Firefox** generally select a contrasting indicator color.
- **Safari** may instead preserve a white indicator in light mode or a black indicator in dark mode, while modifying the accent color behind it. This adjustment does not always provide sufficient contrast for every supplied color, so test important combinations in Safari, including both light and dark color schemes. Do not assume that Safari will automatically choose whichever indicator color provides the best contrast.

### Scrollbar colors

You can use `scrollbar-color` together with `light-dark()` to set custom scrollbar colors that adapt to the color scheme used.

```css
:root {
  --color-scrollbar-track: light-dark(#eee, #222);
  --color-scrollbar-thumb: light-dark(#999, #666);
  scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
}
```

### Issues to be aware of when using scrollbar-color

- Do NOT animate or transition `scrollbar-color`. A [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=311752) causes the scrollbar to flicker every time `scrollbar-color` changes.
- On macOS, `scrollbar-color` (standard) and `::-webkit-scrollbar` (legacy) properties are ignored by default because macOS uses native "overlay" scrollbars. You MUST pair custom colors with `scrollbar-width` (e.g., `thin` or `auto`) to force macOS to render them.
- Even with `scrollbar-width` applied, macOS overlay scrollbars render the track (gutter) as transparent by default. If the design requires a visible track background color on MacOS, you MUST apply `scrollbar-gutter: stable;` to the scrollable container, but note that it only appears after the user hovers over the scrollbar.
- Even with `scrollbar-gutter: stable` the track may be transparent on MacOS. The thumb should not depend on the track color to be visible.

### Further customization

Most browser UI exposes pseudo-elements to fully customize its appearance, such as:
- `::placeholder`
- `::spelling-error`
- `::grammar-error`
- `::selection`
- `::search-text`
- `::target-text`
- `::file-selector-button`

You can use `light-dark()` colors on any of these to apply colors that adapt to the used color scheme.

## 4. Varying images for light and dark mode

For CSS images, `light-dark()` can also be used to provide different image values.

IMPORTANT: Both values in `light-dark()` must be the same type. You cannot combine a color with an image.
If one of the two must be an image, use `image(<color>)` to wrap the color value.

## JS-based theme detection

Most color scheme branching should be done in CSS, which automatically adapts to changes.

Any JS reading `matchMedia("(prefers-color-scheme: dark)").matches` MUST also handle its `change` event as the system preference can change at any time.

## OPTIONAL: Implementing a color-scheme toggle

If you want to allow users to manually override their system default for this site, you can implement a dark mode toggle.
Most sites do not need a persistent toggle in the site UI.
Simply defaulting to the system color scheme is usually enough, optionally with a setting in a separate settings surface.
See `dark-mode-toggle` (via `npx -y modern-web-guidance@latest retrieve "dark-mode-toggle"`) for best practices around implementing a dark mode toggle (persistent or not).

## OPTIONAL: Component-specific overrides

You can override the global theme for specific elements by setting `color-scheme` on them.

For more information and gotchas, see `component-specific-light-dark-theme` (via `npx -y modern-web-guidance@latest retrieve "component-specific-light-dark-theme"`).

## Known issues to be aware of

### Issues to be aware of when using color-scheme

- Chrome and Firefox respect `color-scheme` for iframes: they render embedded pages in the correct color scheme and adjust the embedded page's `prefers-color-scheme` media query to reflect the embedding context's `color-scheme`. Safari does not, and resolves `prefers-color-scheme` to the system setting even inside iframes.
  - **If you control both parent and iframe:** pass the parent's color scheme to the iframe explicitly — via a URL parameter (`?theme=dark`) at iframe construction time, or via `postMessage()` (which also lets you react to runtime changes). In the iframe, set a class on `<html>` (and/or `color-scheme` on `:root`) from that signal instead of relying on `prefers-color-scheme`.
  - **If you only control the embedded page:** there is no reliable way to detect the embedding context's `color-scheme` from inside the iframe in Safari. Expose an explicit theme parameter on your embed API (e.g. a query string or `postMessage` protocol) and document it for embedders.

## Fallback strategies

### Fallbacks & browser support for color-scheme

Baseline status for color-scheme: Widely available. It's been Baseline since 2022-02-03.
Supported by: Chrome 98 (Feb 2022), Edge 98 (Feb 2022), Firefox 96 (Jan 2022), and Safari 13 (Sep 2019).

The `color-scheme` property is **progressive enhancement**.
Browsers that do not support it will ignore this property and use their default light-mode UI.

To adapt to the user's preferences in older browsers, use `prefers-color-scheme` media queries to provide different colors when dark mode is preferred.

- DO use the media query to switch custom properties on `:root` or `html`
- Avoid using the media query on individual components unless the component requires a very specific type of dark mode customization beyond colors.

```css
:root {
  /* Define brand colors for each mode */
  --color-brand-light: #0056b3;
  --color-brand-dark: #00e5ff;
  --color-brand: var(--color-brand-light);

  /* MANDATORY: Fallback for browsers without light-dark support */
  @media (prefers-color-scheme: dark) {
    --color-brand: var(--color-brand-dark);
  }

  /* Ignored in older browsers */
  color-scheme: light dark;
}

button.primary {
	background-color: var(--color-brand);
}
```

### Fallbacks & browser support for light-dark()

Baseline status for light-dark(): Newly available. It's been Baseline since 2024-05-13.
Supported by: Chrome 123 (Mar 2024), Edge 123 (Mar 2024), Firefox 120 (Nov 2023), and Safari 17.5 (May 2024).

For browsers that support `color-scheme` but not yet `light-dark()`, light and dark versions of colors should first be defined as custom properties, and the `prefers-color-scheme` media query should be used to set colors for the respective mode like in the example below:

```css
:root {
  /* Define browser UI accent color for each mode */
  --brand-accent-light: #0056b3;
  --brand-accent-dark: #00e5ff;
  --accent-color: var(--brand-accent-light);

  /* MANDATORY: Fallback for browsers without light-dark support */
  @media (prefers-color-scheme: dark) {
    --accent-color: var(--brand-accent-dark);
  }

  /* OPTIONAL: use light-dark() for more control of built-in UI colors */
  @supports (color: light-dark(white, black)) {
    --accent-color: light-dark(var(--brand-accent-light), var(--brand-accent-dark));
  }

  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;

  /* Example inherited color property */
  accent-color: var(--accent-color);
}

pre, code {
  color-scheme: dark;

  /* **Mandatory**: any inherited color properties must be set again, even if to the same design tokens */
  accent-color: var(--accent-color);
}
```

### Fallbacks & browser support for light-dark() image values

Baseline status for light-dark() image values: Newly available. It's been Baseline since 2026-09-14.
Supported by: Chrome 150 (Jun 2026), Edge 150 (Jul 2026), Firefox 150 (Apr 2026), and Safari 27.

For browsers that do not support `light-dark()` for images, use `image-set()` as a switch:
give each option a `type()` from a custom property, and set the inactive one to an unsupported MIME type so the browser discards that option.
The active option gets an empty value, so it is a plain `image-set()` option with no `type()`.

Define the switch once on `:root`. Every use site then only needs both images inline, like `light-dark()`.

```css
:root {
  --light-type: ;
  --dark-type: type("image/do-not-use");

  /* MANDATORY: Fallback for browsers without light-dark() image support */
  @media (prefers-color-scheme: dark) {
    --light-type: type("image/do-not-use");
    --dark-type: ;
  }
}

.hero {
  background-image: image-set(url(hero-light.png) var(--light-type), url(hero-dark.png) var(--dark-type));

  @supports (background-image: light-dark(url("a"), url("b"))) {
    background-image: light-dark(url(hero-light.png), url(hero-dark.png));
  }
}
```

- Only the selected image is downloaded.
- Resolutions still work: `image-set(url(a-1x.png) 1x var(--light-type), url(a-2x.png) 2x var(--light-type), url(b-1x.png) 1x var(--dark-type), url(b-2x.png) 2x var(--dark-type))`.
- **DO NOT** use `type("")` for the active option. Browsers treat the empty string as unsupported and drop every option.
- Unlike `light-dark()`, the switch does not follow `color-scheme` set on a subtree. A manual toggle, or any subtree that sets `color-scheme`, MUST also flip `--light-type` and `--dark-type`.

### Alternative: one custom property per image

Simpler when only a handful of images vary, but every image needs its own media query branch, and a manual toggle must flip each one.

```css
:root {
  --hero-image: url(hero-light.png);

  @media (prefers-color-scheme: dark) {
    --hero-image: url(hero-dark.png);
  }

  @supports (background-image: light-dark(url("a"), url("b"))) {
    --hero-image: light-dark(url(hero-light.png), url(hero-dark.png));
  }
}

.hero {
  background-image: var(--hero-image);
}
```

### Fallbacks & browser support for image()

image() is not natively supported by any major browser yet.

Use a gradient with a single color stop and no positions, e.g. `linear-gradient(blue)`.

Baseline status for the css.types.gradient.linear-gradient.single_color_stop capability: Newly available. It's been Baseline since 2025-04-04.
Supported by: Chrome 135 (Apr 2025), Edge 135 (Apr 2025), Firefox 136 (Mar 2025), and Safari 18.4 (Mar 2025).

For broader browser support, you can explicitly provide `0 100%` positions for the single color stop, e.g. `linear-gradient(blue 0 100%)`.

### Fallbacks & browser support for scrollbar-color

Baseline status for scrollbar-color: Newly available. It's been Baseline since 2025-12-12.
Supported by: Chrome 121 (Jan 2024), Edge 121 (Jan 2024), Firefox 64 (Dec 2018), and Safari 26.2 (Dec 2025).

This feature is progressive enhancement and does not always require fallbacks.

If the styling is important and the user's Baseline target is "Baseline Widely Available" or earlier, you SHOULD include the non-standard `::-webkit-scrollbar` pseudo-elements as fallbacks.

Wrap legacy fallbacks in an `@supports not (scrollbar-color: auto)` block to prevent conflicts between standard properties and legacy WebKit selectors in browsers that support both natively.

If you are using custom properties to define colors, these will cascade to the legacy WebKit selectors automatically. You do NOT need to duplicate them.

```css
/* Legacy fallback for WebKit/Blink browsers */
@supports not (scrollbar-color: auto) {
  .scroller::-webkit-scrollbar {
    /* Must define base size in WebKit for custom colors to be visual */
    width: 12px;
    height: 12px;
  }

  .scroller::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }

  .scroller::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
}
```

### Fallbacks & browser support for accent-color

Browser support for accent-color: Limited availability.
Supported by: Chrome 93 (Aug 2021), Edge 93 (Sep 2021), Firefox 92 (Sep 2021), and Safari 26.2 (Dec 2025).

The `accent-color` property is progressive enhancement.
Browsers that do not support this property will ignore it and use their default UI colors.


--- Guide for dark-mode-toggle ---
# Dark mode toggles

A dark mode toggle lets users override the system color scheme for one site.
The override is applied by updating `<meta name="color-scheme">`: `light dark` means "follow the system preference", `light` or `dark` pin an explicit scheme.
Colors (`light-dark()`), system colors, and native UI all key off the CSS `color-scheme` property, so the toggle works by keeping that property in sync with the `<meta>` (see [Reflect the override in CSS](#reflect-the-override-in-css)).

## Persistent toggle, settings control, or no toggle at all?

Most sites do not need a persistent color scheme toggle in the site UI (header, nav, footer, etc.).
Follow the system preference by default and, if a manual override is needed at all, put the control in a separate settings surface: a settings page, panel, or overlay.

Pinning a scheme against the OS is a legitimate but rare intent, and rare intents belong behind progressive disclosure, not in a control that is visible at all times.

Persistent toggles are mostly found on developer-facing or developer-adjacent (e.g. for designers) sites, where switching schemes is a far more frequent task than it is for the average web user.
Do NOT add one just because it is a common pattern on developer sites: the developer's interest in this control is not representative of typical users.

## Implementation

First, follow all steps in `dark-mode` (via `npx -y modern-web-guidance@latest retrieve "dark-mode"`) to support both schemes, defaulting to the system preference.

### Data model

The data model for the dark mode toggle typically includes three states:
1. System (no stored value): The UI follows the system color scheme. Ideally this should be the default.
2. Light (stored as `"light"`): The UI uses the light theme regardless of the system color scheme.
3. Dark (stored as `"dark"`): The UI uses the dark theme regardless of the system color scheme.

This state is usually stored in `localStorage` and reflected in a `<meta name="color-scheme">` element in the document head.

### Reflect the override in CSS

The `<meta>` is only a *presentational hint*: any `color-scheme` declaration in author CSS overrides it.
Since `dark-mode` (via `npx -y modern-web-guidance@latest retrieve "dark-mode"`) sets `color-scheme: light dark` on `:root`, updating the `<meta>` alone is a **no-op** — CSS wins.
Map the `<meta>` back to the property so the cascade follows it:

```css
:root {
  color-scheme: light dark;

  &:has(> head > meta[name="color-scheme"][content="dark"]) {
    color-scheme: dark;
  }
  &:has(> head > meta[name="color-scheme"][content="light"]) {
    color-scheme: light;
  }
}
```

**DO NOT** hardcode `color-scheme: light` or `color-scheme: dark` as the root default; the base declaration MUST stay `light dark`.
CSS MUST NOT depend on JS: if JS never runs, the `<meta>` stays `light dark` and the site follows the system preference — nothing breaks.

### Persistence and FOUC prevention

Persist the override in `localStorage`; remove the entry when returning to the system default.

To avoid a flash of the wrong scheme, apply the stored value in an inline script (NOT `type=module`, NOT `defer`) placed immediately after the `<meta>` element:

```html
<meta name="color-scheme" content="light dark">
<script>
document.querySelector('meta[name="color-scheme"]').content = localStorage.getItem("color-scheme") ?? "light dark";
</script>
```

- This inline script exists **only** for FOUC prevention. Keep it as small as possible; additional JS for handling color scheme toggling can load later.
- In rare cases `localStorage` access can throw (e.g. site data blocked), but since this script does nothing else, the only side effect would be a console error. Wrap in `try .. catch` if this matters. Ensure the theme is still applied to the page, even if it cannot be persisted.
- The override can change from another tab: handle `window`'s `storage` event to stay in sync.
- **DO NOT** use `matchMedia()` to remove the stored value when the system preference changes to match it.
Many users' OS switches schemes automatically based on time of day; removing the stored value whenever the two happen to coincide would make it impossible to pin a scheme at all.

### Branching for HTML and non-color values

Colors need no extra work: once the `<meta>` is mapped to `color-scheme` (above), `light-dark()` follows the override.
This section is about adapting other values (e.g. `font-weight`, media sources, etc.).

When the page simply follows the system preference, `(prefers-color-scheme: dark)` can be used for branching, including in `<picture>` or `<video>` sources.
Overriding the color scheme adds an additional complication: the system preference is no longer the source of truth, and for APIs that only accept media queries there is no direct alternative.

Do NOT rely exclusively on JS-applied classes like `.dark` for branching, as they will be incorrect if JS doesn't load and the OS default is dark.

You can combine the media query with a `:root:has(> head > meta[name="color-scheme"][content="dark"])` (or `light`) selector to branch.
See `selector-atrule-combinations` (via `npx -y modern-web-guidance@latest retrieve "selector-atrule-combinations"`) for details on how to implement this elegantly.

The control's own options are non-color branches too: include both states in the markup (icon plus visually hidden action text, e.g. "Switch to dark theme") and hide the inactive one via these selectors.
`display: none` also removes the redundant option from the AT so the control needs no JS to stay current when the system preference changes.

For in-HTML media, the only way right now is to include both versions as separate elements and toggle visibility appropriately.
Hiding `<source>` elements with `display: none` does not work.

## User Interface

### Two or three states?

In all cases, the UI MUST support reverting or setting the color scheme to system.

Prefer displaying two states in space-constrained toggles, such as persistent toggles in the site chrome (header, nav, footer, etc.) where space is limited and tweaking settings is usually orthogonal to the user goal.

A color scheme control in a separate settings surface (page, panel, or overlay) is a different scenario and MAY expose all three states explicitly ("Light", "Dark", "System"): there, the user is already making deliberate decisions about future behavior, and there is room to explain the options.

Three explicit states are also warranted if the site implements context-aware schemes (e.g. a dimmer light mode when the OS is dark), since "Light" and "System (currently light)" then genuinely differ.

### Two-state toggles

When such a control is used, it tends to be a temporary comfort adjustment ("it's too bright right now"), rather than ensuring the current state is preserved long-term.
Therefore, for two-state toggles, it is sufficient to display two out of three settings: system (so that the setting can be reverted) and the current opposite of system, stored as its current literal value.

The only two states should be:

1. **System default** — no stored value, `<meta>` content `light dark`. Displayed as its current resolved value (e.g. a sun icon when light).
2. **Override** — stored literally as `light` or `dark`.

Essentially, it is a tri-state control (`light dark`, `light`, `dark`) where the explicit state matching the current system preference is unreachable.

When the user toggles:

1. Target scheme = the opposite of the currently *rendered* scheme (stored value if any, else system preference). The user intent is "select the opposite of what I see right now", NOT "select the inverse of the system default".
2. If the target differs from the current system preference, store it literally.
3. If the target matches the current system preference, the user is undoing their adjustment: remove the stored value. DO NOT store it — that would invisibly pin the scheme against future system changes.
4. Set the `<meta>` content to the stored value, or `light dark` if none.

IMPORTANT: Divergence must be checked only at storage time, never retroactively: a stored value that the system preference later changes to match MUST be kept.
Many users' OS switches schemes automatically based on time of day; removing the stored value whenever the two happen to coincide would make it impossible to pin a scheme at all.

Example scenario, starting with the OS set to light:

1. The user toggles. Dark differs from the system preference, so `dark` is stored; the site turns dark.
2. The OS setting changes to dark. The site stays dark (the stored value now matches the system preference, but is kept).
3. The OS setting changes back to light. The site stays dark.
4. The user toggles. The target (light) matches the system preference, so the stored value is removed and the site follows the system again.

### Three-state toggles

When there is more space and users are already in the mindset of setting long-term preferences, a tri-state control can provide more clarity.
In this case, the data model cleanly maps to the three UI options: system, light, and dark.

To reduce cognitive load, the "system" option should also display what the current system setting is, for example via:
- Icon, e.g. a sun icon at the bottom right of the system icon
- Text, e.g. "System (Currently light)"

