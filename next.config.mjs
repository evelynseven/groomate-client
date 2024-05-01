/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://10.0.0.244:3000/:path*`,
      },
    ];
  },
};

export default nextConfig;
