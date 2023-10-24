---
title: SearchField
description: SearchField allows users to search for specific content within the Pinterest app. 
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/38/47/17/3847177a93c15dd16565e4bdfdef1ff5.png" alt="An example of a default search field." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- To search through large libraries of information, for example all of Pinterest's pins.
- Filtering and sorting data. The SearchField can help users quickly find and apply filters or sorting options.

</Group>
<Group>
<Dont title="When not to use" />
- To search through small libraries of content, for example a list of available languages. Allow the user to scroll through instead.
- As primary navigation. Users should be able to navigate using alternative methods.
- As a means of inputting information into a form. Use [TextField](/android/textfield) instead.
</Group>
</TwoCol>

## Best practices
For general SearchField best practices, refer to the Web Search Field Documentation.
- Place the search field in a consistent location across all screens and interfaces. This can help users quickly locate the field and reduce confusion.
- Don't use the search field as a primary navigation tool. It should instead be used to search for specific information. Additionally, don't use both a leading IconButton and a trailing Button. Use one or the other purposefully based on the experience.
- Use clear labeling with placeholder text that indicates what the user can search for. For example, "Search products", Search Users," etc. Users should know the basic bounds of their search before interacting with the field.
- Provide clear feedback to the user when they begin a search — loading icon, skeleton loader, etc. This helps the user understand that their search request is being processed.
- Include a "clear" icon within the field when the user has entered text. This allows users to quickly clear the form without having to delete each character.

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
[Accessible development on iOS](https://developer.apple.com/accessibility/)


### Labels
Be sure that a unique label is associated with the correct field. The SearchField should also have clear, descriptive placeholder text.


### Validation
Feedback should be provided to describe a successful search, one that's still loading or if an error has occurred. This message should be associated with the SearchField so that it is recognized by screen readers.

## Design tokens
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A588%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A338%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>

1 Container | 2 Content | 3 Label | 4 Helper text | 5 Leading icon | 6 Trailing icon

## Variants

### Default
The default search field is meant to handle the bulk of search tasks. It includes a few required items and several optional elements. The required elements are the container, the text, the indicator and the search icon. Optional elements include label text, helper text and the trailing icon.
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/f2/9c/70/f29c709db5e827cd9dc38fe675247704.png" alt="An example of a default search field." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A936%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Text entered
When text is entered into a search field, the entered text color will change to default and the indicator will trail the text. The trailing icon will always be a “clear” icon - allowing the user to clear their entered text. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ef/59/cd/ef59cdd1f00cd68b52491643bf1fd2cc.png" alt="An example of a search field with text entered and a clear icon." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A1447%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Leading IconButton
The SearchField can include an IconButton leading before the field. This icon button serves to move the user back to the original search screen. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/4d/b7/9b/4db79b25d660ea650fc44c5d01cb7f82.png" alt="An example of a search field with a leading icon button allowing the user to move backwards." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A1015%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Trailing Button
The SearchField can include an Button trailing after the field. This button serves to cancel the search and bring the user back to their previous experience. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/d3/b6/9b/d3b69b8cc7a7e551b417d5c37fc55886.png" alt="An example of a search field with a trailing button, allowing the user to cancel the search." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D40427%253A1086%26mode%3Ddesign%26t%3DMSikh9ZMQIpw3cW1-1" allowFullScreen></iframe>
</Group>
</TwoCol>

## Writing
For writing best practices, refer to the [Content standards](https://gestalt.pinterest.systems/foundations/content_standards/voice). 
- Don't truncate label text. If the text is too long for one line, it should be reduced.
- Use clear labeling with placeholder text that indicates what the user can search for. For example, “Search products”, Search Users,” etc.
- Use consistent language/naming for the SearchField and it’s labels across screens. 
- Provide clear and concise error messages that are easy to understand and provide guidance on how to correct the search query or find alternative content.
- If needed, provide helper text to clarify the SearchFields purpose. Especially when users could be unfamiliar with the app or it’s search functionality. 
