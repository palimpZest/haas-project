import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .get(`${API_URL}`)
      .then(res => {
        this.setState({ hash: res.data });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push('/login');
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              hashCATALOG
              <br />
              <br />
              {localStorage.getItem('jwtToken') && (
                <div>
                  <button className="btn btn-warning">
                    <Link to={`/calculateHash`}>New Hash</Link>
                  </button>
                  <button className="btn btn-info">
                    <Link to={`/generateDummyHash`}>Dummy Hash</Link>
                  </button>
                  <button className="btn btn-primary" onClick={this.logout}>
                    Logout
                  </button>
                </div>
              )}
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(this.state.hash).map((hash, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/show/${index}`}>{hash.name}</Link>
                    </td>
                    <td>{hash.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
