const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**'
      },
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
        pathname: '/**'
      }
    ]
  },
  turbopack: {}
};

module.exports = nextConfig;
