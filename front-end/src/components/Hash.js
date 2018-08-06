import React, { Component } from 'react';
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
        console.log(result);
        this.props.history.push('/');
      });
  };

  render() {
    const { data, algorithm, iteration } = this.state;
    return (
      <div className="container">
        <h2>Create your Hash!</h2>
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Register</h2>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
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
          <label htmlFor="inputData" className="sr-only">
            Data
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="algorithm"
            name="algorithm"
            value={algorithm}
            onChange={this.onChange}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="iteration"
            name="iteration"
            value={iteration}
            onChange={this.onChange}
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Hash this data
          </button>
        </form>
      </div>
    );
  }
}

export default Hash;
