// @flow strict
import { type Node as ReactNode } from 'react';
import VisuallyHidden from './VisuallyHidden';

export default function AccessibilityPause(): ReactNode {
  return <VisuallyHidden>,</VisuallyHidden>;
}
