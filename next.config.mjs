/** @type {import('next').NextConfig} */
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
