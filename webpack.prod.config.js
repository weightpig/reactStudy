const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "production",  //生产环境
  devtool: "source-map",
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    filename: "index.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader", // css node(commonJS )风格的 string
          use: [
            "css-loader", //   把 css 转义成  commonJS 规范的js 代码
            {
              loader: "postcss-loader", // 转成 css 风格代码
              options: {
                plugins: function() {
                  return [
                    require("cssgrace"), // 美化css 缩进
                    require("postcss-px2rem-exclude")({
                      remUnit: 190.0 // px 转 rem
                      // exclude: /antd/i // 排除antd 里面rem 转换
                    }),
                    require("autoprefixer")() // 自动补全 moz ms webkit
                  ];
                }
              }
            },
            "sass-loader" // scss 编译
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    port: 8081,
    inline: true,
    hot: true,
    historyApiFallback: true,
    open: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: "src/index.html",
      filename: "index.html"
    }),
    new ExtractTextPlugin("index.[hash].css"),
    new CopyWebpackPlugin([
      {
        from: __dirname + "/src/img",
        to: __dirname + "/dist/img"
        // ignore: ['.*']
      }
    ])
  ]
};
