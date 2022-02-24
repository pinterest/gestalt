describe('Divider visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Divider');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Divider',
    });
  });
});
