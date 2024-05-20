const selectors = {
  addItems: '#add-items',
  afterGrid: '.afterGrid',
  expandGridItems: '#expand-grid-items',
  gridItem: '[data-grid-item]',
  // @ts-expect-error - TS7006 - Parameter 'id' implicitly has an 'any' type.
  incrementItemCounter: (id /*: number */) /*: string */ => `#increment-counter-${id}`,
  insertItem: '#insert-item',
  insertNullItems: '#insert-null-items',
  // @ts-expect-error - TS7006 - Parameter 'id' implicitly has an 'any' type.
  itemCounter: (id /*: number */) /*: string */ => `#item-counter-${id}`,
  pushFirstItemDown: '#push-first-down',
  pushGridDown: '#push-grid-down',
  scrollContainer: '[data-scroll-container]',
  shuffleItems: '#shuffle-items',
  staticItem: '[data-grid-item].static, .Masonry-Premount .Collection-Item',
  toggleMount: '#toggle-mount',
  toggleScrollContainer: '#toggle-scroll-container',
  updateGridItems: '#update-grid-items',
} as const;

export default selectors;
