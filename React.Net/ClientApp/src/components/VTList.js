import React, { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next';


const Button = ({vtid}) => {
  const history = useHistory();
  return (
    <button onClick={()=>history.push(`/vt/${vtid}`)}>Detail</button>
  )
}

const detailFormater = (cell, row, rowIndex, formatExtraData)=>{
  return (
    <Button vtid = {row.vtid}/>
  );
}

export const VTList = () => {
  const [loading, setLoading] = useState(true)
  const [vts, setVts] = useState([])
  const { storeid } = useParams();
  useEffect(()=>{
    console.log(storeid)
    fetch(`api/sampledata/getvtlist?storeid=${storeid}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setVts(data);
      });
  },[])

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
    formatter: detailFormater
  }];

  let contents = loading
  ? <p><em>Loading...</em></p>
  : <BootstrapTable keyField='vtid' data={ vts } columns={ columns } />;

  return (
    <div>
      <h1>VT List</h1>
      {contents}
    </div>
  );
}
