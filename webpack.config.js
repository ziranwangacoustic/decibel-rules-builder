const path = require('path');
const { DefinePlugin, BannerPlugin } = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getHeader } = require('./config/copyright');
const configureProxy = require('./setupProxy');
const { version } = require('./package.json');

dotenv.config();

const PUBLIC_PATH = process.env.PUBLIC_PATH || '';
const WEBPACK_PUBLIC_PATH = PUBLIC_PATH ? `/${PUBLIC_PATH}/` : '/';
const WEBPACK_OPEN_PAGE = PUBLIC_PATH ? `${PUBLIC_PATH}/` : '';

const { OKTA_CLIENT_ID, OKTA_AUTHORIZATION_SERVER, CUSTOMER_API_URL } = process.env;

const walkme = {
  domain: process.env.WALKME_DOMAIN || '',
  id: process.env.WALKME_ID || '8faa76f7dc3340cdb1beaf4a03ebc451',
  env: process.env.WALKME_ENV_URL_PART || '/development',
};
const WALKME_PATH = `${walkme.domain}/users/${walkme.id}${walkme.env}/walkme_${walkme.id}_https.js`;

// Digital Analytics
const UBX_CAPTURE_PATH =
  process.env.UBX_CAPTURE_PATH || '//lib-us-3.brilliantcollector.com/common/ubxCapture.js';
const DA_CLIENT_ID = process.env.UBX_CLIENT_ID || '85400000';
// depending on stream SITE_ID should be changed to ‘CMS’, ‘CUI’, ‘DA’ etc…
const DA_SITE_ID = process.env.DA_SITE_ID || 'CMS';
const UBX_TLD = process.env.UBX_TLD || 'goacoustic.com';
const UBX_C_ID = process.env.UBX_C_ID || 'af6ec148-1c76-4eba-a104-90b931128353';

const ubxCapture = {
  url: UBX_CAPTURE_PATH,
  daSiteID: DA_SITE_ID,
  daClientID: DA_CLIENT_ID,
  tld: UBX_TLD,
  cid: UBX_C_ID,
};
// END: Digital Analytics

const commonPlugins = isModule => [
  new MiniCssExtractPlugin({
    filename: isModule ? '[name].css' : '[name].[hash].css',
  }),
  new DefinePlugin({
    'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
    'process.env.WALKME_PATH': JSON.stringify(WALKME_PATH),
    'process.env.OKTA_CLIENT_ID': JSON.stringify(OKTA_CLIENT_ID),
    'process.env.OKTA_AUTHORIZATION_SERVER': JSON.stringify(OKTA_AUTHORIZATION_SERVER),
    'process.env.CUSTOMER_API_URL': JSON.stringify(CUSTOMER_API_URL),
    'process.env.DA_SITE_ID': JSON.stringify(DA_SITE_ID),
  }),
  new BannerPlugin({
    banner: ({ filename }) => `${getHeader(filename)}\nv${version}`,
  }),
];

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.[s]?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*'],
    alias: {
      cldr: 'cldrjs/dist/cldr',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: commonPlugins,
};

module.exports = () => {
  const moduleConfig = {
    ...commonConfig,
    name: 'module',
    entry: { index: path.resolve(__dirname, 'src/index.js') },
    plugins: [...commonPlugins(true), new PeerDepsExternalsPlugin()],
  };

  const applicationConfig = {
    ...commonConfig,
    name: 'application',
    entry: { main: path.resolve(__dirname, 'src/main.jsx') },
    plugins: [
      ...commonPlugins(),
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, 'src/favicon-32x32.png'),
        template: path.resolve(__dirname, 'src/index.html'),
        title: 'Acoustic',
        base: WEBPACK_PUBLIC_PATH,
        ubxCapture,
      }),
      new CopyWebpackPlugin([
        {
          from: 'static/*',
          test: '/.*/',
          to: '[name].[ext]',
        },
      ]),
    ],
    devServer: {
      clientLogLevel: 'silent',
      port: 4200,
      open: true,
      historyApiFallback: {
        index: WEBPACK_PUBLIC_PATH,
      },
      hot: true,
      before: configureProxy,
      openPage: WEBPACK_OPEN_PAGE,
      publicPath: WEBPACK_PUBLIC_PATH,
    },
    output: {
      ...commonConfig.output,
      filename: '[name].[hash].js',
      publicPath: WEBPACK_PUBLIC_PATH,
    },
  };

  return [applicationConfig, moduleConfig];
};
