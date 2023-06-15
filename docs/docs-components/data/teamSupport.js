// @flow strict
import { type DesignOverview } from './types.js';
import AdvocateTile from '../../graphics/team_support/advocate.svg';
import ComponentRequest from '../../graphics/team_support/component-request.svg';
import ContributionsTile from '../../graphics/team_support/contributions.svg';
import DesignFileHygiene from '../../graphics/team_support/design-file-hygiene.svg';
import GetHelpTile from '../../graphics/team_support/get-help.svg';
import TrainingTile from '../../graphics/team_support/training.svg';

const teamSupportTiles: $ReadOnlyArray<DesignOverview> = [
  {
    svg: <AdvocateTile />,
    title: 'Be a Gestalt advocate',
    description:
      'A dedicated cohort of system advocates to rely on for design partnership, input and knowledge share and support within your team and product area.',
    path: '/team_support/be_a_gestalt_advocate',
  },
  {
    svg: <ComponentRequest />,
    title: 'Component request',
    description:
      'Instructions on how to request new components or updates to an existent component.',
    path: '/team_support/component_request',
  },
  {
    svg: <DesignFileHygiene />,
    title: 'Design file hygiene',
    description:
      'Practical instructions on how to maintain consistency and quality on design systems files when collaborating with Gestalt on Figma files.',
    path: '/team_support/design_file_hygiene/naming_convention',
  },
  {
    svg: <ContributionsTile />,
    title: 'Contributions',
    description: 'Resources, Slack channels, meetings and events.',
    path: '/team_support/contributions',
  },
  {
    svg: <GetHelpTile />,
    title: 'Get help',
    description:
      'Resources on how to engage with the Gestalt team, join office hours, meetings and events.',
    path: '/team_support/get_help',
  },
  {
    svg: <TrainingTile />,
    title: 'Training',
    description:
      'Gestalt design systems specific training to support design workflow and systems mindset.',
    path: '/team_support/training',
  },
];

export default teamSupportTiles;
