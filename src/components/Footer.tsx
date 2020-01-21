import react from 'react'

const Footer = (props: {statement: string}) => <>
    <div id={"footer"}>
        <h6>{props.statement}</h6>
    </div>
</>

export default Footer;
