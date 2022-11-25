import axios from 'axios'
import Logo from './logo.png'

function SidBar() {
  const onClick = () => {
    axios.get('http://localhost:9000/api/auth/logout')
      .then(()=>{
        localStorage.clear();
        window.location.replace('http://localhost:3000/login')
      })
      .catch(()=>{console.log('Error')})
  }

  return (
    <div className="position-relative">
      <div className="d-flex flex-column justify-content-between align-items-center shadow" id="assidbar">
        {/* Logo */}
        <div className="d-flex flex-column justify-content-center align-items-center">
          <a className="text-center" href=""><img src={Logo} alt="logo" id='logo'/></a>
          <hr className="w-75 m-0 my-2 p-0 text-dark"/>
        </div>
        {/* Menu */}
        <ul className="navbar-nav d-flex flex-column justify-content-center align-items-center my-2 gap-md-4 gap-sm-3 gap-1">
          <li className="nav-item text-center">
            <a className="nav-link d-flex align-items-center gap-3" href="">
              <i className="bi bi-person-bounding-box fs-4 fw-bold d-md-none d-block"></i>
              <span className='d-none d-md-block'>{localStorage.getItem('username')}</span>
            </a>
          </li>
          <li className="nav-item text-center">
            <a className="nav-link d-flex align-items-center gap-3" href="">
              <i className="fs-4 fw-bold d-md-none d-block">D</i>
              <span className='d-none d-md-block'>Dashboard</span>
            </a>
          </li>
          <li className="nav-item text-center">
            <a className="nav-link d-flex align-items-center gap-3" href="">
              <i className="fs-4 fw-bold d-md-none d-block">L</i>
              <span className='d-none d-md-block'>Livreur</span>
            </a>
          </li>
          <li className="nav-item text-center">
            <a className="nav-link d-flex align-items-center gap-3" href="">
              <i className="fs-4 fw-bold d-md-none d-block">C</i>
              <span className='d-none d-md-block'>Client</span>
            </a>
          </li>
        </ul>
        {/* Logout */}
        <div className="d-flex flex-column mb-3">
          <hr className="w-100 m-0 my-2 p-0 text-dark"/>
          <button className="d-flex align-items-center gap-3 border-0 bg-body" onClick={onClick}>
            <i class="bi bi-box-arrow-right fs-4 fw-bold d-md-none d-block"></i>
            <span className='d-none d-md-block'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidBar;