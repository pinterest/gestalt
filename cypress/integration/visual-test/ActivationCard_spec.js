describe('ActivationCard visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ActivationCard');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ActivationCard',
    });
  });
});
