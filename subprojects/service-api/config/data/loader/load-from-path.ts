import path from 'path'
import { parseJsonFromFile } from '@macroserviced/utils'


export function LoadFromPath<T> (filepath: string): T[] {
	return parseJsonFromFile<T>(path.join(__dirname, filepath))
} 
