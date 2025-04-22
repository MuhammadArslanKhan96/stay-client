export async function isImageWorking(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
    });

    return response.ok;
  } catch (error) {
    console.error(`Error checking image URL: ${url}`, error);
    return false;
  }
}
