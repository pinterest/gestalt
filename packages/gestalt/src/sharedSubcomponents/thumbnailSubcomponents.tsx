import {
  cloneElement,
  ComponentProps,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Box from '../Box';
import ColorSchemeProvider, { useColorScheme } from '../contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon, { IconColor } from '../Icon';
import Link from '../Link';
import Mask from '../Mask';
import Spinner from '../Spinner';
import Text from '../Text';
import useInExperiment from '../useInExperiment';

const SIZE_THUMBNAIL = 32;
const SIZE_VR_THUMBNAIL = 36;
const SIZE_ICON = 24;

export function Message({
  text,
  textElement,
  helperLink,
  textColor,
  type,
}: {
  text: string | null | undefined | ReactElement;
  textElement: string | null | undefined | ReactElement;
  textColor: ComponentProps<typeof Text>['color'];
  helperLink?: {
    text: string;
    accessibilityLabel: string;
    href: string;
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
  type?: 'default' | 'success' | 'error' | 'progress';
}) {
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
          ref={textRef}
          align="start"
          color={textColor}
          inline
          lineClamp={2}
          title={isTruncated && typeof text === 'string' ? text : undefined}
          // Set title prop manually if text is truncated
          weight={isError ? 'bold' : undefined}
        >
          {text}
          {helperLink ? (
            <Fragment>
              {' '}
              <Text color={textColor} inline weight={isError ? 'bold' : undefined}>
                <Link
                  accessibilityLabel={helperLink.accessibilityLabel}
                  display="inlineBlock"
                  href={helperLink.href}
                  onClick={helperLink.onClick}
                  target="blank"
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
            display="inlineBlock"
            href={helperLink?.href ?? ''}
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

export function ImageThumbnail({ thumbnail }: { thumbnail: ReactElement }) {
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <Box aria-hidden>
      <Mask
        height={isInExperiment ? SIZE_VR_THUMBNAIL : SIZE_THUMBNAIL}
        rounding={2}
        width={isInExperiment ? SIZE_VR_THUMBNAIL : SIZE_THUMBNAIL}
      >
        {thumbnail}
      </Mask>
    </Box>
  );
}

export function IconThumbnail({
  thumbnail,
  overrideColor,
}: {
  thumbnail: ReactElement;
  overrideColor?: IconColor;
}) {
  return (
    <Box aria-hidden>
      {cloneElement(thumbnail, {
        size: SIZE_ICON,
        color: overrideColor ?? thumbnail.props.color,
      })}
    </Box>
  );
}

export function AvatarThumbnail({ thumbnail }: { thumbnail: ReactElement }) {
  return <Box aria-hidden>{cloneElement(thumbnail, { size: 'sm' })}</Box>;
}

export function TypeThumbnail({ type }: { type: 'default' | 'success' | 'error' | 'progress' }) {
  const { colorSchemeName } = useColorScheme();
  const {
    accessibilityIconSuccessLabel,
    accessibilityIconErrorLabel,
    accessibilityProcessingLabel,
  } = useDefaultLabelContext('Toast');

  return (
    <Fragment>
      {type === 'error' ? (
        <Icon
          accessibilityLabel={accessibilityIconErrorLabel}
          color="inverse"
          icon="workflow-status-problem"
          size={SIZE_ICON}
        />
      ) : null}
      {type === 'success' ? (
        <ColorSchemeProvider
          colorScheme={colorSchemeName === 'darkMode' ? 'light' : 'dark'}
          id="icon-toast-success"
        >
          <Icon
            accessibilityLabel={accessibilityIconSuccessLabel}
            color="success"
            icon="workflow-status-ok"
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
