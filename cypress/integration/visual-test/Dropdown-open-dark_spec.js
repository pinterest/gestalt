describe('Dropdown visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Dropdown-open-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').find('button').click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Dropdown-open-dark',
    });
  });
});
