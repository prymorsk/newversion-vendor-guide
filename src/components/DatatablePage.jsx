import React from 'react';
import { MDBDataTable } from 'mdbreact';
import "@/components/datatables.scss";

const DatatablePage = (props) => {


  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={props.data}
    />
  );
}

export default DatatablePage;