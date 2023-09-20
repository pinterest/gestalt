---
title: ActionList
description:  An ActionList is a continuous vertical group of list items that can include text, icons, images, and actions.
fullwidth: true
---

<ImgContainer padding="standard" src="https://i.pinimg.com/originals/51/e9/79/51e979a6535b9ee0c95acee377fa85c1.png" alt="An example of the Action List component"/>

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
    <ImgContainer src="https://i.pinimg.com/originals/83/7d/15/837d15ca2ef97d8fd53beffb49e59d75.png" alt="Example of grouped ActionList items. For example, message settings under the heading - Messages."/>
    <Do title="Do" />
    Group related items together to aid user comprehension and streamline navigation. Consider dividers to break up groups that differ in content.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/46/02/d7/4602d76785e40fd1336c932e872c610f.png" alt="Example of two ActionList items with accompanying icons"/>
    <Dont title="Don't" />
    Don't overuse icons. Choose icons that are easily recognizable and directly related to the item's content.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/aa/f1/72/aaf172e0437be4f9b94c9689212d5271.png" alt="Two ActionList items with short and clear copy."/>
    <Do title="Do" />
    Keep text succinct so row content is easy to scan and comfortable to read.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/7a/68/4b/7a684b1b7c6362a03f4ac75b69c914ad.png" alt="An ActionList item with four lines or complex copy"/>
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
<iframe style={{border:0}} width="100%" height="560" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D44003%253A3915%26mode%3Ddesign%26t%3DKBAAziRKxCsWLU6g-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D44007%253A1318%26mode%3Ddesign%26t%3DKBAAziRKxCsWLU6g-1" allowFullScreen></iframe>


## Variants

### Defualt

The default ActionList items do not include a start item and only display text, but they still allow for end items to be displayed.

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
    <ImgContainer src="https://i.pinimg.com/originals/48/18/2e/48182e695cf7c4e32ed5694c243af6d9.png" alt="An ActionList item for the user Sarah Smith, inluding her follower count and a follow button."/>
    **Avatar**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3e/ff/88/3eff88ac1697b81ad702f04c38c17314.png" alt="An ActionList item with content about search privacy and a search icon."/>
   **Icon**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/0d/20/a5/0d20a53c81bf2ec60ca5f02c3e3e5bf7.png" alt="An ActionList item for a board with a switch end item."/>
   **Image**
  </Group>
</TwoCol>

### End & navigation items

ActionList items can display 3 different start items.

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
    <ImgContainer src="https://i.pinimg.com/originals/7c/98/c8/7c98c85940868b958f6ac7979500c3bd.png" alt="An ActionList showing users and buttons to follow them."/>
    **Button**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3e/85/d6/3e85d6e1e27e946d796fd8c5ca3c182d.png" alt="An ActionList showing interest options and a multiple choice checkbox selection."/>
   **Checkbox**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/87/1b/06/871b06a702d5e8a2d518a025ce010699.png" alt="An ActionList showing a menu of links to further information."/>
   **Select**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d6/81/c4/d681c4c7af5babf43d803e9833ed72ea.png" alt="An ActionList showing a list of selctable items."/>
   **Switch**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b2/a3/44/b2a344d4f583e04cd286c8b9d14a6d57.png" alt="An ActionList with switches for each item."/>
   **Icon Button**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/22/c6/00/22c6002ca3430a1818480b5aaf409029.png" alt="An ActionList with a list of users and their follower count."/>
   **Text**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/fa/88/52/fa88528c967ab1439c2ce4616412cb9b.png" alt="An ActionList with email and password settings links."/>
   **Text + Icon Button**
  </Group>
</TwoCol>

### End item placement

Checkbox, Select, and Switch end items will always appear in-line with the title. All other end items will appear centered within the container of the ActionList item. 
<br/>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1c/c4/23/1cc423920f6cfa5db000f99df527ec4b.png" alt="An ActionList showing users and buttons to follow them."/>
    **Checkbox, Select, Switch**
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/39/a3/2c/39a32c9159f8a8b1197a777201e6e878.png" alt="An ActionList showing interest options and a multiple choice checkbox selection."/>
   **All other end items**
  </Group>
  </TwoCol>

## Writing
- Use short, meaningful labels that succinctly describe the purpose of each item
- Avoid truncation. If your copy is longer than 3 lines, consider revising the content.
- For headings use nouns or short phrases with title-style capitalization, and don’t use punctuation. 

## Localization
Be sure to localize the ActionList text. Note that localization can lengthen text by 20 to 30 percent.
<ImgContainer padding="standard" src="https://i.pinimg.com/originals/92/a5/8b/92a58b2f91f0c3bf74c6c3bfb06f19a9.png" alt="An ActionList example reversed to reflect the location."/>