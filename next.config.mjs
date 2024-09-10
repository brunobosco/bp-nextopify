import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
    return {
        webpack: (config, { isServer }) => {
            if (!isServer) {
                config.resolve.modules.push('src');
            }
            return config;
        },
        sassOptions: {
            includePaths: [path.join(__dirname, 'src/styles')],
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'cdn.shopify.com',
                },
            ],
        },
    };
};

export default nextConfig;
