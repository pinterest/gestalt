import { ReactNode } from 'react';
import Box from './Box';
import styles from './Dropdown.css';
import Text from './Text';
import TextUI from './TextUI';
import useInExperiment from './useInExperiment';

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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });
  return (
    <div aria-label={label} className={styles.DropdownSection}>
      <Box display="flex" padding={2} role="presentation">
        {isInVRExperiment ? <TextUI color="subtle" size="xs">{label}</TextUI> : <Text size="100">{label} </Text>}
      </Box>
      {children}
    </div>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownSection.displayName = 'Dropdown.Section';
