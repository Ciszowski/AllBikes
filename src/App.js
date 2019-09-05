import './mainCss.css'
import React from 'react';
import { Switch, Route, Redirect, withRouter ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

//components
import ButtonAppBar from './components/NavigateBar';
import TypeOfBike from './components/TypeOfBike';
import Acceuil from './components/Acceuil';
import LoginPage from './components/LoginPage';

//material
import Button from '@material-ui/core/Button';

//img
import cyclist from './gallerie/roadbikes.jpg';
import famille from './gallerie/family.jpeg';


function App(props) {
  const type = useSelector((state) => state.listBike.type)
  
  return (
    <React.Fragment>
      <header>
        <img src={cyclist} alt=" road bike"/>
        <img src={famille} alt=" family with bike" />
        <ButtonAppBar  {...props} />
        <Link to='home' className="logo">
          <Button   variant="contained" color="inherit" >ALL BIKES</Button>
        </Link>
      </header>
      <Switch>
        <Route path='/home' component={Acceuil} />
        <Route exact path="/mon-compte" component={LoginPage} />
        <Route exact path={`/${type}`} component={TypeOfBike} />
        <Redirect to="/home" />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
