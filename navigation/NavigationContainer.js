import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  // get access to navigation props
  const navRef = useRef();
  // check if user is authenticated / timeout. Get as a boolean
  const isAuth = useSelector((state) => !!state.auth.token);

  // navigate to auth screen if not authenticated
  useEffect(() => {
    if (!isAuth) {
      // dispatch a navigation action
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
