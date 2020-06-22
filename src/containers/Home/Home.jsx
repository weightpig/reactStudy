import React, { Component } from "react";
import { connect } from "react-redux";
import LeftMenu from "../../components/LeftMenu/LeftMenu.jsx";
import { FormattedMessage, injectIntl } from "react-intl";

//国际化demo


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LeftMenu
        children={
          <div>
            <span>首页</span>
            <FormattedMessage id="language" />
            <div>{this.props.intl.formatMessage({id:"language"})}</div>
          </div>
        }
        push={this.props.history.push}
        menuKey={"1"}  //defaultSelectedKeys 菜单选中
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    change: parmares => dispatch(changeStore(parmares))
  };
};

// 导出 容器组件
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
