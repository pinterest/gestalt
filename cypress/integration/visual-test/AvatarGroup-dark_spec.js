describe('AvatarGroup dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/AvatarGroup-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'AvatarGroup-dark',
    });
  });
});
