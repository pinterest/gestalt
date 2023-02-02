// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jest/expect-expect */
// @flow strict
import { create } from 'react-test-renderer';
import { screen, render, act } from '@testing-library/react';
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
});

describe('Props', () => {
  // Finished
  describe('accessibilityLabel', () => {
    test('Should set `Popover` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.getByRole('dialog');

      expect(element.getAttribute('aria-label')).toEqual('Popover');
    });

    test('Should set the wrapper container (root HTML element) `accessibilityLabel`', () => {
      const a11yTestLabel = 'good-test';
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} accessibilityLabel={a11yTestLabel} />);
      const element = screen.getByRole('dialog');

      expect(element.getAttribute('aria-label')).toEqual(a11yTestLabel);
    });
  });

  // Finished
  describe('accessibilityDismissButtonLabel', () => {
    test('Should has `Closer popover` as default value', () => {
      const a11yTestLabel = 'Close popover';
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('aria-label')).toEqual(a11yTestLabel);
    });

    test('Should set the `Dismiss button` accessibilityLabel', () => {
      const a11yTestLabel = 'Close test label';
      const ref = document.createElement('div');

      render(
        <Popover
          anchor={ref}
          onDismiss={jest.fn()}
          showDismissButton
          accessibilityDismissButtonLabel={a11yTestLabel}
        />,
      );
      const element = screen.getByRole('button');

      expect(element.getAttribute('aria-label')).toEqual(a11yTestLabel);
    });
  });

  // Finished
  describe('anchor', () => {
    test('Should not render a `react node` if `null`', () => {
      const tree = create(<Popover anchor={null} onDismiss={() => {}} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  // Finished
  describe('children', () => {
    test('Should render after the `Dismiss button`', () => {
      const ref = document.createElement('div');
      const testId = 'link-test-id';

      render(
        <Popover anchor={ref} onDismiss={jest.fn()} showDismissButton>
          <a id={testId} href="http://pinterest.com">
            test
          </a>
        </Popover>,
      );

      expect(screen.getByRole('button')).toBeTruthy();
      expect(screen.getByRole('link')).toBeTruthy();
    });

    test('Should render on body of component', () => {
      const ref = document.createElement('div');
      const testId = 'link-test-id';

      render(
        <Popover anchor={ref} onDismiss={jest.fn()}>
          <a id={testId} href="http://pinterest.com">
            test
          </a>
        </Popover>,
      );
      const element = screen.getByRole('dialog');
      const { children } = element;

      expect(children).toHaveLength(1);
      expect(children[0].id).toEqual(testId);
    });
  });

  // Finished
  describe('color', () => {
    test('Should set `white` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.getByRole('dialog');

      expect(element.classList).toContain('whiteBgElevated');
    });

    test('Should set iconColor of Dismiss button as `darkGray` if white', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('img');

      expect(element.classList).toContain('defaultIcon');
    });

    test('Should set iconColor of Dismiss button as `white` if is not white', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} color="blue" showDismissButton />);
      const element = screen.getByRole('img');

      expect(element.classList).toContain('inverseIcon');
    });

    test('Should set `{color}BgElevated` as background-color on wrapper container if value is equal `white`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} color="white" showDismissButton />);
      const element = screen.getByRole('dialog');

      expect(element.classList).toContain('whiteBgElevated');
    });

    test('Should set `{color}Bg` as background-color on wrapper container if value is not `white`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} color="blue" showDismissButton />);
      const element = screen.getByRole('dialog');

      expect(element.classList).toContain('blueBg');
    });

    test('Should set `whiteElevated` as color on wrapper container if value is equal `white`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} color="white" showDismissButton />);
      const element = screen.getByRole('dialog');

      expect(element.classList).toContain('whiteElevated');
    });
  });

  describe('onKeyDown', () => {
    test('Should be defined as a listener on window `keydown` event', () => {});
  });

  describe('id', () => {
    test('Should set the container wrapper `id`', () => {});
  });

  describe('idealDirection', () => {
    test('Should set the direction to ideally render the wrapper container', () => {});
  });

  describe('onDismiss', () => {
    test('Should be called when `Dismiss button` has clicked', () => {});
    test('Should be called if `ESCAPE` is pressed', () => {});
    test('Should be called if user clicks outside of popover', () => {});
  });

  describe('positionRelativeToAnchor', () => {
    test('Should scroll the page and popover together if `true`', () => {});
    test('Should scroll the page and popover separately if `false`', () => {});
  });

  describe('role', () => {
    test('Should set `dialog` as a default value', () => {});
    test('Should set the wrapper container `role`', () => {});
  });

  describe('shouldFocus', () => {
    test('Should set `true` as a default value', () => {});
    test('Should focus on wrapper container if `true`', () => {});
    test('Should not focus on wrapper container if `false`', () => {});
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
  });
});
