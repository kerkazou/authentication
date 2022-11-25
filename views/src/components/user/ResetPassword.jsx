import {React, useState} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Nav from './components/Nav';
import Input from '../auth/components/Input'
import Label from '../auth/components/Label'
import Error from '../auth/components/Error'
import Button from '../auth/components/Button'

function Resetpassword() {
  const [reset, setReset] = useState({})

  const onChange = (e) => {
    const value = e.target.value;
    setReset({...reset, [e.target.name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/auth/reset-password', reset)
        .then(e=>{
            if(e.data.message) {
              toastr.success(e.data.message, {positionClass: "toast-bottom-left"})
            }
            else toastr.warning(e.data, {positionClass: "toast-bottom-left"})
        })
        .catch(()=>{ console.log('Error') })
  }

  return (
    <div>
      <Nav />
      <section className="d-flex justify-content-center align-items-center bg-body">
        <form onSubmit={onSubmit} className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center border border-3 gap-1 py-5">
            <div className="text-muted h5">Reset Password</div>
            <div className="form-floating text-muted col-10">
              <Input type="password" name='last_password' id="floatingInput" placeholder="Last Password" onChange={onChange}/>
              <Label htmlFor="floatingInput" label="Last Password" />
              <Error id='last_password' />
            </div>
            <div className="form-floating text-muted col-10">
              <Input type="password" name='new_password' id="floatingPassword" placeholder="New Password" onChange={onChange}/>
              <Label htmlFor="floatingPassword" label="New Password" />
              <Error id='new_password' />
            </div>
            <div className="form-floating text-muted col-10">
              <Input type="password" name='confirm_new_password' id="floatingPassword" placeholder="Confirm New Password" onChange={onChange}/>
              <Label htmlFor="floatingPassword" label="Confirm New Password" />
              <Error id='confirm_new_password' />
            </div>
            <div className="w-50 form-group d-flex justify-content-center position-relative">
              <Button button='Change' />
            </div>
        </form>
      </section>
    </div>
  );
}

export default Resetpassword;