import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Toda requisição que começar com /api/...
        destination: 'http://localhost:3000/api/:path*', // Será redirecionada para o seu back-end
      },
    ];
  },
};

export default nextConfig;
