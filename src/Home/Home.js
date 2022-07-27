import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUniversities } from "../Redux/Actions";
import { LoggedInContext } from "../LoggedInContext/LoggedInContext";
import { useNavigate } from "react-router-dom";

function Home({ universityList, getUniversitiesList }) {
  const [universities, setUniversities] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useContext(LoggedInContext);
  useEffect(() => {
    if (loggedIn) getUniversitiesList();
    else navigate("/login");
  }, []);

  useEffect(() => {
    if (universityList) {
      setUniversities(universityList.universities);
    }
  }, [universityList]);

  if (!universities) return <div>No data found</div>;

  return (
    <div className="container">
      <h1 className="text-center mb-5 mt-5">User Data</h1>
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-sm-12">
          { universities.loading || !universities.payload ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-info" role="status"></div>
            </div>
          ) : universities.payload.error ? (
            <h1 className="text-center">{universities.payload.error}</h1>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Slno.</th>
                  <th scope="col">Name </th>
                  <th scope="col">country</th>
                  <th scope="col">Domain</th>
                </tr>
              </thead>
              <tbody>
                {universities.payload.map((university, index) => {
                  {
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{university.name}</td>
                        <td>{university.country}</td>
                        <td>
                          <a href={university.domains[0]}>
                            {university.domains[0]}
                          </a>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  universityList: state,
});

const mapDispatchToProps = (dispatch) => ({
  getUniversitiesList: () => dispatch(getUniversities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
