---
title: ButtonToggle
description: The ButtonToggle is a larger alternative to selection components such as [Checkbox](/android/checkbox), [RadioButton](/web/radiobutton), and [Switch](/android/switch). It enables users to choose between two states: selected or unselected.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/53/df/34/53df342578881e60783c0733937957ca.png" alt="A set of three toggle buttons side by side. The third toggle button is selected." />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - The ButtonToggle should be used when you require a binary component with distinct on/off states
    - If you want to offer users a dropdown menu that is associated with the toggle action
    - To demonstrate that items are actively selected for filtering
  </Group>
  <Group>
  <Dont title="When not to use" />
     - Avoid using the ButtonToggle when a simpler Checkbox, RadioButton, or Switch can be used instead.
     - Do not use ButtonToggle in replacement of a Button, it should only be used for selected and unselected functionality
  </Group>
</TwoCol>

## Best practices

Use clear and concise labels to improve user comprehension

- To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."
- Make sure that the ButtonToggle(s) in your application are consistently styled and placed. This should also apply to their sizing, maintaining uniformity throughout the experience.
- Place the ButtonToggle(s) in a location where users would naturally expect to find them, taking into consideration the context. For instance, position it next to a related feature.
- If the ButtonToggle(s) trigger a significant action or irreversible change, it is recommended to include a confirmation, such as a toast message.
- Groups should have 4dp spacing between ButtonToggles

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens

Use these tokens for applying size, weight and color styles to ButtonToggle.
<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D66471%253A1273%26mode%3Ddesign%26t%3DXlUExnjr63t02kcg-1" allowFullScreen></iframe>

## Anatomy

See below how the ButtonToggle component is constructed.
<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D66471%253A802%26mode%3Ddesign%26t%3DXlUExnjr63t02kcg-1" allowFullScreen></iframe>

## Variants

### Size

<TwoCol>
  <Group>
<ImgContainer src="https://i.pinimg.com/originals/8d/1d/c1/8d1dc1d7a2f7dd6636ff7c385bde0266.png"  alt="Example of the large Toggle Button with one selected and the other unselected" />
Large
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/cd/46/d0/cd46d06b2a96a6124c3bfc0a3e20f9d3.png"  alt="Example of the small Toggle Button with one selected and the other unselected" />
Small
</Group>
</TwoCol>

1. **lg (48dp)**
   Use when a larger interactive area is required for improved usability
2. **sm (36dp)**
   Ideal for situations where a smaller visual footprint is necessary

<br/>

### Images and Graphics

ButtonToggle accepts icons, graphics and full-bleed images. Use these sparingly, to add context to selections.
<br/>

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/3d/0a/7b/3d0a7b8e4f95d0f68b84eff22f1744ec.jpg"  alt="Example of two Toggle Buttons with an icon to the right of the label" />
Icons
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/8a/26/75/8a26756e43a285892b1bae18311ce4af.jpg"  alt="Example of three Toggle Buttons with graphics above the label" />
Graphics
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/07/32/d4/0732d4119ae286309381c5a79b56bf2c.jpg"  alt="Example of three Toggle Buttons with a full-fill image and no label" />
Full image
</Group>
</ThreeCol>

1. **Icons**
   In situations where a concise visual cue could provide additional information, icons are placed horizontally beside the text.
2. **Graphics**
   For situations where a higher-fidelity visual cue enhances comprehension, for example, selecting hair patterns. Graphics sit vertically above the text and the buttons will grow to accommodate their graphics. Large is the smallest height size.
3. **Full images**
   Use when a larger visual element is required, for example skin color selection. Full image ButtonToggles grow to accommodate their graphics. Images fill the container and Large is the smallest height size.

<br/>

### Dropdown

Useful for providing additional options or actions related to the toggle functionality. Used to indicate that items have been selected.

<ImgContainer src="https://i.pinimg.com/originals/a0/dd/83/a0dd839acfeb52955d97b919ae6403e9.png"  alt="Example of two ToggleButtons with dropdown carets to the right of the label" />

<br/>

### States

<TwoCol>
  <Group>
<ImgContainer src="https://i.pinimg.com/originals/a4/48/ce/a448ce819d32fc98376a04b31470496c.png"  alt="Example of three Toggle Buttons, all in a selected state" />
Selected
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/0f/22/07/0f220781451a40032a902df04502bae8.png"  alt="Example of three Toggle Buttons, all in an unselected state" />
Unselected
</Group>
</TwoCol>

1. **Selected**
   The selected state refers to when the ButtonToggle is activated or toggled on. In this state, the outline will appear black and be 2dp in size.
2. **Unselected**
   The unselected state refers to when the ButtonToggle is deactivated or toggled off. In this state, the outline appears gray and is either 1dp or 0dp for full images.

<br/>


## Writing

- Use fewer than three words, ideally only one.
- Use clear and concise copy for labels, tooltips, and any supporting text.
- To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."
- Make sure that all text is easy to translate for localization purposes.


For writing best practices, refer to the [content standards documentation](/foundations/content_standards/ui_elements).


## Localization

For RTL (right-to-left) languages, the layout of the ButtonToggle is mirrored. 
