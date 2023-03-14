import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./bootstrap.min.css";
import "./index.css";

export default class WXModuleTool extends Component {

    state = {
        // 公众号复制的http链接
        http: 'http://zyb.frp.ngarihealth.com/index.html',
        // 公众号的wxappid
        appid: 'wx5c087b6afce9cdb2',
        // 外链进入的模块名
        module: '',
        // 外链入参拼接选项卡
        tabs: 1,
        // 外链入参拼接的字符串
        paramStr: '',
        // 外链入参拼接的字符串项
        paramArr: [
            {
                id: 1,
                key: '',
                value: '',
            }
        ],
        url: "",
        encryptionUrl: "",
        urlHtml: "",
        encryptTabs: 1,
        encryptionText: "",
        reEncryptionUrl: "",
        decryptUrl: ""
    }

    death = () => {
        //卸载组件
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    //组件挂完毕
    componentDidMount() {
        console.log('componentDidMount');
        this.getEncryptionUrlAsyn();
    }

    //组件将要卸载
    componentWillUnmount() {

    }

    // 新增选项
    add = (e) => {
        let paramArr = this.state.paramArr;

        paramArr.push({
            id: paramArr[paramArr.length - 1].id + 1,
            key: '',
            value: '',
        });
        this.setState({ paramArr });
    }

    // 删除对应的选项
    reduce = (e, id) => {
        let paramArr = this.state.paramArr;

        paramArr = paramArr.filter(function (item, i) {
            return item.id !== id;
        })
        this.setState({ paramArr });
    }

    // 保存填写的外链参数
    save = () => {
        this.setState({ ...this.state })
        this.getEncryptionUrlAsyn();

    }

    // 复制链接
    copy = (url = "") => {
        const clipboardObj = navigator.clipboard;
        clipboardObj.writeText(url);
        this.showMsg();
    }

    showMsg = (type = 'toast', css = 'success') => {
        const cssObj = {
            primary: 'alert-primary',
            secondary: 'alert-secondary',
            success: 'alert-success',
            danger: 'alert-danger',
            warning: 'alert-warning',
            info: 'alert-info',
            dark: 'alert-dark',
        }
        if (type === 'toast') {
            let div = document.createElement('div');
            let body = document.getElementsByTagName('body')[0];
            let toast = `
                <div class="topToast alert ${cssObj[css]}" role="toast">
                    复制成功
                </div>
            `

            div.innerHTML = toast;
            body.appendChild(div);
            setTimeout(() => {
                body.removeChild(div)
            }, 2000)
        }
    }

    // 切换选项卡
    changeTabsFuc = (e, tabs) => {
        this.setState({ tabs });
        this.getEncryptionUrlAsyn();
    }

    // 切换选项卡
    changeEncryptTabsFuc = (e, encryptTabs) => {
        this.setState({ encryptTabs });
        this.getEncryptionUrlAsyn();
    }

    // 保存对应的state字段
    setStateValueFuc = (e, key) => {
        let value = e.target.value || '';
        let paramStr = this.state.paramStr;

        if (key === 'http') {
            paramStr = value.split('?')[1] || this.state.paramStr;
            value = value.split('?')[0] || '';
        }

        this.setState({ paramStr, [key]: value });
        this.getEncryptionUrlAsyn();
    }

    getEncryptionUrlAsyn = () => {
        setTimeout(() => {
            this.getEncryptionUrl();
        }, 0)
    }

    // 拼接参数，并编译链接
    getEncryptionUrl = () => {
        let { paramArr, paramStr, module, appid, http, tabs, url, encryptionUrl, urlHtml } = this.state;

        if (tabs === 1 && paramStr) {
            paramStr.charAt(paramStr.length - 1) !== '&' && (paramStr = paramStr + '&');
        }

        if (tabs === 2) {
            paramStr = '';
            paramArr.forEach(function (item) {
                if (item.key && item.value) {
                    paramStr = `${paramStr}${item.key}=${item.value}&`;
                }
            })
        }

        if (http && !appid) {
            let index = http.indexOf('/index.html');
            let appidStr = http.slice(index - 18, index);
            if (appidStr.slice(0, 2) === 'wx') {
                appid = appidStr;
            };
        }

        let httpStr = `${http}?${module ? `module=${module}&` : ''}${paramStr}wxappid=${appid}`;
        url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${httpStr}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`

        let httpStrHtml = `<span>${http}</span>?${module ? `module=<span>${module}</span>&` : ''}<span>${paramStr}</span>wxappid=<span>${appid}</span>`;
        urlHtml = `<div>https://open.weixin.qq.com/connect/oauth2/authorize?appid=<span>${appid}</span>&redirect_uri=${httpStrHtml}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect</div>`
        this.urlHtmlDom && (this.urlHtmlDom.innerHTML = urlHtml);


        // url编码
        let encryptionStr = encodeURIComponent(httpStr);
        encryptionUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encryptionStr}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`

        this.setState({ url, encryptionUrl, urlHtml, appid })
        // return { url, encryptionUrl, urlHtml }
    }

    encryptionTextFuc = (e) => {
        let value = this.encryptionTextDom.value;
        value = encodeURIComponent(value);
        this.setState({ encryptionText: value })
    }

    reEncryptionUrlFuc = (e) => {
        let value = this.reEncryptionStrDom.value;

        if (value.substring(5, 8) === "%3A" || value.substring(4, 7) === "%3A") {
            // 所以全部被编码了
            value = decodeURIComponent(value);
        }

        let redirect_uriArr = value.split("redirect_uri=");
        let response_typeArr = redirect_uriArr[1].split("response_type=");
        let url = response_typeArr[0];

        if (url.substring(5, 8) === "%3A" || url.substring(4, 7) === "%3A") {
            this.setState({ reEncryptionUrl: `${redirect_uriArr[0]}redirect_uri=${url}response_type=${response_typeArr[1]}` })
        } else {
            this.setState({ reEncryptionUrl: `${redirect_uriArr[0]}redirect_uri=${encodeURIComponent(url)}response_type=${response_typeArr[1]}` })
        }
    }

    decryptUrlFuc = (e) => {
        let value = this.decryptStrDom.value;

        if (value.substring(5, 8) === "%3A" || value.substring(4, 7) === "%3A") {
            // 所以全部被编码了
            value = decodeURIComponent(value);
            this.setState({ decryptUrl: value })
            return;
        }


        let redirect_uriArr = value.split("redirect_uri=");
        let response_typeArr = redirect_uriArr[1].split("response_type=");
        let url = response_typeArr[0];
        this.setState({ decryptUrl: `${redirect_uriArr[0]}redirect_uri=${decodeURIComponent(url)}response_type=${response_typeArr[1]}` })
    }

    clearData = () => {
        let state = {
            // 公众号复制的http链接
            http: '',
            // 公众号的wxappid
            appid: '',
            // 外链进入的模块名
            module: '',
            // 外链入参拼接选项卡
            tabs: 1,
            // 外链入参拼接的字符串
            paramStr: '',
            // 外链入参拼接的字符串项
            paramArr: [
                {
                    id: 1,
                    key: '',
                    value: '',
                }
            ],
            url: "",
            encryptionUrl: "",
            urlHtml: "",
            encryptTabs: 1,
            encryptionText: "",
            reEncryptionUrl: "",
            decryptUrl: ""
        }
        this.setState({ ...state });
        this.urlHtmlDom && (this.urlHtmlDom.innerHTML = '');
    }

    //初始化渲染、状态更新之后
    render() {
        let { paramArr, paramStr, module, appid, http, tabs, url, encryptionUrl, encryptTabs, encryptionText, reEncryptionUrl, decryptUrl } = this.state;

        return (
            <div className="page">
                <div className="mb-3 row">
                    <label htmlFor="httpInput" className="requiredIcon labelWidth col-form-label">http链接</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="httpInput" value={http} placeholder="公众号复制的http链接，例：http://zyb.frp.ngarihealth.com/index.html" onChange={e => { this.setStateValueFuc(e, 'http') }} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="wxappidInput" className="requiredIcon labelWidth col-form-label">wxappid</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="wxappidInput" value={appid} placeholder="公众号的wxappid，例：wx5c087b6afce9cdb2" onChange={e => { this.setStateValueFuc(e, 'appid') }} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="moduleInput" className="labelWidth col-form-label">module模块名</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="moduleInput" value={module} placeholder="外链进入的模块名，例：recordSearch" onChange={e => { this.setStateValueFuc(e, 'module') }} />
                    </div>
                </div>

                <div className="mb-3">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={tabs === 1 ? 'nav-link active' : 'nav-link'} href="#" onClick={e => { this.changeTabsFuc(e, 1) }}>字符串拼接入参</a>
                        </li>
                        <li className="nav-item">
                            <a className={tabs === 2 ? 'nav-link active' : 'nav-link'} href="#" onClick={e => { this.changeTabsFuc(e, 2) }}>选项输入</a>
                        </li>
                    </ul>
                    <br />
                    {
                        // 切换选项卡
                        tabs === 1 ? (
                            <div>
                                <label htmlFor="paramStrTextarea" className="form-label">参数拼接</label>
                                <textarea className="form-control" id="paramStrTextarea" rows={3} value={paramStr} placeholder="外链入参拼接的字符串，例：organId=1&organName=邵逸夫医院" onChange={e => { this.setStateValueFuc(e, 'paramStr') }} />
                            </div>
                        ) : (
                            <div>
                                {
                                    paramArr.map((item, index) => {
                                        return (
                                            <div key={item.id} className="mb-3 row">
                                                <label htmlFor={`paramArr_key_${item.id}`} className="requiredIcon col-sm-auto col-form-label">key</label>
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" id={`paramArr_key_${item.id}`} defaultValue={item.key} onChange={e => item.key = e.target.value} />
                                                </div>
                                                <label htmlFor={`paramArr_value_${item.id}`} className="requiredIcon col-sm-auto col-form-label">value</label>
                                                <div className="col-sm-4">
                                                    <input type="text" className="form-control" id={`paramArr_value_${item.id}`} defaultValue={item.value} onChange={e => item.value = e.target.value} />
                                                </div>
                                                {index > 0 && (<button type="button" className="col-sm-auto btn btn-outline-primary" onClick={(e) => { return this.reduce(e, item.id) }}>删除</button>)}
                                            </div>
                                        )
                                    })
                                }
                                <button type="button" className="btn btn-outline-primary" style={{ marginRight: 15 }} onClick={this.add}>新增</button>
                                <button type="button" className="btn btn-primary" style={{ marginRight: 15 }} onClick={this.save}>保存</button>
                                <label htmlFor="exampleFormControlInput1" className="col-sm-auto col-form-label">该模式编译链接需要点击保存按钮</label>
                            </div>
                        )
                    }
                </div>

                <button type="button" className="btn btn-outline-danger" onClick={this.clearData}>清空数据</button>
                <div style={{ width: '100 %', height: 10 }} />

                <div className="mb-3">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={encryptTabs === 1 ? 'nav-link active' : 'nav-link'} href="#" onClick={e => { this.changeEncryptTabsFuc(e, 1) }}>编码链接</a>
                        </li>
                        <li className="nav-item">
                            <a className={encryptTabs === 2 ? 'nav-link active' : 'nav-link'} href="#" onClick={e => { this.changeEncryptTabsFuc(e, 2) }}>重编码链接&解码链接</a>
                        </li>
                    </ul>
                    <br />
                    {
                        encryptTabs === 1 ? (
                            <div>

                                <div className="mb-3">
                                    <label htmlFor="encryptionUrlTextarea" className="form-label">编码后链接：</label>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.copy(encryptionUrl) }}>复制</button>
                                    <textarea className="form-control" id="encryptionUrlTextarea" disabled rows={3} value={encryptionUrl} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="urlTextarea" className="form-label">编码前链接：</label>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.copy(url) }}>复制</button>
                                    <div className="textareaStyle" id="urlTextarea" ref={c => { this.urlHtmlDom = c }}></div>
                                </div></div>
                        ) : (
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="encryptionTextarea" className="form-label">编码链接：</label>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.encryptionTextFuc(url) }}>编码</button>
                                    <textarea className="form-control" id="encryptionTextarea" rows={5} value={encryptionText} placeholder="输入需要编码的链接"
                                        ref={c => { this.encryptionTextDom = c }} onChange={e => { this.setStateValueFuc(e, 'encryptionText') }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reEncryptionTextarea" className="form-label">重编码链接：</label>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.reEncryptionUrlFuc(url) }}>重编码</button>
                                    <textarea className="form-control" id="reEncryptionTextarea" rows={5} value={reEncryptionUrl} placeholder="输入需要重编码的链接"
                                        ref={c => { this.reEncryptionStrDom = c }} onChange={e => { this.setStateValueFuc(e, 'reEncryptionUrl') }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="decryptTextarea" className="form-label">解码链接：</label>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { this.decryptUrlFuc(url) }}>解码</button>
                                    <textarea className="form-control" id="decryptTextarea" rows={5} value={decryptUrl} placeholder="输入需要解码的链接"
                                        ref={c => { this.decryptStrDom = c }} onChange={e => { this.setStateValueFuc(e, 'decryptUrl') }} />
                                </div>
                            </div>
                        )
                    }

                </div>


            </div >
        )
    }
}
