import { TOKEN_COLOR_ICON_INFO, TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
import InlineStyle from './InlineStyle';
import useExperimentalTheme from '../utils/useExperimentalTheme';

function BarLabel({
  icon,
  size = 16,
  text,
  layout,
  ...props
}: {
  icon?: 'ribbon';
  size?: 16 | 24;
  text?: string;
  layout?: 'vertical' | 'horizontal';
  x: number;
  y: number;
  value: string;
  width: number;
  height: number;
}) {
  const theme = useExperimentalTheme();

  let dPath;
  let VRdPathVR;

  if (icon === 'ribbon') {
    dPath =
      'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6m7.96 1.21a9 9 0 1 0-15.91 0L2.32 19.6a2.27 2.27 0 0 0 2.91 2.74l1.76-.6 1.07 1.3a2.26 2.26 0 0 0 3.92-.84l.01-.04.01.04a2.26 2.26 0 0 0 3.92.85l1.07-1.3 1.76.59a2.27 2.27 0 0 0 2.9-2.74zm-2.35 2.83.8 3.02-2.41-.8-1.47 1.77-.6-2.24q2.07-.46 3.68-1.75m-7.55 1.75-.6 2.24L8 18.25l-2.42.8.81-3.01a9 9 0 0 0 3.67 1.75M6 9a6 6 0 1 1 12 0A6 6 0 0 1 6 9';
    VRdPathVR =
      'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10M9 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0m10.48 5a9 9 0 1 0-14.97 0l-1.7 6.4a1.7 1.7 0 0 0 2.5 1.92l1.94-1.12 1.12 1.95a1.7 1.7 0 0 0 3.12-.42l.51-1.88.5 1.88a1.7 1.7 0 0 0 3.13.42l1.12-1.95 1.95 1.12a1.7 1.7 0 0 0 2.5-1.92zM5 9a7 7 0 1 1 14 0A7 7 0 0 1 5 9m14.08 11.24-3.06-1.77-1.77 3.06-.97-3.62c1.75-.25 3.34-1 4.61-2.1zm-9.33 1.3-1.77-3.07-3.06 1.77L6.1 15.8a9 9 0 0 0 4.6 2.1z';
  }

  const xVerticalPosText = props.x + props.width + (size === 16 ? 27 : 32);
  const yVerticalPosText = props.y + 5 + props.height / 2;

  const xHorizontalPosText = icon ? props.x + 4 + props.width / 2 : props.x + props.width / 2;
  const yHorizontalPosText = props.y - 10;

  const xVerticalPosIcon = props.x + props.width + (size === 16 ? 7 : 7);
  const yVerticalPosIcon = props.y - (size === 16 ? 7 : 12) + props.height / 2;

  const xHorizontalPosIcon = props.x + props.width / 2 - size;
  const yHorizontalPosIcon = props.y - (size === 16 ? 22 : 25);

  return (
    <g>
      <InlineStyle
        unsafeCSS=".VRbodySM {
  font-family: var(--sema-font-family-body-sm);
  font-size: var(--sema-font-size-body-sm);
  font-weight: var(--sema-font-weight-body-sm-default);
  letter-spacing: var(--sema-font-letterspacing-body-sm);
  line-height: var(--sema-font-lineheight-body-sm);
  text-decoration: var(--sema-font-textdecoration-body-sm-default);
}

.bodySM {
  font-family: var(--font-family-default-latin);
  font-size: var(--font-size-100);
  font-weight: var(--font-weight-normal);
}
"
      />
      <text
        className={theme.MAIN ? 'VRbodySM' : 'bodySM'}
        fill={TOKEN_COLOR_TEXT_DEFAULT}
        textAnchor={icon ? undefined : 'middle'}
        x={layout === 'vertical' ? xHorizontalPosText : xVerticalPosText}
        y={layout === 'vertical' ? yHorizontalPosText : yVerticalPosText}
      >
        {text ?? props.value}
      </text>

      {icon && (
        <svg
          fill={TOKEN_COLOR_ICON_INFO}
          height={size}
          role="img"
          viewBox="0 0 24 24"
          width={size}
          x={layout === 'vertical' ? xHorizontalPosIcon : xVerticalPosIcon}
          y={layout === 'vertical' ? yHorizontalPosIcon : yVerticalPosIcon}
        >
          <path d={theme.MAIN ? VRdPathVR : dPath} />
        </svg>
      )}
    </g>
  );
}

BarLabel.displayName = 'BarLabel';

export default BarLabel;
