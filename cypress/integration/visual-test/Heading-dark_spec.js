describe('Heading dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Heading-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Heading-dark',
    });
  });
});
