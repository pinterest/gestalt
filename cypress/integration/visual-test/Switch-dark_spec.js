describe('Switch dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Switch-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Switch-dark',
    });
  });
});
