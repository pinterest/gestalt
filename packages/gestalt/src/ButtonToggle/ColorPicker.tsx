import {
  TOKEN_COLOR_BACKGROUND_BUTTON_SELECTED_DEFAULT,
  TOKEN_COLOR_BORDER_DEFAULT,
  TOKEN_COLOR_BORDER_FOCUS,
} from 'gestalt-design-tokens';
import styles from './ColorPicker.css';
import Box from '../Box';
import useInExperiment from '../useInExperiment';

const outlineWidth = 2;

const heights = {
  sm: 32,
  md: 40,
  lg: 48,
};

const widths = {
  sm: 60,
  md: 72,
  lg: 88,
};

const rounding = {
  sm: 8,
  md: 12,
  lg: 16,
};

const skinColor = {
  skinTone1: '#F0E3DC',
  skinTone2: '#F8D7D8',
  skinTone3: '#F2D7BE',
  skinTone4: '#F7C3AF',
  skinTone5: '#DEBAB0',
  skinTone6: '#E0999A',
  skinTone7: '#DDA67C',
  skinTone8: '#D98A64',
  skinTone9: '#9A6B52',
  skinTone10: '#A25847',
  skinTone11: '#B37143',
  skinTone12: '#BF6951',
  skinTone13: '#683929',
  skinTone14: '#34261F',
  skinTone15: '#64281B',
  skinTone16: '#4F2221',
};

export type SkinColor = keyof typeof skinColor;

function getOutlineColor(hovered: boolean, selected: boolean, focused: boolean) {
  // Selection state takes precedence
  if (selected && !focused) {
    return TOKEN_COLOR_BACKGROUND_BUTTON_SELECTED_DEFAULT;
  }
  if (hovered && !focused) {
    return TOKEN_COLOR_BORDER_DEFAULT;
  }
  if (focused) {
    return TOKEN_COLOR_BORDER_FOCUS;
  }
  return 'transparent';
}

export type Props = {
  colors: ReadonlyArray<string>;
  selected: boolean;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  isHovered: boolean;
  isFocused: boolean;
};

export default function ColorPicker({ colors, selected, isHovered, isFocused, size }: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const vrFocus = isFocused && isInVRExperiment;
  const hasBorder = isHovered || selected || vrFocus || isFocused;
  const filtersContainerHeightPx = heights[size] - (hasBorder ? outlineWidth : 0);
  const filtersContainerWidthPx = widths[size] - (hasBorder ? outlineWidth : 0);
  const outlineStyle = `${
    outlineWidth + ((selected && isFocused) || (!isInVRExperiment && isFocused) ? 2 : 0)
  }px solid ${getOutlineColor(isHovered, selected, isFocused)}`;

  return (
    <Box
      alignContent="center"
      color="default"
      dangerouslySetInlineStyle={
        hasBorder
          ? {
              __style: {
                outline: outlineStyle,
                outlineOffset: isInVRExperiment || !isFocused ? outlineWidth : 0,
                margin: outlineWidth / 2,
              },
            }
          : undefined
      }
      display="flex"
      height={filtersContainerHeightPx}
      justifyContent="center"
      overflow="hidden"
      rounding={
        isInVRExperiment
          ? ((rounding[size] / 4) as
              | 0
              | 2
              | 'circle'
              | 8
              | 4
              | 'pill'
              | 1
              | 3
              | 5
              | 6
              | 7
              | undefined)
          : 'pill'
      }
      width={filtersContainerWidthPx}
      wrap
    >
      <div className={styles.colorPicker} style={{ borderRadius: rounding[size] }}>
        {colors.map((color, index) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={`${color}-${index}`}
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: skinColor[color as SkinColor] },
            }}
            height={filtersContainerHeightPx / 2}
            width={filtersContainerWidthPx / 2}
          />
        ))}
      </div>
    </Box>
  );
}
