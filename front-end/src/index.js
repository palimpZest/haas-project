import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Login from './components/Login'
import Register from './components/Register'
import DummyHash from './components/DummyHash'
import Hash from './components/Hash'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/calculateHash' component={Hash} />
      <Route exact path='/generateDummyHash' component={DummyHash} />
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
