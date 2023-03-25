const withTwin = require("./withTwin");

/** @type {import('next').NextConfig} */

const nextConfig = withTwin({
  reactStrictMode: false,
  swcMinify: true,
});

module.exports = nextConfig;
