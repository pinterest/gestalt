// @flow strict
import { type ComponentData } from './types.js';
import Box from '../../graphics/building-blocks/Box.svg';
import Column from '../../graphics/building-blocks/Column.svg';
import Container from '../../graphics/building-blocks/Container.svg';
import Flex from '../../graphics/building-blocks/Flex.svg';
import Layer from '../../graphics/building-blocks/Layer.svg';
import Letterbox from '../../graphics/building-blocks/Letterbox.svg';
import Mask from '../../graphics/building-blocks/Mask.svg';
import Pog from '../../graphics/building-blocks/Pog.svg';
import ScrollBoundaryContainer from '../../graphics/building-blocks/ScrollBoundaryContainer.svg';
import SheetMobile from '../../graphics/building-blocks/SheetMobile.svg';
import Sticky from '../../graphics/building-blocks/Sticky.svg';
import TapArea from '../../graphics/building-blocks/TapArea.svg';
import ZIndexClasses from '../../graphics/building-blocks/ZIndexClasses.svg';
import ActivationCard from '../../graphics/general/ActivationCard.svg';
import Avatar from '../../graphics/general/Avatar.svg';
import AvatarGroup from '../../graphics/general/AvatarGroup.svg';
import Badge from '../../graphics/general/Badge.svg';
import Button from '../../graphics/general/Button.svg';
import ButtonGroup from '../../graphics/general/ButtonGroup.svg';
import ButtonLink from '../../graphics/general/ButtonLink.svg';
import Callout from '../../graphics/general/Callout.svg';
import Card from '../../graphics/general/Card.svg';
// import Chart from '../../graphics/general/Chart.svg';
import Checkbox from '../../graphics/general/Checkbox.svg';
import Collage from '../../graphics/general/Collage.svg';
import ComboBox from '../../graphics/general/ComboBox.svg';
import Datapoint from '../../graphics/general/Datapoint.svg';
import DateField from '../../graphics/general/DateField.svg';
import DatePicker from '../../graphics/general/DatePicker.svg';
import DateRange from '../../graphics/general/DateRange.svg';
import Divider from '../../graphics/general/Divider.svg';
import Dropdown from '../../graphics/general/Dropdown.svg';
import Heading from '../../graphics/general/Heading.svg';
import HelpButton from '../../graphics/general/HelpButton.svg';
import Icon from '../../graphics/general/Icon.svg';
import IconButton from '../../graphics/general/IconButton.svg';
import IconButtonFloating from '../../graphics/general/IconButtonFloating.svg';
import Image from '../../graphics/general/Image.svg';
import GestaltLabel from '../../graphics/general/Label.svg';
import GestaltLink from '../../graphics/general/Link.svg';
import List from '../../graphics/general/List.svg';
import Masonry from '../../graphics/general/Masonry.svg';
import Modal from '../../graphics/general/Modal.svg';
import ModalAlert from '../../graphics/general/ModalAlert.svg';
import Module from '../../graphics/general/Module.svg';
import NumberField from '../../graphics/general/NumberField.svg';
import OverlayPanel from '../../graphics/general/OverlayPanel.svg';
import PageHeader from '../../graphics/general/PageHeader.svg';
import Popover from '../../graphics/general/Popover.svg';
import PopoverEducational from '../../graphics/general/PopoverEducational.svg';
import Pulsar from '../../graphics/general/Pulsar.svg';
import RadioGroup from '../../graphics/general/RadioGroup.svg';
import SearchField from '../../graphics/general/SearchField.svg';
import SegmentedControl from '../../graphics/general/SegmentedControl.svg';
import SelectList from '../../graphics/general/SelectList.svg';
import SideNavigation from '../../graphics/general/SideNavigation.svg';
import SlimBanner from '../../graphics/general/SlimBanner.svg';
import Spinner from '../../graphics/general/Spinner.svg';
import Status from '../../graphics/general/Status.svg';
import Switch from '../../graphics/general/Switch.svg';
import Table from '../../graphics/general/Table.svg';
import TableOfContents from '../../graphics/general/TableOfContents.svg';
import Tabs from '../../graphics/general/Tabs.svg';
import Tag from '../../graphics/general/Tag.svg';
import TagData from '../../graphics/general/TagData.svg';
import Text from '../../graphics/general/Text.svg';
import TextArea from '../../graphics/general/TextArea.svg';
import TextField from '../../graphics/general/TextField.svg';
import TileData from '../../graphics/general/TileData.svg';
import Toast from '../../graphics/general/Toast.svg';
import Tooltip from '../../graphics/general/Tooltip.svg';
import Upsell from '../../graphics/general/Upsell.svg';
import Video from '../../graphics/general/Video.svg';
import WashAnimated from '../../graphics/general/WashAnimated.svg';
import GlobalEventsHandlerProvider from '../../graphics/utilities/GlobalEventsHandlerProvider.svg';
import HookFocusVisible from '../../graphics/utilities/hook-focus-visible.svg';
import HookReducedMotion from '../../graphics/utilities/hook-reduced-motion.svg';
import ProviderColorScheme from '../../graphics/utilities/provider-color-scheme.svg';

const componentData: $ReadOnlyArray<ComponentData> = [
  {
    id: 'ActivationCard',
    platform: {
      web: {
        name: 'ActivationCard',
        visual: {
          svg: <ActivationCard />,
        },
        description:
          'ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.',
        category: ['Messaging'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Avatar',
    platform: {
      web: {
        name: 'Avatar',
        visual: {
          svg: <Avatar />,
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
          svg: <Avatar />,
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
          svg: <Avatar />,
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
    id: 'AvatarGroup',
    platform: {
      web: {
        name: 'AvatarGroup',
        visual: {
          svg: <AvatarGroup />,
        },
        alias: [
          'Pinner reps',
          'Personas',
          'Facepile',
          'User Images',
          'Identification Group',
          'Identicons',
        ],
        description:
          'AvatarGroup is used to both display a group of user avatars and, optionally, control actions related to the users group.',
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
        name: 'AvatarGroup',
        visual: {
          svg: <AvatarGroup />,
        },
        alias: [
          'Pinner reps',
          'Personas',
          'Facepile',
          'User Images',
          'Identification Group',
          'Identicons',
        ],
        description:
          'AvatarGroup is used to both display a group of user avatars and, optionally, control actions related to the users group.',
        category: ['Avatars'],
        status: {
          documentation: 'notAvailable',
          status: 'planned',
        },
      },
      ios: {
        name: 'AvatarGroup',
        visual: {
          svg: <AvatarGroup />,
        },
        alias: [
          'Pinner reps',
          'Personas',
          'Facepile',
          'User Images',
          'Identification Group',
          'Identicons',
        ],
        description:
          'AvatarGroup is used to both display a group of user avatars and, optionally, control actions related to the users group.',
        category: ['Avatars'],
        status: {
          documentation: 'notAvailable',
          status: 'notAvailable',
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
          svg: <Badge />,
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
          svg: <Badge />,
        },
        alias: ['Lozenge', 'Label', 'Stamp', 'Flag'],
        description: 'Badge is a label that indicates status or importance.',
        category: ['Indicators'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
      ios: {
        name: 'Badge',
        visual: {
          svg: <Badge />,
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
          svg: <Box />,
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
    id: 'Button',
    platform: {
      web: {
        name: 'Button',
        visual: {
          svg: <Button />,
        },
        alias: ['Action', 'CTA'],
        description: 'Buttons allow users to perform actions within a surface.',
        category: ['Actions'],
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
        name: 'Button',
        visual: {
          svg: <Button />,
        },
        alias: ['Action', 'CTA'],
        description: 'Buttons allow users to perform actions within a surface.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Button',
        visual: {
          svg: <Button />,
        },
        alias: ['Action', 'CTA'],
        description: 'Buttons allow users to perform actions within a surface.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'ButtonLink',
    platform: {
      web: {
        name: 'ButtonLink',
        visual: {
          svg: <ButtonLink />,
        },
        description: 'ButtonLink allow users to use a surface action to link to another page.',
        category: ['Actions'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'notAvailable',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'ButtonGroup',
    platform: {
      web: {
        name: 'ButtonGroup',
        visual: {
          svg: <ButtonGroup />,
        },
        alias: ['Button Row', 'Action Bar'],
        description: 'ButtonGroup is used to display a series of buttons.',
        category: ['Actions'],
        status: {
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'ButtonGroup',
        visual: {
          svg: <ButtonGroup />,
        },
        alias: ['Button Row', 'Action Bar'],
        description: 'ButtonGroup is used to display a series of buttons.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Callout',
    platform: {
      web: {
        name: 'Callout',
        visual: {
          svg: <Callout />,
        },
        alias: ['Banner', 'Message', 'Notification', 'Notice', 'Note'],
        description:
          'Callout is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.',
        category: ['Messaging'],
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
  {
    id: 'Card',
    platform: {
      ios: {
        name: 'Card',
        visual: {
          svg: <Card />,
        },
        path: '/ios/card/card',
        alias: ['Entry Card', 'Module', 'Panel', 'Teaser'],
        description:
          'Card is a semi-modular container used to house Card.Header and a variant of the available preview blocks.',
        category: ['Pins and imagery'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  // {
  //   id: 'Chart',
  //   platform: {
  //     web: {
  //       name: 'Chart',
  //       visual: {
  //         svg: <Chart />,
  //       },
  //       description: 'WIP ',
  //       category: ['Data'],
  //       status: {
  //         accessible: {
  //           summary: 'notAvailable',
  //           a11yVisual: 'notAvailable',
  //           a11yScreenreader: 'notAvailable',
  //           a11yNavigation: 'notAvailable',
  //           a11yComprehension: 'notAvailable',
  //         },
  //         documentation: 'notAvailable',
  //         figmaStatus: 'notAvailable',
  //         responsive: 'notAvailable',
  //         status: 'notAvailable',
  //       },
  //     },
  //   },
  // },
  {
    id: 'Checkbox',
    platform: {
      web: {
        name: 'Checkbox',
        visual: {
          svg: <Checkbox />,
        },
        description: 'Use Checkbox when displaying 3 or more toggle inputs.',
        category: ['Controls'],
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
        name: 'Checkbox',
        visual: {
          svg: <Checkbox />,
        },
        description: 'Checkbox is used for multiple choice selection.',
        category: ['Controls'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Checkbox',
        visual: {
          svg: <Checkbox />,
        },
        description: 'Checkbox is used for multiple choice selection.',
        category: ['Controls'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'Collage',
    platform: {
      web: {
        name: 'Collage',
        visual: {
          svg: <Collage />,
        },
        alias: ['Photo Composition'],
        description:
          'Collage, similarly to Masonry, creates a deterministic grid layout that can absolutely position and virtualize images.',
        category: ['Pins and imagery'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'notAvailable',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Column',
    platform: {
      web: {
        name: 'Column',
        visual: {
          svg: <Column />,
        },
        description: 'Column implements a 12-column system.',
        category: ['Building blocks'],
        status: {
          documentation: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'ColorSchemeProvider',
    platform: {
      web: {
        name: 'ColorSchemeProvider',
        visual: {
          svg: <ProviderColorScheme />,
          hasDarkBackground: true,
        },
        description:
          'ColorSchemeProvider is an optional React context provider to enable dark mode.',
        category: ['Utilities'],
        alias: ['Dark Mode', 'Dark Theme'],
        path: '/web/utilities/colorschemeprovider',
        status: {
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'ComboBox',
    platform: {
      web: {
        name: 'ComboBox',
        visual: {
          svg: <ComboBox />,
        },
        alias: ['Typeahead', 'Autocomplete', 'Autosuggest'],
        description:
          'ComboBox is the combination of a Textfield and an associated Dropdown that allows the user to filter a list when selecting an option.',
        category: ['Fields and forms'],
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
  {
    id: 'Container',
    platform: {
      web: {
        name: 'Container',
        visual: {
          svg: <Container />,
        },
        alias: ['Content Block'],
        description:
          'Containers are useful in responsively laying out content on different screens.',
        category: ['Building blocks'],
        status: {
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
          svg: <Datapoint />,
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
  {
    id: 'DateRange',
    platform: {
      web: {
        name: 'DateRange',
        alias: ['Calendar', 'Date time picker', 'Date picker range'],
        visual: {
          svg: <DateRange />,
        },
        description:
          'DateRange enables users to preview and select a range of days by picking dates from a calendar or adding a text input.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'partial',
            a11yComprehension: 'ready',
          },
          documentation: 'notAvailable',
          figmaStatus: 'notAvailable',
          responsive: 'notAvailable',
          status: 'notAvailable',
        },
      },
    },
  },
  {
    id: 'DateField',
    platform: {
      web: {
        name: 'DateField',
        visual: {
          svg: <DateField />,
        },
        description:
          'DateField is used when the user has to select a date. The user must input date values with a numeric keyboard.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
            a11yComprehension: 'ready',
          },
          badge: 'Experimental',
          documentation: 'notAvailable',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'DatePicker',
    platform: {
      web: {
        name: 'DatePicker',
        visual: {
          svg: <DatePicker />,
        },
        alias: ['Calendar'],
        description: 'DatePicker is used when the user has to select a date or date range.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'notAvailable',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
          knownIssues: [
            {
              title: 'No UTC support',
              description: 'Documented issues.',
              internalDocUrl: 'https://coda.io/d/_d2LeXkQ1kVX/DatePicker_suvau',
            },
            {
              title: 'Single month issues',
              description:
                "DatePicker doesn't trap focus and close the calendar on blur when the date range is within the same month and there are no previous/next month IconButtons",
              internalDocUrl: 'https://coda.io/d/_d2LeXkQ1kVX/DatePicker_suvau',
            },
          ],
        },
      },
    },
  },
  {
    id: 'Divider',
    platform: {
      web: {
        name: 'Divider',
        visual: {
          svg: <Divider />,
        },
        alias: ['Separator', 'Horizontal Rule', '<hr>', 'Rule'],
        description:
          'Divider is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.',
        category: ['Structure'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Dropdown',
    platform: {
      web: {
        name: 'Dropdown',
        visual: {
          svg: <Dropdown />,
        },
        alias: ['Menu', 'Contextual Menu'],
        description: 'Dropdown displays a list of actions, options or links.',
        category: ['Fields and forms'],
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
          mobileAdaptive: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Feed/DiscoveryRep',
    platform: {
      figma: {
        name: 'Feed/DiscoveryRep',
        visual: {
          svg: <svg />,
        },
        category: [],
        status: {
          badge: 'Pilot',
          documentation: 'notAvailable',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Fieldset',
    platform: {
      web: {
        name: 'Fieldset',
        visual: {
          svg: <RadioGroup />,
        },
        alias: ['Form group', 'Input Group', 'Choice Group', 'Form Block'],
        description:
          'Fieldset creates a fieldset and legend for a group of related form items in order to clearly indicate related form items.',
        category: ['Fields and forms'],
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
    id: 'Flex',
    platform: {
      web: {
        name: 'Flex',
        visual: {
          svg: <Flex />,
        },
        alias: ['Row', 'Stack', 'Flexbox'],
        description:
          'Flex is a layout component with a very limited subset of the props available to Box.',
        category: ['Building blocks'],
        status: {
          documentation: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'GlobalEventsHandlerProvider',
    platform: {
      web: {
        name: 'GlobalEventsHandlerProvider',
        visual: {
          svg: <GlobalEventsHandlerProvider />,
        },
        alias: ['OnLinkNavigationProvider'],
        path: '/web/utilities/globaleventshandlerprovider',
        description:
          'React context provider that that allows to share external handlers with consuming components.',
        category: ['Utilities'],
        status: {
          badge: 'Pilot',
          documentation: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Heading',
    platform: {
      web: {
        name: 'Heading',
        visual: {
          svg: <Heading />,
        },
        alias: ['Title', 'Headline'],
        description:
          'Heading allows you to show headings on the page and has a bigger line height than regular text.',
        category: ['Text'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
          knownIssues: [
            {
              title: 'Line clamp truncation',
              description:
                'When the "lineClamp" prop is set to 1, text with long strings of characters might be truncated incorrectly.',
              codesandboxUrl:
                'https://codesandbox.io/s/development-mode-forked-44qkwk?file=/example.js',
            },
          ],
        },
      },
    },
  },
  {
    id: 'HelpButton',
    platform: {
      web: {
        name: 'HelpButton',
        visual: {
          svg: <HelpButton />,
        },
        alias: ['InfoButton'],
        description:
          'HelpButton is an affordance that accompanies an element on the screen. It helps describe or provide assistance on how to use the accompanying element.',
        category: ['Actions'],
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
  {
    id: 'Icon',
    platform: {
      web: {
        name: 'Icon',
        visual: {
          svg: <Icon />,
        },
        alias: ['<svg>', 'Symbol', 'Glyph'],
        description:
          'Icons are the symbolic representation of an action or information, providing visual context and improving usability.',
        category: ['Pins and imagery'],
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
        name: 'Icon',
        visual: {
          svg: <Icon />,
        },
        alias: ['<svg>', 'Symbol', 'Glyph'],
        description:
          'Icons are the symbolic representation of an action or information, providing visual context and improving usability.',
        category: ['Pins and imagery'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Icon',
        visual: {
          svg: <Icon />,
        },
        alias: ['<svg>', 'Symbol', 'Glyph'],
        description:
          'Icons are the symbolic representation of an action or information, providing visual context and improving usability.',
        category: ['Pins and imagery'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'IconButton',
    platform: {
      web: {
        name: 'IconButton',
        visual: {
          svg: <IconButton />,
        },
        alias: ['Glyph button', 'Condensed Button'],
        description:
          'IconButton allows users to take actions and make choices with a single click or tap.',
        category: ['Actions'],
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
        name: 'IconButton',
        visual: {
          svg: <IconButton />,
        },
        alias: ['Glyph button', 'Condensed Button'],
        description:
          'IconButton allows users to take actions and make choices with a single click or tap.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'IconButton',
        visual: {
          svg: <IconButton />,
        },
        alias: ['Glyph button', 'Condensed Button'],
        description:
          'IconButton allows users to take actions and make choices with a single click or tap.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'IconButtonFloating',
    platform: {
      web: {
        name: 'IconButtonFloating',
        visual: {
          svg: <IconButtonFloating />,
        },
        alias: ['Glyph button', 'Floating action button', 'FAB', 'Quick create'],
        description:
          'IconButtonFloating provides an action that floats over the content and remains in place when scrolled.',
        category: ['Actions'],
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
        name: 'IconButtonFloating',
        visual: {
          svg: <IconButtonFloating />,
        },
        alias: ['Glyph button', 'Floating action button', 'FAB', 'Quick create'],
        description:
          'IconButtonFloating provides an action that floats over the content and remains in place when scrolled.',
        category: ['Actions'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Image',
    platform: {
      web: {
        name: 'Image',
        visual: {
          svg: <Image />,
        },
        alias: ['<img>', 'Picture', 'Photo'],
        description: 'Image is used to represent images.',
        category: ['Pins and imagery'],
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
    id: 'Label',
    platform: {
      web: {
        name: 'Label',
        visual: {
          svg: <GestaltLabel />,
        },
        alias: ['Field Label', 'Form Label'],
        description: 'Label is used to connect a label with a form component in an accessible way.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'notAvailable',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Layer',
    platform: {
      web: {
        name: 'Layer',
        visual: {
          svg: <Layer />,
          hasDarkBackground: true,
        },
        alias: ['Portal', 'Overlay'],
        description: 'Layers allow you to render children outside the DOM hierarchy of the parent.',
        category: ['Building blocks'],
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
    id: 'Letterbox',
    platform: {
      web: {
        name: 'Letterbox',
        visual: {
          svg: <Letterbox />,
        },
        description:
          'Letterboxes are useful if you have some source media which is larger than the area you want to display it in.',
        category: ['Building blocks'],
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
    id: 'Link',
    platform: {
      web: {
        name: 'Link',
        visual: {
          svg: <GestaltLink />,
        },
        alias: ['Anchor', '<a>', 'Text Link', 'Hyperlink'],
        description: 'Link allow users to click their way from page to page.',
        category: ['Actions'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'List',
    platform: {
      web: {
        name: 'List',
        visual: {
          svg: <List />,
        },
        alias: ['Unordered List', 'Ordered list', '<ol>', '<ul>', '<li>'],
        description:
          'List allows users to view individual, but related, text items grouped together.',
        category: ['Structure'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'notAvailable',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Mask',
    platform: {
      web: {
        name: 'Mask',
        visual: {
          svg: <Mask />,
        },
        description: 'Mask is used to display content in a specific shape.',
        category: ['Building blocks'],
        status: {
          documentation: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Masonry',
    platform: {
      web: {
        name: 'Masonry',
        visual: {
          svg: <Masonry />,
        },
        alias: ['Grid', 'Image List'],
        description:
          'Masonry creates a deterministic grid layout, positioning items based on available vertical space.',
        category: ['Pins and imagery'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Modal',
    platform: {
      web: {
        name: 'Modal',
        visual: {
          svg: <Modal />,
        },
        alias: ['Dialog', 'Prompt'],
        description: 'Modal displays content that requires user interaction.',
        category: ['Overlays'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          mobileAdaptive: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'ModalAlert',
    platform: {
      web: {
        name: 'ModalAlert',
        visual: {
          svg: <ModalAlert />,
        },
        alias: ['AlertDialog', 'Prompt'],
        description:
          'ModalAlert is used to alert a user of an issue, or to request confirmation after a user-triggered action.',
        category: ['Overlays'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
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
  {
    id: 'Module',
    platform: {
      web: {
        name: 'Module',
        visual: {
          svg: <Module />,
        },
        alias: [
          'Accordion',
          'Section',
          'Expandable Section',
          'Disclosure',
          'Stack View',
          'Expander',
        ],
        description: 'Module is a container that holds content about one subject.',
        category: ['Structure'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'NumberField',
    platform: {
      web: {
        name: 'NumberField',
        visual: {
          svg: <NumberField />,
        },
        alias: ['Number Input', 'Spin Box'],
        description: 'NumberField allows for numerical input.',
        category: ['Fields and forms'],
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
  {
    id: 'OverlayPanel',
    platform: {
      web: {
        name: 'OverlayPanel',
        visual: {
          svg: <OverlayPanel />,
        },
        alias: ['Drawer', 'Panel', 'Tray', 'Sheet'],
        description:
          'OverlayPanels are surfaces that allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page.',
        category: ['Overlays'],
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
  {
    id: 'PageHeader',
    platform: {
      web: {
        name: 'PageHeader',
        visual: {
          svg: <PageHeader />,
        },
        description:
          'PageHeader is used to indicate the title of the current page, as well as optional actions.',
        category: ['Structure'],
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
  {
    id: 'Pins',
    platform: {
      figma: {
        name: 'Pins',
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
    id: 'Pog',
    platform: {
      web: {
        name: 'Pog',
        visual: {
          svg: <Pog />,
        },
        description:
          'Pog is a lower-level functional component to show the active, hovered, and focused states of IconButton.',
        category: ['Building blocks'],
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
    id: 'Popover',
    platform: {
      web: {
        name: 'Popover',
        visual: {
          svg: <Popover />,
        },
        alias: ['Flyout'],
        description:
          'Popover is a floating view that contains a task related to the content on screen.',
        category: ['Overlays'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          mobileAdaptive: 'planned',
          responsive: 'ready',
          status: 'ready',
          knownIssues: [
            {
              title: 'Incorrect positioning and dimensions',
              description:
                'Popover accumulates many known issues. It is a custom built component. We are in the process of exploring replacing it with a battle-tested third-party library. Check the linked document to see if your issue is already documented.',
              internalDocUrl: 'http://pinch.pinadmin.com/popover_history',
            },
          ],
        },
      },
    },
  },
  {
    id: 'PopoverEducational',
    platform: {
      web: {
        name: 'PopoverEducational',
        visual: {
          svg: <PopoverEducational />,
        },
        description:
          'PopoverEducational is a floating container that introduces users to elements on the screen. Used for education or onboarding experiences.',
        category: ['Help and guidance'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'partial',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
          knownIssues: [
            {
              title: 'Caret misalignment',
              description:
                "PopoverEducational's caret might appear misaligned when positioned below the element of reference.",
              internalDocUrl: 'http://pinch.pinadmin.com/popover_history',
            },
            {
              title: 'Incorrect positioning and dimensions',
              description:
                'PopoverEducational is built on top of Popover. Popover accumulates many known issues. It is a custom built component. We are in the process of exploring replacing it with a battle-tested third-party library. Check the linked document to see if your issue is already documented.',
              internalDocUrl: 'http://pinch.pinadmin.com/popover_history',
            },
          ],
        },
      },
    },
  },
  {
    id: 'ProfileRep',
    platform: {
      figma: {
        name: 'ProfileRep',
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
    id: 'Pulsar',
    platform: {
      web: {
        name: 'Pulsar',
        visual: {
          svg: <Pulsar />,
        },
        alias: ['Activity Indicator', 'Circular Indicator', 'Ring'],
        description:
          'Pulsars bring focus to a specific element on the screen and act like training wheels to guide people towards the normal way to perform that action.',
        category: ['Loading'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'RadioGroup',
    platform: {
      web: {
        name: 'RadioGroup',
        visual: {
          svg: <RadioGroup />,
        },
        alias: ['Single Select', 'Option Buttons', 'Radio Inputs'],
        description: 'Use RadioGroup when you have a few options that a user can choose from.',
        category: ['Controls'],
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
  {
    id: 'ScrollBoundaryContainer',
    platform: {
      web: {
        name: 'ScrollBoundaryContainer',
        visual: {
          svg: <ScrollBoundaryContainer />,
        },
        alias: ['ScrollableContainer'],
        path: '/web/utilities/scrollboundarycontainer',
        description:
          'ScrollBoundaryContainer is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container.',
        category: ['Building blocks'],
        status: {
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'SearchField',
    platform: {
      web: {
        name: 'SearchField',
        visual: {
          svg: <SearchField />,
        },
        alias: ['Search Box', 'Search Bar'],
        description: 'SearchField allows users to search for free-form content.',
        category: ['Fields and forms'],
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
        name: 'SearchField',
        visual: {
          svg: <SearchField />,
        },
        alias: ['Search Box', 'Search Bar'],
        description: 'SearchField allows users to search for free-form content.',
        category: ['Fields and forms'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'SegmentedControl',
    platform: {
      web: {
        name: 'SegmentedControl',
        visual: {
          svg: <SegmentedControl />,
        },
        alias: ['Toggle Group'],
        description: 'SegmentedControl may be used to group multiple selections.',
        category: ['Navigation'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'SelectList',
    platform: {
      web: {
        name: 'SelectList',
        visual: {
          svg: <SelectList />,
        },
        alias: ['Picklist', 'Picker'],
        description:
          'SelectList displays a list of actions or options using the browser’s native select.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'partial',
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
  {
    id: 'Sheet',
    platform: {
      web: {
        name: 'SheetMobile',
        visual: {
          svg: <SheetMobile />,
        },
        alias: ['Panel', 'Dialog', 'Drawer', 'Tray'],
        description:
          'SheetMobile is a mobile only component. SheetMobile is a supplementary container that sits on top of the screen’s primary content.',
        category: ['Building blocks'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          badge: 'Pilot',
          documentation: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'Sheet',
        visual: {
          svg: <SheetMobile />, // THIS IS WRONG
        },
        alias: ['Panel', 'Dialog', 'Drawer', 'Tray'],
        description:
          'Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.',
        category: [],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
      ios: {
        name: 'Sheet',
        visual: {
          svg: <SheetMobile />, // THIS IS WRONG
        },
        alias: ['Panel', 'Dialog', 'Drawer', 'Tray'],
        description:
          'Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.',
        category: [],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'SideNavigation',
    platform: {
      web: {
        name: 'SideNavigation',
        visual: {
          svg: <SideNavigation />,
        },
        alias: ['Legend'],
        description:
          'SideNavigation is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal Tabs',
        category: ['Navigation'],
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
          mobileAdaptive: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'SlimBanner',
    platform: {
      web: {
        name: 'SlimBanner',
        visual: {
          svg: <SlimBanner />,
        },
        alias: ['Notice', 'Note', 'Scoped Notification'],
        description:
          'SlimBanner conveys brief information related to a specific section of a page.',
        category: ['Messaging'],
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
  {
    id: 'Spinner',
    platform: {
      web: {
        name: 'Spinner',
        visual: {
          svg: <Spinner />,
        },
        alias: [
          'Refresh Indicator',
          'Refresh Control',
          'Loader',
          'Circular Loader',
          'Loading Animation',
        ],
        description:
          "Spinner helps indicate that a surface's content or portion of content is currently loading.",
        category: ['Loading'],
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
  {
    id: 'Status',
    platform: {
      web: {
        name: 'Status',
        visual: {
          svg: <Status />,
        },
        alias: ['Status Indicator', 'Signal', 'System Feedback'],
        description: "Status is a graphic indicator of an element's state.",
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
  {
    id: 'Sticky',
    platform: {
      web: {
        name: 'Sticky',
        visual: {
          svg: <Sticky />,
        },
        description: 'Sticky allows an element to become fixed when it reaches a threshold.',
        category: ['Building blocks'],
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
    id: 'Switch',
    platform: {
      web: {
        name: 'Switch',
        visual: {
          svg: <Switch />,
        },
        alias: ['Toggle', 'Slide Toggle'],
        description: 'Switch is used for single cell options that can be turned on and off only.',
        category: ['Controls'],
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
        name: 'Switch',
        visual: {
          svg: <Switch />,
        },
        alias: ['Toggle', 'Slide Toggle'],
        description: 'Switch is used for single cell options that can be turned on and off only.',
        category: ['Controls'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Switch',
        visual: {
          svg: <Switch />,
        },
        alias: ['Toggle', 'Slide Toggle'],
        description: 'Switch is used for single cell options that can be turned on and off only.',
        category: ['Controls'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'Table',
    platform: {
      web: {
        name: 'Table',
        visual: {
          svg: <Table />,
        },
        alias: ['Data Table', 'Data Grid'],
        description:
          'Table is a set of structured data that is easy for a user to scan, examine, and compare.',
        category: ['Data'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'partial',
            a11yScreenreader: 'partial',
            a11yNavigation: 'partial',
            a11yComprehension: 'partial',
          },
          documentation: 'ready',
          figmaStatus: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'Table',
        visual: {
          svg: <Table />,
        },
        alias: ['Data Table', 'Data Grid'],
        description:
          'Table is a set of structured data that is easy for a user to scan, examine, and compare.',
        category: ['Data'],
        status: {
          documentation: 'ready',
          figmaStatus: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'TableOfContents',
    platform: {
      web: {
        name: 'TableOfContents',
        visual: {
          svg: <TableOfContents />,
        },
        alias: ['Table of Contents', 'Page Navigation', 'Page Navigator', 'Secondary Nav'],
        description:
          'TableOfContents is used to navigate to anchors on a page. It also serves as an outline of a page’s content.',
        category: ['Navigation'],
        status: {
          accessible: {
            a11yComprehension: 'ready',
            a11yNavigation: 'ready',
            a11yScreenreader: 'ready',
            a11yVisual: 'ready',
            summary: 'ready',
          },
          badge: 'New',
          documentation: 'ready',
          figmaStatus: 'ready',
          mobileAdaptive: 'notAvailable',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Tabs',
    platform: {
      web: {
        name: 'Tabs',
        visual: {
          svg: <Tabs />,
        },
        description: 'Tabs may be used navigate between multiple URLs.',
        category: ['Navigation'],
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
        name: 'Tabs',
        visual: {
          svg: <Tabs />,
        },
        description: 'Tabs may be used navigate between multiple URLs.',
        category: ['Navigation'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Tabs',
        visual: {
          svg: <Tabs />,
        },
        description: 'Tabs may be used navigate between multiple URLs.',
        category: ['Navigation'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Tag',
    platform: {
      web: {
        name: 'Tag',
        visual: {
          svg: <Tag />,
        },
        alias: ['Chip', 'Pill', 'Filter Tag'],
        description: 'Tags are objects that hold text and have a delete icon to remove them.',
        category: ['Data'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'ready',
          figmaStatus: 'partial',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'TagData',
    platform: {
      web: {
        name: 'TagData',
        visual: {
          svg: <TagData />,
        },
        alias: ['Chip', 'Pill', 'Filter', 'Tag'],
        description:
          'TagData can be used to select multiple categories to compare with each other in a graph or chart view.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
          },
          badge: 'Pilot',
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'TapArea',
    platform: {
      web: {
        name: 'TapArea',
        visual: {
          svg: <TapArea />,
        },
        alias: ['Touchable'],
        description:
          'TapArea allows components to be clickable and touchable in an accessible way.',
        category: ['Building blocks'],
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
    id: 'Text',
    platform: {
      web: {
        name: 'Text',
        visual: {
          svg: <Text />,
        },
        alias: ['Copy, Subtext, Caption, Footer, Helper text'],
        description: 'Text is used for all text on the page.',
        category: ['Text'],
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
          knownIssues: [
            {
              title: 'Line clamp truncation',
              description:
                'When the "lineClamp" prop is set to 1, text with long strings of characters might be truncated incorrectly',
              codesandboxUrl:
                'https://codesandbox.io/s/development-mode-forked-ngkj3c?file=/example.js',
            },
          ],
        },
      },
      android: {
        name: 'Text',
        visual: {
          svg: <Text />,
        },
        alias: ['Copy, Subtext, Caption, Footer, Helper text'],
        description:
          'Text component is used for all representations of text on a surface. Text is based on Android typography guidelines.',
        category: ['Text'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Text',
        visual: {
          svg: <Text />,
        },
        alias: ['Copy, Subtext, Caption, Footer, Helper text'],
        description:
          'Text component is used for all representations of text on a surface. Text is based on iOS typography guidelines.',
        category: ['Text'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'TextArea',
    platform: {
      web: {
        name: 'TextArea',
        visual: {
          svg: <TextArea />,
        },
        alias: ['Multi-line Input'],
        description: 'TextArea allows for multi-line input.',
        category: ['Fields and forms'],
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
        name: 'TextArea',
        visual: {
          svg: <TextArea />,
        },
        alias: ['Multi-line Input'],
        description: 'TextArea allows for multi-line input.',
        category: ['Fields and forms'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'TextField',
    platform: {
      web: {
        name: 'TextField',
        visual: {
          svg: <TextField />,
        },
        alias: ['Text Input'],
        description: 'TextField allows for multiple types of text input.',
        category: ['Fields and forms'],
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
        name: 'TextField',
        visual: {
          svg: <TextField />,
        },
        alias: ['Text Input'],
        description: 'TextField allows for multiple types of text input.',
        category: ['Fields and forms'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'TextField',
        visual: {
          svg: <TextField />,
        },
        alias: ['Text Input'],
        description: 'TextField allows for multiple types of text input.',
        category: ['Fields and forms'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'TileData',
    platform: {
      web: {
        name: 'TileData',
        visual: {
          svg: <TileData />,
        },
        alias: ['Card Grid', 'Item Featured', 'Choice Tile', 'Selection Card', 'Visual Picker'],
        description:
          'TileData can be used to select multiple categories to compare with each other in a graph or chart view.',
        category: ['Fields and forms'],
        status: {
          accessible: {
            summary: 'ready',
            a11yVisual: 'ready',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          badge: 'Pilot',
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Toast',
    platform: {
      web: {
        name: 'Toast',
        visual: {
          svg: <Toast />,
        },
        alias: ['Snackbar'],
        description:
          'Toasts educate users on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.',
        category: ['Messaging'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'notAvailable',
            a11yNavigation: 'notAvailable',
            a11yComprehension: 'partial',
          },
          documentation: 'ready',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
      android: {
        name: 'Toast',
        visual: {
          svg: <Toast />,
        },
        alias: ['Snackbar'],
        description:
          'Toasts educate users on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.',
        category: ['Messaging'],
        status: {
          documentation: 'ready',
          status: 'ready',
        },
      },
      ios: {
        name: 'Toast',
        visual: {
          svg: <Toast />,
        },
        alias: ['Snackbar'],
        description:
          'Toasts educate users on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.',
        category: ['Messaging'],
        status: {
          documentation: 'ready',
          status: 'planned',
        },
      },
    },
  },
  {
    id: 'Tooltip',
    platform: {
      web: {
        name: 'Tooltip',
        visual: {
          svg: <Tooltip />,
        },
        alias: ['Info Tip'],
        description:
          'Tooltip is a floating text label that succinctly describes the function of an interactive element.',
        category: ['Help and guidance'],
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
          knownIssues: [
            {
              title: 'Incorrect positioning and dimensions',
              description:
                'Tooltip is built on top of Popover. Popover accumulates many known issues. It is a custom built component. We are in the process of exploring replacing it with a battle-tested third-party library. Check the linked document to see if your issue is already documented.',
              internalDocUrl: 'http://pinch.pinadmin.com/popover_history',
            },
          ],
        },
      },
    },
  },
  {
    id: 'Upsell',
    platform: {
      web: {
        name: 'Upsell',
        visual: {
          svg: <Upsell />,
        },
        alias: ['Banner', 'Offer Banner', 'CTA Banner'],
        description:
          'Upsells are banners that display short messages that focus on promoting an action or upgrading something the user already has.',
        category: ['Messaging'],
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
  {
    id: 'useFocusVisible',
    platform: {
      web: {
        name: 'useFocusVisible',
        visual: {
          svg: <HookFocusVisible />,
        },
        description: 'useFocusVisible manages focus interactions on the page.',
        category: ['Utilities'],
        path: '/web/utilities/usefocusvisible',
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'notAvailable',
            a11yNavigation: 'notAvailable',
            a11yComprehension: 'notAvailable',
          },
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'useReducedMotion',
    platform: {
      web: {
        name: 'useReducedMotion',
        visual: {
          svg: <HookReducedMotion />,
        },
        description:
          'useReducedMotion allows a user to request that the system minimize the amount of non-essential motion.',
        category: ['Utilities'],
        path: '/web/utilities/usereducedmotion',
        alias: ['prefers-reduced-motion'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'ready',
            a11yScreenreader: 'notAvailable',
            a11yNavigation: 'notAvailable',
            a11yComprehension: 'notAvailable',
          },
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'Video',
    platform: {
      web: {
        name: 'Video',
        visual: {
          svg: <Video />,
        },
        description: 'Video is used for media layout.',
        category: ['Pins and imagery'],
        status: {
          accessible: {
            summary: 'partial',
            a11yVisual: 'notAvailable',
            a11yScreenreader: 'ready',
            a11yNavigation: 'ready',
            a11yComprehension: 'ready',
          },
          documentation: 'partial',
          figmaStatus: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
  {
    id: 'WashAnimated',
    platform: {
      web: {
        name: 'WashAnimated',
        visual: {
          svg: <WashAnimated />,
        },
        alias: ['Card', 'Panel', 'Tile'],
        description: 'WashAnimated is used to highlight content in grids.',
        category: ['Structure'],
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
    id: 'Z-Index Classes',
    platform: {
      web: {
        name: 'Z-Index Classes',
        visual: {
          svg: <ZIndexClasses />,
        },
        description:
          'FixedZIndex and CompositeZIndex are utility classes that generate z-indices for Gestalt components.',
        path: '/web/zindex_classes',
        category: ['Building blocks'],
        status: {
          documentation: 'ready',
          responsive: 'ready',
          status: 'ready',
        },
      },
    },
  },
];

export default componentData;
