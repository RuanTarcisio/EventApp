/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita o modo standalone para otimização no Render
  output: 'standalone',

  // Configura rewrites para redirecionar chamadas API para o json-server
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:4000/:path*'
        }
      ]
    } else {
      // Em produção, assumindo que json-server está rodando na mesma instância
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:4000/:path*'
        }
      ]
    }
  },

  // Configuração adicional de segurança
  experimental: {
    serverActions: true,
  }
}

export default nextConfig