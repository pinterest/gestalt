---
title: Checkbox
description: Checkbox is used for multiple choice selection.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/f1/22/f0/f122f00c3efc6628de66f351bb38ac73.png"  alt="Primary example of Checkbox component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - In a list, form or [Table](https://gestalt.pinterest.systems/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
    - In a Form, along with a [TextField](https://gestalt.pinterest.systems/ios/textfield), or other spaces that are too small for a [Switch](https://gestalt.pinterest.systems/ios/switch).
    - When selection doesn’t take immediate effect and requires form submission.
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Situations where users can only choose one out of multiple, related options. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
    - When a selection takes immediate effect, especially on mobile. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
    - When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
  </Group>
  </TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/0fe0c895-5939-42ca-a215-3d404b3203c1"  alt="Example of correct multi-select use" />
    <Do title="Do" />
    Use checkboxes for multi-selection of related list items
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/a1965e39-13c9-4a27-9038-c66bf16d1f3d"  alt="Example of incorrect single-select use" />
    <Dont title="Don't" />
    Use checkboxes for one selection. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/c262c872-9f8f-4684-b430-099c2bc62bdb"  alt="Example of correct single checkbox use" />
    <Do title="Do" />
    Use a single Checkbox in forms where the selection only takes effect after submitting the form
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/21ccdc50-30c1-4f0e-9c9f-b7c1c0e37622"  alt="Example of incorrect immediate effect use" />
    <Dont title="Don't" />
    Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
  </Group>
</TwoCol>

## Accessibility

People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:
<TwoCol>
  <Group>
    [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
    [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)
  </Group>

  <Group>
    [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
    [Accessible development on Android](https://developer.ios.com/guide/topics/ui/accessibility)
  </Group>
</TwoCol>

## Design tokens
<iframe style={{border:0}} width="100%" height="980" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A824%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A158%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>

## Variants

### State

1. **Unchecked [Default]**
1. **Checked**
1. **Error**
1. **Indeterminate**
1. **Disabled**
<br/>
<TwoCol spacing="expanded">
  <Group>
  <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A534%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>
    **Unchecked**
  </Group>

  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A387%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>
    **Checked**
  </Group>
  </TwoCol>
  <TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A747%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>
    **Error**
  </Group>

  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A605%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>
    **Indeterminate**
  </Group>
  </TwoCol>
<TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A676%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>
    **Disabled**
  </Group>
  <Group>
  </Group>
</TwoCol>

**With helper text**
Checkbox supports helper text to provide more detail about an option.
 <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D39414%253A460%26mode%3Ddesign%26t%3D3ISDirowUo2HYuLt-1" allowFullScreen></iframe>

## Writing

<TwoCol>
  <Group>
    <Do title="Do" />
    - Be clear and brief with checkbox labels so they are easily scanned
  </Group>

  <Group>
    <Dont title="Don't" />
    - Include lengthy text labels that make it hard for a user to scan a list of choices
  </Group>
</TwoCol>
