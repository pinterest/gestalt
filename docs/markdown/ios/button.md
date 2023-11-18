---
title: Button
description: Buttons allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](/web/dropdown) or [Popover](/web/popover).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/28/1a/d1/281ad184c9d118598c3617c87f444b11.png" alt="a red button that says Save" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Communicating an action that will occur.
    - Triggering or enabling an action, such as submitting requested information.
    - Progressing or regressing a user through a step in a flow.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Directing users to a new page or different part within the same page.
    - Limited space available. Consider using an IconButton instead.
  </Group>
</TwoCol>

## Best practices

- Place primary buttons to the right or top of other buttons when in a button group.
- Keep elements inside a button container grouped. Label text and icons should remain centered when the Button width increases.
- Avoid using multiple button sizes in the same experience.
- If necessary, adjust the button placement and size when scaling from large screens to small screens.

For general Button best practices, refer to the [Button web documentation](/web/button).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)

## Design tokens

<iframe style={{border:0}} width="100%" height="1500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1656%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1540%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
## Variants

### Size

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [$font-size-300 token](/foundations/design_tokens#Font-size) (16sp).

1. **lg (60px)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (44px)**
   Small should be used sparingly and only in places where the UI is very dense.

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1227%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
### Width

1. **Inline (default)**
   Inline is our default button width. The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. **Full-width (fullWidth)**
   Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area.

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1299%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe></Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1870%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe></Group>
</TwoCol>

### Styling

For more information on color, icons, roles, and states, refer to the [web Button documentation](/web/button)

1. **Red (Primary)**
   High emphasis, used for primary actions.
2. **Blue (Primary in shopping context)**
   The blue Button is only intended for the shopping experience and is used for primary shopping actions.
3. **Gray (Secondary)**
   Medium emphasis, used for secondary actions.
4. **Transparent (Tertiary)**
Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. Note, this treatment should be used with caution as it has potential color contrast issues.
<br/>
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1403%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
**Primary**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1423%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
**Shopping**
</Group>
</TwoCol>

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1419%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
**Secondary**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1421%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
**Tertiary**
</Group>
</TwoCol>

### States

1. **Disabled**
   Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
2. **Selected**
When Button is used to toggle a boolean state or control the visibility of other elements (e.g. Dropdown).
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1427%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>**Disabled**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1425%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>**Selected**
</Group>
</TwoCol>

## Color

<iframe style={{border:0}} width="100%" height="640" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A1405%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
## Writing
<TwoCol>
  <Group>
    <Do title="Do" />
    - If your object is already described on the screen, Buttons only need a verb (Example: Save).
    - If your object isn’t described on the screen, Buttons need a verb + the object (Example: Create Pin).
    - Use fewer than 3 words.
    - Use sentence case.
  </Group>
  <Group>
  <Dont title="Don't" />
    - Do not use punctuation.
  </Group>
</TwoCol>
For writing best practices, refer to the [web Button documentation](/web/button).

## Localization

For RTL (right-to-left) languages, the layout of the button is mirrored. The icon is placed on the right side of the text.

## Related

- [ButtonGroup](/web/button)
  ButtonGroup is used to display a series of buttons with similar actions.
- [IconButton](/web/button)
  IconButton allows users to take actions and make choices with a single click or tap.
