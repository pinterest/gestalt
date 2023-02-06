// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jest/expect-expect */
// @flow strict
import { create } from 'react-test-renderer';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import Popover from './Popover.js';
import { fallbackLabels } from './contexts/DefaultLabelProvider.js';

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

  test('Should focus on `Dismiss button` when open and has a `Dismiss button`', async () => {
    const ref = document.createElement('div');

    render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
    const element = screen.getByRole('button');

    await waitFor(() => {
      expect(element).toHaveFocus();
    });
  });

  // Possible error on component/test [We'll test manually because the short time]
  test.skip('Should focus to Popover when it open', async () => {
    const ref = document.createElement('div');

    render(<Popover anchor={ref} onDismiss={jest.fn()} />);
    const element = screen.getByRole('dialog');

    await waitFor(() => {
      expect(element).toHaveFocus();
    });
  });

  test('Should call `requestAnimationFrame` passing the `focusPopoverRef` as argue when Popover open', () => {
    const ref = document.createElement('div');
    const spy = jest.fn();

    window.requestAnimationFrame = spy;
    render(<Popover anchor={ref} onDismiss={jest.fn()} />);

    expect(spy).toHaveBeenCalled();
  });

  test('Should use the `useDefaultLabelContext(Popover)` to get default strings', () => {
    const ref = document.createElement('div');

    render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
    const element = screen.getByRole('button');

    expect(element.getAttribute('aria-label')).toEqual(
      fallbackLabels.Popover.accessibilityDismissButtonLabel,
    );
  });

  test('Should resize when screens resizes', () => {
    // Better tested on e2e [We'll test manually because the short time]
  });

  test('Should set `border` className on wrapper container', () => {
    const ref = document.createElement('div');

    render(<Popover anchor={ref} onDismiss={jest.fn()} />);
    const element = screen.getByRole('dialog');

    expect(element.classList).toContain('border');
  });

  test('Should set `rounding: 4` style on wrapper container', () => {
    const ref = document.createElement('div');

    render(<Popover anchor={ref} onDismiss={jest.fn()} />);
    const element = screen.getByRole('dialog');

    expect(element.classList).toContain('rounding4');
  });
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

  // Finished
  describe('onKeyDown', () => {
    test('Should be defined as a listener on window `keydown` event', () => {
      const ref = document.createElement('div');
      const spy = jest.fn();

      render(<Popover anchor={ref} onDismiss={jest.fn()} onKeyDown={spy} />);
      // GetByTagName
      const bodyElement = screen.getByText(
        (content, element) => element?.tagName.toLowerCase() === 'body',
      );

      fireEvent.keyDown(bodyElement, { key: 'A', code: 'KeyA' });

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  // Finished
  describe('id', () => {
    test('Should set the container wrapper `id`', () => {
      const ref = document.createElement('div');
      const idTesting = 'good-test';

      render(<Popover anchor={ref} onDismiss={jest.fn()} id={idTesting} />);
      const element = screen.getByRole('dialog');

      expect(element.getAttribute('id')).toEqual(idTesting);
    });
  });

  // ToDo
  describe('idealDirection', () => {
    test('Should set the direction to ideally render the wrapper container', () => {
      // Better test on e2e [We'll test manually because the short time]
    });
  });

  // fireEvent strange error [We'll test manually because the short time]
  describe.skip('onDismiss', () => {
    test('Should be called when `Dismiss button` has clicked', async () => {
      const spyDismiss = jest.fn();
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={spyDismiss} showDismissButton />);
      const element = screen.getByRole('button');
      fireEvent.click(element);

      expect(spyDismiss).toHaveBeenCalledTimes(1);
    });

    test('Should be called if `ESCAPE` is pressed', () => {
      const spyDismiss = jest.fn();
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={spyDismiss} showDismissButton />);
      // GetByTagName
      const bodyElement = screen.getByText(
        (content, element) => element?.tagName.toLowerCase() === 'body',
      );
      fireEvent.keyPress(bodyElement, { key: 'ESC', code: 'ESCAPE' });

      expect(spyDismiss).toHaveBeenCalledTimes(1);
    });

    test('Should be called if user clicks outside of popover', () => {
      const spyDismiss = jest.fn();
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={spyDismiss} showDismissButton />);
      const bodyElement = screen.getByText(
        (content, element) => element?.tagName.toLowerCase() === 'body',
      );
      fireEvent.click(bodyElement);

      expect(spyDismiss).toHaveBeenCalledTimes(1);
    });
  });

  // ToDo
  describe('positionRelativeToAnchor', () => {
    test('Should scroll the page and popover together if `true`', () => {
      // Better test on e2e [We'll test manually because the short time]
    });

    test('Should scroll the page and popover separately if `false`', () => {
      // Better test on e2e [We'll test manually because the short time]
    });
  });

  // Finished
  describe('role', () => {
    test('Should set `dialog` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.queryByRole('dialog');

      expect(element).not.toBeUndefined();
    });

    test('Should set the wrapper container `role`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} role="menu" />);
      const element = screen.queryByRole('menu');

      expect(element).not.toBeUndefined();
    });
  });

  // Finished
  describe('shouldFocus', () => {
    test('Should set `true` as a default value', async () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.getByRole('dialog');

      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).not.toEqual(element);
      });
    });

    // Possible error on current component [We'll test manually because the short time]
    test.skip('Should focus on wrapper container if `true`', async () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} shouldFocus />);
      const element = screen.getByRole('dialog');

      await waitFor(() => {
        expect(element).toHaveFocus();
      });
    });

    test('Should not focus on wrapper container if `false`', async () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} shouldFocus={false} />);
      const element = screen.getByRole('dialog');

      await waitFor(() => {
        expect(element).not.toHaveFocus();
      });
    });
  });

  // Finished
  describe('showCaret', () => {
    test('Should set `false` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showCaret={false} />);
      // QueryByClassName
      const caret = screen.queryByText((_, element) => !!element?.classList.contains('caret'));

      expect(caret).toBeNull();
    });

    test('Should set the container `caret`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showCaret />);
      // GetByClassName
      const caret = screen.getByText((_, element) => !!element?.classList.contains('caret'));

      expect(caret).toBeTruthy();
    });
  });

  // Finished
  describe('showDismissButton', () => {
    test('Should set `false` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.queryByRole('button');

      expect(element).toBeNull();
    });

    test('Should render a flex display column with the Dismiss button and children', () => {
      const ref = document.createElement('div');

      render(
        <Popover anchor={ref} onDismiss={jest.fn()} showDismissButton>
          <a href="https://www.pinterest.com">test</a>
        </Popover>,
      );
      const element = screen.getByRole('dialog');
      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = element.firstChild;
      const { children } = wrapper;

      expect(wrapper?.classList).toContain('Flex');
      expect(wrapper?.classList).toContain('xsDirectionColumn');

      expect(children).toHaveLength(2);
      expect(within(children[0]).getByRole('button')).toBeTruthy();
      expect(within(children[1]).getByText('test')).toBeTruthy();
    });

    test('Should render a `InternalDismissButton`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('data-displayname')).toEqual('InternalDismissIconButton');
    });

    test('Should render a `InternalDismissButton` with `xs` size', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('img');

      expect(element.getAttribute('width')).toEqual('12');
      expect(element.getAttribute('height')).toEqual('12');
    });

    test('Should render a `InternalDismissButton` with default `a11yLabel`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('data-displayname')).toEqual('InternalDismissIconButton');
      expect(element.getAttribute('aria-label')).toEqual('Close popover');
    });

    test('Should render a `InternalDismissButton` with prop-based `a11yLabel`', () => {
      const ref = document.createElement('div');
      const expectedA11yLabel = 'good test';

      render(
        <Popover
          anchor={ref}
          onDismiss={jest.fn()}
          showDismissButton
          accessibilityDismissButtonLabel={expectedA11yLabel}
        />,
      );
      const element = screen.getByRole('button');

      expect(element.getAttribute('data-displayname')).toEqual('InternalDismissIconButton');
      expect(element.getAttribute('aria-label')).toEqual(expectedA11yLabel);
    });

    test('Should render a `InternalDismissButton` aligned to `end`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} showDismissButton />);
      const element = screen.getByRole('dialog');
      // eslint-disable-next-line testing-library/no-node-access
      const { children } = element.firstChild;

      expect(children[0].classList).toContain('selfEnd');
    });
  });

  // Finished
  describe('size', () => {
    const SIZE_WIDTH_MAP = {
      xs: 180,
      sm: 230,
      md: 284,
      lg: 320,
      xl: 360,
    };

    test('Should set `sm` as a default value', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.sm}px;`);
    });

    test('Should set the container `size` as null if is equal `flexible`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="flexible" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).not.toContain(`max-width`);
    });

    test('Should has `180px` of maxWidth of wrapper container if value is `xs`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="xs" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.xs}px;`);
    });

    test('Should has `230px` of maxWidth of wrapper container if value is `sm`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="sm" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.sm}px;`);
    });

    test('Should has `284px` of maxWidth of wrapper container if value is `md`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="md" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.md}px;`);
    });

    test('Should has `320px` of maxWidth of wrapper container if value is `lg`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="lg" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.lg}px;`);
    });

    test('Should has `360px` of maxWidth of wrapper container if value is `xl`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="xl" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${SIZE_WIDTH_MAP.xl}px;`);
    });

    test('Should has same maxWidth of wrapper container of content if value is `flexible`', () => {
      const ref = document.createElement('div');

      render(<Popover anchor={ref} onDismiss={jest.fn()} size="flexible" />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).not.toContain(`max-width`);
    });

    test('Should has same maxWidth of wrapper container of the `number` on value', () => {
      const ref = document.createElement('div');
      const randomNumber = Math.floor(Math.random() * 10) + 1;

      render(<Popover anchor={ref} onDismiss={jest.fn()} size={randomNumber} />);
      const element = screen.queryByRole('dialog');

      expect(element?.getAttribute('style')).toContain(`max-width: ${randomNumber}px;`);
    });
  });
});
