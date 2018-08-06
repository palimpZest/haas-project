import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const API_URL = 'http://localhost:3000/';

class DummyHash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyHash: []
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    axios
      .get(`${API_URL}generateDummyHash`)
      .then(response => this.setState({ dummyHash: response.data }));
  }
  render() {
    const { dummyHash } = this.state;
    return (
      <div className="container">
        <h2>Here are your Dummy Hashes!</h2>
        <button className="btn btn-danger">
          <Link to={`/`}>Back</Link>
        </button>
        <br />
        <br />
        {Object.values(dummyHash).map((item, index) => (
          <div>
            <span key={index}>
              {item.name} {item.hash}
            </span>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default DummyHash;
