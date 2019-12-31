import React, { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next';

const Button = ({vtid}) => {
  const history = useHistory();
  return (
    <button onClick={()=>{
      fetch(`api/sampledata/reset`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      });
    }
    }>Reset</button>
  )
}
const resetFormater = (cell, row, rowIndex, formatExtraData)=>{
  return (
    <Button vtid = {row.vtid}/>
  );
}

export const VTDetail = () => {
  const [loading, setLoading] = useState(true)
  const [vts, setVts] = useState([])
  const { vtid } = useParams();
  useEffect(()=>{
    console.log(vtid)
    fetch(`api/sampledata/getvt?vtid=${vtid}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setVts(data);
      });
  },[])

  const columns = [{
    dataField: 'index',
    text: 'Index',
    sort: true
  }, {
    dataField: 'game',
    text: 'Game',
    sort: true
  }, {
    dataField: 'action',
    text: 'Reset',
    formatter: resetFormater
  }];

  let contents = loading
  ? <p><em>Loading...</em></p>
  : <BootstrapTable keyField='index' data={ vts } columns={ columns } />;

  return (
    <div>
      <h1>VT Detail</h1>
      {contents}
    </div>
  );
}
