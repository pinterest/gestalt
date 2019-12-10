// @flow
import React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="IconWithTooltip"
    description="The Icon with Tooltip component allows you to add a help tooltip on hover.
    Similar to regular Tooltips, these are about way finding but they also allow for education 
    with the option to link to additional information with a learn more link. They should
    only include short descriptive text and are co-located with the element they describe."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibility label',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'icon',
        type: 'string',
        required: true,
        description: 'The name of the icon to wrap with a hover tooltip.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'Url used for the learn more link.',
      },
      {
        name: 'inline',
        type: 'boolean',
        href: 'inline',
        description:
          'Flag used to help render the tooltip inline to the element',
      },
      {
        name: 'hrefText',
        type: 'string',
        description:
          'Text used for the Link itself e.g. "Learn More". This should be a very short call to action and should always be localized.',
      },
      {
        name: 'tooltipText',
        type: 'string',
        required: true,
        description:
          'String that is shown as additional information in a tooltip bubble on icon hover. Always localize the text.',
      },
    ]}
  />
);

card(
  <Example
    name="Icon with Tooltip on hover"
    description="Basic usage with a tooltip showing when icon is hovered. Be sure to internationalize your `tooltipText`."
    defaultCode={`
<IconWithTooltip
  accessibilityLabel="informational-tooltip"
  icon="info-circle" 
  inline 
  tooltipText="Icon with Tooltip" 
/>
`}
  />
);

card(
  <Example
    name="Icon with Tooltip including link"
    description="Passing a href prop will render a Learn More link below the provided tooltip text. Be sure to internationalize both your `tooltipText` and `hrefText`."
    defaultCode={`
<IconWithTooltip
  accessibilityLabel="informational-tooltip"
  icon="info-circle" 
  inline 
  tooltipText="Icon with Tooltip and link"
  href="https://www.pinterest.com" 
  hrefText="Learn More" 
/>
`}
  />
);

export default cards;
