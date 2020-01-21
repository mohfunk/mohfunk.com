import react, { useState } from 'react'
import { Link, Router, createHistory } from '@reach/router'
import content from './content.yml'
import lodash from 'lodash'
import { post } from './types'
import Footer from './components/Footer'
// tslint:disable-next-line: import-name
import {Post, PostBody} from './components/post'
import { Info, Game, Blog } from './svg/icons'
import reactDom from 'react-dom'

const BlogMenu = (props: { path: string }) => (
  <div>
    {content.post.map((lm: post) => (
      <h3 key={lm.id} id={lm.title.split(' ').join('-')}>
        <Link to={`blog/${lm.title.split(' ').join('-')}`}>{lm.title}</Link>
      </h3>
    ))}
    </div>
)
const GamesMenu = (props: { path: string }) => (
  <div>
    {content.work.map((lm: post) => (
      <h3 key={lm.id} id={lm.title.split(' ').join('-')}>
        <Link to={`${lm.title.split(' ').join('-')}`}>{lm.title}</Link>
      </h3>
    ))}
  </div>
)
const Header = () => (
  <>
    <div id={'header'}>
      <nav id={'nav'}>
        <Link to={'/'}>
          <Blog />
        </Link>
        <Link to={'/about'}>
          <Info />
        </Link>
        <Link to={'/games'}>
          <Game />
        </Link>
      </nav>
    </div>
  </>
)
const About = (props: { path: string }) => (
  <span dangerouslySetInnerHTML={PostBody(content.home.about.join('\n'))} />
)

const App = (props: {children: JSX.Element[], path: string}) => (
  <>
    <div id="app">
      <Header />
      {props.children}
      <Footer statement={content.home.copyrights} />
    </div>
  </>
)
reactDom.render(
  <Router>
    <App path="/">
      <BlogMenu path="/" />
      <About path="/about" />
      <GamesMenu path="/games" />
      {content.work.map((lm: post) => (
        // tslint:disable-next-line: jsx-key
        <Post path={`games/${lm.title.split(' ').join('-')}`} info={lm} />
      ))}
      {content.post.map((lm: post) => (
        // tslint:disable-next-line: jsx-key
        <Post path={`blog/${lm.title.split(' ').join('-')}`} info={lm} />
      ))}
    </App>
  </Router>,
  document.getElementById('root')
)
