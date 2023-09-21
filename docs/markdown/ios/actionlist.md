---
title: ActionList
description:  An ActionList is a continuous vertical group of list items that can include text, icons, images, and actions.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/e5/ec/f9/e5ecf9d44c313cf2ec9d5e299b6a96ad.png" alt="An example of the Action List component"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To structure your content or display a group of items that may or may not be actionable
      - Stack items vertically to organize related content, such as settings or options
      - Showcase key features or services with icons and brief descriptions
  </Group>
  <Group>
  <Dont title="When not to use" />
     - Not suitable for displaying complex content requiring extensive explanation
     - Avoid using for long lists of data; it's better for highlighting and navigating
  </Group>
</TwoCol>

## Best practices
- When stacked vertically, maintain consistent spacing and alignment for a harmonious layout
- Use consistent headings for each section on the same screen
<br/>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/36/fd/80/36fd807eee36dbd71f4f8719b5caf45d.png" alt="Example of grouped ActionList items. For example, message settings under the heading - Messages."/>
    <Do title="Do" />
    Group related items together to aid user comprehension and streamline navigation. Consider dividers to break up groups that differ in content.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cb/69/ce/cb69ceb27234bf62f302a6d0a1c2d0a4.png" alt="Example of two ActionList items with accompanying icons"/>
    <Dont title="Don't" />
    Don't overuse icons. Choose icons that are easily recognizable and directly related to the item's content.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8a/ea/54/8aea54102b7dcb6666a2df847242c1ab.png" alt="Two ActionList items with short and clear copy."/>
    <Do title="Do" />
    Keep text succinct so row content is easy to scan and comfortable to read.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e2/84/ca/e284ca71eccfc7755f11ccaf8c5607fc.png" alt="An ActionList item with four lines or complex copy"/>
    <Dont title="Don't" />
    Use more than 3 lines of subtext as it reduces scan-ability and can pose issues with internationalization, spacing, and comprehension.
  </Group>
</TwoCol>

## Accessibility

- Make sure the ActionList component includes appropriate list markup, with screen readers announcing the number and content of each item.
- Ensure that interactive elements in list items, such as checkboxes or buttons, are both focusable and usable.
- Include descriptive alt text for icons and labels that convey the purpose of each item. 

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="560" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D42153%253A4052%26mode%3Ddesign%26t%3Dv622LtavFiMWyuMY-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D42153%253A3806%26mode%3Ddesign%26t%3Dv622LtavFiMWyuMY-1" allowFullScreen></iframe>


## Variants

### Defualt

The default ActionList items do not include a start item and only display text, but they still allow for end items to be displayed.
<br/>
<ImgContainer padding="standard" src="https://i.pinimg.com/originals/b5/5f/62/b55f62ff3f210c6f490d5377a35998e4.png" alt="An example of the Action List component"/>

### Start items

ActionList items can display 3 different start items.

1. **Avatar**
  Commonly used to represent users, profiles, comments or messages in a list.
2. **Icon**
  Using icons can effectively communicate meaning or context, thereby enhancing the visual information conveyed by list items.
3. **Image**
  This is usually used when a visual representation is necessary and can also be used to represent a Pin or Board.
<br/>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b8/b6/e2/b8b6e282681735393b27461b8d995073.png" alt="An ActionList item for the user Sarah Smith, inluding her follower count and a follow button."/>
    **Avatar**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/47/7f/12/477f125dbb1652e5dc06220aa020bda9.png" alt="An ActionList item with content about search privacy and a search icon."/>
   **Icon**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d5/b6/c1/d5b6c12a232eba19d8c041235ad1def5.png" alt="An ActionList item for a board with a switch end item."/>
   **Image**
  </Group>
</TwoCol>

### End & navigation items

ActionList items can display a variety of end items.

1. **Button**
  Use to perform a specific action related to an item in the Action List, such as following or unfollowing a user.
2. **Checkbox**
  Allows users to select multiple items within an Action List
3. **Select**
  Enables users to choose a single option from an Action List
4. **Switch**
  Toggles a specific feature on or off. Typically used for binary settings like activating dark mode.
5. **Icon Button**
  Represents and action moving the user forward or in regards to that specific Action List item. Typically an arrow moving the user to a new page.
6. **Text**
  Additional information at the end of the Action List item
7. **Text + Icon Button**
  Additional information at the end of the Action List item with the addition of a specific icon button action
<br/>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/57/7e/2a/577e2ad2b1a6549a3774490842c49afb.png" alt="An ActionList showing users and buttons to follow them."/>
    **Button**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/fe/24/f3/fe24f3f1950d9d26ebd6cb37c7cf2eb9.png" alt="An ActionList showing interest options and a multiple choice checkbox selection."/>
   **Checkbox**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cd/37/b6/cd37b6844feddfc4223ae5111c547f3e.png" alt="An ActionList showing a menu of links to further information."/>
   **Select**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8c/31/a1/8c31a1168b988fe25f490f9142e72fcb.png" alt="An ActionList showing a list of selctable items."/>
   **Switch**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/bd/67/c7/bd67c7f7a242d35914b6b329c4d75c5e.png" alt="An ActionList with switches for each item."/>
   **Icon Button**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b0/7d/d0/b07dd00df0efbb3c89bfbd6a939c6141.png" alt="An ActionList with a list of users and their follower count."/>
   **Text**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3f/36/48/3f36482efdb18b53cc609c285d43f34b.png" alt="An ActionList with email and password settings links."/>
   **Text + Icon Button**
  </Group>
</TwoCol>

### End item placement

Checkbox, Select, and Switch end items will always appear in-line with the title. All other end items will appear centered within the container of the ActionList item. 
<br/>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/36/d4/38/36d4386b82a0bca68242b62d46fcc189.png" alt="An ActionList showing users and buttons to follow them."/>
    **Checkbox, Select, Switch**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/85/ed/23/85ed23a07674f4a48854bdf681c6ad93.png" alt="An ActionList showing interest options and a multiple choice checkbox selection."/>
   **All other end items**
  </Group>
  </TwoCol>

## Writing
- Use short, meaningful labels that succinctly describe the purpose of each item
- Avoid truncation. If your copy is longer than 3 lines, consider revising the content.
- For headings use nouns or short phrases with title-style capitalization, and don’t use punctuation. 

## Localization
Be sure to localize the ActionList text. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer padding="standard" src="https://i.pinimg.com/originals/92/a5/8b/92a58b2f91f0c3bf74c6c3bfb06f19a9.png" alt="An ActionList example reversed to reflect the location."/>