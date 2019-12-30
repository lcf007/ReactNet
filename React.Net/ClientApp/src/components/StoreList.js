import React, { Component } from 'react';
import { Route } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import { VTList } from './VTList';

const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
  return (
    <button onClick={VTList}>Detail</button>
  );
}

const columns = [{
  dataField: 'storeID',
  text: 'Store ID',
  sort: true
}, {
  dataField: 'activeVTs',
  text: 'Active VTs',
  sort: true
}, {
  dataField: 'allocatedVTs',
  text: 'Allocated VTs',
  sort: true
}, {
  dataField: 'action',
  text: 'Detail',
  formatter: rankFormatter
}];

export class StoreList extends Component {

  constructor (props) {
    super(props);
    this.state = { stores: [], loading: true };
  }

  componentDidMount(){
    fetch('api/sampledata/getstore')
      .then(response => response.json())
      .then(data => {
        this.setState({ stores: data, loading: false });
      });
  } 


  
  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <BootstrapTable keyField='storeID' data={ this.state.stores } columns={ columns } />;

    return (
      <div>
        <h1>Store List</h1>
        {contents}
        <Route path={`/store/:storeId`} component={VTList}/>
      </div>
    );
  }
}
