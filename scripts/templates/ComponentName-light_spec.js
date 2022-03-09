describe('ComponentName light mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComponentName-light');
  });

  // eslint-disable-next-line jest/expect-expect
  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComponentName-light',
    });
  });
});
