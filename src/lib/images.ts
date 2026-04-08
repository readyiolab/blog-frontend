/**
 * Utility to optimize Cloudinary and other image URLs by adding 
 * performance-focused transformation parameters.
 */
export const getOptimizedImageUrl = (url: string | undefined | null, width?: number) => {
  if (!url) return "/placeholder.webp";
  
  // If it's a Cloudinary URL, add auto-format and auto-quality
  if (url.includes("cloudinary.com")) {
    if (url.includes("/upload/")) {
      const parts = url.split("/upload/");
      const transformation = `f_auto,q_auto${width ? `,w_${width},c_fill` : ""}`;
      return `${parts[0]}/upload/${transformation}/${parts[1]}`;
    }
  }
  
  return url;
};

/**
 * Generates a srcset string for Cloudinary images to support responsive sizing.
 */
export const getCloudinarySrcSet = (url: string | undefined | null, widths: number[] = [400, 640, 800, 1200]) => {
  if (!url || !url.includes("cloudinary.com") || !url.includes("/upload/")) {
    return "";
  }
  
  return widths
    .map((w) => `${getOptimizedImageUrl(url, w)} ${w}w`)
    .join(", ");
};
