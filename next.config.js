/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.module.rules.push( { test: /\.markdown$/, use: "raw-loader" } )
        return config
    },
    compiler: { styledComponents: true }
}

module.exports = nextConfig
