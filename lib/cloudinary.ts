export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
}

export function getCloudinaryUrl(publicId: string, transformations?: string) {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`
  return transformations ? `${baseUrl}/${transformations}/${publicId}` : `${baseUrl}/${publicId}`
}

export function getOptimizedImageUrl(publicId: string, width?: number, quality: number = 80) {
  const transforms = []
  if (width) transforms.push(`w_${width}`)
  transforms.push(`q_${quality}`, 'f_auto')
  return getCloudinaryUrl(publicId, transforms.join(','))
}
