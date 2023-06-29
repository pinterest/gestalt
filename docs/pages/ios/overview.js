// @flow strict
import { type Node } from 'react';
import COMPONENT_DATA from '../../docs-components/data/components.js';
import Overview from '../../docs-components/Overview.js';

export default function ComponentOverview(): Node {
  return (
    <Overview
      platform="iOS"
      generalComponents={COMPONENT_DATA.generalComponents.filter(
        (x) => x?.iOS?.documentation === 'ready',
      )}
    />
  );
}
