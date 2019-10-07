import './mainCss.css'
import React from 'react';
import { Switch, Route, Redirect, withRouter ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

//components
import ButtonAppBar from './components/NavigateBar';
import TypeOfBike from './components/TypeOfBike';
import WithNoAuth from './fcRouter/WithNoAuth'
import Acceuil from './components/Acceuil';

//material
import Button from '@material-ui/core/Button';

//img
import cyclist from './gallerie/roadbikes.jpg';
import famille from './gallerie/family.jpeg';


function App(props) {
  const link = useSelector((state) => state.register.link)
  
  return (
    <React.Fragment>
      <header>
        <img src={cyclist} height="150px" width="50%" alt=" road bike"/>
        <img src={famille} height="150px" width="50%" alt=" family with bike" />
        <ButtonAppBar  {...props} />
        <Link to='/home' className="logo">
          <Button variant="contained" color="inherit" >ALL BIKES</Button>
        </Link>
      </header>
      <Switch>
        <Route path='/home' component={Acceuil} />
        <Route exact path="/mon-compte" component={WithNoAuth} />
        <Route exact path={`/${link}`} component={TypeOfBike} />
        <Redirect to="/home" />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
