// @flow strict
import { render, screen } from '@testing-library/react';
import Chart from './Chart.js';

function ChartWrap({ id }: {| id: string |}) {
  return <Chart id={id} />;
}

describe('Chart', () => {
  test('renders correctly', async () => {
    render(<ChartWrap id="123" />);

    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
