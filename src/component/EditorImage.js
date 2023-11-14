const EditorImage = async (imageFile) => {
  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await fetch('/upload-image-endpoint', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      return data.imageUrl // Adjust the response structure according to your server's response.
    } else {
      throw new Error('Image upload failed')
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}

export default EditorImage
