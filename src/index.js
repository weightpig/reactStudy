import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import Reducer from "./store/reducer.js";
import Home from "./containers/Home/Home.jsx";
import DelPx from "./containers/DelPx/DelPx.jsx";

//国际化引入开始
import { addLocaleData,IntlProvider } from 'react-intl'; 
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import en_US from './assets/i18n/en_us.js';  //自己创建的英文文件
import zh_CN from './assets/i18n/zh_ch.js';  //自己创建的中文文件
addLocaleData([...en,...zh])
//国际化引入结束

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language:"zh"
    };
  }

  changeLanguage=()=>{  //语言切换
    const {language}=this.state;
    let setLang="zh";
    if(language=="zh"){
      setLang="en"
    }
    this.setState({
      language:setLang
    })
  }

  render() {
    const myReducer = persistReducer(
      {
        key: "root",
        storage
      },
      Reducer
    );
    const store = createStore(myReducer);
    const persistor = persistStore(store);

    //语言包
    let messages=en_US;
    const {language}=this.state;
    if(language=="zh"){
      messages=zh_CN;
    }
    window.changeLanguage=this.changeLanguage;

    return (
      /*IntlProvider加载默认语言和语言包*/
      <IntlProvider locale={language} messages={messages} >  
        <Provider store={store} >
          <PersistGate persistor={persistor}>
            <Router >
              <div className="routerDiv">
                <Route path="/home" component={Home} />
                <Route path="/delpx" component={DelPx} />
                <Route path="/*">
                  <Redirect
                    to={{
                      pathname: "/home",
                    }}
                  />
                </Route>
              </div>
            </Router>
          </PersistGate>
        </Provider>
      </IntlProvider>
    );
  }
}

export default App;

ReactDom.render(<App />, document.getElementById("root"));
