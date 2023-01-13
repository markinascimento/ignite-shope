/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'files.stripe.com',
      'github.com'
    ]
  }

};

module.exports = nextConfig;
