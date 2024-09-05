/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            }
        ]
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            }
        }
        return config;
    },
}

export default nextConfig;
