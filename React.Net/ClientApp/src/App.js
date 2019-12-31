import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './components/Layout';
import { StoreList } from './components/StoreList';
import { Counter } from './components/Counter';
import { VTList } from './components/VTList';
import { VTDetail } from './components/VTDetail';

export default class App extends Component {
  static displayName = App.name;


  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={StoreList} />
          <Route path='/store/:storeid' component={VTList} />
          <Route path='/vt/:vtid' component={VTDetail} />
          <Route path='/progress' component={Counter} />
        </Switch>
      </Layout>
    );
  }
}
