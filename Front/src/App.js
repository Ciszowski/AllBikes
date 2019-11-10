import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

//components
import ButtonAppBar from './components/NavigateBar';
import AllBikes from './components/bikes/AllBikes';
import WithNoAuth from './fcRouter/WithNoAuth'
import Acceuil from './components/Acceuil';
import SingleBike from './components/bikes/SingleBike';

function App(props) {
  const link = useSelector((state) => state.register.link)

  useEffect(() => {
    if (!link) {
      return props.history.push('/home')
    }
  }, [])

  return (
    <React.Fragment>
        <header>
          <ButtonAppBar  {...props} />
        </header>
        <Switch>
          <Route exact path='/home' component={Acceuil} />
          <Route exact path="/mon-compte" component={WithNoAuth} />
          <Route exact path={'/' + link} component={AllBikes} />
          <Route exact path={'/' + link + '/:name'} component={SingleBike} />
          <Redirect to="/home" />
        </Switch>

    </React.Fragment> 
  );
}

export default withRouter(App);
