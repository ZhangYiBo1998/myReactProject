//存Cookie
export const saveCookie = (array, objHours = 0) => {
    for (const obj of array) {
        const {
            objKey,
            objValue
        } = obj;
        let str = `${objKey}=${JSON.stringify(objValue)}`; //编码
        if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
            let date = new Date();
            let ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    }

}

//读Cookie
export const getCookie = (objKey) => { //获取指定名称的cookie的值
    let arrStr = document.cookie.split("; ");
    for (let str of arrStr) {
        let temp = str.split("=");
        if (temp[0] === objKey) return JSON.parse(temp[1]); //解码
    }
    return "";
}