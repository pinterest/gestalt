describe('NumberField visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/NumberField');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').find('input').focus();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'NumberField',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
