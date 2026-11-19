// ─────────────────────────────────────────────────────────────
//  Novu Works — Shared DOM Dialog & Clipboard Utilities
// ─────────────────────────────────────────────────────────────

const boundOutsideDismissDialogs = new WeakSet();

function isPointerOutsideElementRect(el, e) {
  if (!el || typeof e.clientX !== 'number' || typeof e.clientY !== 'number') return false;
  // Ignore keyboard-triggered synthetic clicks where pointer coordinates are 0,0
  if (e.clientX === 0 && e.clientY === 0) return false;
  const rect = el.getBoundingClientRect();
  return (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  );
}

/**
 * Attaches a cross-browser outside-click light-dismiss fallback ONLY when the
 * browser does not natively support HTMLDialogElement `closedby="any"`.
 * Tests pointerdown + pointerup coordinates outside the dialog bounding rect
 * so padding/gap clicks or text-selection drags never accidentally dismiss.
 */
export function bindDialogLightDismissFallback(dialogEl, onDismiss = null) {
  if (!dialogEl || boundOutsideDismissDialogs.has(dialogEl)) return;
  boundOutsideDismissDialogs.add(dialogEl);

  if (typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype) {
    return;
  }

  let startedOutside = false;

  dialogEl.addEventListener('pointerdown', (e) => {
    if (!dialogEl.open) {
      startedOutside = false;
      return;
    }
    startedOutside = isPointerOutsideElementRect(dialogEl, e);
  });

  dialogEl.addEventListener('pointerup', (e) => {
    if (!dialogEl.open || !startedOutside) return;
    startedOutside = false;
    if (isPointerOutsideElementRect(dialogEl, e)) {
      if (typeof onDismiss === 'function') {
        onDismiss();
      } else if (typeof dialogEl.close === 'function') {
        dialogEl.close();
      }
    }
  });
}

/**
 * Safely copies plain text using Clipboard API with execCommand fallback
 * and consistent Promise resolution even when Clipboard API is restricted.
 */
export async function copyTextToClipboard(text) {
  if (!text) return false;
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through to legacy textarea fallback
    }
  }
  if (typeof document === 'undefined') return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand ? document.execCommand('copy') : false;
    ta.remove();
    return Boolean(ok);
  } catch (_) {
    return false;
  }
}
