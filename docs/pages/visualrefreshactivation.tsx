import { SelectList } from 'gestalt';
import { useAppContext } from '../docs-components/appContext';
import Page from '../docs-components/Page';

export default function DesignTokensPage() {
  const { setExperiments, experiments } = useAppContext();

  return (
    <Page hideEditLink hideSideNav title="Visual refresh experimentation">
      <SelectList
        id="theming"
        label="Select experimental theming"
        onChange={({ value }) => setExperiments(value)}
        value={experiments}
      >
        {[
          { label: 'Visual Refresh', value: 'VR01Tokens' },
          { label: 'Calico 01', value: 'CA01Tokens' },
          { label: 'Classic', value: 'classic' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Page>
  );
}
