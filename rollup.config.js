import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: './lib/index.js',
  format: 'cjs',
  external: ['noble', 'dns', 'crowd-control', 'isomorphic-fetch'],
  plugins: [
    nodeResolve(),
    babel({
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: 6,
            },
          },
        ],
        'stage-0',
      ],
      babelrc: false,
    }),
  ],
  dest: './dist/index.js',
};
