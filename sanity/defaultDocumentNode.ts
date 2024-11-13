import {type DefaultDocumentNodeResolver} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {type Post} from './sanity.types'

// Customise this function to show the correct URL based on the current document
const preview_url = 'http://localhost:8888/api/preview' //'https://deploy-preview-3864--gestalt.netlify.app'
function getPreviewUrl(doc: Post) {
  return doc?.slug?.current
    ? `${preview_url}/?slug=${doc.slug.current}&token=hello`
    : `${preview_url}`
}

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `postaa`:
      return S.document().views([S.view.form()])
    default:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: Post) => getPreviewUrl(doc),
          })
          .title('Preview'),
      ])
  }
}
