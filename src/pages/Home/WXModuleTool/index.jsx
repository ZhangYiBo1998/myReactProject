import { Button, Col, Input, Row, Tabs } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import "./bootstrap.min.css";
import "./index.css";

const { TextArea } = Input;

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
    changeTabsFuc = (tabs) => {
        this.setState({ tabs });
        this.getEncryptionUrlAsyn();
    }

    // 切换选项卡
    changeEncryptTabsFuc = (encryptTabs) => {
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
        let value = this.state.encryptionText;
        value = encodeURIComponent(value);
        this.setState({ encryptionText: value })
    }

    reEncryptionUrlFuc = (e) => {
        let value = this.state.reEncryptionUrl;

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
        let value = this.state.decryptUrl;

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
        let { paramArr, paramStr, module, appid, http, url, encryptionUrl, encryptionText, reEncryptionUrl, decryptUrl } = this.state;

        return (
            <div className="page">
                <div className='labelBox_inline'>
                    <label className="requiredIcon labelWidth">http链接</label>
                    <Input id="httpInput" value={http} placeholder="公众号复制的http链接，例：http://zyb.frp.ngarihealth.com/index.html" onChange={e => { this.setStateValueFuc(e, 'http') }} />
                </div>

                <div className='labelBox_inline'>
                    <label className="requiredIcon labelWidth">wxappid</label>
                    <Input id="wxappidInput" value={appid} placeholder="公众号的wxappid，例：wx5c087b6afce9cdb2" onChange={e => { this.setStateValueFuc(e, 'appid') }} />
                </div>

                <div className='labelBox_inline'>
                    <label className="labelWidth">module模块名</label>
                    <Input id="moduleInput" value={module} placeholder="外链进入的模块名，例：recordSearch" onChange={e => { this.setStateValueFuc(e, 'module') }} />
                </div>

                <div>
                    <Tabs defaultActiveKey={1} items={[
                        {
                            key: 1,
                            label: `字符串拼接入参`,
                            children: (
                                <div>
                                    <TextArea id="paramStrTextarea" rows={3} value={paramStr} placeholder="外链入参拼接的字符串，例：organId=1&organName=邵逸夫医院" onChange={e => { this.setStateValueFuc(e, 'paramStr') }} />
                                </div>
                            )
                        },
                        {
                            key: 2,
                            label: `选项输入`,
                            children: (
                                <div>
                                    {
                                        paramArr.map((item, index) => {
                                            return (
                                                <Row key={item.id} gutter="16">
                                                    <Col span={12} className="inline">
                                                        <label className="requiredIcon" style={{ marginRight: "8px" }}>key</label>
                                                        <Input id={`paramArr_key_${item.id}`} defaultValue={item.key} onChange={e => item.key = e.target.value} />
                                                    </Col>
                                                    <Col span={12} className="inline">
                                                        <label className="requiredIcon" style={{ marginRight: "8px" }}>value</label>
                                                        <Input id={`paramArr_value_${item.id}`} defaultValue={item.value} onChange={e => item.value = e.target.value} />
                                                        {index > 0 && (<Button className="col-sm-auto" onClick={(e) => { return this.reduce(e, item.id) }}>删除</Button>)}
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                    <br />
                                    <Button style={{ marginRight: 15 }} onClick={this.add}>新增</Button>
                                    <Button type="primary" style={{ marginRight: 15 }} onClick={this.save}>保存</Button>
                                    <label>该模式编译链接需要点击保存按钮</label>
                                </div>
                            )
                        },
                    ]} onChange={this.changeTabsFuc} />
                </div>
                <br />
                <Button danger onClick={this.clearData}>清空数据</Button>
                <div style={{ width: '100 %', height: 10 }} />

                <div>
                    <Tabs defaultActiveKey="1" items={[
                        {
                            key: 1,
                            label: `编码链接`,
                            children: (
                                <div>
                                    <div>
                                        <div style={{ margin: "10px 0" }}>
                                            <label>编码后链接：</label>
                                            <Button onClick={() => { this.copy(encryptionUrl) }}>复制</Button>
                                        </div>
                                        {/* <TextArea id="encryptionUrlTextarea" disabled rows={4} value={encryptionUrl} /> */}
                                        <div className="textareaStyle" id="encryptionUrlTextarea">{encryptionUrl}</div>
                                    </div>
                                    <div>
                                        <div style={{ margin: "10px 0" }}>
                                            <label>编码前链接：</label>
                                            <Button onClick={() => { this.copy(url) }}>复制</Button>
                                        </div>
                                        <div className="textareaStyle" id="urlTextarea" ref={c => { this.urlHtmlDom = c }}></div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: 2,
                            label: `重编码链接&解码链接`,
                            children: (
                                <div>
                                    <div>
                                        <div style={{ margin: "10px 0" }}>
                                            <label>编码链接：</label>
                                            <Button onClick={() => { this.encryptionTextFuc() }}>编码</Button>
                                        </div>
                                        <TextArea id="encryptionTextarea" rows={5} value={encryptionText} placeholder="输入需要编码的链接"
                                            onChange={e => { this.setStateValueFuc(e, 'encryptionText') }} />
                                    </div>
                                    <div>
                                        <div style={{ margin: "10px 0" }}>
                                            <label>重编码链接：</label>
                                            <Button onClick={() => { this.reEncryptionUrlFuc() }}>重编码</Button>
                                        </div>
                                        <TextArea id="reEncryptionTextarea" rows={5} value={reEncryptionUrl} placeholder="输入需要重编码的链接"
                                            onChange={e => { this.setStateValueFuc(e, 'reEncryptionUrl') }} />
                                    </div>
                                    <div>
                                        <div style={{ margin: "10px 0" }}>
                                            <label>解码链接：</label>
                                            <Button onClick={() => { this.decryptUrlFuc() }}>解码</Button>
                                        </div>
                                        <TextArea id="decryptTextarea" rows={5} value={decryptUrl} placeholder="输入需要解码的链接"
                                            onChange={e => { this.setStateValueFuc(e, 'decryptUrl') }} />
                                    </div>
                                </div>
                            )
                        },
                    ]} onChange={this.changeEncryptTabsFuc} />
                </div>
            </div >
        )
    }
}
