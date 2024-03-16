module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
  },
  webpack: {
    rules: [
      // Add rule for Tailwind CSS
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("tailwindcss")],
            },
          },
        ],
      },
    ],
  },
};
