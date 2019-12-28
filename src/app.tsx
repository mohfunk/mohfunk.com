import React from "react";
import { Link, Router } from "@reach/router";
import content from "./content.yml";
import _ from "lodash";
import { post } from "./types";
import Post from "./components/post";
import { Info, Game, Blog, Contact, Twitter, GitHub, Doc } from './svg/icons';

const Posts = () => (
  <div>
    {content.post.map((lm: post) => (
      <h3 id={lm.title} key={lm.id}>
        {lm.title}
      </h3>
    ))}
  </div>
);
const Work = () => (<div>
    {content.work.map((lm: post) => (
      <h3 key={lm.id} id={lm.title.split(" ").join("-")}>
        {lm.title}
      </h3>
    ))}
  </div>);

const app = () => (
  <>
    <div id="app">
      <div id={'header'}>
        <Blog />
        <Info />
        <Game />
      </div>
      <div id="content">
        <Post info={content.post[0]} />
      </div>
      <div id="footer">
        <h6>{content.home.copyrights}</h6>
      </div>
    </div>
  </>
)

export default app;
