import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

//modal popup tp display capsule details
const Modal = (props) => ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => props.closeModal()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <h1 style={{textAlign:'center'}}>Capsule Details</h1>
                <table style={{backgroundColor:"lightgreen"}}>
                    <tbody>
                        <tr>
                            <td>
                                Capsule Id
                            </td>
                            <td>
                                {props.capsuleItem.capsule_id}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Capsule Serial
                            </td>
                            <td>
                                {props.capsuleItem.capsule_serial}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Type
                            </td>
                            <td>
                                {props.capsuleItem.type}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Original Launch
                            </td>
                            <td>
                                {props.capsuleItem.original_launch}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Status
                            </td>
                            <td>
                                {props.capsuleItem.status}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Details
                            </td>
                            <td>
                                {props.capsuleItem.details}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Landings
                            </td>
                            <td>
                                {props.capsuleItem.landings}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Original Launch Unix
                            </td>
                            <td>
                                {props.capsuleItem.original_launch_unix}
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={props.capsuleItem.missions.length !== 0 ? props.capsuleItem.missions.length+1:2}>
                                Missions
                            </td>
                        </tr>
                            {props.capsuleItem.missions.length !== 0 ? props.capsuleItem.missions.map((value) => {
                                return (<tr><td key={value.name}>Name - {value.name}<br/>flight - {value.flight}</td></tr>)
                            }) : <tr><td>-</td></tr>}


                        
                        <tr>
                            <td>
                                Reuse Count
                            </td>
                            <td>
                                {props.capsuleItem.reuse_count}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>, document.getElementById('modalRoot')
)

export default Modal