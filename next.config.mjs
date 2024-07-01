/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_URI: process.env.API_URI,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
  },
};

export default nextConfig;
