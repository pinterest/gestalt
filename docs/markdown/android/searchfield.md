---
title: SearchField
description: SearchField allows users to search for specific content within the Pinterest app. 
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/15/90/ec/1590ecbd9e67ccc196be97dc9c7269c3.jpg" alt="An example of a default search field." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- To search through large libraries of content, for example all of Pinterest’s pins.
- Filtering and sorting data. The SearchField can help users quickly find and apply filters or sorting options.

</Group>
<Group>
<Dont title="When not to use" />
- To search through small libraries of content, for example a list of available languages. Allow the user to scroll through instead.
- As primary navigation. Users should be able to navigate using alternative methods. 
- As a means of inputting content into a form. Use [TextField](https://gestalt.pinterest.systems/android/textfield) instead.
</Group>
</TwoCol>

## Best practices
- Place the search field in a consistent location across all screens and interfaces. This can help users quickly locate the field and reduce confusion.
- Don't use the search field as a primary navigation tool. It should instead be used to search for specific content. In addition, don't use both a leading IconButton and a trailing Button. Use one or the other purposefully based on the experience.  
- Use clear labeling with placeholder text that indicates what the user can search for. For example, “Search products”, Search Users,” etc. Users should know the basic parameters of their search before interacting with the field. 
- Provide clear feedback to the user when they initiate a search - loading icon, skeleton loader, etc. This helps the user understand that their search request is being processed. 
- Include a “clear” icon within the field when the user has entered text. This allows users to quickly clear the form without having to delete each character.


For general SearchField best practices, refer to the web [Search Field Documentation](https://gestalt.pinterest.systems/web/searchfield).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility/)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)


### Labels
Be sure that a unique label is associated with the correct field. The SearchField should also have clear descriptive placeholder text.


### Validation
Feedback should be provided to describe a successful search, one that is processing or if an error has occurred. This messaging should be associated with the SearchField so that it is recognized by screen readers.

## Design tokens
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D9334%253A20613%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D9334%253A19655%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>

1 Container | 2 Content | 3 Label | 4 Helper text | 5 Leading icon | 6 Trailing icon
For more detailed anatomy, visit the [Android SearchField](https://www.figma.com/file/REw1COFYAktmVWrUBh3Ov8/Gestalt-for-Android?node-id=9334%3A19654&t=uRG22TuwKvZC87MH-1) page in Figma. 

## Variants

### Default
The default search field is meant to handle the bulk of search tasks. It includes a few required items and several optional elements. The required elements are the container, the text, the indicator and the search icon. Optional elements include label text, helper text and the trailing icon. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/4d/f7/2b/4df72bc804f8be0e8ce79b7c870b06af.jpg" alt="An example of a default search field." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D9867%253A21179%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Text entered
When text is entered into a search field, the entered text color will change to default and the indicator will trail the text. The trailing icon will always be a “clear” icon - allowing the user to clear their entered text. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/dd/47/af/dd47af8f79e4a51124b921f825c31918.jpg" alt="An example of a search field with text entered and a clear icon." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/file/REw1COFYAktmVWrUBh3Ov8/Gestalt-for-Android?type=design&node-id=9867%3A21703&t=qA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Leading IconButton
The SearchField can include an IconButton leading before the field. This icon button serves to move the user back to the original search screen. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/c3/da/a4/c3daa418e8461758fdc01d97b7d87873.jpg" alt="An example of a search field with a leading icon button allowing the user to move backwards." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D9867%253A21270%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Trailing Button
The SearchField can include an Button trailing after the field. This button serves to cancel the search and bring the user back to their previous experience. 
<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/0b/ed/90/0bed902cb36ad0f78bdb4ccac1640433.jpg" alt="An example of a search field with a trailing button, allowing the user to cancel the search." />
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D9867%253A21356%26t%3DqA042oJ4q4dOukcd-1" allowFullScreen></iframe>
</Group>
</TwoCol>

## Writing
For writing best practices, refer to the [Content standards](https://gestalt.pinterest.systems/foundations/content_standards/voice). 
- Don't truncate label text. If the text is too long for one line, it should be reduced.
- Use clear labeling with placeholder text that indicates what the user can search for. For example, “Search products”, Search Users,” etc.
- Use consistent language/naming for the SearchField and it’s labels across screens. 
- Provide clear and concise error messages that are easy to understand and provide guidance on how to correct the search query or find alternative content.
- If needed, provide helper text to clarify the SearchFields purpose. Especially when users could be unfamiliar with the app or it’s search functionality. 
