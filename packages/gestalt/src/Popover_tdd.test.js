/* eslint-disable jest/expect-expect */
// @flow strict
import { create } from 'react-test-renderer';
import Popover from './Popover.js';

describe('Bugs', () => {
  test('01 - Popover-based components within Modals or small containers', () => {});

  test('02 - Popover-based components off centered', () => {});

  test('03 - Popover-based components in Tables including Fixed Headers', () => {});

  test('04 - Tooltips not anchored in headers/fixed-position menus', () => {});

  test('05 - Tooltip incorrect sizing in top-left corner', () => {});

  test('06 - Tooltip incorrectly positioned in bottom/right edge in floating IconButtons', () => {});

  test('07 - Popover-based components incorrect sizing in top-left corner', () => {});

  test('08 - Popover doesn’t get the anchor reference with responsive Box', () => {});
});

describe('Features', () => {
  test('Popover renders', () => {
    const element = document.createElement('div');
    const component = create(
      <Popover anchor={element} idealDirection="down" onDismiss={jest.fn()} size="sm" />,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Popover renders as error', () => {
    const element = document.createElement('div');
    const component = create(
      <Popover
        anchor={element}
        idealDirection="down"
        onDismiss={jest.fn()}
        color="red"
        size="sm"
      />,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Popover renders as blue', () => {
    const element = document.createElement('div');
    const component = create(
      <Popover
        anchor={element}
        idealDirection="down"
        onDismiss={jest.fn()}
        color="blue"
        size="sm"
      />,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Popover does not render when the anchor is null', () => {
    const tree = create(<Popover anchor={null} onDismiss={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should focus on `Dismiss button` when open and has a `Dismiss button`', () => {});

  test('Should focus to Popover when it open', () => {});

  test('Should call `requestAnimationFrame` passing the `focusPopoverRef` as arg whe Popover open', () => {});

  test('Should use the `useDefaultLabelContext(Popover)` to get default strings', () => {});

  test('Should resize when screens resizes', () => {});

  test('Should set `border: 1px solid currentColor;` on wrapper container', () => {});

  test('Should set `border-radius: 8px;` or `rounding: 2` on wrapper container', () => {});

  // test('', () => {});
});

describe('Props', () => {
  describe('accessibilityLabel', () => {
    test('Should set `Popover` as a default value', () => {});
    test('Should set the wrapper container (root HTML element) `accessibilityLabel`', () => {});
    // test('Should set the container `accessibilityLabel`', () => {});
  });

  describe('accessibilityDismissButtonLabel', () => {
    test('Should not has a default value', () => {});
    test('Should set the `Dismiss button` accessibilityLabel', () => {});
  });

  describe('anchor', () => {
    test('Should not render a `react node` if `null`', () => {});
    // test('Should set as the container `anchor`', () => {});
  });

  describe('children', () => {
    test('Should render after the `Dismiss button`', () => {});
    test('Should render on body of component', () => {});
  });

  describe('color', () => {
    test('Should set `white` as a default value', () => {});
    test('Should set iconColor of Dismiss button as `darkGray` if white', () => {});
    test('Should set iconColor of Dismiss button as `white` if is not white', () => {});
    test('Should set `{color}BgElevated` as background-color on wrapper container if value is equal `white`', () => {});
    test('Should set `{color}Bg` as background-color on wrapper container if value different of `white`', () => {});
    test('Should set `whiteElevated` as color on wrapper container if value is equal `white`', () => {});
    test('Should set color on wrapper container', () => {});

    // test('Should set the container `backgroundColor`', () => {});
  });

  describe('onKeyDown', () => {
    test('Should be defined as a listener on window `keydown` event', () => {});
    // test('Should set the container `onKeyDown`', () => {});
  });

  describe('id', () => {
    test('Should set the container wrapper `id`', () => {});
    // test('Should set the container `id`', () => {});
  });

  describe('idealDirection', () => {
    test('Should set the direction to ideally render the wrapper container', () => {});
    // test('Should set the container `idealDirection`', () => {});
  });

  describe('onDismiss', () => {
    test('Should be called when `Dismiss button` has clicked', () => {});
    test('Should be called if `ESCAPE` is pressed', () => {});
    test('Should be called if user clicks outside of popover', () => {});
    // test('Should set the container `onDismiss`', () => {});
  });

  describe('positionRelativeToAnchor', () => {
    test('Should scroll the page and popover together if `true`', () => {});
    test('Should scroll the page and popover separately if `false`', () => {});
    // test('Should set the container `positionRelativeToAnchor`', () => {});
  });

  describe('role', () => {
    test('Should set `dialog` as a default value', () => {});
    test('Should set the wrapper container `role`', () => {});
    // test('Should set the container `role`', () => {});
  });

  describe('shouldFocus', () => {
    test('Should set `true` as a default value', () => {});
    test('Should focus on wrapper container if `true`', () => {});
    test('Should not focus on wrapper container if `false`', () => {});
    // test('Should set the container `shouldFocus`', () => {});
  });

  describe('showCaret', () => {
    test('Should set `false` as a default value', () => {});
    test('Should set the container `caret`', () => {});
  });

  describe('showDismissButton', () => {
    test('Should set `false` as a default value', () => {});
    test('Should render a flex display column with the Dismiss button and children', () => {});
    test('Should render a `InternalDismissButton`', () => {});
    test('Should render a `InternalDismissButton` with `xs` size', () => {});
    test('Should render a `InternalDismissButton` with default `a11yLabel`', () => {});
    test('Should render a `InternalDismissButton` with prop-based `a11yLabel`', () => {});
    test('Should render a `InternalDismissButton` aligned to `end`', () => {});
  });

  describe('size', () => {
    test('Should set `sm` as a default value', () => {});
    test('Should set the container `size` as null if is equal `flexible`', () => {});
    test('Should has `180px` of maxWidth of wrapper container if value is `xs`', () => {});
    test('Should has `230px` of maxWidth of wrapper container if value is `sm`', () => {});
    test('Should has `284px` of maxWidth of wrapper container if value is `md`', () => {});
    test('Should has `320px` of maxWidth of wrapper container if value is `lg`', () => {});
    test('Should has `360px` of maxWidth of wrapper container if value is `xl`', () => {});
    test('Should has same maxWidth of wrapper container of content if value is `flexible`', () => {});
    test('Should has same maxWidth of wrapper container of the `number` on value', () => {});
    // test('Should set the container `size` prop-based', () => {});
  });
});
