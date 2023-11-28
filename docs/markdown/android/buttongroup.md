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
     - Switching between different views. Use [Tabs](/android/tabs) instead
  </Group>
</TwoCol>

## Best practices

Keep primary actions (ex: submitting a form) on the right and secondary actions (ex: cancel) on the left. When used vertically, keep the primary action at the top. 

For general Button best practices, refer to the [Button documentation](/android/button).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens

Use these tokens for applying size, weight and color styles to ButtonGroups.
<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D8172%253A19117%26t%3DFuLEqHprSOBB2XwC-1" allowFullScreen></iframe>

## Anatomy

See below how the ButtonGroup component is constructed.
<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D8172%253A19266%26t%3DFuLEqHprSOBB2XwC-1" allowFullScreen></iframe>

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [$font-size-300 token](/foundations/design_tokens#Font-size) (16sp).
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D8763%253A19224%26t%3DFuLEqHprSOBB2XwC-1" allowFullScreen></iframe>

<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D8763%253A19084%26t%3DFuLEqHprSOBB2XwC-1" allowFullScreen></iframe>

1. **lg (60dp)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (48dp)**
   Small should be used sparingly and only in places where the UI is very dense.

<br/>
### Orientation use cases

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D8767%253A18914%26t%3DFuLEqHprSOBB2XwC-1" allowFullScreen></iframe>

1. **Horizontal**
   By default, a ButtonGroup is horizontal.
2. **Vertical**
   Use vertical when horizontal space is limited by the Button’s content.

<br/>

## Styling

For information on color, icons, roles, and states, refer to the [Button documentation](/android/button).


## Writing

For writing best practices, refer to the [content standards documentation](/foundations/content_standards/ui_elements).


## Localization

For RTL (right-to-left) languages, the layout of the button group is mirrored. the primary button will be on the left and top and the secondary button will be on the right and bottom.

<br/>
<ImgContainer src="https://i.pinimg.com/originals/75/68/86/75688609a17a78159d513407a0a6df42.png" alt="Two sets of buttons, one vertically stacked and one horizontal. The button layout is localized for right-to-left languages. " />
