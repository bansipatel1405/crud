import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const[column,setcolumn] = useState([])
    const[data,setdata] = useState([])
    const nevigate = useNavigate()

    function getData(){
        axios.get("http://localhost:3000/details")
        .then((res)=>{
            setcolumn(Object.keys(res.data[0]))
            setdata(res.data)
        })
        .catch(error =>console.log("error"))
    }

    useEffect(()=>{
        getData()
    },[])

    const handledelete =(id) =>{
        // const con = window.confirm("are u sure delete")
        // if(con){
            // axios.delete(`http://localhost:3000/details/${id}`)
            axios.delete("http://localhost:3000/details/" + id)
            .then((res)=>{
                console.log(res);
                alert("delete")
                nevigate("/")
            }).catch(err=> console.log("erroer"))
    //     }
    }
  return (
    <div>
        <div className="text-end me-5">
        <Link to='create'><button className="button btn-info mt-5"> add+</button></Link>
        </div>
        <div className="container mt-5">
            <table className="table">
                <thead>
                   <tr>
                        {column.map((col,i)=>(
                        
                                <th key={i}>{col}</th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                   </tr>
                </thead>
                <tbody>
                    {data.map((res,i)=>(
                        // console.log(a);
                        <tr key={i}>
                            <td>{res.id}</td>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.PhoneNumber}</td>
                            <td>{res.Marks}</td>
                            <td>{res.pass? 'pass' :'fail'}</td>
                           <td> <Link to={`/Update/${res.id}`}><button className="btn btn-success">Edit</button></Link></td>
                            {/* <Link to={"update"}><td><button className="btn btn-danger">delete</button></td></Link> */}
                           {/* <button className='btn btn-danger' onClick={e=>handledelete(a.id)}>delete</button> */}
                            <td><button className="btn btn-danger" onClick={()=>handledelete(res.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
               

            </table>
        </div>
    </div>
  )
}

export default Home
