describe('DatePicker visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/DatePicker-closed-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'DatePicker-closed-dark',
    });
  });
});
