import React, { Component } from 'react';
import { useHistory} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next';

const Button = ({storeid}) => {
  const history = useHistory();
  return (
    <button onClick={()=>history.push(`/store/${storeid}`)}>Detail</button>
  )
}

const detailFormater = (cell, row, rowIndex, formatExtraData)=>{
  return (
    <Button storeid = {row.storeID}/>
  );
}  

export class StoreList extends Component {

  constructor (props) {
    super(props);
    this.state = { stores: [], loading: true };
    this.columns = [{
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
      formatter: detailFormater
    }];
    this.timerId = 0;
  }

  refresh = ()=>{
    fetch('api/sampledata/getstorelist')
      .then(response => response.json())
      .then(data => {
        this.setState({ stores: data, loading: false });
      });
  }

  componentDidMount(){
    this.refresh();
    this.timerId = setInterval(() => this.refresh(), 10000);
  }

  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <BootstrapTable keyField='storeID' data={ this.state.stores } columns={ this.columns } />;

    return (
      <div>
        <h1>Store List</h1>
        {contents}
      </div>
    );
  }
}
