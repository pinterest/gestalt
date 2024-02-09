---
title: ButtonToggle
description: The ButtonToggle is a larger alternative to selection components such as [Checkbox](/android/checkbox), [RadioButton](/web/radiobutton), and [Switch](/android/switch). It enables users to choose between two states - selected or unselected.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/ad/48/75/ad48752b9446c7092c261b8c812f7ff2.png" alt="A set of three toggle buttons side by side. The third toggle button is selected." />

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
- Groups should have 4px spacing between ButtonToggles

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens

Use these tokens for applying size, weight and color styles to ButtonToggle.
<br/>
<iframe style={{border:0}} width="100%" height="700" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D55188%253A4512%26mode%3Ddesign%26t%3D2iJqnAYR7hYB1zjh-1" allowFullScreen></iframe>

## Anatomy

See below how the ButtonToggle component is constructed.
<br/>
<iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D55188%253A4041%26mode%3Ddesign%26t%3D2iJqnAYR7hYB1zjh-1" allowFullScreen></iframe>

## Variants

### Size

<ThreeCol>
  <Group>
<ImgContainer src="https://i.pinimg.com/originals/aa/e9/03/aae903a03401af5a805db033b7977c8c.png"  alt="Example of the large Toggle Button with one selected and the other unselected" />
Large
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/06/9a/17/069a1732b62ea6901db193d86390f5cc.png"  alt="Example of the small Toggle Button with one selected and the other unselected" />
Small
</Group>
</ThreeCol>

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
<ImgContainer src="https://i.pinimg.com/originals/32/bb/5b/32bb5b15f347e21277de9d5c13c3c908.png"  alt="Example of two Toggle Buttons with an icon to the right of the label" />
Icons
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/f7/40/73/f7407351324311856dd61559b700c374.png"  alt="Example of three Toggle Buttons with graphics above the label" />
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

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/86/ae/80/86ae809d93360474e527a4e42285a365.png"  alt="Example of two ToggleButtons with dropdown carets to the right of the label" />
</Group>
</ThreeCol>

<br/>

### States

<ThreeCol>
  <Group>
<ImgContainer src="https://i.pinimg.com/originals/3a/06/69/3a066905e2a6bc08fbc515a1c4e14ea4.png"  alt="Example of three Toggle Buttons, all in a selected state" />
Selected
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/b2/b2/8e/b2b28ea688dac5fca1cfb339bd426ae9.png"  alt="Example of three Toggle Buttons, all in an unselected state" />
Unselected
</Group>
</ThreeCol>

1. **Selected**
   The selected state refers to when the ButtonToggle is activated or toggled on. In this state, the outline will appear black and be 2px in size.
2. **Unselected**
   The unselected state refers to when the ButtonToggle is deactivated or toggled off. In this state, the outline appears gray and is either 1px or 0px for full images.

<br/>


## Writing

- Use fewer than three words, ideally only one.
- Use clear and concise copy for labels, tooltips, and any supporting text.
- To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."
- Make sure that all text is easy to translate for localization purposes.


For writing best practices, refer to the [content standards documentation](/foundations/content_standards/ui_elements).


## Localization

For RTL (right-to-left) languages, the layout of the ButtonToggle is mirrored. 
