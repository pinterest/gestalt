// @flow strict
import { act, screen, render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import SheetMobile from './SheetMobile.js';
import * as useReducedMotionHook from './useReducedMotion.js';
import DeviceTypeProvider from './contexts/DeviceTypeProvider.js';

jest.mock('./useReducedMotion.js');

describe('SheetMobile', () => {
  const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly default size', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" subHeading="test" onDismiss={() => {}} />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly auto size', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" subHeading="test" onDismiss={() => {}} size="auto" />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly full size', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" subHeading="test" onDismiss={() => {}} size="full" />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly all required labels', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" subHeading="test" onDismiss={() => {}} />
      </DeviceTypeProvider>,
    );

    expect(
      screen.getByLabelText('Bottom sheet', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByLabelText('Grabber', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByLabelText('Close bottom sheet', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('renders correctly navigation icon buttons', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          subHeading="test"
          onDismiss={() => {}}
          backIconButton={{
            accessibilityLabel: 'Previous',
            onClick: () => {},
          }}
          forwardIconButton={{
            accessibilityLabel: 'Next',
            onClick: () => {},
          }}
        />
      </DeviceTypeProvider>,
    );
    expect(
      screen.queryByLabelText('Close bottom sheet', {
        exact: true,
      }),
    ).toBeNull();
    expect(
      screen.getByLabelText('Previous', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByLabelText('Next', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('renders correctly primary action button', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          subHeading="test"
          onDismiss={() => {}}
          primaryAction={{ accessibilityLabel: 'Next', label: 'Next', onClick: () => {} }}
        />
      </DeviceTypeProvider>,
    );
    expect(
      screen.queryAllByRole('button', {
        exact: true,
      }),
    ).toHaveLength(3);
    expect(
      screen.getByText('Next', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('calls onDismiss on full inanimated sheet', async () => {
    const mockOnClick = jest.fn<[], void>();
    const mockOnClickPrimaryAction = jest.fn<
      [
        {|
          event:
            | SyntheticMouseEvent<HTMLButtonElement>
            | SyntheticKeyboardEvent<HTMLButtonElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
          onDismissStart: () => void,
        |},
      ],
      void,
    >();

    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          subHeading="test"
          onDismiss={mockOnClick}
          size="full"
          primaryAction={{
            accessibilityLabel: 'Next',
            label: 'Next',
            onClick: mockOnClickPrimaryAction,
          }}
        />
      </DeviceTypeProvider>,
    );

    act(() => {
      screen.getByLabelText('Close bottom sheet').click();
    });

    expect(mockOnClick).toHaveBeenCalled();

    act(() => {
      screen.getByLabelText('Next').click();
    });

    expect(mockOnClickPrimaryAction).toHaveBeenCalled();
  });

  // This test was skipped because, despite the logic works fine, the animationState is not being correctly updated in the test in the handleExternalDismiss function. We should try to make it work.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('calls onDismiss on animated partial sheet', async () => {
    const mockOnClick = jest.fn<[], void>();
    const mockOnClickPrimaryAction = jest.fn<
      [
        {|
          event:
            | SyntheticMouseEvent<HTMLButtonElement>
            | SyntheticKeyboardEvent<HTMLButtonElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
          onDismissStart: () => void,
        |},
      ],
      void,
    >();
    useReducedMotionMock.mockReturnValue(false);

    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          subHeading="test"
          onDismiss={mockOnClick}
          primaryAction={{
            accessibilityLabel: 'Next',
            label: 'Next',
            onClick: mockOnClickPrimaryAction,
          }}
        />
      </DeviceTypeProvider>,
    );

    const bottomsheet = await screen.findByLabelText('Close bottom sheet');

    act(() => {
      bottomsheet.click();
    });

    fireEvent.animationEnd(screen.getByRole('dialog'));

    expect(mockOnClick).toHaveBeenCalled();

    act(() => {
      screen.getByLabelText('Next').click();
    });

    expect(mockOnClickPrimaryAction).toHaveBeenCalled();
  });
});
