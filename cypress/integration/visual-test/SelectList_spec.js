describe('SelectList visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SelectList');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SelectList',
    });
  });
});
