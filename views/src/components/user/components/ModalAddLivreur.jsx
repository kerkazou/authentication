import {React, useState} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Input from '../../auth/components/Input'
import Label from '../../auth/components/Label'
import Error from '../../auth/components/Error'
import Button from '../../auth/components/Button'

function ModalAddLivreur() {
    const [addLivreur, setAddLivreur] = useState({})

    const onChange = (e) => {
        const value = e.target.value;
        setAddLivreur({...addLivreur, [e.target.name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/auth/add-Livreur', addLivreur)
            .then(e=>{
                if(e.data.message) {
                    toastr.success(e.data.message, {positionClass: "toast-bottom-left"})
                    window.location.reload()
                }
                else toastr.warning(e.data, {positionClass: "toast-bottom-left"})
            })
            .catch(error=>{ console.log(error) })
    }
  
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Ajoute un livreur</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={onSubmit} className="d-flex flex-column justify-content-center align-items-center gap-1 mb-5 pb-5">
                    <div className="form-floating text-muted col-10">
                        <Input type="text" name='username' id="floatingUsername" placeholder="Username" onChange={onChange}/>
                        <Label htmlFor="floatingInput" label='Username' />
                        <Error id='username' />
                    </div>
                    <div className="form-floating text-muted col-10">
                        <Input type="text" name='email' id="floatingInput" placeholder="Email" onChange={onChange}/>
                        <Label htmlFor="floatingInput" label='Email address' />
                        <Error id='email' />
                    </div>
                    <div className="form-floating text-muted col-10">
                        <Input type="password" name='password' id="floatingPassword" placeholder="Password" onChange={onChange}/>
                        <Label htmlFor="floatingPassword" label='Password' />
                        <Error id='password' />
                    </div>
                    <div className="form-floating text-muted col-10">
                        <Input type="password" name='confirm_password' id="floatingPassword" placeholder="Confirm Password" onChange={onChange}/>
                        <Label htmlFor="floatingPassword" label='Confirm Password' />
                        <Error id='confirm_password' />
                    </div>
                    <div className="w-50 form-group d-flex justify-content-center position-relative">
                        <Button button='Register' />
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ModalAddLivreur;