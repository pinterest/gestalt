// @flow strict
import { type Node } from 'react';
import COMPONENT_DATA from '../../docs-components/data/components.js';
import Overview from '../../docs-components/Overview.js';

export default function ComponentOverview(): Node {
  return (
    <Overview
      platform="Web"
      buildingBlockComponents={COMPONENT_DATA.buildingBlockComponents}
      generalComponents={COMPONENT_DATA.generalComponents}
      utilityComponents={COMPONENT_DATA.utilityComponents}
    />
  );
}
