import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'Related_Component',
  title: 'Related Components',
  type: 'document',
  fields: [
    defineField({
      name: 'related_components',
      title: 'Component',
      type: 'string',
    }),
  ],
})
