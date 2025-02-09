import {defineField, defineType} from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'category Section',
  type: 'document',
  fields: [
    defineField({
        name: 'image',
        title: 'image',
        type: 'image',
      }),
  
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'subheading',
      type: 'string',
    }),
]
});