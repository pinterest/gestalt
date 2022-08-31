---
title: Text field
description: TextField allows for multiple types of text input.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/2e/c4/78/2ec4789dce6c4ecf02c06288794f0db5.jpg" alt="A selected text field with a black outline and a default text field with a gray outline." />

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
<ImgContainer src="https://i.pinimg.com/originals/48/78/35/48783577bcbe8160b6732ebb5ef9ff66.jpg" alt="A form field asking for a name. Helper text reads, enter your first and last name." />
<Do title="Do" />
Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/60/15/22/601522feab7fb0f6c36fd1c8cf160fcd.jpg" alt="A form field where the gray text inside the field reads, enter your first and last name." />
<Dont title="Don't" />
Put essential information in the placeholder text, instead put it in the helper text.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/79/2f/02/792f02ddaea082ed8120bc9d4d2154cb.jpg" alt="A form field with a label asking for a username." />
<Do title="Do" />
Always ensure the text field has a visible label. The label provides context and supports users when filling in information.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/7f/e6/00/7fe6008974def50bb22964a80e2ba0ba.jpg" alt="A form field without a label, making it unclear what information is expected." />
<Dont title="Don't" />
Remove the label, as this creates accessibility and usability issues.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/8a/15/e9/8a15e93b76666384f47a15c94e4169b6.jpg" alt="A form field with an error. The error text reads, this is not a valid web address." />
<Do title="Do" />
Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/c1/17/c0/c117c00b8e41f3c5088db0b46e0835c9.jpg" alt="A form field with an error. The error text reads, there has been an error."/>
<Dont title="Don't" />
Display generic error messages, such as "There is an error" or remove the accompanying icon. 
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/3c/d3/20/3cd3202749889af54befe89811b707f6.jpg" alt="A form with three fields where the website field is marked as optional."/>
<Do title="Do" />
Consider all text fields as required, unless explicitly noted as optional.
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/c5/5f/e6/c55fe604a01d4619dbb822bb286a9ab6.jpg" alt="A form with three fields where the username field is marked as required."/>
<Dont title="Don't" />
Mark fields as required.
</Group>
</TwoCol>

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/93/94/3c/93943cf5d160f3d9be07a03679550d25.jpg" alt="A password field with an eye icon that allows the user to show hidden text."/>
<Do title="Do" />
Use the show/hide “eye” icon when asking sensitive information that may need to be double-checked. Used frequently for passwords. 
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/2c/07/f9/2c07f99bdba99d43761a790ceb77458b.jpg" alt="Two short text fields side by side instead of stacked."/>
<Dont title="Don't" />
Place fields horizontally. This creates unnecessarily restricted fields and a more complex interaction pattern. 
</Group>
</TwoCol>


For general Icon best practices, refer to the web [Text Field Documentation](/web/textfield).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](ACCESSIBLE_DESIGN_ANDROID)
[Accessible development on Android](ACCESSIBLE_DEVELOPMENT_ANDROID)

### Labels
Be sure to provide a unique for each TextField.


### Validation
When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.
These practices give users of assistive technologies more information about the form, helping them to fill it out.


### Keyboards
Make sure your keyboards match the function of your form field. For example, asking for a phone number should pull up the phone pad keyboard.


## Variants

### With helper text
Whenever you want to provide more information about a form field, you should use helper text.
<ImgContainer src="https://i.pinimg.com/originals/68/48/66/684866b8a4727cd935a5ffd6271929ac.jpg" alt="A form field with helper text under the form that reads, enter a valid web address."/>

### Disabled
Disabled Text Fields cannot be interacted with. They also do not need to meet contrast requirements, so do not use them to present info to the user.
<ImgContainer src="https://i.pinimg.com/originals/40/73/46/407346698b902751d4bc78e4d817c5c5.jpg" alt="A disabled text field that is grayed out and not interactive."/>

### Error
Text Field can display an error message below the field. Always include an icon to illustrate the error by more than just color. 
<ImgContainer src="https://i.pinimg.com/originals/9d/02/d4/9d02d4d386da2010e4c50fa50d8c2cc8.jpg" alt="A form field with an error. The error text reads, that username is not available."/>

### Success
Text Field can display a success message below the field. Always include an icon to illustrate the success by more than just color. 
<ImgContainer src="https://i.pinimg.com/originals/41/66/b5/4166b58231fa38697bd1d8a91e18255d.jpg" alt="A text field that was successfully submitted. The success text reads, that username is available."/>

## Animation
By default, the placeholder text will animate up into the label position when the user interacts with the field. Visit Apple’s HIG for more information on [Animation and Motion](ANIMATION_AND_MOTION).

{/*
## Related

<TwoCol>

<IllustrationCard
              title="TextArea"
              description="TextArea allows for multi-line input."
              color="green-matchacado-50"
              image="text-area"
            />

<IllustrationCard
              title="SelectList"
              description="SelectList displays a list of actions or options using the browser’s native select."
              color="green-matchacado-50"
              image="select-list"
            />

</TwoCol> */}
