---
title: TextField
description: TextField allows for multiple types of text input.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/43/e9/2a/43e92a50cb6696412fde95892d449f1a.png" alt="A selected text field with a black outline and a default text field with a gray outline." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- Any time succinct data needs to be entered by a user, like a date, email address, name or Pin title.

</Group>
<Group>
<Dont title="When not to use" />
- Situations where long amounts of text need to be entered, since the full inputted text of the TextField could be truncated. Use [TextArea](/android/textarea) instead.
</Group>
</TwoCol>

## Best practices
For general text field best practices, refer to the [Web Text Field Documentation](/web/textfield).
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/47/8f/27/478f27d50be74ee29897045be3ade88a.png" alt="A form field asking for a name. Helper text reads, enter your first and last name." />
<Do title="Do" />
Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/12/68/f5/1268f572b3b5ddb6fd3728621cb41e91.png" alt="A form field where the gray text inside the field reads, enter your first and last name." />
<Dont title="Don't" />
Put essential information in the placeholder text; instead put it in the helper text.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/f9/bb/4e/f9bb4e0613f452fdcc879dd63bf758be.png" alt="A form field with a label asking for a username." />
<Do title="Do" />
Always make sure the text field has a visible label. The label provides context and supports users when filling in information.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/d1/a8/79/d1a879015a180e43218695e4a3b710c9.png" alt="A form field without a label, making it unclear what information is expected." />
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
<ImgContainer src="https://i.pinimg.com/originals/4c/a4/5d/4ca45db75f0962aa5380ac13066882de.png" alt="A form with three fields where the website field is marked as optional."/>
<Do title="Do" />
Consider all text fields as required, unless explicitly noted as optional.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/d2/cb/ff/d2cbff0eb65ca51af57a3d00619a901d.png" alt="A form with three fields where the username field is marked as required."/>
<Dont title="Don't" />
Mark fields as required.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/62/7a/5f/627a5f8c2289b8816094bd1bf2cc2843.png" alt="A password field with an eye icon that allows the user to show hidden text."/>
<Do title="Do" />
Use the show/hide "eye" icon when asking sensitive information that may need to be double-checked. Used often for passwords.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/e0/ce/ec/e0ceecee4bfd51094ce3efadcd02e0a0.png" alt="Two short text fields side by side instead of stacked."/>
<Dont title="Don't" />
Place fields horizontally. This creates unnecessarily restricted fields and a more complex interaction pattern.
</Group>
</TwoCol>


## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility/)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

### Labels
Be sure to provide a unique label for each TextField.


### Validation
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". Additional helpful information could be, indicating which input is needed, describing allowed formats, timing limitations, etc.
These practices give users of assistive technologies more information about the form, helping them to fill it out.


### Keyboards
Make sure your keyboards match the function of your form field. For example, asking for a phone number should pull up the phone pad keyboard.

## Design tokens
<iframe style={{border:0}} width="100%" height="1580" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12211%253A22232%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>

## Anatomy 
See below how the TextField component is constructed. 
<br/>
<iframe style={{border:0}} width="100%" height="562" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12211%253A21706%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>

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
<ImgContainer src="https://i.pinimg.com/originals/90/61/31/90613189ccdc5c743587ffa42f2130a5.png" alt="A form field with helper text under the form that reads, enter a valid web address." />
**With helper text**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14308%253A22737%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ff/41/99/ff4199849b0ebc069176c2bfef2bc6cb.png" alt="A disabled text field that is grayed out and not interactive." />
**Disabled**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14308%253A23240%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/cb/7f/d3/cb7fd33e928d7367cde7158fd54f79d5.png" alt="A form field with an error. The error text reads, that username is not available." />
**Error**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14308%253A22932%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/a9/0e/77/a90e7708a799e29cf6295480299c89d2.png" alt="A text field that was successfully submitted. The success text reads, that username is available." />
**Success**
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14308%253A23094%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>
</TwoCol>

## Colors
Overview of how the TextField colors look in both themes. 
<br/>
<TwoCol>
<Group>
### Light mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D13956%253A23239%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>

<Group>
### Dark mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14064%253A23345%26mode%3Ddesign%26t%3DABNbx3FawIvCHyPM-1" allowFullScreen></iframe>
</Group>
</TwoCol>
