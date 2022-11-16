import {React, useState} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Logoauth from './components/Logoauth'
import Input from './components/Input'
import Label from './components/Label'
import Error from './components/Error'
import Button from './components/Button'

function Forgetpassword() {
  const [forget, setForget] = useState({})

  const onChange = (e) => {
    const value = e.target.value;
    setForget({...forget, [e.target.name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/auth/forget-password', forget)
        .then(e=>{
            if(e.data.message) toastr.success(e.data.message, { positionClass: "toast-bottom-left" })
            else toastr.warning(e.data, { positionClass: "toast-bottom-left" })
        })
        .catch(error=>{ console.log(error) })
  }

  return (
    <section class="d-flex justify-content-center align-items-center">
      <form onSubmit={onSubmit} class="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-3 py-5">
          <Logoauth />
          <div class="text-muted h5">Forget password ?</div>
          <div className="form-floating text-muted col-10">
            <Input type="text" name='email' id="floatingInput" placeholder="Email" onChange={onChange}/>
            <Label htmlFor="floatingInput" label="Email address" />
            <Error id='email' />
          </div>
          <div class="col-10 d-flex justify-content-between align-items-center mt-3">
              <a class="text-dark" href="login">Login</a>
              <a class="text-dark" href="register">Register</a>
          </div>
          <div class="w-50 form-group d-flex justify-content-center position-relative">
            <Button button='Send' />
          </div>
      </form>
    </section>
  );
}

export default Forgetpassword;