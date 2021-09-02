
import { render } from '@testing-library/react';
import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About'
import axios from 'axios';
import GithubStatus from './context/github/GithubStatus'


const App = () => {
  
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const [repos,setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); 


/*async componentDidMount ()
 { 
    
    this.setState({ loading:true});
    const res = await axios.get(`https://api.github.com/users?client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading:false});
  }*/

 

  //Searching Users
  
  

  //Getting Single Github user
  const getUser = async (username) => {

    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setUser(res.data);


  } 

  //get user's repos
  const getUserRepos = async (username) => {

    setLoading(true);  
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5sort=created:asc&client=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setLoading(false);
    setRepos(res.data);
  } 


//Clearing the users component 
const clearUsers = () => {
  setUsers([]);
  setLoading(false);
};

  //Setting alert for searching without any text
const showAlert = (msg) => {
    
    setAlert({msg});
    setTimeout(() => setAlert(null), 5000);
  }

 
    return (
      <GithubStatus>
      <Router>
      <div className="App">
        <Navbar />
        <div className ="container"> 
          <Alert alert ={alert} />
          <Switch>
            <Route exact path = '/'render = {props => (
              <Fragment>
                  <Search 
                      searchUsers = {searchUsers} 
                      clearUsers = {clearUsers}
                      showClear = { users.length > 0 ? true : false}
                      setAlert = {showAlert}/>
                      <Users  loading ={loading} users = {users}/>
                      </Fragment>
            ) }/>

            <Route exact path = '/about' component = {About} />
            <Route exact path = '/user/:login' render = {props => (
              <User 
              { ...props }
               getUser = {getUser}
               getUserRepos = {getUserRepos} 
               user = {user} 
               repos={repos}
               loading = {loading} 
              />
            )} />
          </Switch>
          </div>
      </div>
      
      </Router>
      </GithubStatus>
    );
  
}
 


export default App;
