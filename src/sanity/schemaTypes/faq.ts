export const faq = {
    name: 'faq', 
    title: 'FAQ', 
    type: 'document', 
    fields: [
      {
        name: 'question', 
        title: 'Question', 
        type: 'string',
        description: 'Enter the question here', 
        validation: (Rule:any) => Rule.required().min(5).max(150), 
      },
      {
        name: 'answer',
        title: 'Answer', 
        type: 'text', 
        description: 'Provide a detailed answer for the question',
        validation: (Rule:any) => Rule.required().min(10),
      },
      {
        name: 'category', 
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'General', value: 'general' },
            { title: 'Technical', value: 'technical' },
            { title: 'Shipping', value: 'shipping' },
          ], 
          layout: 'radio', 
        },
      },
      {
        name: 'priority', 
        title: 'Priority',
        type: 'number', 
        description: 'Set a priority for displaying this FAQ (higher appears first)',
        validation: (Rule:any) => Rule.min(1).max(10), // Min and max values
      },
    ],
  };