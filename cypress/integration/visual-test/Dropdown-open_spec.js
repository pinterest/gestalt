describe('Dropdown visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Dropdown-open');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').find('button').click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Dropdown-open',
    });
  });
});
