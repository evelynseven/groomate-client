/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://10.0.0.244:3000", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  // async rewrites() {
  //   return process.env.NODE_ENV === "production"
  //     ? [
  //         {
  //           source: "/api/:path*",
  //           destination: `http://10.0.0.244:3000/:path*`,
  //         },
  //       ]
  //     : [
  //         {
  //           source: "/api/:path*",
  //           destination: `http://localhost:3000/:path*`,
  //         },
  //       ];
  // },
};

export default nextConfig;
