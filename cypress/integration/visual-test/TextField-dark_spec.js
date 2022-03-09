describe('TextField dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/TextField-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'TextField-dark',
    });
  });
});
