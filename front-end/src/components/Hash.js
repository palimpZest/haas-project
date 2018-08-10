import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:3000/';

class Hash extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      algorithm: '',
      iteration: 0
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
  }

  onSubmit = e => {
    e.preventDefault();
    const { data, algorithm, iteration } = this.state;
    axios
      .post(`${API_URL}calculateHash`, { data, algorithm, iteration })
      .then(result => {
        console.log('result');
        console.log(result);
        this.props.history.push('/');
      });
  };

  render() {
    const { data, algorithm, iteration } = this.state;
    return (
      <div className="container">
        <h2>Create your Hash!</h2>
        <br />
        <form className="form-signin" onSubmit={this.onSubmit}>
          <label htmlFor="inputData" className="sr-only">
            Data
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Data to hash"
            name="data"
            value={data}
            onChange={this.onChange}
            required
          />
          <label htmlFor="inputAlgorithm" className="sr-only">
            Algorithm
          </label>
          <select
            className="form-control"
            name="algorithm"
            value={algorithm}
            onChange={this.onChange}
            required
          >
            <option>Select a method</option>
            <option name="md5" value="md5">
              MD5
            </option>
            <option name="sha1" value="sha1">
              SHA1
            </option>
            <option name="sha256" value="sha256">
              SHA256
            </option>
          </select>
          <label htmlFor="inputIteration" className="sr-only">
            Iteration
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Number of iterations"
            name="iteration"
            value={iteration}
            onChange={this.onChange}
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Hash this data
          </button>
        </form>
        <br />
        <button className="btn btn-danger">
          <Link to={`/`}>Back</Link>
        </button>
      </div>
    );
  }
}

export default Hash;
