import { type SchemaTypeDefinition } from 'sanity'
import cake from './cake'
import post from './post'
import settings from './settings'
import about from './about'
import review from './review'
import education from './education'
import gallery from './gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cake, post, settings, about, review, education, gallery], 
}