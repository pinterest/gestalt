---
title: TextArea
description: TextArea allows for multi-line input.
fullwidth: true
---

<ImgContainer padding="0" src="https://i.pinimg.com/originals/80/0b/de/800bde7d203446b89ee03b7172dee213.png" alt="Text Area component example."/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Allowing users to input more than a single line of free-form text while ensuring all text entered remains visible
  </Group>
  <Group>
  <Dont title="When not to use" />
    - For inputs that expect a certain non-sentence format, like a date or an email. Use [TextField](/ios/textfield) instead
  </Group>
</TwoCol>

## Mobile best practices

- Use a label to clearly denote what information the user should input. Use placeholder sparingly as they can erode usability of form fields
- Use helper text to provide additional context that will aid the user in most effectively inputting information
- Set the height of TextArea using text rows to ensure the typical amount of text will be visible without needing to scroll
- Don’t set the row number to less than 2. Use TextField when expecting ony a single line of text
- Consider all text fields as required, unless explicitly noted as optional on the label

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Comprehension 
Be sure to provide instructions to help users understand how to complete forms and use individual form controls.

### Labels 
Ensure labels are precise and concise. Labels should only describe the text field they are associated with, and they must be visible.

### Validation 
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, “This field is required to submit”. In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations or other pertinent information. 

These practices give users of assistive technologies more information about the form, helping them to fill it out.

## Design tokens 

Use these tokens for applying size and color styles to TextArea. 
<br/>
<iframe style={{border:0}} width="100%" height="1600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A2091%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

## Anatomy 
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A687%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>
**1. Container | 2. Content | 3. Label | 4. Helper text | 5. Max length text** 

## Variants

### Default
TextArea will expand to fill the width of the parent container by default.
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A913%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>
<br/>

### Helper text
Whenever you want to provide more information about a form field, such as specific formatting, description of the label or requirements, you should use helper text.
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D46703%253A4094%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

### Disabled
TextArea can be disabled to indicate the user is unable to interact with it. Disabled fields do not need to pass contrast requirements, so do not use a disabled TextArea to present important information to the user.
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A1354%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

### Error 
TextArea can be display an error message. Don’t use error message to provide feedback on character count errors. See the maximum length variant below for more details.
<br/>

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A1427%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

### Maximum length 
TextArea supports a max length. This variant sets the maximum number of characters allowed to be entered by the user in TextArea and the user cannot exceed the maximum number of characters interacting with the component. 

When a max length is used in TextArea, the component displays a character counter as well as a warming or problem [Status](/web/status) when the user reaches or exceeds the maximum length of characters. 
<br/>
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D46703%253A4188%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

## Color
Overview of how TextArea colors look in both themes. 
<br/>
<iframe style={{border:0}} width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D46703%253A1175%26mode%3Ddesign%26t%3DT32ESFc6zD1dUsG0-1" allowFullScreen></iframe>

## Writing

For writing best practices, refer to the [content standards](foundations/content_standards/ui_elements).
<TwoCol>
  <Group>
    <Do title="Do" />
    - Use super-simple language and help users solve the problem when writing error messages. Refer to [Error messages standards](/foundations/content_standards/ui_elements#Error-messages) for more information
  </Group>
  <Group>
  <Dont title="Don't" />
    - Display generic error messages, such as "There is an error"
  </Group>
</TwoCol> 
