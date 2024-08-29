import { type ReactNode } from 'react';
import { DefaultLabelProvider } from 'gestalt';

type Props = {
  children: ReactNode;
};

export default function DocsDefaultLabelProvider({ children }: Props) {
  return <DefaultLabelProvider labels={null}>{children}</DefaultLabelProvider>;
}
