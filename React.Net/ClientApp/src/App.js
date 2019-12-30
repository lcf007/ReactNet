import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { StoreList } from './components/StoreList';
import { Counter } from './components/Counter';
import { VTList } from './components/VTList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={VTList} />
        <Route path='/progress' component={Counter} />
      </Layout>
    );
  }
}
