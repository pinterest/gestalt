describe('Callout visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Callout');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Callout',
    });
  });
});
