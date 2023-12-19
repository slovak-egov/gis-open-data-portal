/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  i18n: {
    locales: ["sk"],
    defaultLocale: "sk",
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [{ source: "/data/:path*", destination: "/api/:path*" }];
  },
};

module.exports = nextConfig;
