---
title: ButtonGroup
description: ButtonGroup is used to display a series of buttons with similar actions. Use ButtonGroup to ensure consistent spacing and wrapping behavior.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/1c/fe/71/1cfe71a46c02a0215da0634c29acd2f1.png" alt="A set of two buttons side by side. The left button is secondary and the right button is primary. " />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Showing all the available options at one glance
    - Arranging a group of buttons in a horizontal or vertical stack due to limited space
  </Group>
  <Group>
  <Dont title="When not to use" />
     - Switching between different views. Use [Tabs](/ios/tabs) instead
  </Group>
</TwoCol>

## Mobile best practices

Keep primary actions (ex: submitting a form) on the right and secondary actions (ex: cancel) on the left. When used vertically, keep the primary action at the top.

For general Button best practices on color usage and states, refer to the [Button documentation](/ios/button).

## Accessibility

People use iOS's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Content

For writing best practices, refer to the [Button documentation](/ios/button).

## Design tokens

Use these tokens for applying size, weight and color styles to ButtonGroups.
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A751%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>

## Anatomy

See below how the ButtonGroup component is constructed.
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A900%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [$font-size-300 token](/foundations/design_tokens/overview#Font-size) (16sp).
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A603%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A529%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
1. **lg (60px)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (48px)**
   Small should be used sparingly and only in places where the UI is very dense.

<br/>
### Orientation use cases

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A677%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
1. **Horizontal**
   By default, a ButtonGroup is horizontal.
2. **Vertical**
   Use vertical when horizontal space is limited by the Button’s content.

<br/>

## Dark mode

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39244%253A329%26mode%3Ddesign%26t%3DKmwVNK2zlshOfSby-1" allowfullscreen></iframe>
## Styling

For information on color, icons, roles, and states, refer to the [Button documentation](/ios/button).

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

For RTL (right-to-left) languages, the layout of the button group is mirrored. the primary button will be on the left and top and the secondary button will be on the right and bottom.

<br/>
<ImgContainer src="https://i.pinimg.com/originals/75/68/86/75688609a17a78159d513407a0a6df42.png" alt="Two sets of buttons, one vertically stacked and one horizontal. The button layout is localized for right-to-left languages. " />
