// @flow strict
import ActivationCard from '../graphics/general/ActivationCard.svg';
import Avatar from '../graphics/general/Avatar.svg';
import AvatarGroup from '../graphics/general/AvatarGroup.svg';
import AvatarPair from '../graphics/general/AvatarPair.svg';
import Badge from '../graphics/general/Badge.svg';
import Button from '../graphics/general/Button.svg';
import ButtonGroup from '../graphics/general/ButtonGroup.svg';
import Callout from '../graphics/general/Callout.svg';
import Card from '../graphics/general/Card.svg';
import Checkbox from '../graphics/general/Checkbox.svg';
import Collage from '../graphics/general/Collage.svg';
import ComboBox from '../graphics/general/ComboBox.svg';
import Datapoint from '../graphics/general/Datapoint.svg';
import DatePicker from '../graphics/general/DatePicker.svg';
import Divider from '../graphics/general/Divider.svg';
import Dropdown from '../graphics/general/Dropdown.svg';
import Fieldset from '../graphics/general/Fieldset.svg';
import Heading from '../graphics/general/Heading.svg';
import IconButton from '../graphics/general/IconButton.svg';
import Image from '../graphics/general/Image.svg';
import GestaltLabel from '../graphics/general/Label.svg';
import GestaltLink from '../graphics/general/Link.svg';
import Masonry from '../graphics/general/Masonry.svg';
import Modal from '../graphics/general/Modal.svg';
import Module from '../graphics/general/Module.svg';
import NumberField from '../graphics/general/NumberField.svg';
import PageHeader from '../graphics/general/PageHeader.svg';
import Popover from '../graphics/general/Popover.svg';
import Pulsar from '../graphics/general/Pulsar.svg';
import RadioButton from '../graphics/general/RadioButton.svg';
import SearchField from '../graphics/general/SearchField.svg';
import SegmentedControl from '../graphics/general/SegmentedControl.svg';
import SelectList from '../graphics/general/SelectList.svg';
import Sheet from '../graphics/general/Sheet.svg';
import Spinner from '../graphics/general/Spinner.svg';
import Status from '../graphics/general/Status.svg';
import Switch from '../graphics/general/Switch.svg';
import Table from '../graphics/general/Table.svg';
import Tabs from '../graphics/general/Tabs.svg';
import Tag from '../graphics/general/Tag.svg';
import Text from '../graphics/general/Text.svg';
import TextArea from '../graphics/general/TextArea.svg';
import TextField from '../graphics/general/TextField.svg';
import Toast from '../graphics/general/Toast.svg';
import Tooltip from '../graphics/general/Tooltip.svg';
import Upsell from '../graphics/general/Upsell.svg';
import Video from '../graphics/general/Video.svg';
import { type ListItemType } from '../pages/component_overview.js';

const GENERAL: ListItemType = [
  {
    svg: <ActivationCard />,
    name: 'ActivationCard',
    description:
      'ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.',
    category: 'Messaging',
  },
  {
    svg: <Avatar />,
    name: 'Avatar',
    description: 'Avatar is used to represent a user.',
    category: 'Avatars',
  },
  {
    svg: <AvatarGroup />,
    name: 'AvatarGroup',
    description:
      'AvatarGroup is used to both display a group of user avatars and, optionally, control actions related to the users group.',
    category: 'Avatars',
  },
  {
    svg: <AvatarPair />,
    name: 'AvatarPair',
    description: 'AvatarPair is used to display two avatars in an overlapping grouping.',
    category: 'Avatars',
  },
  {
    svg: <Badge />,
    name: 'Badge',
    description: 'Badge is a label that indicates status or importance.',
    category: 'Messaging',
  },
  {
    svg: <Button />,
    name: 'Button',
    description: 'Buttons allow users to perform actions within a surface.',
    category: 'Actions',
  },
  {
    svg: <ButtonGroup />,
    name: 'ButtonGroup',
    description: 'ButtonGroup is used to display a series of buttons.',
    category: 'Actions',
  },
  {
    svg: <Callout />,
    name: 'Callout',
    description:
      'Callout is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.',
    category: 'Messaging',
  },
  {
    svg: <Card />,
    name: 'Card',
    description: 'Card is used to highlight content in grids.',
    category: 'Structure',
  },
  {
    svg: <Checkbox />,
    name: 'Checkbox',
    description: 'Use Checkbox when displaying 3 or more toggle inputs.',
    category: 'Controls',
  },
  {
    svg: <Collage />,
    name: 'Collage',
    description:
      'Collage, similarly to Masonry, creates a deterministic grid layout that can absolutely position and virtualize images.',
    category: 'Pins & Imagery',
  },
  {
    svg: <ComboBox />,
    name: 'ComboBox',
    description:
      'ComboBox is the combination of a Textfield and an associated Dropdown that allows the user to filter a list when selecting an option.',
    category: 'Fields & Forms',
  },
  {
    svg: <Datapoint />,
    name: 'Datapoint',
    description: 'Datapoint displays at-a-glance data for a user to quickly view key metrics.',
    category: 'Data',
  },
  {
    svg: <DatePicker />,
    name: 'DatePicker',
    description: 'DatePicker is used when the user has to select a date or date range.',
    category: 'Fields & Forms',
  },
  {
    svg: <Divider />,
    name: 'Divider',
    description:
      'Divider is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.',
    category: 'Structure',
  },
  {
    svg: <Dropdown />,
    name: 'Dropdown',
    description: 'Dropdown displays a list of actions, options or links.',
    category: 'Fields & Forms',
  },
  {
    svg: <Fieldset />,
    name: 'Fieldset',
    description:
      'Fieldset creates a fieldset and legend for a group of related form items in order to clearly indicate related form items.',
    category: 'Fields & Forms',
  },
  {
    svg: <Heading />,
    name: 'Heading',
    description:
      'Heading allows you to show headings on the page & has a bigger line height than regular text.',
    category: 'Text',
  },
  {
    svg: <IconButton />,
    name: 'IconButton',
    description:
      'IconButton allows users to take actions and make choices with a single click or tap.',
    category: 'Actions',
  },
  {
    svg: <Image />,
    name: 'Image',
    description: 'Image is used to represent images.',
    category: 'Pins & Imagery',
  },
  {
    svg: <GestaltLabel />,
    name: 'Label',
    description: 'Label is used to connect a label with a form component in an accessible way.',
    category: 'Fields & Forms',
  },
  {
    svg: <GestaltLink />,
    name: 'Link',
    description: 'Link allow users to click their way from page to page.',
    category: 'Actions',
  },
  {
    svg: <Masonry />,
    name: 'Masonry',
    description:
      'Masonry creates a deterministic grid layout, positioning items based on available vertical space.',
    category: 'Pins & Imagery',
  },
  {
    svg: <Modal />,
    name: 'Modal',
    description: 'Modal displays content that requires user interaction.',
    category: 'Messaging',
  },
  {
    svg: <Module />,
    name: 'Module',
    description: 'Module is a container that holds content about one subject.',
    category: 'Messaging',
  },
  {
    svg: <NumberField />,
    name: 'NumberField',
    description: 'NumberField allows for numerical input.',
    category: 'Fields & Forms',
  },
  {
    svg: <PageHeader />,
    name: 'PageHeader',
    description:
      'PageHeader is used to indicate the title of the current page, as well as optional actions.',
    category: 'Navigation',
  },
  {
    svg: <Popover />,
    name: 'Popover',
    description:
      'Popover is a floating view that contains a task related to the content on screen.',
    category: 'Messaging',
  },
  {
    svg: <Pulsar />,
    name: 'Pulsar',
    description:
      'Pulsars bring focus to a specific element on the screen and act like training wheels to guide people towards the normal way to perform that action.',
    category: 'Loading',
  },
  {
    svg: <RadioButton />,
    name: 'RadioButton',
    description: 'se RadioButtons when you have a few options that a user can choose from.',
    category: 'Controls',
  },
  {
    svg: <SearchField />,
    name: 'SearchField',
    description: 'SearchField allows users to search for free-form content.',
    category: 'Fields & Forms',
  },
  {
    svg: <SegmentedControl />,
    name: 'SegmentedControl',
    description: 'SegmentedControl may be used to group multiple selections.',
    category: 'Navigation',
  },
  {
    svg: <SelectList />,
    name: 'SelectList',
    description:
      'SelectList displays a list of actions or options using the browser’s native select.',
    category: 'Fields & Forms',
  },
  {
    svg: <Sheet />,
    name: 'Sheet',
    description:
      'Sheets are surfaces that allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page.',
    category: 'Messaging',
  },
  {
    svg: <Spinner />,
    name: 'Spinner',
    description:
      "Spinner helps indicate that a surface's content or portion of content is currently loading.",
    category: 'Loading',
  },
  {
    svg: <Status />,
    name: 'Status',
    description: "Status is a graphic indicator of an element's state.",
    category: 'Messaging',
  },
  {
    svg: <Switch />,
    name: 'Switch',
    description: 'Switch is used for single cell options that can be turned on and off only.',
    category: 'Controls',
  },
  {
    svg: <Table />,
    name: 'Table',
    description:
      'Table is a set of structured data that is easy for a user to scan, examine, and compare.',
    category: 'Data',
  },
  {
    svg: <Tabs />,
    name: 'Tabs',
    description: 'Tabs may be used navigate between multiple URLs.',
    category: 'Navigation',
  },
  {
    svg: <Tag />,
    name: 'Tag',
    description: 'Tags are objects that hold text and have a delete icon to remove them.',
    category: 'Data',
  },
  {
    svg: <Text />,
    name: 'Text',
    description: 'Text is used for all text on the page.',
    category: 'Text',
  },
  {
    svg: <TextArea />,
    name: 'TextArea',
    description: 'TextArea allows for multi-line input.',
    category: 'Fields & Forms',
  },
  {
    svg: <TextField />,
    name: 'TextField',
    description: 'TextField allows for multiple types of text input.',
    category: 'Fields & Forms',
  },
  {
    svg: <Toast />,
    name: 'Toast',
    description:
      'Toasts educate users on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.',
    category: 'Messaging',
  },
  {
    svg: <Tooltip />,
    name: 'Tooltip',
    description:
      'Tooltip is a floating text label that succinctly describes the function of an interactive element.',
    category: 'Messaging',
  },
  {
    svg: <Upsell />,
    name: 'Upsell',
    description:
      'Upsells are banners that display short messages that focus on promoting an action or upgrading something the user already has.',
    category: 'Messaging',
  },
  {
    svg: <Video />,
    name: 'Video',
    description: 'Video is used for media layout.',
    category: 'Pins & Imagery',
  },
];
export default GENERAL;
