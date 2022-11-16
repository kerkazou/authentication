
function Statistique() {
  
  return (
    <div className="bg-body shadow rounded mx-3">
        <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <span className="fs-4 fw-bold">Livreur</span>
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="fs-3 fw-bold border-0 bg-body"><i class="bi bi-person-plus-fill"></i></button>
        </div>
        <table className="table table-sm table-responsive text-center">
            <thead className="fs-5">
                <tr>
                    <th className="d-none">id</th>
                    <th className="col-3">Username</th>
                    <th className="col-3">Email</th>
                    <th className="col-2">Role</th>
                    <th className="col-2">Activation</th>
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr className="item">
                    <td className="d-none id">id</td>
                    <td className="col-3 username">Username</td>
                    <td className="col-3 email">Email</td>
                    <td className="col-2 role">Role</td>
                    <td className="col-2 activation">Activation</td>
                    <td className="col-2">
                        <div className="d-flex gap-3">
                            <button className="border-0 bg-body"><i className="bi bi-pencil-square"></i></button>
                            <button className="border-0 bg-body"><i className="bi bi-x-octagon-fill"></i></button>  
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default Statistique;