import { RJSFSchema } from '@rjsf/utils';
import validator, { customizeValidator } from '@rjsf/validator-ajv8';
export default validator;
export const uiSchema={}
export const schema: RJSFSchema = 
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
      "method": {
          "type": "string",
          "enum": ["GET", "POST", "PUT", "PATCH", "DELETE"]
      },
      "url": {
          "type": "string",
          "format": "uri"
      },
      "headers": {
          "type": "object",
          "additionalProperties": {
              "type": "string"
          }
      },
      "body": {type:'string'},
      "status": {
          "type": "integer"
      },
      "responseHeaders": {
          "type": "object",
          "additionalProperties": {
              "type": "string"
          }
      },
      "responseBody": {},
      "timestamp": {
          "type": "string",
          "format": "date-time"
      },
      "userId": {
          "type": "string"
      }
  },
  "required": ["method", "url", "status", "timestamp"]
}
