import { type SchemaTypeDefinition } from 'sanity'
// Импортируем твой созданный файл
import cake from './cake' 

export const schema: { types: SchemaTypeDefinition[] } = {
  // Добавляем импортированную схему в массив
  types: [cake], 
}