---
title: Icon
description: Icons are the symbolic representation of an action or information, providing visual context and improving usability.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/1d/52/31/1d5231c99699e72628135de682fede30.jpg" alt="Five example icons in a row. Icons include share, check, back, filter, and menu." />

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- Use as symbolic communication for elements that do not have room for text. In this case, ensure the icon choice is easily recognizable and makes sense to international users.
- To help with quick scanning by adding rhythm and hierarchy to the design.

</Group>
<Group>
<Dont title="When not to use" />
- For decorative purposes or visual embellishment, like how you would use an illustration. Contact us if this is needed.
- As a visual reinforcement for associated text without adding new meaning.
- To communicate status or health. Use Status instead.
- As an interactive element (e.g., hover, focus, click/tap). Use [IconButton](/web/iconbutton) instead.
</Group>
</TwoCol>

## Best practices

- If your icons are interactive, use the IconButton component and ensure that they utilize at least 44 x 44px touch targets. 
- When designing in iOS and Android, use platform-specific icons as they are most recognizable to that platform’s users.
- When possible, include a visible text label.
- Icons should always be a solid color and should inherit the color of the surrounding text if applicable.

For general Icon best practices, refer to the web [Icon documentation](/web/icon).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

- [Accessible design on iOS](ACCESSIBLE_DESIGN_IOS)
- [Accessible development on iOS](ACCESSIBLE_DEVELOPMENT_IOS)

## Variants

### Styling
For information on colors and states, refer to the [web Icon guidelines](/web/icon).

### Platform Specific Icons

1. **Share**
On iOS, use the icon-share icon to indicate the ability to share an element. 
2. **Check**
Instead of a radio button on iOS, use the check icon.
3. **Back**
On iOS, use the chevron icon titled arrow-back to indicate backward movement. 

<ThreeCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/91/f5/12/91f512297d96187a3c110b977c366bc1.jpg" alt="A share icon." />
ios-share
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/b2/ad/e6/b2ade673955c952da0188b67fe65049a.jpg" alt="A check mark icon." />
check
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ae/80/ce/ae80ce91701e3115d1c4d875508bf131.jpg" alt="A chevron icon pointing left." />
arrow-back
</Group>
</ThreeCol>

### Size

1. **12px**
Used only for Pins and Boards. 
2. **16px**
Default icon size. Used often, whenever an icon is needed, i.e., icons in headers, close icons, etc.
3. **20px**
Used only when pairing with 16pt (Size200) text.
4. **24px**
Used for navigation bar elements or when a larger icon is needed.
5. **32px**
Used sparingly to draw attention to an icon that might otherwise be missed.  

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/81/ca/d0/81cad0e1aa26025955806c587f135f47.jpg" alt="The Pinterest homepage with a 16 pixel TV icon." />
16px Icon example
</Group>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/5e/f1/ec/5ef1ecca4f57fc3f6940db9639bd2d4b.jpg" alt="The Pinterest homepage footer with several 24 pixel icons." />
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
