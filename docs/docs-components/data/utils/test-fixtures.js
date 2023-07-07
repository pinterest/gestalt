// @flow strict
import { type ComponentData } from '../types.js';

const mockComponentList: $ReadOnlyArray<ComponentData> = [
  {
    id: 'Avatar',
    platform: {
      web: {
        name: 'Avatar',
        visual: {
          svg: <svg />,
        },
        alias: ['Pinner rep', 'Persona', 'User Image', 'Identifier', 'Identicon'],
        description: 'Avatar is used to represent a user.',
        category: ['Avatars'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'Avatar',
        visual: {
          svg: <svg />,
        },
        alias: ['Pinner rep', 'Persona', 'User Image', 'Identifier', 'Identicon'],
        description: 'Avatar is used to represent a user.',
        category: ['Avatars'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Avatar',
        visual: {
          svg: <svg />,
        },
        alias: ['Pinner rep', 'Persona', 'User Image', 'Identifier', 'Identicon'],
        description: 'Avatar is used to represent a user.',
        category: ['Avatars'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'Badge',
    platform: {
      web: {
        name: 'Badge',
        visual: {
          svg: <svg />,
        },
        alias: ['Lozenge', 'Label', 'Stamp', 'Flag'],
        description: 'Badge is a label that indicates status or importance.',
        category: ['Indicators'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'Badge',
        visual: {
          svg: <svg />,
        },
        alias: ['Lozenge', 'Label', 'Stamp', 'Flag'],
        description: 'Badge is a label that indicates status or importance.',
        category: ['Indicators'],
        status: {
          documentation: 'notAvailable',
          status: 'planned',
        },
      },
      ios: {
        name: 'Badge',
        visual: {
          svg: <svg />,
        },
        alias: ['Lozenge', 'Label', 'Stamp', 'Flag'],
        description: 'Badge is a label that indicates status or importance.',
        category: ['Indicators'],
        status: {
          documentation: 'notAvailable',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'BoardRep',
    platform: {
      figma: {
        name: 'BoardRep',
        visual: {
          svg: <svg />,
        },
        category: [],
        status: {
          documentation: 'notAvailable',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Box',
    platform: {
      web: {
        name: 'Box',
        visual: {
          svg: <svg />,
        },
        description:
          'Box is a component primitive that can be used to build the foundation of pretty much any other component.',
        category: ['Building blocks'],
        alias: ['<div>', 'View'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Datapoint',
    platform: {
      web: {
        name: 'Datapoint',
        visual: {
          svg: <svg />,
        },
        description: 'Datapoint displays at-a-glance data for a user to quickly view key metrics.',
        category: ['Indicators'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
];

export default mockComponentList;
