// @flow
import React from 'react';
import PageHeader from './components/PageHeader';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="ErrorFlyout"
    description={`WARNING: This component is deprecated and will be removed in the next release.
      Please use \`<Flyout />\` with a \`role\` set to \`alertdialog\` instead.`}
  />
);

export default cards;
