const base64Cache: { [key: string]: string | null } = {}

export default async function convertToBase64(url: string) {
  if (base64Cache[url]) return base64Cache[url]
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const reader = new FileReader()
    const base64Promise = new Promise<string | null>((resolve) => {
      reader.onloadend = () => {
        const base64Result = reader.result as string
        base64Cache[url] = base64Result
        resolve(base64Result)
      }
      reader.readAsDataURL(blob)
    })
    return await base64Promise
  } catch (error: any) {
    console.error(`Error converting ${url} to Base64: ${error.message}`)
    return null
  }
}
