describe('Avatar visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Avatar');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Avatar',
    });
  });
});
