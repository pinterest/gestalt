describe('Status visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Status');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Status',
    });
  });
});
