import {defineField, defineType} from 'sanity';

export const featurType = defineType({
  name: 'featur',
  title: 'featurs Section',
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
      name: 'price',
      title: 'price',
      type: 'number',
    }),
]
});