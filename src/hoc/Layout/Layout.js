import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = (prevState) => {
    this.setState({showSideDrawer: !prevState.showSideDrawer});
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  render() {
    return (<Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                 isAuth={this.props.isAuthenticated}/>
        <SideDrawer open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {isAuthenticated: state.auth.token !== null};
};
export default connect(mapStateToProps)(Layout);