---
title: TextField
description: TextField allows for multiple types of text input.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/7c/d5/30/7cd530d27034e312d786a3abf02fb7ce.png" alt="A selected text field with a black outline and a default text field with a gray outline." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- Any time succinct data needs to be entered by a user, like a date, email address, name, or Pin title.

</Group>
<Group>
<Dont title="When not to use" />
- Situations where long amounts of text need to be entered, since the full content of the TextField will be truncated. Use [TextArea](/web/textarea) instead.
</Group>
</TwoCol>

## Best practices

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/0f/29/84/0f2984540d24eb2811f5c2ee3752668a.jpg" alt="A form field asking for a name. Helper text reads, enter your first and last name." />
<Do title="Do" />
Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/9c/28/25/9c2825eea833948e136320bc15cbd2e1.jpg" alt="A form field where the gray text inside the field reads, enter your first and last name." />
<Dont title="Don't" />
Put essential information in the placeholder text, instead put it in the helper text.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/1b/e0/0e/1be00ea3264fa56a31d6c3fe7d176a82.jpg" alt="A form field with a label asking for a username." />
<Do title="Do" />
Always ensure the text field has a visible label. The label provides context and supports users when filling in information.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/e3/77/64/e37764f24379a144a824cb9903b15623.jpg" alt="A form field without a label, making it unclear what information is expected." />
<Dont title="Don't" />
Remove the label, as this creates accessibility and usability issues.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/54/5f/0b/545f0b1f5035184d0e47470b6f2d43d2.jpg" alt="A form field with an error. The error text reads, this is not a valid web address." />
<Do title="Do" />
Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/1a/d8/43/1ad843bbf50d5037ae92a5930bf6060d.jpg" alt="A form field with an error. The error text reads, there has been an error."/>
<Dont title="Don't" />
Display generic error messages, such as "There is an error" or remove the accompanying icon. 
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/2e/20/47/2e20473415791825e3848b9db7807bc8.jpg" alt="A form with three fields where the website field is marked as optional."/>
<Do title="Do" />
Consider all text fields as required, unless explicitly noted as optional.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/5b/72/ce/5b72ceece98e79d97b684103d421288e.jpg" alt="A form with three fields where the username field is marked as required."/>
<Dont title="Don't" />
Mark fields as required.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/28/e1/40/28e1406c346111777f74022a50fe4689.jpg" alt="A password field with an eye icon that allows the user to show hidden text."/>
<Do title="Do" />
Use the show/hide “eye” icon when asking sensitive information that may need to be double-checked. Used frequently for passwords. 
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/0c/bb/af/0cbbaf39eac36988156554fba9db389e.jpg" alt="Two short text fields side by side instead of stacked."/>
<Dont title="Don't" />
Place fields horizontally. This creates unnecessarily restricted fields and a more complex interaction pattern. 
</Group>
</TwoCol>


For general Icon best practices, refer to the web [Text Field Documentation](/web/textfield).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility/)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

### Labels
Be sure to provide a unique for each TextField.


### Validation
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.
These practices give users of assistive technologies more information about the form, helping them to fill it out.


### Keyboards
Make sure your keyboards match the function of your form field. For example, asking for a phone number should pull up the phone pad keyboard.

## Design tokens
<iframe style={{border:0}} width="100%" height="1580" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D12211%253A22232%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy 
See below how the TextField component is constructed. 
<br/>
<iframe style={{border:0}} width="100%" height="562" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D12211%253A21706%26t%3DSivN2y3BCANz7Ao5-1" allowFullScreen></iframe>

## Variants
1. **With helper text**
Whenever you want to provide more information about a form field, you should use helper text.
2. **Disabled**
Disabled Text Fields cannot be interacted with. They also do not need to meet contrast requirements, so do not use them to present info to the user.
3. **Error**
Text Field can display an error message below the field. Always include an icon to illustrate the error by more than just color.
4. **Success**
Text Field can display a success message below the field. Always include an icon to illustrate the success by more than just color. 

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14064%253A22812%26t%3DH6iA4iyiJUHmCEcT-1" allowFullScreen></iframe>
**With helper text**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14064%253A23270%26t%3DH6iA4iyiJUHmCEcT-1" allowFullScreen></iframe>
**Disabled**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14064%253A23250%26t%3DH6iA4iyiJUHmCEcT-1" allowFullScreen></iframe>
**Error**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D14064%253A23260%26t%3DH6iA4iyiJUHmCEcT-1" allowFullScreen></iframe>
**Success**
</Group>
</TwoCol>

## Colors
Overview of how the TextField colors look in both themes. 
<br/>
### Light mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D13956%253A23239%26t%3DSivN2y3BCANz7Ao5-1" allowFullScreen></iframe>

### Dark mode
<iframe style={{border:0}} width="100%" height="802" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D14064%253A23345%26t%3DSivN2y3BCANz7Ao5-1" allowFullScreen></iframe>

## Animation
Visit Apple’s HIG for more information on [Animation and Motion](https://developer.apple.com/design/human-interface-guidelines/motion).
