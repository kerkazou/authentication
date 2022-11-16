import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoutes = () => {
  if(localStorage.getItem('token')) {var token = true}
  if(localStorage.getItem('role')) {var role = true}
  if(localStorage.getItem('username')) {var username = true}

  const url = `/api/user/${localStorage.getItem('role')}/me`

  return (
    (!token || !role || !username) ? <Outlet/> : <Navigate to={url}/>
  )
}

export default UserPrivateRoutes;