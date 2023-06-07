---
title: Checkbox
description: Checkbox is used for multiple choice selection.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/4d/3a/2e/4d3a2ebd653d15cc60a37ba2752d6c5e.png" alt="Primary example of Checkbox component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - In a list, form or [Table](https://gestalt.pinterest.systems/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
    - In a Form, along with a [TextField](https://gestalt.pinterest.systems/android/textfield), or other spaces that are too small for a [Switch](https://gestalt.pinterest.systems/android/switch).
    - When selection doesn’t take immediate effect and requires form submission.
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Situations where users can only choose one out of multiple, related options. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
    - When a selection takes immediate effect, especially on mobile. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
    - When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
  </Group>
  </TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/32/33/bb/3233bb3a92c57dd29f2b5f2fd2a417f7.jpg" noPadding alt="Example of correct multi-select use" />
    <Do title="Do" />
    Use checkboxes for multi-selection of related list items
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1e/14/24/1e14245a26f12cf014028d24b00a6317.jpg" noPadding alt="Example of incorrect single-select use" />
    <Dont title="Don't" />
    Use checkboxes for one selection. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b2/20/93/b2209377241895d0471bde7340ee85c2.jpg" noPadding alt="Example of correct single checkbox use" />
    <Do title="Do" />
    Use a single Checkbox in forms where the selection only takes effect after submitting the form
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e7/07/02/e70702e40416c5f4f89e92eca2bbb490.jpg" noPadding alt="Example of incorrect immediate effect use" />
    <Dont title="Don't" />
    Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
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
    [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)
  </Group>
</TwoCol>

## Design tokens
<iframe style={{border:0}} width="100%" height="980" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19345%253A33883%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19345%253A33513%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

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
  <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46332%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Unchecked**
  </Group>

  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46217%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Checked**
  </Group>
  </TwoCol>
  <TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46432%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Error**
  </Group>

  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46514%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Indeterminate**
  </Group>
  </TwoCol>
<TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46595%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Disabled**
  </Group>
  <Group>
  </Group>
</TwoCol>

**With helper text**
Checkbox supports helper text to provide more detail about an option.
 <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46696%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

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
