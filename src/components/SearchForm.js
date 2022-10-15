import React, { useState, useEffect } from 'react'
import './SearchForm.css'
import Modal from './Modal';
import ReactPaginate from 'react-paginate';

//search form
const SearchForm = () => {
    const [status, setStatus] = useState("");
    const [originalLaunch, setOriginalLaunch] = useState("");
    const [type, setType] = useState("");
    const [modal, setModal] = useState(false);
    const [capsuleItem, setCapsuleItem] = useState({});
    const [capsules, setCapsules] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(6);
    const [pages, setPages] = useState(0);
   
    const openModal = (capsuleItem) => {
        setModal(true);
        setCapsuleItem(capsuleItem);
    }
    const closeModal = () => {
        setModal(false);
    }
  const handlePageClick = (event) => {
        let page = event.selected;
        setPage(page);

    }
    // console.log(status,originalLaunch,type);
    useEffect(() => {
        fetch("https://api.spacexdata.com/v3/capsules").then(response =>
            response.json())
            .then((data) => {
                setCapsules(data);
               let pages = Math.ceil(data.length / perPage);
               setPages(pages);
            });
    },[]);
    let items = capsules.slice(page * perPage, (page + 1) * perPage);
     console.log(capsules);
    return (
      
        <React.Fragment>
            <h1 style={{ textAlign: 'center' }}>Search Form</h1>
            <input type="text" placeholder='status' onChange={(e) => { setStatus(e.target.value) }} />
            <input type="text" placeholder='original_launch' onChange={(e) => { setOriginalLaunch(e.target.value) }} />
            <input type="text" placeholder='type' onChange={(e) => { setType(e.target.value) }} />
            {capsules.length !== 0 ? <div className='divContainer'>
                {
                    items.map((value) => {
                        // return(<GridData  key={value.capsule_serial} Capsule={value}/>)
                        return (
                            <div className='childContainer' key={value.capsule_serial} onClick={() => openModal(value)}>
                                <p>Capsule Id - {value.capsule_id} </p>
                                <p>Capsule Serial - {value.capsule_serial} </p>
                                <p>Type - {value.type} </p>
                                <p>Original Launch - {value.original_launch}</p>
                                <p>Status - {value.status} </p>
                            </div>
                        );
                    })}
            </div> : ""}
            {
                modal === true ? <Modal capsuleItem={capsuleItem} closeModal={closeModal} /> : ""
            }
            <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                pageCount={pages}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </React.Fragment>

    )
}

export default SearchForm
