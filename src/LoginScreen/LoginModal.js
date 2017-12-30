import React from 'react';

let LoginModal = (props) => (
  <div>
    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Sign In</button>
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Sign In</h4>
          </div>
          <div className="modal-body">
            <div id="firebaseui-auth-container"></div>
            <div id="account-details"></div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default LoginModal;