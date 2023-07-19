import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const {id} = useParams();
    const[data,setdata] = useState([])
    const nevidate= useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3000/details/" + id)
        .then((res)=>{
            setdata(res.data)
        }).catch(err => console.log("err"))
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.put("http://localhost:3000/details/"+id,data)
        .then((res)=>{
            alert("data update successfully")
            nevidate("/")
        })
    }

  return (
    <div>
         <div className='d-flex w-100 h-100 justify-content-center aligm-items-center mt-5'>
        <div className="w-50 border bg-light p-5">
          <form action="" onSubmit={handleSubmit}>
          <div className='d-flex m-3'>
                <label htmlFor="name" className='px-3 py-2' >Name:</label>
                <input type="text" name='name'  value={data.name} className='form-control'
                onChange={e=>setdata({...data,name:e.target.value})}
                />
            </div>
            <div className='d-flex m-3'>
                <label htmlFor="PhonNumber" className='px-3 py-2'>Phonenumber:</label>
                <input type="number" name='PhonNumber' className='form-control' value={data.PhoneNumber}
                 onChange={e=>setdata({...data,PhonNumber:e.target.value})}
                />
            </div>
            <div className='d-flex m-3'>
                <label htmlFor="Marks" className='px-3'>Marks:</label>
                <input type="number" name='Marks' className='form-control'value={data.Marks}
                 onChange={e=>setdata({...data,Marks:e.target.value})}

                />
            </div>
            <div className='d-flex m-3'>
                <label htmlFor="pass/fail" className='px-3'>pass/fail:</label>
                <input type="Boolen" name='pass' className='form-control' value={data.pass}
                onChange={e=>setdata({...data,pass:e.target.value})}
                />
            </div>
            <button className='btn btn-info'>Submit</button>
          </form>
        </div>
     
    </div>
    </div>
  )
}

export default Update
