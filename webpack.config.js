import path from 'path';
import Dotenv from 'dotenv-webpack';

export default {
  mode: "production",
  entry: {
    main: './app.js',
  },
  output: {
    path: path.join(path.resolve(), 'build'),
    filename: '[name].bundle.js',
  },
  target: 'node',
  plugins: [
    new Dotenv()
  ]
}
