import React, { Component } from 'react';
import { Route } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';

const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
  return (
    <button onClick={()=>{console.log(row)}}>Detail</button>
  );
}

const columns = [{
  dataField: 'vtid',
  text: 'VT ID',
  sort: true
}, {
  dataField: 'cardNum',
  text: 'Card Number',
  sort: true
}, {
  dataField: 'ttl',
  text: 'TTL',
  sort: true
}, {
  dataField: 'action',
  text: 'Detail',
  formatter: rankFormatter
}];

export class VTList extends Component {

  constructor (props) {
    super(props);
    this.state = { vts: [], loading: true };
  }

  componentDidMount(){
    fetch('api/sampledata/getvt')
      .then(response => response.json())
      .then(data => {
        this.setState({ vts: data, loading: false });
      });
  } 


  
  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <BootstrapTable keyField='storeID' data={ this.state.vts } columns={ columns } />;

    return (
      <div>
        <h1>Store List</h1>
        {contents}
      </div>
    );
  }
}
