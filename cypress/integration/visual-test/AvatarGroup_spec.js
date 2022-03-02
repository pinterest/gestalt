describe('AvatarGroup visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/AvatarGroup');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'AvatarGroup',
    });
  });
});
