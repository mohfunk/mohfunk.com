import react, { useState } from 'react'
import { pageProps, postRef, date } from '../types'
import { Link } from '@reach/router'
import React from 'react'

const Date = (props: { date: date }) => (
  <>
    <div className={'InEntryDate'}>
      <h3>
        <span className={'year'}>{props.date.year}</span>.
        <span className={'month'}>{props.date.month}</span>.
        <span className={'day'}>{props.date.day}</span>
      </h3>
    </div>
  </>
)
const MenuEntry = (props: postRef) => (
  <>
    <div className={'MenuEntry'}>
      <Date date={props.date} />
      <h3 id={props.url} className={'title'}>
        <Link to={props.url}>{props.title}</Link>
      </h3>
    </div>
  </>
)
const PageButton = (props: {
  classn: string
  style: string
  click: any
  txt: string
  val: number
}) => (
  <>
    <button
      className={props.classn}
      id={props.style}
      onClick={(e: react.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        props.click(e, props.val)
      }
    >
      {props.txt}
    </button>
  </>
)
const Menu = (props: pageProps) => {
  const next = '→'
  const prev = '←'
  const transient = props.data
  const fixed = 3
  const lastElem = Number(Math.ceil(transient.length / fixed))
  const [current, setCurrent] = useState(1)
  const list: { id: number; include: postRef[] }[] = []
  let variable = 0
  let i = 1
  let j = 0
  if (fixed <= transient.length) {
    for (j = 0; j < Number(Math.ceil(transient.length / fixed)); j++) {
      list.push({ id: i, include: transient.slice(variable, variable + fixed) })
      i += 1
      variable += fixed
    }
  } else {
    list.push({ id: 1, include: transient.slice(variable, transient.length) })
  }

  const click = (
    e: react.MouseEvent<HTMLButtonElement, MouseEvent>,
    n: number
  ) => {
    e.preventDefault()
    if (n === -1) {
      if (current !== 1) setCurrent(current - 1)
    } else if (n === 0) {
      if (current !== lastElem) setCurrent(current + 1)
    } else {
      setCurrent(n)
    }
  }
  const curposts = list
    .filter(
      (currentData: { id: number; include: postRef[] }) =>
        currentData.id === current
    )
    .map((value: { id: number; include: postRef[] }) => value.include)
  return (
    <div className="pagination">
      <ul>
        {curposts.map(value =>
          value.map(data => <MenuEntry key={data.id} {...data} />)
        )}
      </ul>
      <div className="buttons">
        <PageButton
          val={-1}
          classn={'prev'}
          style={current !== 1 ? 'active' : 'passive'}
          click={click}
          txt={prev}
        />
        {list.map(({ id }) =>
          id !== undefined ? (
            <PageButton
              val={id}
              classn={id.toString()}
              style={current !== id ? 'active' : 'passive'}
              click={click}
              txt={id.toString()}
            />
          ) : null
        )}
        <PageButton
          val={0}
          classn={'next'}
          style={current !== lastElem ? 'active' : 'passive'}
          click={click}
          txt={next}
        />
      </div>
    </div>
  )
}

export default Menu
