/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            source: "/api/:path*",
            destination: `http://10.0.0.244:3000/:path*`,
          },
        ]
      : [
          {
            source: "/api/:path*",
            destination: `http://localhost:3000/:path*`,
          },
        ];
  },
};

export default nextConfig;
