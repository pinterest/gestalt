---
title: Text
description: Text component is used for all representations of text on a surface. Text is based on [iOS Typography guidelines](https://developer.apple.com/design/human-interface-guidelines/foundations/typography/).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/64/e7/5c/64e75cd6a6ab8c69df8d32c0d3a3cadb.png" alt="Text as it appears in our Pinner profile header." noPadding/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- For representing text as labels in UI controls such as buttons and menus
- When text is needed for any written content

</Group>
<Group>
<Dont title="When not to use" />
- When spacing is lacking and an icon or other graphic can be a recognizable substitute for text
</Group>
</TwoCol>

## Best Practices
### Headings and titles
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/eb/f5/1c/ebf51c1b9e41682288b905abd589e4b1.png" alt="Two block of text with headings used to separate and group them." noPadding/>
    <Do title="Do" />
    Use to help group text and items in a logical order. 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/ea/50/5a/ea505abf15e9e17adc1ea3bc32320cd9.png" alt="Block of text that uses a large heading to emphasize part of the text." noPadding/>
    <Dont title="Don't" />
    Use to emphasize text that you want users to read. Instead, use bold body text or another UI element like a banner or popover.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cb/40/52/cb4052693b89065f74f348c722628449.png" alt="A block of text with a short, one-line heading." noPadding/>
    <Do title="Do" />
    Keep headings and titles short and glanceable.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/7c/2c/2c/7c2c2cabe17329be6540afba17f45bf0.png" alt="A very long heading announcing the start time of an event, but it's truncated, so you can't see the start time." noPadding/>
    <Dont title="Don't" />
    Use overly long headings. If headings are dynamically generated (like a 3rd party app name), truncation will work after 2 lines, but be mindful of unintended changes in meaning.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/cc/18/4e/cc184eb8d5458d80257864797dc0fcf2.png" alt="A heading that says 'Get a cover image that delivers'." noPadding/>
    <Do title="Do" />
    Clearly describe the section a heading refers to.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f5/2e/c7/f52ec7223eabd317b0c64a1c581b4892.png" alt="A heading that says 'Get it!' and is not clear about what that means." noPadding/>
    <Dont title="Don't" />
    Use vague language that doesn’t describe the section that a heading refers to.
  </Group>
</TwoCol>

### Body and labels
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3d/62/65/3d62655538c63e97c412725a51bb59d9.png" alt="A block of text with a line emphasized in a bold weight." noPadding/>
    <Do title="Do" />
    Emphasize text inside of paragraphs by using a **bold weight**.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c9/b3/a8/c9b3a8ffa200fe0ff9aa62c449d9dcbb.png" alt="A block of text using an underlined style to emphasize a line of text." noPadding/>
    <Dont title="Don't" noPadding/>
    Emphasize text inside of paragraphs by underlining it; this can be confused with an interactive link or a button.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/08/ba/b1/08bab19bd44b7385c1421eb7b88b69f4.png" alt="A block of text with nimimal styling." noPadding/>
    <Do title="Do" />
    Use a minimal amount of sizes and styles to keep the UI clean and readable.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/4f/ba/b7/4fbab78ca45be6ee7edb3983357ee666.png" alt="A block of text with some bold text, some text in color, some left-aligned and some center-aligned." noPadding/>
    <Dont title="Don't" />
    Mix styles and alignment, as this can be hard to read and follow.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/93/1a/0d/931a0d4e521b85b50039dde45b66b088.png" alt="A long paragraph that is left-aligned." noPadding/>
    <Do title="Do" />
    Start align paragraph text.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/fc/99/b6/fc99b6f305e6740e86398819a272ad3e.png" alt="A long paragraph that is center-aligned." noPadding/>
    <Dont title="Don't" />
    Center-align or end-align paragraph text. This is hard to read, especially for users with dyslexia.
  </Group>
</TwoCol>

## Accessibility

### Minimum text size

A minimum text size of 16pt is recommended for readability, especially for longer blocks of text. Some short text labels or secondary text can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability.

### Dynamic Type sizes for accessibility (iOS)

As users scale text with Accessibility settings, sizes should scale according to iOS defaults. Our text sizes when Accessibility settings are turned on are below.

<br/>

<iframe style={{border:0}} width="100%" height="590" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20617%253A76386%26t%3D77TugPWNczBVf6On-1" allowFullScreen></iframe>

### Native features
People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)


## Design tokens

Use these tokens for applying size, weight and color styles to Text.

<br/>

<iframe style={{border:0}} width="100%" height="939" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20505%253A76351%26t%3D77TugPWNczBVf6On-1" allowFullScreen></iframe>

## Variants

### Headings and titles

Used for surface titles and section headings
<br/>

<iframe style={{border:0}} width="100%" height="417" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20532%253A76497%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

### Body and labels

Used for text that is part of paragraphs or UI controls
<br/>

<iframe style={{border:0}} width="100%" height="417" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20532%253A76579%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

## Size

These font sizes follow those available through our [Typography scale](https://gestalt.pinterest.systems/foundations/typography/guidelines#Scale)
<br/>

<iframe style={{border:0}} width="100%" height="776" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20521%253A76933%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

### Dynamic Type sizes

This is how text scales when people resize text. Our default text sizes correspond to iOS Large sizes. For more info, see [iOS Dynamic Type sizes](https://developer.apple.com/design/human-interface-guidelines/foundations/typography/#specifications)
<br/>

<iframe style={{border:0}} width="100%" height="436" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20539%253A76626%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

## Weight
For emphasizing text in body copy and in sizes below 16pt and below, use `bold`. For titles and headings, use `semibold`.
<br/>

<iframe style={{border:0}} width="100%" height="411" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20532%253A76157%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

## Alignment

Text can either be start, center or end aligned. Text can be forced to left or right align when aligning integers in tables.
<br/>

<iframe style={{border:0}} width="100%" height="397" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20555%253A76302%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

## Colors

You can specify which color you want for your text. Most colors automatically change between light and dark modes, but the `light` and `dark` properties are available when light or dark colors are specifically desired. An example is using the dark mode error color on a dark background in light mode.
<br/>

<iframe style={{border:0}} width="100%" height="750" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20532%253A76210%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

##Styles

Text can be italicized for emphasis, or underlined to denote a link.
<br/>

<iframe style={{border:0}} width="100%" height="270" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Fnode-id%3D20532%253A76472%26t%3DGzMOAn3V49oVC2MG-1" allowfullscreen></iframe>

## Overflow and truncation

For general guidelines around text truncation, see [Typography Best practices](https://gestalt.pinterest.systems/foundations/typography/guidelines#Best-practices)

## Writing

<TwoCol>
<Group>
<Do title="Do" />
- Keep text in UI short and clear
- Use **Sentence** case for all text that isn’t a brand name or proper noun
</Group>
 <Group>
<Dont title="Don't" />
- Use long text labels that could end up truncating or causing space issues when translating to other languages
- Use Title Case or ALL CAPS in UI labels
- Use ALL CAPS for paragraph text unless referring to a product or other entity that uses that style
- Punctuate headings unless they are posing a question or making an exclamation
</Group>
</TwoCol>

## Localization

Keep text simple and short to avoid truncation or line-wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders.

### Right-to-left (RTL) alignment

When translated to languages that read from right to left, ensure that paragraph text is aligned based on language not on context. For example, if the UI is reversed for an RTL language like Arabic, but there is a block of text in an LTR language such as English, left-align the paragraph in English.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/55/77/e2/5577e2dc9a0223464b1a510065961bca.png" alt="A paragraph in Hebrew that is right-aligned, followed by a paragraph in English that is left-aligned." />
    <Do title="Do" /> 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/6a/67/5b/6a675b5d2a1b43a55957526688c2be6c.png" alt="Paragraphs in Hebrew and English with the same alignment." noPadding/>
    <Dont title="Don't" />
  </Group>
</TwoCol>


However, for lists or items in a menu, maintain the alignment of the UI.
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/9a/9a/33/9a9a33a96905fa400433cc73800e784c.png" alt="A menu in Arabic and English with all of the items end-aligned." />
    <Do title="Do" /> 
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/ba/10/de/ba10dea69bce31c7565bae00d029c44b.png" alt="A menu with two Arabic items rignt-aligned and one English item left-aligned." />
    <Dont title="Don't" />
  </Group>
  </TwoCol>

### Text-wrapping and hyphenation

Hyphenation on iOS is turned off by default to avoid incorrect word breaks when strings of text wrap to the next line. This is especially helpful for international languages where an incorrect word break can greatly change the meaning of a word or sentence.

## Related

**[Typography guidelines](https://gestalt.pinterest.systems/foundations/typography/guidelines)**

A run-down of our typographic foundations across platforms
