// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.dummyjson.com',
      'static.cdnlogo.com',
      'i.pinimg.com',
      'image.freepik.com',
      'images.pexels.com',
      'images.unsplash.com', // lowercase i
    ]
  },
};

export default nextConfig;
