import React, { useState, useEffect } from 'react'
import './SearchForm.css'
import Modal from './Modal';
import ReactPaginate from 'react-paginate';

//search form
const SearchForm = () => {
    const [status, setStatus] = useState("");
    const [capsuleSerial, setcapsuleSerial] = useState("");
    const [type, setType] = useState("");
    const [modal, setModal] = useState(false);
    const [capsuleItem, setCapsuleItem] = useState({});
    const [capsules, setCapsules] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [searchCapsules,setSearchCapsules]= useState([]);
    var perPage=6;

    // function to open modal
    const openModal = (capsuleItem) => {
        setModal(true);
        setCapsuleItem(capsuleItem);
    }

    // function to close modal
    const closeModal = () => {
        setModal(false);
    }

    //function to handle pagenation click
  const handlePageClick = (event) => {
     let page = event.selected;
     setPage(page);
    }

    // on seach button click event
  const onClickEvent = (event) =>{
   
    let items;
   
    if(status === "" && capsuleSerial === "" && type === "" )
    {
        items=searchCapsules;
        setCapsules(searchCapsules);
    }
    else if(capsuleSerial !== "" )
    {
         items=searchCapsules.filter((item)=>item.capsule_serial.includes(capsuleSerial));
        if(type !== null)
        {
            items=items !== []?items.filter((item)=>item.type.includes(type)):[];
        }
        else if(status !== null)
        {
            items=items !== []?items.filter((item)=>item.status.includes(status)):[];
        }
        setCapsules(items);
    }
    else if(status !== null )
    {
         items=searchCapsules.filter((item)=>item.status.includes(status));
        if(type !== null)
        {
            items=items !== []?items.filter((item)=>item.type.includes(type)):[];
        }
        else if(capsuleSerial != null)
        {
            items=items !== []?items.filter((item)=>item.capsule_serial.includes(capsuleSerial)):[];
        }
        setCapsules(items);
    }
    else if(type !== null )
    {
         items=searchCapsules.filter((item)=>item.type.includes(type));
        if(status !== null)
        {
            items= items !== []?items.filter((item)=>item.status.includes(status)):[];
        }
        else if(capsuleSerial !== null)
        {
            items=items !== []?items.filter((item)=>item.capsule_serial.includes(capsuleSerial)):[];
        }
        setCapsules(items);
    }
   
    let pages = Math.ceil(items.length / perPage);
    setPages(pages);
    
    if(page!==0)
    {
        document.getElementsByClassName("pagination")[0].childNodes[page+1].className = "";
        document.getElementsByClassName("pagination")[0].childNodes[1].className = "";
    }
    if(pages === 1)
    {
        document.getElementsByClassName("pagination")[0].childNodes[0].className ="previous disabled";
        document.getElementsByClassName("pagination")[0].childNodes[2].className ="next disabled";
    }
    else if(pages > 1)
    {
        document.getElementsByClassName("pagination")[0].childNodes[0].className ="previous disabled";
    }
   setPage(0);
   if(page === 0)
   {
    document.getElementsByClassName("pagination")[0].childNodes[1].className = "active";
   }
}

// hook to implement component did mount
    useEffect(() => {
        fetch("https://api.spacexdata.com/v3/capsules").then(response =>
            response.json())
            .then((data) => {
                setCapsules(data);
                setSearchCapsules(data);
               let pages = Math.ceil(data.length / perPage);
               setPages(pages);
            });
    },[]);
    let items = capsules.slice(page * perPage, (page + 1) * perPage);
  
    return (
      
        <React.Fragment>
            <h1 style={{ textAlign: 'center' }}>Search Form</h1>
            <span style={{ padding: '20px' }}>Search filters :</span>
            <input type="text" placeholder='Status' onChange={(e) => { setStatus(e.target.value) }} />
            <input type="text" placeholder='Capsule Serial' onChange={(e) => { setcapsuleSerial(e.target.value) }} />
            <input type="text" placeholder='Type' onChange={(e) => { setType(e.target.value) }} />
            <button className='button' onClick={onClickEvent}>Search</button>
            {capsules.length !== 0 ? <div className='divContainer'>
                {
                    items.map((value) => {
                        // display capsule items as grid
                        return (
                            <div className='childContainer' key={value.capsule_serial} onClick={() => openModal(value)}>
                                <table>
                                <tbody>
                                <tr>
                                    <td>
                                    Capsule Id 
                                    </td>
                                    <td>
                                    {value.capsule_id}   
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    Capsule Serial
                                    </td>
                                    <td>
                                    {value.capsule_serial}    
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    Type
                                    </td>
                                    <td>
                                    {value.type}  
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    Landings
                                    </td>
                                    <td>
                                    {value.landings}   
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    Status
                                    </td>
                                    <td>
                                    {value.status}   
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                            </div>
                        );
                    })}
            </div> : ""}
            {
                modal === true ? <Modal capsuleItem={capsuleItem} closeModal={closeModal} /> : ""
            }
            {capsules.length !== 0 ?
            <ReactPaginate
               previousLabel={'prev'}
                nextLabel={'next'}
                pageCount={pages}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />:<p style={{color:"red",padding: '20px',textAlign:"center"}}>No results found</p>}
        </React.Fragment>

    )
}

export default SearchForm
