/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Adicione esta linha
  async rewrites() {
    return process.env.NODE_ENV === 'production' ? [] : [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ]
  }
}

export default nextConfig