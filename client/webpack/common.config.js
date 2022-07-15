const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
require("dotenv").config();

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
		new DefinePlugin({
			"process.env.AUTH0_DOMAIN": JSON.stringify(process.env.AUTH0_DOMAIN),
			"process.env.AUTH0_CLIENT_ID": JSON.stringify(
				process.env.AUTH0_CLIENT_ID
			),
			"process.env.AUTH0_AUDIENCE": JSON.stringify(process.env.AUTH0_AUDIENCE),
			"process.env.API_URL": JSON.stringify(process.env.API_URL),
		}),
	],
};
