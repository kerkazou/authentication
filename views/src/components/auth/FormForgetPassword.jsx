import {React, useState} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Logoauth from './components/Logoauth'
import Input from './components/Input'
import Label from './components/Label'
import Error from './components/Error'
import Button from './components/Button'

function FormForgetPassword() {
  const [reset, setReset] = useState({})

  const onChange = (e) => {
    const value = e.target.value;
    setReset({...reset, [e.target.name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/auth/form-forget-password', reset)
        .then(e=>{
            if(e.data.message) {
              toastr.success(e.data.message, { positionClass: "toast-bottom-left" })
              window.location.replace('http://localhost:3000/login')
            }
            else toastr.warning(e.data, { positionClass: "toast-bottom-left" })
        })
        .catch(error=>{ console.log(error) })
  }

  return (
    <section className="d-flex justify-content-center align-items-center">
      <form onSubmit={onSubmit} className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-1 py-5">
          <Logoauth />
          <div className="text-muted h5">Cahnge Password</div>
          <div className="form-floating text-muted col-10">
            <Input type="password" name='password' id="floatingPassword" placeholder="Password" onChange={onChange}/>
            <Label htmlFor="floatingPassword" label="Password" />
            <Error id='password' />
          </div>
          <div className="form-floating text-muted col-10">
            <Input type="password" name='cofirm_password' id="floatingPassword" placeholder="Confirm Password" onChange={onChange}/>
            <Label htmlFor="floatingPassword" label="Confirm Password" />
            <Error id='cofirm_password' />
          </div>
          <div className="col-10 d-flex justify-content-between align-items-center mt-3">
              <a className="text-dark" href="login">Login</a>
              <a className="text-dark" href="register">Register</a>
          </div>
          <div className="w-50 form-group d-flex justify-content-center position-relative">
            <Button button='Change' />
          </div>
      </form>
    </section>
  );
}

export default FormForgetPassword;