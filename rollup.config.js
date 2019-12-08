import replace from '@rollup/plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import yaml from '@rollup/plugin-yaml';
import img from "@rollup/plugin-image";
import md from 'rollup-plugin-md';

import {
    terser
} from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];

export default {
    input: 'src/index.tsx',
    output: {
        file: 'public/index.js',
        format: 'iife',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        }),
        resolve({
            extensions,
        }),
        commonjs({
            include: /node_modules/,
        }),
        yaml(),
        img(),
        md(),
        babel({
            extensions,
            exclude: /node_modules/,
            babelrc: false,
            runtimeHelpers: true,
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: [
                'react-require',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-proposal-object-rest-spread', {
                    useBuiltIns: true,
                }],
                ['@babel/plugin-transform-runtime', {
                    corejs: 2,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                }],
            ],
        }),
        (isProd && terser()),
    ],
};