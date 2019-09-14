import React from "react";
import { connect } from 'react-redux';
import MaterialTable from 'material-table'


const ClientContent = props => {

  return (
    <div style={{ maxWidth: '100%', margin: 3 }}>
      {props.clients && <MaterialTable
        columns={[
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name' },
          { title: 'Email', field: 'email' },
          { title: 'Phone Number', field: 'phone' }
        ]}
        data={props.clients}
        title="Clients list"
      />}
    </div>
  );
};


const mapStateToProps = function (state) {
  return {
    clients: state.clients
  }
}

export default connect(mapStateToProps)(ClientContent);