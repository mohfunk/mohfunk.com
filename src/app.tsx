import React from "React";
import { Link, Router } from "@reach/router";
import content from "./content.yml";
import _ from "lodash";
import { post } from './types';

const Posts = () => (
  <div>
        {(content.post.map((lm: post) => <h3 id={lm.title} key={lm.id}>{lm.title}</h3>))}
  </div>
);
const Work = () => (
  <div>
    {content.work.map((lm: post) => (
      <h3 key={lm.id} id={lm.title.split(' ').join('-')}>{lm.title}</h3>
    ))}
  </div>
);
const Main = () => (
  <div>
    {content.main.map((lm: post) => (
      <h3 key={lm.id} id={lm.title}>
        {lm.title}
      </h3>
    ))}
  </div>
);
const app = () => (
    <>
        <div id="content">
            <div id={"header"}>
        <h1>{content.home.title}</h1>
        <h4>{content.home.sub}</h4>
      </div>
      <Main />
      <Work />
      <Posts/>
    </div>
  </>
);

export default app;