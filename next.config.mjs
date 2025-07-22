/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remova ou corrija a configuração experimental
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  
  // Mantenha o rewrites para o json-server
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:4000/:path*`
      }
    ]
  }
}

export default nextConfig