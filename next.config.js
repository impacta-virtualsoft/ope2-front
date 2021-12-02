/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/login',
  //       destination: '/auth/entrar',
  //       permanent: true,
  //     },
  //     {
  //       source: '/entrar',
  //       destination: '/auth/entrar',
  //       permanent: true,
  //     },
  //     {
  //       source: '/auth/login',
  //       destination: '/auth/entrar',
  //       permanent: true,
  //     },
  //     {
  //       source: '/auth/forgot',
  //       destination: '/auth/esqueci',
  //       permanent: true,
  //     },
  //     {
  //       source: '/forgot',
  //       destination: '/auth/esqueci',
  //       permanent: true,
  //     },
  //     {
  //       source: '/esqueci',
  //       destination: '/auth/esqueci',
  //       permanent: true,
  //     },
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    })
    return config
  },
}
