import { render, screen } from '@testing-library/react';
import Indicator from './Indicator';

describe('Indicator', () => {
  it('as notification', () => {
    const { baseElement } = render(<Indicator accessibilityLabel="Notification" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('as counter with 1 digit', () => {
    const { baseElement } = render(<Indicator accessibilityLabel="Counter" count={3} />);
    expect(baseElement).toMatchSnapshot();
    expect(screen.getByText('3')).toBeVisible();
  });

  it('as counter with 3 digits', () => {
    const { baseElement } = render(<Indicator accessibilityLabel="Counter" count={100} />);
    expect(baseElement).toMatchSnapshot();
    expect(screen.getByText('99+')).toBeVisible();
  });
});
