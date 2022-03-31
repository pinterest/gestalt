describe('NumberField dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/NumberField-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').find('input').focus();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'NumberField-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
