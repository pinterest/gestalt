// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import OptionItem from './OptionItem.js';

describe('OptionItem', () => {
  const props = {
    hoveredItemIndex: null,
    id: 'optionItemId',
    index: 0,
    option: {
      label: 'Option item label',
      value: 'Option item value',
    },
    setHoveredItemIndex: jest.fn<[number], void>(),
  };

  it('Should render correctly', () => {
    render(<OptionItem {...props} />);

    expect(screen.getByText(/Option item label/i)).toBeInTheDocument();
  });

  it('Should render subtext correctly', () => {
    render(<OptionItem {...props} option={{ ...props.option, subtext: 'Option item subtext' }} />);

    expect(screen.getByText(/Option item label/i)).toBeInTheDocument();
    expect(screen.getByText(/Option item subtext/i)).toBeInTheDocument();
  });

  it('Should call set hover item index function when clicked', () => {
    render(<OptionItem {...props} />);
    fireEvent.mouseOver(screen.getByText(/Option item label/i));

    expect(props.setHoveredItemIndex).toHaveBeenCalledWith(0);
  });

  it('Should include data test id prop', () => {
    render(<OptionItem {...props} dataTestId="option-item-data-test-id" />);

    expect(screen.getByTestId('option-item-data-test-id')).toBeInTheDocument();
  });
});
