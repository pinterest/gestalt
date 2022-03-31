describe('TextArea dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/TextArea-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'TextArea-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
