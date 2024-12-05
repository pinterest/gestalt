import { Children, cloneElement, ReactElement } from 'react';
import Text from '../Text';

type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {
  size: Size | null | undefined;
  text: string | ReactElement;
};

export default function ListText({ size, text }: Props) {
  // Flow shuold catch if text is missing. In case Flow is not enabled and text is missing, the errors are not that helpful. This surfaces the problem more explicitly.
  if (!text) {
    throw new Error(`Gestalt List is missing \`label\` prop or a \`text\` prop within List.Item.`);
  }

  if (typeof text === 'string') {
    return <Text size={size || undefined}>{text}</Text>;
  }

  // If `text` is a Text component, we need to override any text size within to ensure they all match
  // @ts-expect-error - TS2339
  if (
    text &&
    typeof text !== 'string' &&
    Children.only<ReactElement>(text)?.type.displayName === 'Text'
  ) {
    return cloneElement(text, { size: size || undefined });
  }

  throw new Error(
    `Gestalt List has a \`label\` prop or a \`text\` prop that is not a string nor a Text component.`,
  );
}
