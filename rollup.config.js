import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import yaml from '@rollup/plugin-yaml'
import img from '@rollup/plugin-image'
import html from '@rollup/plugin-html';
//import execute from 'rollup-plugin-execute'
import { string } from 'rollup-plugin-string'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'
import progress from 'rollup-plugin-progress'
import analyze from 'rollup-plugin-analyzer'
import react from 'react'
import reactDom from 'react-dom'
import postcss from 'rollup-plugin-postcss'
const release = process.env.NODE_ENV === 'release'

const extensions = ['.js', '.ts', '.tsx']
const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const init = () => {
  const construct = str => {
    const dir = join(__dirname, `./src/content/${str}/`)
    const files = require('shelljs')
      .ls(dir)
      .stdout.split('\n')
      .filter(s => s !== '')
    const arr = []
    for (var i = 0; i < files.length; i++) {
      const [ign, head, post] = readFileSync(
        join(dir, files[i]),
        (err, data) => data
      )
        .toString()
        .split('---')
        .map(e => e.split('\n').filter(s => s !== ''))
      const [year, month, day] = head[0].split('.')
      const [srid, name] = files[i].split('.').map(e => e.split('_').join(' '))
      const [imp, label, copyrights, source, link] = head[1].split(' || ')
      const path = `../assets/img/${imp}.${imp.split('/')[0]}`
      const url = `https://${link}`
      arr.push({
        id: srid,
        title: name,
        date: {
          year,
          month,
          day,
        },
        imag: {
          path,
          label,
          copyrights,
          source,
          url,
        },
        body: post,
      })
    }
    return arr
  }
  const main = () => {
    const [ign, head, body] = readFileSync(
      join(__dirname, './src/content/home.md'),
      (err, data) => data
    )
      .toString()
      .split('---')
      .map(e => e.split('\n').filter(s => s !== ''))
    const [title, sub, contacts, copyrights] = head
    const [mail, twitter, github] = contacts.split(' | ')
    return {
      title: title,
      sub: sub,
      contact: {
        mail: mail,
        twitter: twitter,
        github: github,
      },
      copyrights: head[3],
      about: body,
    }
  }
  writeFileSync(
    'src/content.yml',
    require('yaml').stringify(
      require('lodash').reverse({
        home: main(),
        post: construct('post'),
        work: construct('work'),
      })
    )
  )
}
const topt = {
  parse: { },
  compress: { dead_code: true, arrows: true, drop_console: true, drop_debugger: true, evaluate: true, booleans_as_integers: true },
  mangle: { toplevel: true, eval: true, properties: {} },
  output: { comments: false},
  ecma: 5,
  keep_classnames: false,
  keep_fnames: false,
  ie8: false,
  module: false,
  nameCache: null,
  safari10: false,
  toplevel: false,
  warnings: false,
}
const template = ({
  attributes,
  bundle,
  files,
  publicPath,
  title
}) => {

}
export default {
  input: 'src/app.tsx',
  output: { file: 'public/app.js', format: 'iife' },
  plugins: [
    progress(),
    analyze({
      summaryOnly: true
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(release ? 'release' : 'dev') }),
    init(),
    resolve({ extensions }),
    postcss({ extract: true,
      plugins: []
    }),
    sass({insert: false}),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
      },
    }),
    yaml(),
    img(),
    string({ include: '**/*.md' }),
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
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        [
          '@babel/plugin-transform-runtime',
          { corejs: 3, helpers: true, regenerator: true, useESModules: false },
        ],
      ],
    }),
    !release && serve({
      open: true,
      contentBase: 'public',
      host: 'localhost',
      port: 3000,
    }),
    release && terser(topt),
  ],
}
