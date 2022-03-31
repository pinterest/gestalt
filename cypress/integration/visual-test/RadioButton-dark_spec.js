describe('RadioButton dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/RadioButton-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'RadioButton-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
