// @flow strict
import { useState, type Node, type ElementProps } from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Pog,
  Layer,
  Link,
  RadioGroup,
  SearchField,
  TapArea,
  Text,
  Toast,
} from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
// $FlowExpectedError[untyped-import]
import iconCategoryData from './ICON_DATA.json';

const { icons } = Icon;
const CATEGORIES = [
  'Add',
  'Ads and measurements',
  'Alignment',
  'Arrows',
  'Media controls',
  'Platform specific',
  'Reactions and ratings',
  'Social',
  'Status',
  'Text',
  'Time',
  'Toggle',
  'Utility and tools',
];

type IconName = $NonMaybeType<$ElementType<ElementProps<typeof Icon>, 'icon'>>;
type IconData = {|
  name: $NonMaybeType<$ElementType<ElementProps<typeof Icon>, 'icon'>>,
  category:
    | 'Add'
    | 'Ads and measurements'
    | 'Alignment'
    | 'Arrows'
    | 'Media controls'
    | 'Platform specific'
    | 'Reactions and ratings'
    | 'Social'
    | 'Status'
    | 'Text'
    | 'Time'
    | 'Toggle'
    | 'Utility and tools',
|};

function IconTile({ iconName, onTap }: {| iconName: IconName, onTap: () => void |}) {
  const [hovered, setHovered] = useState();

  return (
    <TapArea
      rounding={2}
      tapStyle="compress"
      onTap={onTap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Box
        borderStyle="sm"
        rounding={2}
        padding={2}
        paddingX={2}
        width={150}
        height={110}
        color={hovered ? 'inverse' : 'default'}
        position="relative"
      >
        <Flex
          height="100%"
          flex="grow"
          direction="column"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            color={hovered ? 'inverse' : 'default'}
            accessibilityLabel={iconName}
            icon={iconName}
            size="24"
          />
          <Text color={hovered ? 'inverse' : 'default'} size="100">
            {iconName}
          </Text>
        </Flex>
        <Box
          position="absolute"
          bottom
          right
          display={hovered ? 'block' : 'none'}
          dangerouslySetInlineStyle={{ __style: { bottom: '8px', right: '8px' } }}
        >
          <Pog
            icon="copy-to-clipboard"
            size="xs"
            iconColor="darkGray"
            bgColor="lightGray"
            padding={1}
          />
        </Box>
      </Box>
    </TapArea>
  );
}

function findIcon(icon?: string): ?IconName {
  return icons.find((name) => name === icon);
}

function findIconByCategory(icon?: string, category: string): IconData {
  // This check ensures there is an actual matching icon in our component
  // so we don't accidentally show icons that are only in Figma.
  const iconComponentName = icons.find((name) => name === icon);

  return iconCategoryData.icons.find(
    ({ name, categories }) => name === iconComponentName && categories.includes(category),
  );
}

export default function IconPage(): Node {
  const [showToastText, setShowToastText] = useState(false);

  const iconOptions = icons.map((name, index) => ({
    label: name,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(iconOptions);
  const [inputValue, setInputValue] = useState();
  const [sortedAlphabetical, setSortedAlphabetical] = useState(true);

  const handleOnChange = ({ value }) => {
    setInputValue(value);
    setSuggestedOptions(
      value
        ? iconOptions.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()))
        : iconOptions,
    );
  };

  const buildHandleIconClick = (iconName: string) => () => {
    try {
      navigator.clipboard.writeText(iconName);
      setShowToastText(`Icon name ("${iconName}") successfully copied!`);
      setTimeout(() => setShowToastText(), 3000);
    } catch (err) {
      // Not handling error
    }
  };

  const renderIconTiles = () =>
    sortedAlphabetical ? (
      <Flex gap={3} wrap>
        {(suggestedOptions || iconOptions).map(({ label: iconName }, index) => {
          const icon = findIcon(iconName);
          return icon ? (
            <IconTile key={index} iconName={icon} onTap={buildHandleIconClick(icon)} />
          ) : null;
        })}
      </Flex>
    ) : (
      CATEGORIES.map((category, idx) => {
        const iconsToRenderByCategory = (suggestedOptions || iconOptions).map(
          ({ label: iconName }, index) => {
            const iconData = findIconByCategory(iconName, category);
            return iconData ? (
              <IconTile
                key={index}
                iconName={iconData.name}
                onTap={buildHandleIconClick(iconData.name)}
              />
            ) : null;
          },
        );
        if (iconsToRenderByCategory.filter(Boolean).length === 0) {
          return null;
        }
        return (
          <Flex key={idx} direction="column" gap={4}>
            <Heading size="400">{category}</Heading>
            <Flex gap={3} wrap>
              {iconsToRenderByCategory}
            </Flex>
          </Flex>
        );
      })
    );

  const renderEmptyState = () => (
    <Flex direction="column" gap={3}>
      <Heading color="error" size="400">
        No result found
      </Heading>
      <Text>
        It appears we don&apos;t have an icon that matches your search. Check your spelling or try a
        different search term.
      </Text>
      <Text>
        Need a new icon?{' '}
        <Link inline href="/get_started/how_to_work_with_us#Slack-channels">
          Reach out to us
        </Link>
        , and we can evaluate your request.
      </Text>
    </Flex>
  );

  return (
    <Page title="Iconography collection">
      <PageHeader name="Iconography and SVGs" folderName="icons" type="guidelines" />

      <MainSection
        name="Icon library"
        description="Use the icon grid to visually search for icons. On click, the icon name will be copied. You can use the search input below to search icons by name, or filter your search by alphabetical or category."
      >
        <Flex width="100%" direction="column" gap={8}>
          <Flex gap={6} alignItems="end">
            <SearchField
              accessibilityLabel="Search icons by name"
              autoComplete="off"
              accessibilityClearButtonLabel="Clear search field"
              label="Search icons by name"
              id="icon-search-field"
              onChange={handleOnChange}
              value={inputValue}
            />
            <RadioGroup legend="Sort by" direction="row" id="directionExample">
              <RadioGroup.RadioButton
                checked={sortedAlphabetical}
                id="sortAlphabetical"
                label="Alphabetical"
                name="sortOrder"
                onChange={() => setSortedAlphabetical(true)}
                value="alphabetical"
              />
              <RadioGroup.RadioButton
                checked={!sortedAlphabetical}
                id="sortCategory"
                label="Category"
                name="sortOrder"
                onChange={() => setSortedAlphabetical(false)}
                value="category"
              />
            </RadioGroup>
          </Flex>
          <Box>
            <Flex direction="column" gap={8}>
              {suggestedOptions.length === 0 ? renderEmptyState() : renderIconTiles()}
            </Flex>
          </Box>
        </Flex>

        {showToastText && (
          <Layer>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  bottom: 50,
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }}
              fit
              paddingX={1}
              position="fixed"
            >
              <Toast text={showToastText} />
            </Box>
          </Layer>
        )}
      </MainSection>
    </Page>
  );
}
