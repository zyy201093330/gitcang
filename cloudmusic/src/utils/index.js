//格式化时间
export function formaTim(time){
    let hour = parseInt(time/3600),
    min = parseInt(time%3600/60)+'',
    sec = parseInt(time%60)+''
    return min.padStart(2,'0')+':'+sec.padStart(2,'0')
    console.log(hour,min,sec)
}