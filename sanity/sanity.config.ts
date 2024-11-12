import {createAuthStore, defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Gestalt',

  projectId: 'k05lbr97',
  dataset: 'docs',

  plugins: [structureTool(), visionTool()],
  auth: createAuthStore({
    projectId: 'k05lbr97',
    dataset: 'docs',
    mode: 'append',
    redirectOnSingle: false,
    providers: [
      {
        name: 'saml',
        title: 'Pinterest Okta SSO',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/b5edb0a8',
      },
    ],
  }),
  schema: {
    types: schemaTypes,
  },
})
