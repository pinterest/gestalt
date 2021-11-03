describe('ComponentName dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComponentName-dark');
  });

  // eslint-disable-next-line jest/expect-expect
  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComponentName-dark',
    });
  });
});
