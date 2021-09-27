export async function nextTick(): Promise<void> {
    return await new Promise(res => setTimeout(res, 0))
}