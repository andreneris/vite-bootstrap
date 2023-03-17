import { RJSFSchema } from '@rjsf/utils';
import validator, { customizeValidator } from '@rjsf/validator-ajv8';
/**
 * 
Short description: A brief summary or title that describes the task.

Description: A more detailed description of the task, including any relevant information or context.

Assignment group: The group responsible for completing the task.

Assigned to: The individual or team responsible for completing the task.

Priority: The level of urgency assigned to the task, such as high, medium, or low.

Due date: The deadline for completing the task.

State: The current status of the task, such as new, in progress, or complete.

Category: A classification that helps to group related tasks together.

Subcategory: A further classification that helps to refine the category.

Related items: Any other records or tasks that are related to the current task.
 */

export const schema: RJSFSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'ServiceNow Task',
  description: 'JSON schema for a ServiceNow task',
  type: 'object',
  properties: {
    number: {
      type: 'string',
    },
    state: {
      type: 'string',
      description:
        'The current status of the task, such as new, in progress, or complete.',
      enum: ['New', 'In Progress', 'Complete'],
    },
    opened_by: {
      type: 'string',
    },
    opened_at: {
      type: 'string',
      format: 'date',
    },
    caller: {
      type: 'string',
    },
    created_on: {
      type: 'string',
      format: 'date',
    },
    assignment_group: {
      type: 'string',
      //format: 'custom-lookup',
      description: 'The group responsible for completing the task.',
      enum: ['IT', 'HR', 'Facilities'],
    },
    assigned_to: {
      type: 'string',
      description:
        'The individual or team responsible for completing the task.',
      minLength: 5,
      maxLength: 50,
    },
    category: {
      type: 'string',
      "title": "Category",
      description:
        'A classification that helps to group related tasks together.',
      enum: ['Hardware', 'Software', 'Facilities'],
    },
    subcategory: {
      type: 'string',
      description:
        'A further classification that helps to refine the category.',
      enum: ['Printer', 'Laptop', 'Network'],
    },
    due_date: {
      type: 'string',
      description: 'The deadline for completing the task.',
      format: 'date-time',
    },
    sapace: {
      title: ' ',
      type: 'null',
    },
    impact: {
      type: 'string',
    },

    urgency: {
      type: 'string',
    },
    priority: {
      type: 'string',
      description:
        'The level of urgency assigned to the task, such as high, medium, or low.',
      enum: ['High', 'Medium', 'Low'],
    },

    short_description: {
      type: 'string',
      description: 'A brief summary or title that describes the task.',
      minLength: 5,
      maxLength: 100,
    },
    description: {
      type: 'string',
      description:
        'A more detailed description of the task, including any relevant information or context.',
      minLength: 10,
      maxLength: 1000,
    },
    related_items: {
      type: 'array',
      description:
        'Any other records or tasks that are related to the current task.',
      items: {
        type: 'string',
        minLength: 5,
        maxLength: 50,
      },
    },
  },
  "dependencies": {
    "category": {
      "oneOf": [
        {
          "properties": {
            "category": {
              "const": "loading"
            }
          },
          "required": ["category"]
        },
        {
          "properties": {
            "category": {
              "type": "string",
              "enum": []
            }
          },
          "required": ["category"]
        }
      ]
    }
  },
  required: [
    'short_description',
    'assignment_group',
    'assigned_to',
    'priority',
    'due_date',
    'state',
    'category',
  ],
  additionalProperties: false,
};

export const uiSchema = {
  number: {
    'ui:xs': 6,
  },
  state: {
    'ui:widget': 'select',
    'ui:options': {
      xs: 6,
    },
  },
  opened_by: {
    'ui:xs': 6,
  },
  opened_at: {
    'ui:xs': 6,
  },
  caller: {
    'ui:xs': 6,
  },
  created_on: {
    'ui:xs': 6,
  },
  short_description: {
    'ui:autofocus': true,
    'ui:placeholder': 'Enter a brief summary or title for the task',
  },
  description: {
    'ui:widget': 'textarea',
    'ui:placeholder':
      'Enter a more detailed description of the task, including any relevant information or context',
  },
  assignment_group: {
    'ui:widget': 'select',
    'ui:xs': 6,
  },
  assigned_to: {
    'ui:placeholder':
      'Enter the name of the individual or team responsible for completing the task',
    'ui:xs': 6,
  },
  impact: {
    'ui:xs': 4,
  },

  urgency: {
    'ui:xs': 4,
  },
  priority: {
    'ui:xs': 4,
  },
  due_date: {
    'ui:widget': 'datetime',
    'ui:xs': 6,
  },
  sapace: {
    'ui:xs': 6,
  },

  category: {
    //'ui:widget': 'select',
    'ui:xs': 6,
  },
  subcategory: {
    'ui:widget': 'select',
    'ui:xs': 6,
  },
  related_items: {
    items: {
      'ui:placeholder': 'Enter a related item',
    },
  },
};

export default validator;
