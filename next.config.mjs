/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: ['./src', './src/**/*.scss'],
        prependData: `@import "@/styles/index.scss";`
    },
};

export default nextConfig;
