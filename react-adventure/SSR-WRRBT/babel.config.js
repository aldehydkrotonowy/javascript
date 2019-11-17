module.exports = api => {

	// Jest will set process.env.NODE_ENV to 'test'
	const isTest = api.env('test');
	api.cache(true);
	return {
		presets: [
			[
				'@babel/preset-env', {
					targets: {
						node: 'current',
						browsers: ['last 2 versions']
					},
					modules: isTest ? 'commonjs' : "auto"
				}],
			"@babel/preset-react",
			'@babel/preset-typescript',
		],
		plugins: [
			"@babel/proposal-class-properties",
			"@babel/proposal-object-rest-spread"
		],
		ignore: [
			"node_modules"
		]
	};
};