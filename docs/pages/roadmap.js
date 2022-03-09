// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text, TapArea, Tooltip, Link } from 'gestalt';
import Page from '../components/Page.js';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';

const tasks = [
  {
    'task': 'InfoButton component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Creation of a component to provide contextual information for elements within a layout.',
    'link': '',
  },
  {
    'task': 'Form component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of a component to encapuslate and structure form elements in a layout.',
    'link': '',
  },
  {
    'task': 'Badge component improvements',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'description': 'Expanding on Badge to include additional colors and states.',
    'link': '',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'Web',
    'description':
      'Adjustments to the existing PageHeader component to be more compatible with product needs.',
    'link': '',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Creation of a baseline component to support side navigation layout patterns.',
    'link': '',
  },
  {
    'task': 'Link component improvements',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Update Link component to support external indicator and more accessible styling.',
    'link': '',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Providing the ability in form components to add an InfoButton to provide contextual help.',
    'link': '',
  },
  {
    'task': 'Gestalt illustration library',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'Android/iOS/Web',
    'description':
      'Creation of a baseline set of illustrations that cover high-frequency product states (e.g., Error, Success, Empty).',
    'link': '',
  },
  {
    'task': 'Gestalt animation support',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Built-in animation capabilities within Gestalt to support high-frequency UI transitions within the product.',
    'link': '',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Pilot component for supporting selection of multiple items in a dropdown context.',
    'link': '',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Pilot component for paginating through content.',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'Development of a mobile-specific treatment of the Modal component.',
    'link': '',
  },
  {
    'task': 'Popover component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'Development of a mobile-specific treatment of the Popover component.',
    'link': '',
  },
  {
    'task': 'Dropdown component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'Development of a mobile-specific treatment of the Dropdown component.',
    'link': '',
  },
  {
    'task': 'Button component update',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Visual updates to the Button component on the Web platform.',
    'link': '',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description': 'Development of the Button component for Android and iOS.',
    'link': '',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description': 'Development of the IconButton component for Android and iOS.',
    'link': '',
  },
  {
    'task': 'Icon component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'description': 'Development of the Icon component for Android.',
    'link': '',
  },
  {
    'task': 'Avatar component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'description': 'Development of the Avatar component for Android.',
    'link': '',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Create new component to create accessible Radio button groups in forms, deprecate singular RadioButton.',
    'link': '',
  },
  {
    'task': 'Masonry component enhancements',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Develop general technical improvements to Masonry.',
    'link': '',
  },
  {
    'task': 'Device type hooks',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
    'description': 'Develop functionality to unlock device-specific UI in Gestalt.',
    'link': '',
  },
  {
    'task': 'Context logging hooks',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
    'description':
      'Develop functionality to allow for generic logic to be added on component interaction.',
    'link': '',
  },
  {
    'task': 'Border color and radius design tokens',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Addition of tokens to support border radius and border color styling.',
    'link': '',
  },
  {
    'task': 'Color opacity design tokens',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Addition of tokens to support opacity styling.',
    'link': '',
  },
  {
    'task': 'Elevation design tokens',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of tokens to support the styling of elevated elements within a layout.',
    'link': '',
  },
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': '',
    'description':
      'Update of the Gestalt docs site&rsquo;s information architecture to support pattern guidelines and mobile component documentation.',
    'link': '',
  },
  {
    'task': 'Component visual search',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Provide a visual component overview within the Gestalt docs to make finding components faster/easier.',
    'link': '',
  },
  {
    'task': 'Public roadmap in Gestalt site',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': '',
    'description': 'Publish and maintain a public roadmap for Gestalt development.',
    'link': '/roadmap',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Development of usage guidelines and best practices for usage of elevation within Gestalt.',
    'link': '',
  },
  {
    'task': 'Status component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Status web documentation.',
    'link': '/status',
  },
  {
    'task': 'Datapoint component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Datapoint web documentation.',
    'link': '',
  },
  {
    'task': 'Tag component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Tag web documentation.',
    'link': '',
  },
  {
    'task': 'Badge component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Badge web documentation.',
    'link': '',
  },
  {
    'task': 'Button component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Button mobile documentation.',
    'link': '',
  },
  {
    'task': 'IconButton component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to IconButton mobile documentation.',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Modal/Sheet mobile documentation.',
    'link': '',
  },
  {
    'task': 'Masonry component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Masonry web documentation.',
    'link': '',
  },
  {
    'task': 'Link component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Link web documentation.',
    'link': '',
  },
  {
    'task': 'Heading component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Heading web documentation.',
    'link': '',
  },
  {
    'task': 'Text component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Text web documentation.',
    'link': '',
  },
  {
    'task': 'Tabs component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Tabs mobile documentation.',
    'link': '',
  },
  {
    'task': 'Popover component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Popover mobile documentation.',
    'link': '',
  },
  {
    'task': 'Avatar component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Avatar mobile documentation.',
    'link': '',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': '',
    'description': 'Publish guidelines and best practices for utilizing color within Gestalt.',
    'link': '',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Publish guidelines and best practices for typographic treatment within Gestalt.',
    'link': '',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Provide detailed info on the status and health of each component in the Gestalt docs.',
    'link': '',
  },
  {
    'task': 'Dark mode visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': '',
    'description': 'Publish guidelines for designing for dark mode using Gestalt.',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Toast mobile documentation.',
    'link': '',
  },
  {
    'task': 'Icon component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Icon mobile documentation.',
    'link': '',
  },
  {
    'task': 'Checkbox component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Checkbox web documentation.',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Toast web documentation.',
    'link': '',
  },
  {
    'task': 'RadioGroup component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to RadioGroup web documentation.',
    'link': '',
  },
  {
    'task': 'Switch component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Switch web documentation.',
    'link': '',
  },
  {
    'task': 'TextArea component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to TextArea web documentation.',
    'link': '',
  },
  {
    'task': 'ButtonGroup component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to ButtonGroup web documentation.',
    'link': '',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Publish best practices for providing in-product contextual help and guidance using Gestalt.',
    'link': '',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'description': 'Publish guidelines on appropriate usage of iconography with Gestalt.',
    'link': '',
  },
  {
    'task': 'Form autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Develop a lint rule to automatically convert <form>​ instances to our upcoming <Form>​ component',
    'link': '',
  },
  {
    'task': 'Box duplicate props autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Develop a lint rule to automatically combine props on Box where possible.',
    'link': '',
  },
  {
    'task': 'Generalized prop naming autofix',
    'deadline': '',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Develop a lint rule to automatically rename props of Gestalt component instances.',
    'link': '',
  },
  {
    'task': 'Generalized prop value change autofix',
    'deadline': '',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Develop a lint rule to automatically change prop values of Gestalt component instances.',
    'link': '',
  },
  {
    'task': 'Testing helpers library',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Develop infrastructure to support Gestalt component integration testing in Cypress.',
    'link': '',
  },
  {
    'task': 'Visual diff testing',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
    'description':
      'Ship visual diff tests for all Gestalt components to guard against UI regressions.',
    'link': '',
  },
];

const inProgress = tasks.filter((x) => x.status === 'inProgress');

const future = tasks.filter((x) => x.status === 'unstarted');

const complete = tasks.filter((x) => x.status === 'ok');

const LockIcon = function LockIcon({ size }: {| size: 12 | 14 |}) {
  return (
    <Tooltip text="Access is restricted to Pinterest employees" accessibilityLabel="" inline>
      <TapArea rounding="circle" fullWidth={false}>
        <Icon
          accessibilityLabel="Access is restricted to Pinterest employees"
          icon="lock"
          size={size}
        />{' '}
      </TapArea>
    </Tooltip>
  );
};

function Task({
  text,
  description,
  delivery,
  platform,
}: {|
  text: string,
  description: string,
  delivery: string,
  platform: string,
|}) {
  const title = platform ? `${text} (${platform})` : text;

  const desc = (
    <Box marginTop={-6}>
      <Flex direction="column" gap={2}>
        <Text>{description}</Text>
        {delivery ? <Text size="100">Scheduled for {delivery}, 2022</Text> : null}
      </Flex>
    </Box>
  );

  return <MainSection.Subsection title={title}>{desc}</MainSection.Subsection>;
}

export default function RoadmapPage(): Node {
  const theme1Items = inProgress.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const theme2Items = future.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const theme3Items = complete.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  return (
    <Page title="Upcoming work in 2022">
      <PageHeader name="Upcoming work in 2022" showSourceLink={false} />

      <Text>
        The following reflects all public-facing work the Gestalt team plans to ship in 2022. To see
        the full list of work our team plans to take on, please visit our&nbsp;
        <Link
          href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog"
          inline
        >
          internal roadmap <LockIcon size={14} />
        </Link>
      </Text>
      <Flex direction="column" gap={12}>
        <MainSection name="In progress">
          <Flex direction="column" gap={8}>
            {theme1Items}
          </Flex>
        </MainSection>
        <MainSection name="Upcoming">
          <Flex direction="column" gap={8}>
            {theme2Items}
          </Flex>
        </MainSection>
        <MainSection name="Complete">
          <Flex direction="column" gap={8}>
            {theme3Items}
          </Flex>
        </MainSection>
      </Flex>
    </Page>
  );
}
