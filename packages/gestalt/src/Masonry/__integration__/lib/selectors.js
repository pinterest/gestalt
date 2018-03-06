const selectors = {
  afterGrid: '.afterGrid',
  gridItem: '[data-grid-item]',
  expandGridItems: '#expand-grid-items',
  incrementItemCounter: id => `#increment-counter-${id}`,
  insertItem: '#insert-item',
  insertNullItems: '#insert-null-items',
  itemCounter: id => `#item-counter-${id}`,
  pushFirstItemDown: '#push-first-down',
  pushGridDown: '#push-grid-down',
  scrollContainer: '[data-scroll-container]',
  shufflePins: '#shuffle-pins',
  staticItem: '.static',
  toggleMount: '#toggle-mount',
  toggleScrollContainer: '#toggle-scroll-container',
  updateGridItems: '#update-grid-items',
};

export default selectors;
