import React from 'react'
import { post, date, imginfo, copyright } from '../types'
import { Redirect } from "@reach/router";
import { CC, C0, NC, C } from '../svg/cc';
import parse from "../lib/mdp";
import "../assets/style/scss/Post.scss";

const Date = (props: { date: date }) =>
  (<>
    <div className={'InPostDate'}>
      <h6>
        <span className={'year'}>{props.date.year}</span>.
        <span className={'month'}>{props.date.month}</span>.
        <span className={'day'}>{props.date.day}</span>
      </h6>
    </div>
  </>)

const PostHeader = (props: {title: string, date: date}) =>
    (<>
        <div className={"PostHeader"}>
            <h1>{props.title} </h1>
            <Date date={props.date}/>
        </div>
    </>)

const ImgCR = (props: { cp: copyright }) => {
    switch (props.cp) {
        case "C" : return (<C />)
        case "C0": return (<C0/>)
        case "CC": return (<CC/>)
        default  : return (<NC/>)
    }
}

const imgref = (p: string): {__html: string} => ({__html: `<img src="${p}"/>`});
const lnkref = (label: string, link: string): { __html: string } => ({ __html: `<a href="${link}">${label}</a>` });

const PostImage = (props: { imgInfo: imginfo }) => (
  <>
    <div className={'PostImage'}>
      <span dangerouslySetInnerHTML={imgref(props.imgInfo.path)} />
      <div className={'ImgLabel'}>
        <h6>{props.imgInfo.label}</h6>
        <a href={props.imgInfo.url}>
          <ImgCR cp={props.imgInfo.copyrights}></ImgCR>
        </a>
      </div>
    </div>
  </>
)

const PostBody = (md: string): { __html: string } => ({ __html: parse(md) });


const Post = (props: { info: post }) =>
  (<>
        <div className={'Post'}>
            <PostHeader title={props.info.title} date={props.info.date} />
            <PostImage imgInfo={props.info.imag} />
            <span dangerouslySetInnerHTML={PostBody(props.info.body.join('\n'))}/>
        </div>
  </>)

export default Post;
