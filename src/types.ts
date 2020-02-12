export type date = { year: number, month: number, day: number }
export type copyright = "C" | "NC" | "C0" | "CC"
export type imginfo = { path: string, label: string, copyrights: copyright, source: string, url: string };
export type body = string[];
export type ppost = {id: number, title: string, date: date, imag: imginfo, body: body}
export type pageProps = { path: string, data: postRef[] }
export type postRef = { id: number; title: string; url: string; date: date }
export type content = { refs: postRef[], data: post[] }
export type post = { id: number, title: string, url: string, date: date, imag: imginfo, body: body }

const x: string = 'x';
const ob: {x: string} = { x: x }; // bad
const bj: { x: string } = { x }; // good
