import axios from 'axios'

const url = 'https://official-joke-api.appspot.com/random_joke'

export const CreateRandomMsg
    = (url: string) => async (): Promise<string> => {
        const { setup, punchline }
            = (await axios
                .get(url) as any).data
        return `${setup as string}\n${punchline as string}`
    }

export const createRandomMsg = CreateRandomMsg(url)