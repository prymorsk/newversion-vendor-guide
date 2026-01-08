export async function getResponse(DURL) {
    // Call an external API endpoint to get posts
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${DURL}`)
        const data = await res.json()
        return data
    } catch (e) {
        // console.error(e)
        return false;
    }
}

export function getResponseLoad(DURL) {
    // Call an external API endpoint to get posts
    try {
        const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}${DURL}`)
        const data = res.json()
        return data
    } catch (e) {
        // console.error(e)
        return false;
    }
}

export async function postResponse(DURL,RequestData) {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${DURL}`,RequestData)
    const data = await res.json()
    return data
}