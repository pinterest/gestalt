// @flow strict
import { Children, cloneElement, type Element, type Node as ReactNode } from 'react';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import styles from '../List.css';
import Text from '../Text';

type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {
  size: ?Size,
  text: string | Element<typeof Text>,
};

export default function ListText({ size, text }: Props): ReactNode {
  const { name: colorSchemeName } = useColorScheme();

  // Flow shuold catch if text is missing. In case Flow is not enabled and text is missing, the errors are not that helpful. This surfaces the problem more explicitly.
  if (!text) {
    throw new Error(`Gestalt List is missing \`label\` prop or a \`text\` prop within List.Item.`);
  }

  if (typeof text === 'string') {
    return <Text size={size || undefined}>{text}</Text>;
  }

  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  if (
    typeof text !== 'string' &&
    Children.only<Element<typeof Text>>(text)?.type.displayName === 'Text'
  ) {
    const isDarkMode = colorSchemeName === 'darkMode';

    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideLight
      : styles.textColorOverrideDark;

    return (
      <span className={textColorOverrideStyles}>
        {cloneElement(text, { size: size || undefined })}
      </span>
    );
  }

  throw new Error(
    `Gestalt List has a \`label\` prop or a \`text\` prop that is not a string nor a Text component.`,
  );
}
