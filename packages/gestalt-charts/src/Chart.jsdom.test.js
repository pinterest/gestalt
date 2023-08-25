// @flow strict-local
import { render, screen } from '@testing-library/react';
import { Text } from 'gestalt';

describe('Chart', () => {
  test('renders correctly', async () => {
    render(<Text>123</Text>);

    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
