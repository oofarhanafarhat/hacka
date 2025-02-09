import { defineType, defineField } from "sanity";

export const contact= defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "workingTime",
      title: "Working Time",
      type: "string",
    }),
  ],
});