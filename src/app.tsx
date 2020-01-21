import react, { useState } from 'react'
import { Link, Router, createHistory } from '@reach/router'
import contentYml from './content.yml'
import { post, postRef, ppost, content } from './types'
import Menu from "./components/Menu";
import Footer from './components/Footer'
// tslint:disable-next-line: import-name
import {Post, PostBody} from './components/post'
import { Info, Game, Blog } from './svg/icons'
import useScript from './hooks/useScript';
import reactDom from 'react-dom'
const fetch_refs = (cont: ppost[], cate: string): postRef[] => {
  // tslint:disable-next-line: prefer-const
  let refs: postRef[] = []
  // tslint:disable-next-line: prefer-const
  cont.forEach((p: ppost) => {
    refs.push({ id: p.id, title: p.title, date: p.date, url: `${p.title.split(' ').join('-')}` });
  })
  return refs;
}
import './assets/style/css/reset.css';

const blog: postRef[]  = fetch_refs(contentYml.post, "blog");
const games: postRef[] = fetch_refs(contentYml.work, "games");
const about: string = contentYml.home.about.join('\n');
const copyrights: string = contentYml.home.copyrights;
const Header = () => (
  <>
    <div id={'header'}>
      <nav id={'nav'}>
        <Link to={'/'}>
          <h1>{contentYml.home.title}.com</h1>
        </Link>
        <Link to={'/blog'}>
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

const About = (props: { path: string }) => {
  const [loading, error] = useScript({ src: './log.js' })
    if (loading) return <h3>Loading Stripe API...</h3>
    if (error) return <h3>Failed to load Stripe API: {error.message}</h3>
  return (<span dangerouslySetInnerHTML={PostBody(about)} />)
}

const App = (props: {children: JSX.Element[], path: string}) => (
  <>
    <div id="app">
      <Header />
      {props.children}
      <Footer statement={copyrights} />
    </div>
  </>
)
const Index = () => (
    <Router>
      <App path="/">
        <Menu path="/blog" data={blog} />
        <About path="/about" />
        <Menu path="/games" data={games} />
      {contentYml.work.map((lm: post) => (
        <Post key={lm.id} path={`games/${lm.title.split(' ').join('-')}`} info={lm} />
      ))}
      {contentYml.post.map((lm: post) => (
        <Post key={lm.id} path={`blog/${lm.title.split(' ').join('-')}`} info={lm} />
      ))}
      </App>
  </Router>
)
  

reactDom.render(<Index />, document.getElementById('root'));
