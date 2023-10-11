---
title: Text field
description: TextField allows for multiple types of text input.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/22/cd/9e/22cd9e27b370b139acd3de18fe2ab2c3.png" alt="A selected text field with a black outline and a default text field with a gray outline." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- Any time succinct data needs to be entered by a user, like a date, email address, name or Pin title.

</Group>
<Group>
<Dont title="When not to use" />
- Situations where long amounts of text need to be entered, since the full inputted text of the TextField could be truncated. Use [TextArea](/web/textarea) instead.
</Group>
</TwoCol>

## Best practices
For general text field best practices, refer to the [Web Text Field Documentation](/web/textfield).
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/97/07/6a/97076a3fb664588c8f908e293f2f010c.png" alt="A form field asking for a name. Helper text reads, enter your first and last name." />
<Do title="Do" />
Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/1c/9a/fb/1c9afbc4e6fb7dc200cc4d887e3dda2a.png" alt="A form field where the gray text inside the field reads, enter your first and last name." />
<Dont title="Don't" />
Put essential information in the placeholder text; instead put it in the helper text.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/f3/bc/50/f3bc5031622411bc92af51fdf765d201.png" alt="A form field with a label asking for a username." />
<Do title="Do" />
Always make sure the text field has a visible label. The label provides context and supports users when filling in information.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/84/72/4a/84724aab5eb4ecb8a0719a00bb0f022e.png" alt="A form field without a label, making it unclear what information is expected." />
<Dont title="Don't" />
Remove the label, as this creates accessibility and usability issues. Users can lose context on what is required in the field.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/e2/ec/09/e2ec09ebad2c4fc0b3079bfd7f7c7b00.png" alt="A form field with an error. The error text reads, this is not a valid web address." />
<Do title="Do" />
Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed on time — typically once the field loses focus or when the form is submitted.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/8e/87/e4/8e87e4072f6cc31ac4e38468ae499f82.png" alt="A form field with an error. The error text reads, there has been an error." />
<Dont title="Don't" />
Display generic error messages, such as "There is an error" or remove the leading icon.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/26/c9/fb/26c9fb797dca18467c39d795c2447f48.png" alt="A form with three fields where the website field is marked as optional." />
<Do title="Do" />
Consider all text fields as required, unless explicitly noted as optional.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/66/af/c9/66afc9cf9d312c855a0604febf86cb25.png" alt="A form with three fields where the username field is marked as required." />
<Dont title="Don't" />
Mark fields as required.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ca/b5/fe/cab5fe7948322162e52ae7b1a522621d.png" alt="A password field with an eye icon that allows the user to show hidden text." />
<Do title="Do" />
Use the show/hide "eye" icon when asking sensitive information that may need to be double-checked. Used often for passwords.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/10/ca/ba/10caba7383093c6c1eb62a4e07c7b0ec.png" alt="Two short text fields side by side instead of stacked." />
<Dont title="Don't" />
Place fields horizontally. This creates unnecessarily restricted fields and a more complex interaction pattern.
</Group>
</TwoCol>


## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)


### Labels
Be sure to provide a unique label for each TextField.


### Validation
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". Additional helpful information could be, indicating which input is needed, describing allowed formats, timing limitations, etc.
These practices give users of assistive technologies more information about the form, helping them to fill it out.


### Keyboards
Make sure your keyboards match the function of your form field. For example, asking for a phone number should pull up the phone pad keyboard.

## Design tokens
<iframe style={{border:0}} width="100%" height="1580" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A588%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>

## Anatomy 
See below how the TextField component is constructed. 
<br/>
<iframe style={{border:0}} width="100%" height="562" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A338%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>

## Variants
1. **With helper text**
Whenever you want to provide more information about a form field, you should use helper text.
2. **Disabled**
Disabled Text Fields can't be interacted with. They also don't need to meet contrast requirements, so don't use them to present info to the user.
3. **Error**
Text Field can display an error message below the field. Always include an icon to illustrate the error by more than just color.
4. **Success**
Text Field can display a success message below the field. Always include an icon to illustrate the success by more than just color.

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/fa/17/47/fa174792cd46e8f31d4a99e156ef5875.png" alt="A form field with helper text under the form that reads, enter a valid web address." />
**With helper text**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A7154%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/97/ee/5b/97ee5bb02c7e13b1cedd2b7e08663012.png" alt="A disabled text field that is grayed out and not interactive." />
**Disabled**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A7265%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/70/fe/d1/70fed1bbc0262adbb50dfe8c803bfe64.png" alt="A form field with an error. The error text reads, that username is not available." />
**Error**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A7377%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/91/6c/0e/916c0e0d652e9d7d0eb0a8807b9a2854.png" alt="A text field that was successfully submitted. The success text reads, that username is available." />
**Success**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A7489%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

## Colors
Overview of how the TextField colors look in both themes. 
<br/>
<TwoCol>
<Group>
### Light mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A6858%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>

<Group>
### Dark mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D43648%253A7135%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>
