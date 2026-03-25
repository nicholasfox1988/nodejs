function dateFormat(dateStr){
    const dt= new Date(dateStr);

    const y= dt.getFullYear();
    const m= dt.getMonth()+1;
    const d= dt.getDate();

    const hh= dt.getHours();
    const mm= dt.getMinutes();
    const ss= dt.getSeconds();

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

function padZero(n){
    return n>9 ? n : '0'+n;
}

function htmlEscape(htmlstr){
    return htmlstr.replace(/<|>|"|&/g,(match)=>{
        switch(match){
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '&':
                return '&amp;'
        }
    })
}

module.exports= {
    dateFormat,
    htmlEscape
}