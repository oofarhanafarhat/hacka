import {defineField, defineType} from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'product Section',
  type: 'document',
  fields: [
    defineField({
        name: 'image',
        title: 'image',
        type: 'image',
      }),
  
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'price',
      type: 'string',
    }),

    defineField({
      name: 'button',
      title: 'button',
      type: 'string',
    }),
]
});