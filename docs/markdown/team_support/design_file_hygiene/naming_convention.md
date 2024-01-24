---
title: Naming convention
description: Instructions on how we name components and systems assets.
fullwidth: true
---
Keeping our design system files consistent is essential to facilitate design handoff and comprehension. Therefore, we ask designers to follow the standards below when contributing with Gestalt on design files, such as naming convention. Even if you aren't contributing our systems files, you can still use these standards as a reference to keep your feature files organized and easy to understand by cross-functional partners. A descriptive name matching a semantically named component aids the discoverability of our components and system assets.

By ensuring file hygiene, we level up the quality of our design files, making it easier for our design systems users to manipulate our components and guidelines. 
 
## Components 
All components should use the [PascalCase](https://www.theserverside.com/definition/Pascal-case) convention matching our docs and codebase style. 
(e.g., ComboBox, IconButton, RadioButton)

The platform name is added to the end of the component name starting with a "."; it helps to facilitate the search in our assets panel. The platform name uses a lower-case convention 
(e.g, Toast.web)
<br/>

<ImgContainer src="https://i.pinimg.com/originals/71/4e/17/714e17465930a6e8f028f70e258bd63f.png" alt="An example of how we name our components showing a Toast component setup on Figma." />

### Private components 

All private components should be prefixed with a period "."
(e.g., .BannerUpsell/Visuals.web)
<br/>
<ImgContainer src="https://i.pinimg.com/originals/8d/21/8c/8d218ca28e35622814ce140fb21fe8d6.png" alt="An example of how we name private components, in this case, BannerUpsell." />

<br/>

You can hide components when you publish changes to your Team library, or from a library you have already published. You can only hide components from the file they originate from. 

Adding a period will prevent the component from being published to all designers, avoiding clutter in our assets panel. The private component will still be visible under our components page and through the Hidden panel in the Figma library file. 

Check out this [Figma article](https://help.figma.com/hc/en-us/articles/360039238193-Hide-published-styles-and-components) to learn more about hiding components.

## Emojis
We only use Emojis to separate page sections, making it easier to scan the content. 
(e.g., 🧑‍🎨 Design explorations, 📔 Cover).

We ask to be mindful of the use of Emojis. They are fun, but when overused they could lead to cognitive load issues and make the content difficult to digest. Avoid using Emojis when naming layers, unless it is highly necessary to support comprehension. 
<br/>
<ImgContainer src="https://i.pinimg.com/originals/98/13/9b/98139b1f8624f27202512d4f15b883c1.png" alt="An example of how we use Emojis to name our Figma section pages." />

## Icons
We aim to align our icon naming convention with how we display our icons names in our web docs. All names should follow a lower case style and we use a dash to facilitate the reading if the icon has two or more words.
(e.g., heart, heart-outline).
<br/>
<ImgContainer src="https://i.pinimg.com/originals/1f/ad/e0/1fade0e0c6f13322406c2c563e80728b.png" alt="An example of how we name our icons. We are showing an example from our iconography collection." />

## Layers
We don't have a default case-type defined to name layers as long as the component follows the proposed naming convention [(PascalCase)](https://www.theserverside.com/definition/Pascal-case). However we suggest following the best practices below when naming your layers:
<TwoCol>
  <Group>
    <Do title="Do" />
      - Give meaningful context to the text layers (e.g., Item name, Label)  
      - Name shapes and vectors purposefully (e.g., Divider)  
      - Give description to images layers for easy comprehension and reference (e.g., Brand collage)    
      - Name frames, groups and sections relating them to the design in context (e.g., partner logos) 
      - Be kind and limit the acronyms, or omit them all together when layer naming   
      
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use generic or vague names (e.g., Text 01)
    - Use Figma generated shapes and vector names (e.g., Ellipse 2) 
    - Use images raw names (e.g., Screenshot 2023-04-26)
    - Use non-related or vague names (e.g., Group 7, Frame 220)
    - Use acronyms or Emojis on layer names 
  </Group>
</TwoCol>


