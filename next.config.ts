/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const allowedOrigin = process.env.NEXT_PUBLIC_API_URL || '*'
    console.log('🔒 [CORS] Configurando origem permitida:', allowedOrigin)

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigin,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ]
  },
  // Configurações para as variáveis de ambiente em runtime
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
  },
  images: {
    remotePatterns: [{ hostname: 'github.com' }, { hostname: 'i.pravatar.cc' }]
  },
};

export default nextConfig;
