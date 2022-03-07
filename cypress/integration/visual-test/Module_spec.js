describe('Module visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Module');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Module',
    });
  });
});
