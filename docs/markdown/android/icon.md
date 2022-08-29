---
title: Icon
description: Icons are the symbolic representation of an action or information, providing visual context and improving usability.
fullwidth: true
---
<ImgContainer src="https://i.pinimg.com/originals/5c/e9/65/5ce965aac16951ef57b3a735bb41e823.jpg" alt="Four example icons in a row. Icons include share, check, back and menu. >


## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- Use as symbolic communication for elements that do not have room for text. In this case, ensure the icon choice is easily recognizable and makes sense to international users.
- To help with quick scanning by adding rhythm and hierarchy to the design.

</Group>
<Group>
<Dont title="When not to use" />
- For decorative purposes or visual embellishment, like how you would use an illustration. Contact us if this is needed.
- As a visual reinforcement for associated text without adding new meaning.
- To communicate status or health. Use Status instead.
- As an interactive element (e.g., hover, focus, click/tap). Use [IconButton](https://gestalt.pinterest.systems/web/iconbutton) instead.
</Group>
</TwoCol>

## Best practices

- If your icons are interactive, use the IconButton component and ensure that they utilize at least 48 x 48dp touch targets.
- When designing in iOS and Android, use platform-specific icons as they are most recognizable to that platform’s users.
- When possible, include a visible text label.
- Icons should always be a solid color and should inherit the color of the surrounding text if applicable.

For general Icon best practices, refer to the web [Icon documentation](https://gestalt.pinterest.systems/web/icon).

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Variants

### Styling
For information on colors and states, refer to the [web Icon guidelines](https://gestalt.pinterest.systems/web/icon).

### Platform-specific icons

1. **Share**
On Android, use the android-share icon to indicate the ability to share an element. 
2. **Check**
On Android, use the standard radio button instead of an icon.
3. **Back**
On Android use the arrow icon titled directional-arrow-left to indicate backward movement. 

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ae/c6/de/aec6de6e9f1c871a22f4f0ff3afc8707.jpg" />
android-share
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/fd/31/ca/fd31ca3526df5d7326a6cf0dfaee5edc.jpg" />
Radio Button (not an icon)
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/e8/a4/1c/e8a41cc5c6ce014dc50bfc801ca7fb01.jpg" />
directional-arrow-left
</Group>
</ThreeCol>

### Size
Generally 16dp and 24dp icons should be used in mobile interfaces. When icons are interactive, they should use the IconButton component with its built in 48 x 48dp touch targets. 

1. **12dp**
Used only for Pins and Boards. 
2. **16dp**
Default icon size. Used often, any time an icon is needed, i.e. icons in headers, close icons, etc.
3. **20dp**
Used only when pairing with 16dp (Size200) text.
4. **24dp**
Used for action bar navigation elements or when a larger icon is needed. 
5. **32dp**
Used sparingly to draw attention to an icon that might otherwise be missed.  

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/7c/d8/58/7cd858ac0e370e8fc9a7676e7e1312c3.jpg" />
16px Icon example
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ef/a1/25/efa125fa7666379c53a4e512e04c85ce.jpg" />
24px Icon example
</Group>
</TwoCol>

## Writing

<TwoCol>
<Group>
<Do title="Do" />
- Use a descriptive label to describe the icon
- Be succinct. Exclude unnecessary words. 
- Be informative and accurate 
- Write in the active voice
- Avoid technical jargon

</Group>

<Group>
<Dont title="Don't" />
- Use the words "image" or "icon" in the description label; instead, use words that indicate the icon's purpose.

</Group>
</TwoCol>

{/*
## Related

<TwoCol>

<IllustrationCard
              title="Button"
              description="Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it."
              color="green-matchacado-50"
              image="button"
            />

<IllustrationCard
              title="IconButton"
              description="Use IconButton when only an icon is needed instead of text."
              color="green-matchacado-50"
              image="icon-button"
            />

</TwoCol>
*/}
