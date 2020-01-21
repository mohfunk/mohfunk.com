import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import yaml from '@rollup/plugin-yaml'
import img from '@rollup/plugin-image'
import execute from 'rollup-plugin-execute'
import { string } from 'rollup-plugin-string'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'
import progress from 'rollup-plugin-progress';
import minify from 'rollup-plugin-babel-minify';
const isProd = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.ts', '.tsx']
const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const init = () => {
  const construct = str => {
    const dir = join(__dirname, `./src/content/${str}/`)
    const files = require('shelljs').ls(dir).stdout.split('\n').filter(s => s !== '')
    const arr = []
    for (var i = 0; i < files.length; i++) {
      const [ign, head, post] = readFileSync(join(dir, files[i]),(err, data) => data).toString().split('---').map(e => e.split('\n').filter(s => s !== ''))
      const [year, month, day] = head[0].split('.')
      const [srid, name] = files[i].split('.').map(e => e.split('_').join(' '))
      const [imp, label, copyrights, source, link] = head[1].split(' || ')
      const path = `../assets/img/${imp}.${imp.split('/')[0]}`
      const url = `https://${link}`
        arr.push({ id: srid, title: name, date: { year, month, day, }, imag: { path, label, copyrights, source, url, }, body: post, })
    }
    return arr
  }
  const main = () => {
    const [ign, head, body] = readFileSync( join(__dirname, './src/content/home.md'),(err, data) => data).toString().split('---').map(e => e.split('\n').filter(s => s !== ''))
    const [title, sub, contacts, copyrights] = head
    const [mail, twitter, github] = contacts.split(' | ')
    return { title: title, sub: sub, contact: { mail: mail, twitter: twitter, github: github, }, copyrights: head[3], about: body, }
  }
  writeFileSync( 'src/content.yml', require('yaml').stringify(require('lodash').reverse({ home: main(), post: construct('post'), work: construct('work'), })))
}

export default {
  input: 'src/app.tsx',
  output: {
    file: 'public/app.js',
    format: 'iife',
  },
    plugins: [
      progress(),
    init(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      ),
    }),
    resolve({
      extensions,
    }),
    sass(),
    commonjs({
      include: /node_modules/,
    }),
    yaml(),
    img(),
        string({ include: '**/*.md', }),
    minify({comments: false}),
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
        [
          '@babel/plugin-proposal-object-rest-spread',
          {
            useBuiltIns: true,
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        ],
      ],
    }),
    isProd && terser(),
  ],
}
