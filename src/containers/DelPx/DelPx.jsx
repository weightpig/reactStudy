import React, { Component } from "react";
import { connect } from "react-redux";
import LeftMenu from "../../components/LeftMenu/LeftMenu.jsx"

//国际化demo

class DelPx extends Component {
  render() {
    return (
      <LeftMenu
        children={
          <div>
            <span>px转rem</span>
          </div>
        }
        push={this.props.history.push}
        menuKey={"2"}  //defaultSelectedKeys 菜单选中
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
export default connect(mapStateToProps, mapDispatchToProps)(DelPx);