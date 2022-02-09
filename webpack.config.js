const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
  }, //우리가 변경하고자 하는 파일
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    // 출력
    filename: "js/[name].js", //파일 이름은 아무거나 가능
    path: path.resolve(__dirname, "assets"), //출력된 파일의 절대경로 지정
    clean: true,
  },
  module: {
    rules: [
      //파일을 어떻게 변환할건지 rule 설정
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader", //파일을 변환하는 장치
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //loader는 역순으로 실행함(sass부터)
      },
    ],
  },
};
