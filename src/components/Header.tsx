import react from 'react'
import { post, date, imginfo, copyright } from '../types'
import { Redirect } from '@reach/router'
import { CC, C0, NC, C } from '../svg/cc'
import '../assets/style/scss/Post.scss'
import { Info, Game, Blog } from '../svg/icons'


const Header = () => (
  <>
    <div id={'header'}>
      <Blog />
      <Info />
      <Game />
    </div>
  </>
)


export default Header;
