describe('DatePicker visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/DatePicker-closed');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'DatePicker-closed',
    });
  });
});
