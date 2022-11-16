
function Statistique() {
  
  return (
    <div className="container-fluid pb-3">
        <div className="row d-flex flex-wrap justify-content-center align-items-center gap-md-5 gap-3">
            <div className="card col-xl-4 col-5 mb-xl-0 border-0 shadow-sm mb-3">
                <div className="card-body d-flex flex-column justify-content-between align-items-center p-3">
                    <h4 className="text-sm mb-0 text-uppercase">Livreur</h4>
                    <h3>0</h3>
                </div>
            </div>
            <div className="card col-xl-4 col-5 mb-xl-0 border-0 shadow-sm mb-3">
                <div className="card-body d-flex flex-column justify-content-between align-items-center p-3">
                    <h4 className="text-sm mb-0 text-uppercase">Client</h4>
                    <h3>0</h3>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Statistique;