/** @type {import('next').NextConfig} */
import path from "path";
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
    i18n,

    async redirects() {
        return [
            {
                source: "/:locale/",
                destination: "/:locale/movie",
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
    }
};

export default nextConfig;/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
    async redirects() {
        return [
            {
                source: "/:locale/",
                destination: "/:locale/movie",
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
    }
};

export default nextConfig;/** @type {import('next').NextConfig} */
import { hostname } from "os";
import path from "path";
import { i18n } from './next-i18next.config.js';

const nextConfig = {
    i18n,

    async redirects() {
        return [
            {
                source: "/:locale/",
                destination: "/:locale/movie",
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
