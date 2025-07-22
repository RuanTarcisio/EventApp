const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_SERVER_URL || 'http://localhost:4000'}/:path*`
      }
    ]
  }
}
export default nextConfig