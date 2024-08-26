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

    webpack: (config) => {
        config.resolve.alias["@"] = path.join(process.cwd(), "src");
        return config;
    }
};

export default nextConfig;
