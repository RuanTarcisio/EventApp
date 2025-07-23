
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remova o output: standalone ou use o comando correto
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ] : []
  }
}

export default nextConfig