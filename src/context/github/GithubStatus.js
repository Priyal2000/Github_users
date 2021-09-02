import  React, {useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import  {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../Types';

const GithubStatus = props => {
    const initialState ={
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state,dispatch] = useReducer(GithubReducer, initialState);

    //Search Users 
    const searchUsers =  async text => {

        setLoading();
        
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client=${
                process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
                    process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload:res.data
        });
    
      }

    //Get User

    //Get Repos

    //Clear Users 

    //Set Loading 
    const setLoading = () => dispatch({ type: SET_LOADING});

    return <GithubContext.Provider 
    value = {{
        user: state.users,
        user:state.user,
        repos: state.repos,
        loading: state.loading
    }}
    >
        {props.children}
    </GithubContext.Provider>

}

export default GithubStatus;