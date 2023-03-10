import { RJSFSchema } from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';






export const schema: RJSFSchema = {
  "definitions": {
    "locations": {
      "enumNames": [
        "New York",
        "Amsterdam",
        "Hong Kong"
      ],
      "enum": [
        {
          "name": "New York",
          "lat": 40,
          "lon": 74
        },     
        {
          "name": "Amsterdam",
          "lat": 52,
          "lon": 5
        },
        {
          "name": "Hong Kong",
          "lat": 22,
          "lon": 114
        }
      ]
    }
  },
  "type": "object",
  "properties": {
    "listOfStrings": {
      "type": "array",
      "title": "A list of strings",
      "items": {
        "type": "string",
        "default": "bazinga"
      }
    },
    "phone": {
      "type": 'string',
      pattern: '[0-9]{9}',
      "format": 'phone-us'
    }, 
    "date": {
      type: "string",
      format: "date-time"
    },
    "location": {
      "title": "Location",
      "$ref": "#/definitions/locations"
    },
    "locationRadio": {
      "title": "Location Radio",
      "$ref": "#/definitions/locations"
    },
    "multiSelect": {
      "title": "Locations",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/definitions/locations"
      }
    },
    "checkboxes": {
      "title": "Locations Checkboxes",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/definitions/locations"
      }
    }
  }
}

export const uischema = {
  "type": "VerticalLayout",
  "locationRadio": {
    "ui:widget": "RadioWidget"
  },
  "checkboxes": {
    "ui:widget": "CheckboxesWidget"
  }
}

const customFormats = {
  'phone-us': /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
};

const validator = customizeValidator({ customFormats });

export default validator;