import { Fragment, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import applyModuleDensityStyle from './Accordion/applyModuleDensity';
import AccordionExpandableItem from './Accordion/ExpandableItem';
import Box from './Box';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Divider from './Divider';
import icons from './icons/index';

export type BadgeType = {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash';
};

function getExpandedId(expandedIndex?: number | null): number | null | undefined {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}

type Props = {
  /**
   * Label used to communicate to screen readers which accordion will be collapsed when interacting with the title button. Should be something clear, like "Collapse Security Policies Accordion". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   *
   */
  accessibilityCollapseLabel?: string;
  /**
   * Label used to communicate to screen readers which accordion will be expanded when interacting with the title button. Should be something clear, like "Expand Security Policies Accordion". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   */
  accessibilityExpandLabel?: string;
  /**
   * Specify a border. See [Box's border options](https://gestalt.pinterest.systems/web/box#Borders)
   */
  borderStyle?: 'sm' | 'shadow' | 'none';
  /**
   * The 0-based index indicating the item that should currently be expanded. This must be updated via `onExpandedChange` to ensure the correct item is expanded. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   */
  expandedIndex?: number | null | undefined;
  /**
   * Unique id to identify this Accordion. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   */
  id: string;
  /**
   * Array of accordions displayed in a stack. Only one item can be expanded at a time. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   */
  items: ReadonlyArray<{
    badge?: BadgeType;
    children?: ReactNode;
    icon?: keyof typeof icons;
    iconAccessibilityLabel?: string;
    iconButton?: ReactElement;
    summary?: ReadonlyArray<string>;
    title: string;
    type?: 'error' | 'info';
  }>;
  /**
   * Whether to indent the divider between Accordion.Expandable items to make it flush with item text
   */
  indentDivider?: boolean;
  /**
   * Callback executed whenever any accordion item is expanded or collapsed. It receives the index of the currently expanded accordion, or null if none are expanded. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
   */
  onExpandedChange?: (arg1?: number | null | undefined) => void;
  /**
   * Size
   */
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Use [Accordion.Expandable](https://gestalt.pinterest.systems/web/accordion) if your accordion requires expanding and collapsing content.
 */
export default function AccordionExpandable({
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  borderStyle = 'shadow',
  expandedIndex,
  id,
  items,
  indentDivider = false,
  onExpandedChange,
  size = 'lg',
}: Props) {
  const [expandedId, setExpandedId] = useState<number | null | undefined>(
    getExpandedId(expandedIndex),
  );
  const {
    accessibilityCollapseLabel: defaultAccessibilityCollapseLabel,
    accessibilityExpandLabel: defaultAccessibilityExpandLabel,
  } = useDefaultLabelContext('Accordion');

  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const { rounding, padding } = applyModuleDensityStyle(size);

  useEffect(() => {
    setExpandedId(getExpandedId(expandedIndex));
  }, [expandedIndex, setExpandedId]);

  const buildOnAccordionClickHandler = useCallback(
    (index: number) =>
      (isExpanded: boolean): void => {
        if (onExpandedChange) {
          onExpandedChange(isExpanded ? null : index);
        }
        setExpandedId(isExpanded ? null : index);
      },
    [onExpandedChange],
  );

  return (
    <Box
      borderStyle={borderStyle !== 'none' ? borderStyle : undefined}
      color={isDarkMode ? 'elevationFloating' : 'default'}
      rounding={rounding}
    >
      {items.map(
        (
          { badge, children, icon, iconAccessibilityLabel, iconButton, summary, title, type },
          index,
        ) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {index > 0 &&
              (indentDivider && borderStyle === 'none' ? (
                <Box marginStart={padding}>
                  <Divider />
                </Box>
              ) : (
                <Divider />
              ))}
            <AccordionExpandableItem
              accessibilityCollapseLabel={
                accessibilityCollapseLabel ?? defaultAccessibilityCollapseLabel
              }
              accessibilityExpandLabel={accessibilityExpandLabel ?? defaultAccessibilityExpandLabel}
              badge={badge}
              icon={icon}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconButton={iconButton}
              id={`${id}-${index}`}
              isCollapsed={expandedId !== index}
              onExpand={buildOnAccordionClickHandler(index)}
              size={size}
              summary={summary}
              title={title}
              type={type}
            >
              {children}
            </AccordionExpandableItem>
          </Fragment>
        ),
      )}
    </Box>
  );
}

AccordionExpandable.displayName = 'Accordion.Expandable';
