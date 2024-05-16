import VisuallyHidden from './VisuallyHidden';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';

export default function NewTabAccessibilityLabel({ target }: { target?: null | 'self' | 'blank' }) {
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');
  return target === 'blank' ? (
    <VisuallyHidden>{`; ${accessibilityNewTabLabel}`}</VisuallyHidden>
  ) : null;
}
