import { ReactNode } from 'react';
import Box from './Box';
import styles from './Dropdown.css';
import Text from './Text';
import TextUI from './TextUI';
import useExperimentalTheme from './utils/useExperimentalTheme';

type Props = {
  /**
   * Any [Dropdown.Items](https://gestalt.pinterest.systems/web/dropdown#Dropdown.ItemProps) and/or [Dropdown.Links](https://gestalt.pinterest.systems/web/dropdown#Dropdown.LinkProps) to be rendered
   */
  children: ReactNode;
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/dropdown#Sections) variant for more info.
   */
  label: string;
};

/**
 * Use [Dropdown.Section](https://gestalt.pinterest.systems/web/dropdown#Dropdown.Section) to create hierarchy within a single Dropdown.
 */
export default function DropdownSection({ label, children }: Props) {
  const theme = useExperimentalTheme();
  return (
    <div
      aria-label={label}
      className={theme.MAIN ? styles.VRDropdownSection : styles.DropdownSection}
    >
      <Box
        display="flex"
        paddingX={theme.MAIN ? 3 : 2}
        paddingY={theme.MAIN ? 2 : 2}
        role="presentation"
      >
        {theme.MAIN ? (
          <TextUI color="subtle" size="xs">
            {label}
          </TextUI>
        ) : (
          <Text size="100">{label} </Text>
        )}
      </Box>
      {children}
    </div>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownSection.displayName = 'Dropdown.Section';
