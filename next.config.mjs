/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
        includePaths: ['./src', './src/**/*.scss'],
        prependData: `@import "@/styles/index.scss";`
    },
};

export default nextConfig;
