// @flow strict

const selectors = {
  afterGrid: '.afterGrid',
  gridItem: '[data-grid-item], .Collection-Item',
  addItems: '#add-items',
  expandGridItems: '#expand-grid-items',
  incrementItemCounter: (id /*: number */) /*: string */ =>
    `#increment-counter-${id}`,
  insertItem: '#insert-item',
  insertNullItems: '#insert-null-items',
  itemCounter: (id /*: number */) /*: string */ => `#item-counter-${id}`,
  pushFirstItemDown: '#push-first-down',
  pushGridDown: '#push-grid-down',
  scrollContainer: '[data-scroll-container]',
  shuffleItems: '#shuffle-items',
  staticItem: '[data-grid-item].static, .Masonry-Premount .Collection-Item',
  toggleMount: '#toggle-mount',
  toggleScrollContainer: '#toggle-scroll-container',
  updateGridItems: '#update-grid-items',
};

export default selectors;
