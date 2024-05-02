/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    baseUrl: "http://10.0.0.244:3000",
  },
};

export default nextConfig;
