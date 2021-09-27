import axios from 'axios'
import { uuidv4 } from '@macroserviced/utils'

export function GenSeeds<T>(baseUrl: string) {
  return (async (): Promise<T[]> => {
    const seeds = await (await axios.get(baseUrl)).data
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return seeds.map((u: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...u,
        id: uuidv4().slice(0, 8)
      }
    })
  })()
}