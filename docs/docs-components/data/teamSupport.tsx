import { DesignOverview } from './types';
import DesignContributionsTile from '../../graphics/team_support/design-contributions.svg';
import DesignFileHygiene from '../../graphics/team_support/design-file-hygiene.svg';
import GetHelpTile from '../../graphics/team_support/get-help.svg';
import TrainingTile from '../../graphics/team_support/training.svg';

const teamSupportTiles: ReadonlyArray<DesignOverview> = [
  {
    svg: <DesignContributionsTile />,
    title: 'Design contributions',
    description: 'Guidelines and resources for contributing designs to our system',
    path: '/team_support/design_contributions/design_contributions_overview',
  },
  {
    svg: <DesignFileHygiene />,
    title: 'Design file hygiene',
    description:
      'Practical instructions on how to maintain consistency and quality on design systems files when collaborating with Gestalt on Figma files',
    path: '/team_support/design_file_hygiene/naming_convention',
  },
  {
    svg: <GetHelpTile />,
    title: 'Get help',
    description:
      'Resources on how to engage with the Gestalt team, join office hours, meetings and events',
    path: '/team_support/get_help',
  },
  {
    svg: <TrainingTile />,
    title: 'Training',
    description:
      'Gestalt design systems specific training to support design workflow and systems mindset',
    path: '/team_support/training',
  },
];

export default teamSupportTiles;
