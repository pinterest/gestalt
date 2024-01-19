// @flow strict
import {
  cloneElement,
  type Element,
  type ElementConfig,
  Fragment,
  type Node as ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Avatar from '../Avatar';
import Box from '../Box';
import ColorSchemeProvider, { useColorScheme } from '../contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon, { type IconColor } from '../Icon';
import Image from '../Image';
import Link from '../Link';
import Mask from '../Mask';
import Spinner from '../Spinner';
import Text from '../Text';

const SIZE_THUMBNAIL = 32;
const SIZE_ICON = 24;

export function ToastMessage({
  text,
  textElement,
  helperLink,
  textColor,
  type,
}: {
  text: ?string | Element<'span'>,
  textElement: ?string | Element<'span'>,
  textColor: $ElementType<ElementConfig<typeof Text>, 'color'>,
  helperLink?: {
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    }) => void,
  },
  type?: 'default' | 'success' | 'error' | 'progress',
}): ReactNode {
  const isError = type === 'error';
  const textRef = useRef<null | HTMLElement>(null);
  const [ellipsisActive, setEllipsisActive] = useState(false);

  // There’s two attributes for HTML elements which we can use to check if the text is truncated, offsetHeight and scrollHeight. scrollHeight is the total scrollable content height, and offsetHeight is the visible height on the screen. For an overflow view, the scrollHeight is larger than offsetHeight. We can deduce that if the scrollHeight is larger than the offsetHeight, then the element is truncated.
  const isEllipsisActive = (element: HTMLElement) =>
    element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;

  const checkEllipsisActive = useCallback(() => {
    if (textRef.current && !ellipsisActive && isEllipsisActive(textRef?.current)) {
      setEllipsisActive(true);
    } else if (textRef.current && ellipsisActive && !isEllipsisActive(textRef?.current)) {
      setEllipsisActive(false);
    }
  }, [ellipsisActive]);

  useEffect(() => {
    checkEllipsisActive();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkEllipsisActive);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkEllipsisActive);
    };
  }, [checkEllipsisActive]);

  const isTruncated = !textElement && text && ellipsisActive;
  const isTruncatedWithHelperLink = isTruncated && helperLink;

  return (
    <Fragment>
      {textElement ?? null}
      {!textElement && text ? (
        <Text
          inline
          align="start"
          color={textColor}
          weight={isError ? 'bold' : undefined}
          lineClamp={2}
          ref={textRef}
          // Set title prop manually if text is truncated
          title={isTruncated && typeof text === 'string' ? text : undefined}
        >
          {text}
          {helperLink ? (
            <Fragment>
              {' '}
              <Text inline color={textColor} weight={isError ? 'bold' : undefined}>
                <Link
                  accessibilityLabel={helperLink.accessibilityLabel}
                  href={helperLink.href}
                  onClick={helperLink.onClick}
                  target="blank"
                  display="inlineBlock"
                >
                  {helperLink.text}
                </Link>
              </Text>
            </Fragment>
          ) : null}
        </Text>
      ) : null}
      {/* Should the helkper link */}
      {isTruncatedWithHelperLink ? (
        <Text color={textColor} weight={isError ? 'bold' : undefined}>
          <Link
            accessibilityLabel={helperLink?.accessibilityLabel ?? ''}
            href={helperLink?.href ?? ''}
            display="inlineBlock"
            onClick={helperLink?.onClick}
            target="blank"
          >
            {helperLink?.text}
          </Link>
        </Text>
      ) : null}
    </Fragment>
  );
}

export function ToastImageThumbnail({
  thumbnail,
}: {
  thumbnail: Element<typeof Image>,
}): ReactNode {
  return (
    <Box aria-hidden>
      <Mask height={SIZE_THUMBNAIL} rounding={2} width={SIZE_THUMBNAIL}>
        {thumbnail}
      </Mask>
    </Box>
  );
}

export function ToastIconThumbnail({
  thumbnail,
  overrideColor,
}: {
  thumbnail: Element<typeof Icon>,
  overrideColor?: IconColor,
}): ReactNode {
  return (
    <Box aria-hidden>
      {cloneElement(thumbnail, {
        size: SIZE_ICON,
        color: overrideColor ?? thumbnail.props.color,
      })}
    </Box>
  );
}

export function ToastAvatarThumbnail({
  thumbnail,
}: {
  thumbnail: Element<typeof Avatar>,
}): ReactNode {
  return <Box aria-hidden>{cloneElement(thumbnail, { size: 'sm' })}</Box>;
}

export function ToastTypeThumbnail({
  type,
}: {
  type: 'default' | 'success' | 'error' | 'progress',
}): ReactNode {
  const { name: colorSchemeName } = useColorScheme();
  const {
    accessibilityIconSuccessLabel,
    accessibilityIconErrorLabel,
    accessibilityProcessingLabel,
  } = useDefaultLabelContext('Toast');

  return (
    <Fragment>
      {type === 'error' ? (
        <Icon
          color="inverse"
          icon="workflow-status-problem"
          accessibilityLabel={accessibilityIconErrorLabel}
          size={SIZE_ICON}
        />
      ) : null}
      {type === 'success' ? (
        <ColorSchemeProvider
          colorScheme={colorSchemeName === 'darkMode' ? 'light' : 'dark'}
          id="icon-toast-success"
        >
          <Icon
            color="success"
            icon="workflow-status-ok"
            accessibilityLabel={accessibilityIconSuccessLabel}
            size={SIZE_ICON}
          />
        </ColorSchemeProvider>
      ) : null}
      {type === 'progress' ? (
        <Spinner accessibilityLabel={accessibilityProcessingLabel} color="default" show size="sm" />
      ) : null}
    </Fragment>
  );
}
