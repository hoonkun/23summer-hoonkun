/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.module.rules.push( { test: /\.markdown$/, use: "raw-loader" } )
        config.resolve.fallback = { fs: false, path: false }
        return config
    },
    compiler: { styledComponents: true }
}

module.exports = nextConfig
