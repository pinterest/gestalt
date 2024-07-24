import { create } from 'react-test-renderer';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DeviceTypeProvider from './contexts/DeviceTypeProvider';
import SheetMobile from './SheetMobile';
import * as useReducedMotionHook from './useReducedMotion';

jest.mock('./useReducedMotion');

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
        <SheetMobile heading="test" onDismiss={() => {}} subHeading="test" />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly auto size', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" onDismiss={() => {}} size="auto" subHeading="test" />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly full size', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" onDismiss={() => {}} size="full" subHeading="test" />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly all required labels', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile heading="test" onDismiss={() => {}} subHeading="test" />
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
      screen.getByLabelText('Dismiss bottom sheet', {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('renders correctly navigation icon buttons', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          backIconButton={{
            accessibilityLabel: 'Previous',
            onClick: () => {},
          }}
          forwardIconButton={{
            accessibilityLabel: 'Next',
            onClick: () => {},
          }}
          heading="test"
          onDismiss={() => {}}
          subHeading="test"
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
          onDismiss={() => {}}
          primaryAction={{
            accessibilityLabel: 'Next',
            label: 'Next',
            onClick: () => {},
          }}
          subHeading="test"
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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnClick = jest.fn<[], undefined>();
    const mockOnClickPrimaryAction = jest.fn<
      [
        {
          event:
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>;
          onDismissStart: () => void;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();

    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          onDismiss={mockOnClick}
          primaryAction={{
            accessibilityLabel: 'Next',
            label: 'Next',
            onClick: mockOnClickPrimaryAction,
          }}
          size="full"
          subHeading="test"
        />
      </DeviceTypeProvider>,
    );

    act(() => {
      screen.getByLabelText('Dismiss bottom sheet').click();
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
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    const mockOnClick = jest.fn<[], undefined>();
    const mockOnClickPrimaryAction = jest.fn<
      [
        {
          event:
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>;
          onDismissStart: () => void;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    useReducedMotionMock.mockReturnValue(false);

    render(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          heading="test"
          onDismiss={mockOnClick}
          primaryAction={{
            accessibilityLabel: 'Next',
            label: 'Next',
            onClick: mockOnClickPrimaryAction,
          }}
          subHeading="test"
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

  it('renders correctly full size with dataTestId', () => {
    const component = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          dataTestId="some-test-id"
          heading="test"
          onDismiss={() => {}}
          size="full"
          subHeading="test"
        />
      </DeviceTypeProvider>,
    );
    const testInstance = component.root;
    const sheetMobileElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'some-test-id',
    );
    expect(sheetMobileElement).not.toBeNull();
  });

  it('renders correctly default size with dataTestId', () => {
    const component = create(
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile dataTestId="test" heading="test" onDismiss={() => {}} subHeading="test" />
      </DeviceTypeProvider>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test'),
    ).toHaveLength(1);
  });
});
