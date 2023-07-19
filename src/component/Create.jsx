import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const[inputData,setinputData] = useState({name:"",PhoneNumber:"",Marks:"",pass:""})
    const nevigate = useNavigate()

// validation
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let isValid = true;
      const newErrors = {};
  
      if (!inputData.name) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
  
      if (!inputData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
  
      if (!inputData.PhoneNumber) {
        newErrors.PhoneNumber = 'Phone is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(inputData.PhoneNumber)) {
        newErrors.PhoneNumber = 'Invalid phone number';
        isValid = false;
      }
  
      if (!inputData.Marks) {
        newErrors.marks = 'Marks is required';
        isValid = false;
      } else if (isNaN(inputData.Marks) || inputData.Marks < 0 || inputData.Marks > 100) {
        newErrors.marks = 'Invalid marks (0-100)';
        isValid = false;
      }
  
      if (inputData.Marks >= 35) {
        inputData.pass = 'Pass';
      } else {
        inputData.pass = 'Fail';
      }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const handleSubmit = (e) =>{
       e.preventDefault()

       if (validateForm()) {

        axios.post("http://localhost:3000/details",inputData)
        .then((res)=>{
             alert("data added")
             nevigate("/")
        }).catch(err =>console.log("error"))
        // console.log('Student data:', student);
      }

     
    }

  return (
    <div className='d-flex w-100 h-100 justify-content-center aligm-items-center mt-5'>
        <div className="w-50 border bg-light p-5">
          <form action="" onSubmit={handleSubmit}>
          <div className='d-flex m-3'>
                <label htmlFor="name" className='px-3 py-2' >Name:</label>
                <input type="text" name='name' className='form-control'
                onChange={e => setinputData({...inputData,name:e.target.value})}
                />
                 {errors.name && <span>{errors.name}</span>}
            </div>

            <div className='d-flex m-3'>
                <label htmlFor="email" className='px-3 py-2' >email:</label>
                <input type="email" name='email' className='form-control'
                onChange={e => setinputData({...inputData,email:e.target.value})}
                />
                 {errors.email && <span>{errors.email}</span>}
            </div>

            <div className='d-flex m-3'>
                <label htmlFor="PhonNumber" className='px-3 py-2'>Phonenumber:</label>
                <input type="number" name='PhonNumber' className='form-control'
                 onChange={e => setinputData({...inputData,PhoneNumber:e.target.value})}
                />
                   {errors.PhoneNumber && <span>{errors.PhoneNumber}</span>}
            </div>
            <div className='d-flex m-3'>
                <label htmlFor="Marks" className='px-3'>Marks:</label>
                <input type="number" name='Marks' className='form-control'
                onChange={e => setinputData({...inputData,Marks:e.target.value})}
                />
                {errors.marks && <span>{errors.marks}</span>}
            </div>
            
            {/* <div className='d-flex m-3'>
                <label htmlFor="pass/fail" className='px-3'>pass/fail:</label>
                <input type="Boolen" name='pass' className='form-control'
                onChange={e => setinputData({...inputData,pass:e.target.value})}

                />
            </div> */}
            <button className='btn btn-info'>Submit</button>
          </form>
        </div>
     
    </div>
  )
}

export default Create
