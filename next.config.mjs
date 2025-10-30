/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dezvolta.in',
            },
        ]
    }
};

export default nextConfig;
