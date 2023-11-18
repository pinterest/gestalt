---
title: TextArea
description: TextArea allows for multi-line input.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/4b/cd/12/4bcd12b2a9dc590e88855283169e340d.jpg" alt="An text area field labeled About You, with text entered." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- Allowing users to input more than a single line of free-form text while ensuring all text entered remains visible

</Group>
<Group>
<Dont title="When not to use" />
- For inputs that expect a certain format, like a date or email. Use a [TextField](/android/textfield) instead
</Group>
</TwoCol>

## Best practices
- Use a label to clearly denote what information the user should input. Use placeholder sparingly as they can erode usability of form fields
- Use helper text to provide additional context that will aid the user in most effectively inputting information
- Set the height of TextArea using text rows to ensure the typical amount of text will be visible without needing to scroll
- Don’t set the row number to less than 2. Use TextField when expecting ony a single line of text
- Consider all text fields as required, unless explicitly noted as optional on the label

For general TextArea best practices, refer to the web [Text Area Documentation](/web/textarea).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility/)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)


### Comprehension
Be sure to [provide instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) to help users understand how to complete the form and use individual form controls.

### Labels
Ensure the labels are precise and concise. Labels should only describe the text field they are associated with, and they must be visible.


### Validation
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "This field is required to submit". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

These practices give users of assistive technologies more information about the form, helping them to fill it out.

## Design tokens
<iframe style={{border:0}} width="100%" height="1780" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A23695%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A22444%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
**1. Container | 2. Content | 3. Label | 4. Helper text | 5. Max length text**

## Variants

### Default
TextArea will expand to fill the width of the parent container by default.

<br/>

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A22670%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

### Helper text
Whenever you want to provide more information about a form field, such as specific formatting, description of the label or requirements, you should use helperText.

<br/>

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A22816%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

### Disabled
TextArea can be disabled to indicate the user is unable to interact with it. Disabled fields do not need to pass contrast requirements, so do not use a disabled TextArea to present information important information to the user.

<br/>

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A23035%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

### Error
TextArea can display an error message. Don't use errorMessage to provide feedback on character count errors. See the maximum length variant below for more details.

<br/>

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A23108%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

### Maximum length
TextArea supports a max length. This variant sets the maximum number of characters allowed to be entered by the user in TextArea and the user cannot exceed the maximum number of characters interacting with the component. 
When a max length is used in TextArea, the component displays a character counter as well as a warming or problem [Status](/web/status) when the user reaches or exceeds the maximum length of characters. 

<TwoCol>
<Group>
<b>Warning</b>

<br/>
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A22889%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>

<Group>
<b>Error</b>

<br/>
<br/>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12157%253A22962%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>
</TwoCol>

## Color
Overview of how TextArea colors look in both themes. 
<br/>
<iframe style={{border:0}} width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D54765%253A1122%26mode%3Ddesign%26t%3D9o3eKGjv9nRoFAdT-1" allowFullScreen></iframe>

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
