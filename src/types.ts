export type date = { year: number, month: number, day: number }
export type copyright = "C" | "NC" | "PD"
export type imginfo = { path: string, label: string, copyrights: copyright, source: string, url: string };
export type body = string[];
export type post = {id: number, title: string, date: date, imag: imginfo, body: body}