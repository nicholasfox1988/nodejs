const itheima= require('./my-package');

const dtStr= itheima.dateFormat(new Date());

console.log(dtStr);

const htmlStr= '<h1 title="abc">hello!<span>123&nbsp;</span></h1>';
const str= itheima.htmlEscape(htmlStr);

console.log(str);