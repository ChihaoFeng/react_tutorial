import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import {authCheckState} from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/logout' component={Logout}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
