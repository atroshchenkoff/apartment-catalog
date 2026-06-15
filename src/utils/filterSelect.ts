const OPEN_SELECT_SELECTOR = '.filter__select-content[data-state="open"]';

export function hasOpenFilterSelect(ownerDocument: Document = document): boolean {
  return Boolean(ownerDocument.querySelector(OPEN_SELECT_SELECTOR));
}
