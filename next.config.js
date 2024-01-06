/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'cdn.jsdelivr.net',
				port: '',
			},
		],
	},
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.wav$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'static/audio',
						publicPath: '/_next/static/audio',
					},
				},
			],
		});
		return config;
	},
};

module.exports = nextConfig;
