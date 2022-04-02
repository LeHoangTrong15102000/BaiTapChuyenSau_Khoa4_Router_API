import React, { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
// Xài bootstrap để tạo ra Popup

const ModalPopup = (props) => {

    let Component = useSelector(state => state.ModalReducer.Component)


    // Nguyên cả code trong câu lệnh return được gọi là Higher Order Component
  return (
    <div>
      
      {/* Modal */}
      <div
        className="modal fade"
        id="modelId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Form</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
                {Component}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
