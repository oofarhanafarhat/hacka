import { defineType, defineField } from 'sanity';

export const cartItem= defineType({
  name: 'cartItem',
  title: 'Cart Item', 
  type: 'document', 
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference', 
      to: [{ type: 'product' }], 
      validation: (Rule) => Rule.required().error('Product is required'),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).error('Quantity must be at least 1'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(0).error('Price cannot be negative'),
    }),
  ],
});