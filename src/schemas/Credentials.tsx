import { RJSFSchema } from '@rjsf/utils';
import validator, { customizeValidator } from '@rjsf/validator-ajv8';

export const schema: RJSFSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/schemas/api-credentials.json',
  title: 'API Credentials',
  type: 'object',
  properties: {
    id: { type: 'integer',title:'#' },
    alias:{
      type:'string'
    },
    method: {
      type: 'string',
      description: 'The authentication method to use for the API connection.',
      enum: ['API Key', 'OAuth 2.0', 'Basic Auth', 'Certificate'],
    },
  },
  dependencies: {
    method: {
      oneOf: [
        {
          properties: {
            method: {
              enum: ['API Key'],
            },
            apiKey: {
              type: 'string',
              description: 'The API key to use for authentication.',
              format: 'password',
            },
          },
          required: ['apiKey'],
        },
        {
          properties: {
            method: {
              enum: ['OAuth 2.0'],
            },
            accessToken: {
              type: 'string',
              description: 'The access token to use for authentication.',
              format: 'password',
            },
            refreshToken: {
              type: 'string',
              description: 'The refresh token to use for authentication.',
              format: 'password',
            },
            clientId: {
              type: 'string',
              description: 'The OAuth 2.0 client ID to use for authentication.',
            },
            clientSecret: {
              type: 'string',
              description:
                'The OAuth 2.0 client secret to use for authentication.',
              format: 'password',
            },
          },
          required: ['accessToken', 'clientId', 'clientSecret'],
        },
        {
          properties: {
            method: {
              enum: ['Basic Auth'],
            },
            username: {
              type: 'string',
              description: 'The username to use for authentication.',
            },
            password: {
              type: 'string',
              description: 'The password to use for authentication.',
              format: 'password',
            },
          },
          required: ['username', 'password'],
        },
        {
          properties: {
            method: {
              enum: ['Certificate'],
            },
            certificate: {
              type: 'string',
              description: 'The certificate to use for authentication.',
              format: 'password',
            },
          },
          required: ['certificate'],
        },
      ],
    },
  },
};

/**
 * Authentication Method	Required Fields
API Key	apiKey
OAuth 1.0a	apiKey, apiSecret
OAuth 2.0	accessToken, clientId, clientSecret, refreshToken
Basic Auth	username, password
Digest Auth	username, password, realm, nonce, opaque, algorithm, qop
Certificate	certificate
 */

export const uiSchema = {};

export default validator;
