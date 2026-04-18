/** @type {import('next').NextConfig} */
import { hostname } from "os";
import path from "path";

const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/movie",
                permanent: true
            }
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "/t/p/**"
            },
            {
                protocol: "https",
                hostname: "flagsapi.com",
                pathname: "/**"
            }
        ]
    },

    webpack: (config, { isServer }) => {
        config.resolve.alias["@"] = path.join(process.cwd(), "src");

        if (process.env.ANALYZE) {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    openAnalyzer: true,
                })
            );
        }

        return config;
    },

    turbopack: {}
};

export default nextConfig;
