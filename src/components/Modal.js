import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = (props) => ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={()=>props.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <p>Capsule Id - {props.capsuleItem.capsule_id} </p>
                <p>Capsule Serial - {props.capsuleItem.capsule_serial} </p>
                <p>Type - {props.capsuleItem.type} </p>
                <p>Original Launch - {props.capsuleItem.original_launch}</p>
                <p>Status - {props.capsuleItem.status} </p>
                <p>Details - {props.capsuleItem.details} </p>
                <p>Landings - {props.capsuleItem.landing} </p>
                <p>Original Launch Unix - {props.capsuleItem.original_launch_unix} </p>
                <p>Missions</p>
                {props.capsuleItem.missions.length !== 0? props.capsuleItem.missions.map((value)=>{ 
                    return(<p key={value.name}>Name -{value.name}   flight - {value.flight}</p>)
                }):""}
                <p>Reuse Count - {props.capsuleItem.reuse_count} </p>
            </div>
        </div>
    </React.Fragment>, document.getElementById('modalRoot')
)

export default Modal