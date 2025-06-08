import { defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50)
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .error('Please enter a valid email address')
    },
    {
      name: 'hashedPassword',
      title: 'Hashed Password',
      type: 'string',
      validation: (Rule) => Rule.required(),
      hidden: true, // Hide from Sanity Studio UI for security
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'User', value: 'user' },
          { title: 'Admin', value: 'admin' }
        ]
      },
      initialValue: 'user'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'profile',
      title: 'Profile',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string'
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street',
              type: 'string'
            },
            {
              name: 'city',
              title: 'City',
              type: 'string'
            },
            {
              name: 'state',
              title: 'State',
              type: 'string'
            },
            {
              name: 'postalCode',
              title: 'Postal Code',
              type: 'string'
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email'
    }
  }
}) 