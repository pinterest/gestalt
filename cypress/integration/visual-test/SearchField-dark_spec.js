describe('SearchField dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SearchField-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SearchField-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
