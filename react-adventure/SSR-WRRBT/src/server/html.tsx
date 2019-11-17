import React from 'react';

interface Props {
	title: string;
	appMarkup: string;
	preloadedState: {};
}
interface State { }

class Html extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		console.log(this.props);
	}

	render() {
		const { title, appMarkup, preloadedState } = this.props;

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<meta name="theme-color" content="#000000" />

					{/* <link rel="stylesheet" type="text/css" href="styles/styles.css" /> */}
					<link rel="shortcut icon" href="favicon/favicon.ico" />

					<title>trakkal laksdfj</title>
				</head>
				<body>
					<noscript>
						You need to enable JavaScript to run this app.
        			</noscript>
					<div id="app" dangerouslySetInnerHTML={{ __html: appMarkup }}></div>
					{preloadedState && (
						// this works becouse "true && expression" always evaluates to "expression"
						<script
							dangerouslySetInnerHTML={{
								// WARNING: See the following for security issues around embedding JSON in HTML:
								// http://redux.js.org/recipes/ServerRendering.html#security-considerations
								__html: `window.__APP__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`
							}}
						></script>
					)}
				</body>
			</html>
		)
	}
}

export default Html;