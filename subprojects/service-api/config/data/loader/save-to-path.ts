
import path from 'path'
import { stringifyJsonToFile } from '@macroserviced/utils'


export function SaveToPath<T> (filepath: string) {
  return stringifyJsonToFile<T>(path.join(__dirname, "../../../", filepath))
} 
