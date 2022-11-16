import {React} from 'react';
import '../../App.css';
import SidBar from './components/SidBar';
import NavBar from './components/NavBar';
import Statistique from './components/Statistique';
import Table from './components/Table';
import ModalAddLivreur from './components/ModalAddLivreur';

function Manager() {

  return (
    <section className="w-100 d-flex justify-content-between">
      <div class="d-flex ms-3">
        <SidBar />
      </div>
      <div class="position-relative w-100">
        <NavBar/>
        <Statistique/>
        <Table/>
        <ModalAddLivreur/>
      </div>
    </section>
  );
}

export default Manager;