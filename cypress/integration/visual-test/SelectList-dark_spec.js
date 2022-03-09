describe('SelectList dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SelectList-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SelectList-dark',
    });
  });
});
