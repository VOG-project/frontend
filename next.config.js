const withTwin = require("./withTwin");

/** @type {import('next').NextConfig} */

const nextConfig = withTwin({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["vog-image-storage.s3.ap-northeast-2.amazonaws.com"],
  },
});

module.exports = nextConfig;
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./components/**/*.{js, ts, jsx, tsx",
  ],
};
