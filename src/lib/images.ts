/**
 * Utility to optimize Cloudinary and other image URLs by adding 
 * performance-focused transformation parameters.
 */
export const getOptimizedImageUrl = (url: string | undefined | null, width?: number) => {
  if (!url) return "/placeholder.webp";
  
  // If it's a Cloudinary URL, add auto-format and auto-quality
  if (url.includes("cloudinary.com")) {
    // Check if it already has transformations
    if (url.includes("/upload/")) {
      const parts = url.split("/upload/");
      const transformation = `f_auto,q_auto${width ? `,w_${width}` : ""}`;
      return `${parts[0]}/upload/${transformation}/${parts[1]}`;
    }
  }
  
  return url;
};
