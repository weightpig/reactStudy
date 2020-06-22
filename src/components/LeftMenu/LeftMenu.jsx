import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from "antd";
import "./LeftMenu.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { changeStore } from "../../store/actions.js";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  menuClick = (href) => {
    this.props.push(href);
  };

  render() {
    console.log(this);
    const { menuKey } = this.props;
    return (
      <Layout className="mainDiv">
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
          <span onClick={window.changeLanguage}>切换语言</span>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[menuKey]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" title="reactdemo">
                <Menu.Item
                  key="1"
                  title="国际化Demo"
                  onClick={() => {
                    this.menuClick("home");
                  }}
                >
                  国际化Demo
                </Menu.Item>
                <Menu.Item
                  key="2"
                  title="自适应(px自动转rem)Demo"
                  onClick={() => {
                    this.menuClick("delpx");
                  }}
                >
                  自适应(px自动转rem)Demo
                </Menu.Item>
                {/* <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item> */}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    change: (parmares) => dispatch(changeStore(parmares)),
  };
};

// 导出 容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LeftMenu));
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LeftMenu);
