/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
            "/uploader": ["./public/**/*"],
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'https',
                hostname: 'vrmmf5vbjcaqhcui.public.blob.vercel-storage.com',
            }
        ],
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
