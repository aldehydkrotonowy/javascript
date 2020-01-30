import React, { Component } from 'react';
import './stylesheets/index.scss';
import { Route, Switch } from 'react-router-dom'
import routes from 'routes/Routes';
import NoMatch from 'components/Pages/NoMatch/NoMatch';
import propTypes from 'prop-types';
import { connect } from 'react-redux';



class App extends Component {
    constructor(props){
        super(props);
        this.routes = this.getRoutes();       
    }

    getRoutes = () => {
        const routesList = routes.map( ({path, exact, component:C}) => (
            <Route 
                key={path}
                path={path}
                exact={exact}
                render={ (props) => (<C {...props} />) }
            />
        ))
        return routesList
    }
    
    render() {
        return (
                <Switch>
                    {this.routes}
                    <Route render={ () => (<NoMatch/>) }/>
                </Switch>
        )
    }
}
const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeText: () => dispatch({ type: 'CHANGE_TEXT' })
    };
};

App.propTypes = {
    match: propTypes.object,
    path: propTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(App)