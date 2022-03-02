describe('Button visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/IconButton');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'IconButton',
    });
  });
});
