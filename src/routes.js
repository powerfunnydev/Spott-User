import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
import Error404 from './pages/error404';
import Home from './pages/home/view';
import Login from './pages/login';
import Register from './pages/register/view';
import Privacy from './pages/privacy';
import ProductDetail from './pages/productDetail/view';
import Profile from './pages/profile/view';
import ProfileWishlistProducts from './pages/profile/view/wishlistProducts';
import ProfileWishlists from './pages/profile/view/wishlists';
import ProfileSavedScenes from './pages/profile/view/savedScenes';
import Redirect from './pages/redirect';
import Scene from './pages/scene/view';
import SceneProduct from './pages/scene/view';
import Medium from './pages/medium/view';
import MediumOverview from './pages/medium/view/overview';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
import Terms from './pages/terms';
import { changeLocale } from './pages/app/actions';
import { MOVIE, SERIES } from './data/mediumTypes';
import { locales } from './locales';

/**
 * The application routes
 */
export const getRoutes = ({ dispatch, getState }) => { // eslint-disable-line react/prop-types
  /* TODO: not used yet
    function requireAuth (nextState, replace) {
      // Not authenticated.. replace current location with /login
      if (!authenticationTokenSelector(getState())) {
        replace({
          pathname: '/login',
          state: { returnTo: nextState.location.pathname }
        });
      }
    }
  */

  function onRootEnter (state, replace) {
    const { location } = state;
    // Hash url for terms and privacy will be replaced by a url without a hash!
    // The language is also set to 'en'.
    if (location.pathname === '' || location.pathname === '/') {
      if (location.hash === '#terms' || location.hash === '#/terms' || location.hash === '#/terms/') {
        return replace('/en/terms');
      }
      if (location.hash === '#privacy' || location.hash === '#/privacy' || location.hash === '#/privacy/') {
        return replace('/en/privacy');
      }
    }
    // Replace full regionalized locales by simple ones.
    if (/^\/[a-z]{2}\-[a-zA-Z]{2}($|\/)/.test(location.pathname)) {
      location.pathname = location.pathname.substring(0, 3) + location.pathname.substring(6); // Cut away region
      return replace(location);
    }
  }

  // Factory for medium-page routes.
  function makeMediumRoutes (mediumType, mediumTypeParam) {
    return (
      <Route component={Medium} mediumType={mediumType} path={`${mediumTypeParam}/:mediumSlug/:mediumId`}>
        <IndexRedirect to='overview' />
        <Route component={MediumOverview} path='overview' />
        {/* TODO: NOT DONE YET
        <Route component={SeriesProducts} path='series/:seriesId/products' />
          <Route component={SeriesScenes} path='series/:seriesId/season/:seasonId'>
            <Route component={SeriesScenes} path='series/:seriesId/season/:seasonId/episode/:episodeId/scenes' />
          </Route>
        */}
      </Route>
    );
  }

  // Factory for localized routes
  function makeLocalizedRoutes (locale) {
    // When entering a page, the locale is dispatched.
    function onLocaleEnter (state) {
      dispatch(changeLocale(locale));
    }

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <IndexRoute component={Home} />

        <Route component={Redirect} noSignInButtonInHeader path='app'/>
        <Route component={Privacy} path='privacy' />
        <Route component={Terms} path='terms' />

        {makeMediumRoutes(SERIES, 'series')}
        {makeMediumRoutes(MOVIE, 'movie')}

        <Route component={Scene} path='scene/series/:sceneSlug/:sceneId' />
          {/*<IndexRoute component={Scene} />
          <Route component={SceneProduct} path='product/:productId' />
        </Route>*/}

        <Route component={ProductDetail} path='product/:productSlug/:brandSlug/:productId' />
        <Route component={ProductDetail} path='product/:productSlug/:productId' /> {/* Backwards compatible with old url. */}

        <Route component={Login} noSignInButtonInHeader path='login' />
        <Route component={Register} noSignInButtonInHeader path='register' />
        <Route component={ChangePassword} noSignInButtonInHeader path='user/changepwd'/>

        <Route component={Profile} floating path='profile/:userSlug/:userId' >
          <IndexRedirect to='saved-scenes' />
          <Route path='wishlists'>
            <IndexRoute component={ProfileWishlists} />
            <Route component={ProfileWishlistProducts} path=':wishlistSlug/:wishlistId' />
          </Route>
          <Route component={ProfileSavedScenes} path='saved-scenes' />
        </Route>
      </Route>
    );
  }

  return (
    <Route component={App} path='/' onEnter={onRootEnter}>
      <IndexRedirect to='/en' />
      {locales.map((locale) => makeLocalizedRoutes(locale))}

      <Route component={Error404} path='*' />
    </Route>
  );
};
