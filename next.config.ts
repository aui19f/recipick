import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ["whqgnnqbztfpukemyqym.supabase.co"],
  },
};

export default nextConfig;
