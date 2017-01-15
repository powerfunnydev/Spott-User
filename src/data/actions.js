import * as charactersApi from '../api/characters';
import * as mediaApi from '../api/media';
import * as productsApi from '../api/products';
import * as scenesApi from '../api/scenes';
import * as usersApi from '../api/users';
import * as wishlistsApi from '../api/wishlists';
import * as eventsApi from '../api/events';
import * as tvGuideApi from '../api/tvGuide';
import * as ubApi from '../api/ub';
import { authenticationTokenSelector, apiBaseUrlSelector, currentLocaleSelector } from '../pages/app/selector';
import { slowdown } from '../utils';

export function makeApiActionCreator (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      const authenticationToken = authenticationTokenSelector(state);
      const locale = currentLocaleSelector(state);
      dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(apiBaseUrl, authenticationToken, locale, params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}

export function makeUbApiActionCreator (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const ubApiBaseUrl = 'https://api.ub.io';
      const ubAuthenticationToken = 'f8e358ab40f0bc08e79a284864f0e6097c2501f2fc4f3e8719e8d81cf38484ca153ee32f62ae1e682605d20062629c0cf01d08a8cde8d107a521780cc19acf07';
      dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(ubApiBaseUrl, ubAuthenticationToken, params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}

// Action types
// ////////////

export const CHARACTER_FETCH_START = 'CHARACTER_FETCH_START';
export const CHARACTER_FETCH_SUCCESS = 'CHARACTER_FETCH_SUCCESS';
export const CHARACTER_FETCH_ERROR = 'CHARACTER_FETCH_ERROR';

export const CHARACTER_PRODUCTS_FETCH_START = 'DATA/CHARACTER_PRODUCTS_FETCH_START';
export const CHARACTER_PRODUCTS_FETCH_SUCCESS = 'DATA/CHARACTER_PRODUCTS_FETCH_SUCCESS';
export const CHARACTER_PRODUCTS_FETCH_ERROR = 'DATA/CHARACTER_PRODUCTS_FETCH_ERROR';

export const CHARACTER_SUBSCRIBER_ADD_START = 'DATA/CHARACTER_SUBSCRIBER_ADD_START';
export const CHARACTER_SUBSCRIBER_ADD_SUCCESS = 'DATA/CHARACTER_SUBSCRIBER_ADD_SUCCESS';
export const CHARACTER_SUBSCRIBER_ADD_ERROR = 'DATA/CHARACTER_SUBSCRIBER_ADD_ERROR';

export const CHARACTER_SUBSCRIBER_REMOVE_START = 'DATA/CHARACTER_SUBSCRIBER_REMOVE_START';
export const CHARACTER_SUBSCRIBER_REMOVE_SUCCESS = 'DATA/CHARACTER_SUBSCRIBER_REMOVE_SUCCESS';
export const CHARACTER_SUBSCRIBER_REMOVE_ERROR = 'DATA/CHARACTER_SUBSCRIBER_REMOVE_ERROR';

export const NEW_SCENES_FOR_YOU_FETCH_START = 'DATA/NEW_SCENES_FOR_YOU_FETCH_START';
export const NEW_SCENES_FOR_YOU_FETCH_SUCCESS = 'DATA/NEW_SCENES_FOR_YOU_FETCH_SUCCESS';
export const NEW_SCENES_FOR_YOU_FETCH_ERROR = 'DATA/NEW_SCENES_FOR_YOU_FETCH_ERROR';

export const SCENE_FETCH_START = 'SCENE_FETCH_START';
export const SCENE_FETCH_SUCCESS = 'SCENE_FETCH_SUCCESS';
export const SCENE_FETCH_ERROR = 'SCENE_FETCH_ERROR';

export const MEDIUM_NEW_SCENES_FOR_YOU_FETCH_START = 'DATA/MEDIUM_NEW_SCENES_FOR_YOU_FETCH_START';
export const MEDIUM_NEW_SCENES_FOR_YOU_FETCH_SUCCESS = 'DATA/MEDIUM_NEW_SCENES_FOR_YOU_FETCH_SUCCESS';
export const MEDIUM_NEW_SCENES_FOR_YOU_FETCH_ERROR = 'DATA/MEDIUM_NEW_SCENES_FOR_YOU_FETCH_ERROR';

export const MEDIA_RECENTLY_ADDED_FETCH_START = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_START';
export const MEDIA_RECENTLY_ADDED_FETCH_SUCCESS = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_SUCCESS';
export const MEDIA_RECENTLY_ADDED_FETCH_ERROR = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_ERROR';

export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START';
export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS';
export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR';

export const POPULAR_PRODUCTS_FETCH_START = 'DATA/POPULAR_PRODUCTS_FETCH_START';
export const POPULAR_PRODUCTS_FETCH_SUCCESS = 'DATA/POPULAR_PRODUCTS_FETCH_SUCCESS';
export const POPULAR_PRODUCTS_FETCH_ERROR = 'DATA/POPULAR_PRODUCTS_FETCH_ERROR';

export const PRODUCT_FETCH_START = 'DATA/PRODUCT_FETCH_START';
export const PRODUCT_FETCH_SUCCESS = 'DATA/PRODUCT_FETCH_SUCCESS';
export const PRODUCT_FETCH_ERROR = 'DATA/PRODUCT_FETCH_ERROR';

export const UB_PRODUCT_FETCH_START = 'DATA/UB_PRODUCT_FETCH_START';
export const UB_PRODUCT_FETCH_SUCCESS = 'DATA/UB_PRODUCT_FETCH_SUCCESS';
export const UB_PRODUCT_FETCH_ERROR = 'DATA/UB_PRODUCT_FETCH_ERROR';

export const USER_FETCH_START = 'DATA/USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'DATA/USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'DATA/USER_FETCH_ERROR';

export const SAVED_SCENES_OF_USER_FETCH_START = 'SAVED_SCENES_OF_USER_FETCH_START';
export const SAVED_SCENES_OF_USER_FETCH_SUCCESS = 'SAVED_SCENES_OF_USER_FETCH_SUCCESS';
export const SAVED_SCENES_OF_USER_FETCH_ERROR = 'SAVED_SCENES_OF_USER_FETCH_ERROR';

export const TV_GUIDE_ENTRIES_FETCH_START = 'DATA/TV_GUIDE_ENTRIES_FETCH_START';
export const TV_GUIDE_ENTRIES_FETCH_SUCCESS = 'DATA/TV_GUIDE_ENTRIES_FETCH_SUCCESS';
export const TV_GUIDE_ENTRIES_FETCH_ERROR = 'DATA/TV_GUIDE_ENTRIES_FETCH_ERROR';

export const WISHLIST_OF_USER_FETCH_START = 'WISHLIST_OF_USER_FETCH_START';
export const WISHLIST_OF_USER_FETCH_SUCCESS = 'WISHLIST_OF_USER_FETCH_SUCCESS';
export const WISHLIST_OF_USER_FETCH_ERROR = 'WISHLISTS_OF_USER_FETCH_ERROR';

export const WISHLISTS_OF_USER_FETCH_START = 'WISHLISTS_OF_USER_FETCH_START';
export const WISHLISTS_OF_USER_FETCH_SUCCESS = 'WISHLISTS_OF_USER_FETCH_SUCCESS';
export const WISHLISTS_OF_USER_FETCH_ERROR = 'WISHLISTS_OF_USER_FETCH_ERROR';

export const WISHLIST_PRODUCTS_FETCH_START = 'WISHLIST_PRODUCTS_FETCH_START';
export const WISHLIST_PRODUCTS_FETCH_SUCCESS = 'WISHLIST_PRODUCTS_FETCH_SUCCESS';
export const WISHLIST_PRODUCTS_FETCH_ERROR = 'WISHLIST_PRODUCTS_FETCH_ERROR';

export const WISHLIST_PRODUCT_ADD_START = 'WISHLIST_PRODUCT_ADD_START';
export const WISHLIST_PRODUCT_ADD_SUCCESS = 'WISHLIST_PRODUCT_ADD_SUCCESS';
export const WISHLIST_PRODUCT_ADD_ERROR = 'WISHLIST_PRODUCT_ADD_ERROR';

export const WISHLIST_CREATE_START = 'WISHLIST_CREATE_START';
export const WISHLIST_CREATE_SUCCESS = 'WISHLIST_CREATE_SUCCESS';
export const WISHLIST_CREATE_ERROR = 'WISHLIST_CREATE_ERROR';

export const WISHLIST_UPDATE_START = 'WISHLIST_UPDATE_START';
export const WISHLIST_UPDATE_SUCCESS = 'WISHLIST_UPDATE_SUCCESS';
export const WISHLIST_UPDATE_ERROR = 'WISHLIST_UPDATE_ERROR';

export const WISHLIST_REMOVE_START = 'WISHLIST_REMOVE_START';
export const WISHLIST_REMOVE_SUCCESS = 'WISHLIST_REMOVE_SUCCESS';
export const WISHLIST_REMOVE_ERROR = 'WISHLIST_REMOVE_ERROR';

export const WISHLIST_PRODUCT_REMOVE_START = 'WISHLIST_PRODUCT_REMOVE_START';
export const WISHLIST_PRODUCT_REMOVE_SUCCESS = 'WISHLIST_PRODUCT_REMOVE_SUCCESS';
export const WISHLIST_PRODUCT_REMOVE_ERROR = 'WISHLIST_PRODUCT_REMOVE_ERROR';

export const MEDIUM_FETCH_START = 'DATA/MEDIUM_FETCH_START';
export const MEDIUM_FETCH_SUCCESS = 'DATA/MEDIUM_FETCH_SUCCESS';
export const MEDIUM_FETCH_ERROR = 'DATA/MEDIUM_FETCH_ERROR';

export const MEDIUM_CHARACTERS_FETCH_START = 'DATA/MEDIUM_CHARACTERS_FETCH_START';
export const MEDIUM_CHARACTERS_FETCH_SUCCESS = 'DATA/MEDIUM_CHARACTERS_FETCH_SUCCESS';
export const MEDIUM_CHARACTERS_FETCH_ERROR = 'DATA/MEDIUM_CHARACTERS_FETCH_ERROR';

export const MEDIUM_PRODUCTS_FETCH_START = 'DATA/MEDIUM_PRODUCTS_FETCH_START';
export const MEDIUM_PRODUCTS_FETCH_SUCCESS = 'DATA/MEDIUM_PRODUCTS_FETCH_SUCCESS';
export const MEDIUM_PRODUCTS_FETCH_ERROR = 'DATA/MEDIUM_PRODUCTS_FETCH_ERROR';

export const MEDIUM_TOP_PRODUCTS_FETCH_START = 'DATA/MEDIUM_TOP_PRODUCTS_FETCH_START';
export const MEDIUM_TOP_PRODUCTS_FETCH_SUCCESS = 'DATA/MEDIUM_TOP_PRODUCTS_FETCH_SUCCESS';
export const MEDIUM_TOP_PRODUCTS_FETCH_ERROR = 'DATA/MEDIUM_TOP_PRODUCTS_FETCH_ERROR';

export const MEDIUM_TOP_USER_PRODUCTS_FETCH_START = 'DATA/MEDIUM_TOP_USER_PRODUCTS_FETCH_START';
export const MEDIUM_TOP_USER_PRODUCTS_FETCH_SUCCESS = 'DATA/MEDIUM_TOP_USER_PRODUCTS_FETCH_SUCCESS';
export const MEDIUM_TOP_USER_PRODUCTS_FETCH_ERROR = 'DATA/MEDIUM_TOP_USER_PRODUCTS_FETCH_ERROR';

export const MEDIUM_SUBSCRIBER_ADD_START = 'DATA/MEDIUM_SUBSCRIBER_ADD_START';
export const MEDIUM_SUBSCRIBER_ADD_SUCCESS = 'DATA/MEDIUM_SUBSCRIBER_ADD_SUCCESS';
export const MEDIUM_SUBSCRIBER_ADD_ERROR = 'DATA/MEDIUM_SUBSCRIBER_ADD_ERROR';

export const MEDIUM_SUBSCRIBER_REMOVE_START = 'DATA/MEDIUM_SUBSCRIBER_REMOVE_START';
export const MEDIUM_SUBSCRIBER_REMOVE_SUCCESS = 'DATA/MEDIUM_SUBSCRIBER_REMOVE_SUCCESS';
export const MEDIUM_SUBSCRIBER_REMOVE_ERROR = 'DATA/MEDIUM_SUBSCRIBER_REMOVE_ERROR';

export const MEDIUM_SEASONS_FETCH_START = 'DATA/MEDIUM_SEASONS_FETCH_START';
export const MEDIUM_SEASONS_FETCH_SUCCESS = 'DATA/MEDIUM_SEASONS_FETCH_SUCCESS';
export const MEDIUM_SEASONS_FETCH_ERROR = 'DATA/MEDIUM_SEASONS_FETCH_ERROR';

export const MEDIUM_EPISODES_FETCH_START = 'DATA/MEDIUM_EPISODES_FETCH_START';
export const MEDIUM_EPISODES_FETCH_SUCCESS = 'DATA/MEDIUM_EPISODES_FETCH_SUCCESS';
export const MEDIUM_EPISODES_FETCH_ERROR = 'DATA/MEDIUM_EPISODES_FETCH_ERROR';

export const NEW_EPISODES_FETCH_START = 'DATA/NEW_EPISODES_FETCH_START';
export const NEW_EPISODES_FETCH_SUCCESS = 'DATA/NEW_EPISODES_FETCH_SUCCESS';
export const NEW_EPISODES_FETCH_ERROR = 'DATA/NEW_EPISODES_FETCH_ERROR';

export const MEDIUM_SCENES_FETCH_START = 'DATA/MEDIUM_SCENES_FETCH_START';
export const MEDIUM_SCENES_FETCH_SUCCESS = 'DATA/MEDIUM_SCENES_FETCH_SUCCESS';
export const MEDIUM_SCENES_FETCH_ERROR = 'DATA/MEDIUM_SCENES_FETCH_ERROR';

export const SAVE_SCENE_START = 'DATA/SAVE_SCENE_START';
export const SAVE_SCENE_SUCCESS = 'DATA/SAVE_SCENE_SUCCESS';
export const SAVE_SCENE_ERROR = 'DATA/SAVE_SCENE_ERROR';

export const REMOVE_SAVED_SCENE_START = 'DATA/REMOVE_SAVED_SCENE_START';
export const REMOVE_SAVED_SCENE_SUCCESS = 'DATA/REMOVE_SAVED_SCENE_SUCCESS';
export const REMOVE_SAVED_SCENE_ERROR = 'DATA/REMOVE_SAVED_SCENE_ERROR';

export const CHARACTER_VIEW_START = 'DATA/CHARACTER_VIEW_START';
export const CHARACTER_VIEW_SUCCESS = 'DATA/CHARACTER_VIEW_SUCCESS';
export const CHARACTER_VIEW_ERROR = 'DATA/CHARACTER_VIEW_ERROR';

export const MEDIUM_VIEW_START = 'DATA/MEDIUM_VIEW_START';
export const MEDIUM_VIEW_SUCCESS = 'DATA/MEDIUM_VIEW_SUCCESS';
export const MEDIUM_VIEW_ERROR = 'DATA/MEDIUM_VIEW_ERROR';

export const PRODUCT_VIEW_START = 'DATA/PRODUCT_VIEW_START';
export const PRODUCT_VIEW_SUCCESS = 'DATA/PRODUCT_VIEW_SUCCESS';
export const PRODUCT_VIEW_ERROR = 'DATA/PRODUCT_VIEW_ERROR';

export const PRODUCT_IMPRESSION_START = 'DATA/PRODUCT_IMPRESSION_START';
export const PRODUCT_IMPRESSION_SUCCESS = 'DATA/PRODUCT_IMPRESSION_SUCCESS';
export const PRODUCT_IMPRESSION_ERROR = 'DATA/PRODUCT_IMPRESSION_ERROR';

export const SCENE_VIEW_START = 'DATA/SCENE_VIEW_START';
export const SCENE_VIEW_SUCCESS = 'DATA/SCENE_VIEW_SUCCESS';
export const SCENE_VIEW_ERROR = 'DATA/SCENE_VIEW_ERROR';

export const USER_VIEW_START = 'DATA/USER_VIEW_START';
export const USER_VIEW_SUCCESS = 'DATA/USER_VIEW_SUCCESS';
export const USER_VIEW_ERROR = 'DATA/USER_VIEW_ERROR';

export const POPULAR_MEDIA_FETCH_START = 'DATA/POPULAR_MEDIA_FETCH_START';
export const POPULAR_MEDIA_FETCH_SUCCESS = 'DATA/POPULAR_MEDIA_FETCH_SUCCESS';
export const POPULAR_MEDIA_FETCH_ERROR = 'DATA/POPULAR_MEDIA_FETCH_ERROR';

export const MEDIUM_RECENT_EPISODES_FETCH_START = 'DATA/MEDIUM_RECENT_EPISODES_FETCH_START';
export const MEDIUM_RECENT_EPISODES_FETCH_SUCCESS = 'DATA/MEDIUM_RECENT_EPISODES_FETCH_SUCCESS';
export const MEDIUM_RECENT_EPISODES_FETCH_ERROR = 'DATA/MEDIUM_RECENT_EPISODES_FETCH_ERROR';

// Actions creators
// ////////////////

// Multiple views of an entity are reduced to a single view using the slowdown function.

export const characterView = makeApiActionCreator(slowdown(eventsApi.postCharacterView, 300), CHARACTER_VIEW_START, CHARACTER_VIEW_SUCCESS, CHARACTER_VIEW_ERROR);

export const mediumView = makeApiActionCreator(slowdown(eventsApi.postMediumView, 300), MEDIUM_VIEW_START, MEDIUM_VIEW_SUCCESS, MEDIUM_VIEW_ERROR);

export const productView = makeApiActionCreator(slowdown(eventsApi.postProductView, 300), PRODUCT_VIEW_START, PRODUCT_VIEW_SUCCESS, PRODUCT_VIEW_ERROR);

export const productImpression = makeApiActionCreator(eventsApi.postProductImpression, PRODUCT_IMPRESSION_START, PRODUCT_IMPRESSION_SUCCESS, PRODUCT_IMPRESSION_ERROR);

export const sceneView = makeApiActionCreator(slowdown(eventsApi.postSceneView, 300), SCENE_VIEW_START, SCENE_VIEW_SUCCESS, SCENE_VIEW_ERROR);

export const userView = makeApiActionCreator(slowdown(eventsApi.postUserView, 300), USER_VIEW_START, USER_VIEW_SUCCESS, USER_VIEW_ERROR);

export const fetchCharacter = makeApiActionCreator(charactersApi.getCharacter, CHARACTER_FETCH_START, CHARACTER_FETCH_SUCCESS, CHARACTER_FETCH_ERROR);

export const fetchCharacterProducts = makeApiActionCreator(productsApi.getCharacterProducts, CHARACTER_PRODUCTS_FETCH_START, CHARACTER_PRODUCTS_FETCH_SUCCESS, CHARACTER_PRODUCTS_FETCH_ERROR);

export const addCharacterSubscriber = makeApiActionCreator(charactersApi.addCharacterSubscriber, CHARACTER_SUBSCRIBER_ADD_START, CHARACTER_SUBSCRIBER_ADD_SUCCESS, CHARACTER_SUBSCRIBER_ADD_ERROR);

export const removeCharacterSubscriber = makeApiActionCreator(charactersApi.removeCharacterSubscriber, CHARACTER_SUBSCRIBER_REMOVE_START, CHARACTER_SUBSCRIBER_REMOVE_SUCCESS, CHARACTER_SUBSCRIBER_REMOVE_ERROR);

export const fetchMediaRecentlyAdded = makeApiActionCreator(mediaApi.getRecentlyAdded, MEDIA_RECENTLY_ADDED_FETCH_START, MEDIA_RECENTLY_ADDED_FETCH_SUCCESS, MEDIA_RECENTLY_ADDED_FETCH_ERROR);

export const fetchProductsRecentlyAddedToWishlist = makeApiActionCreator(productsApi.getRecentlyAddedToWishlist, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR);

export const fetchPopularProducts = makeApiActionCreator(productsApi.getPopularProducts, POPULAR_PRODUCTS_FETCH_START, POPULAR_PRODUCTS_FETCH_SUCCESS, POPULAR_PRODUCTS_FETCH_ERROR);

export const fetchProduct = makeApiActionCreator(productsApi.getProduct, PRODUCT_FETCH_START, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_ERROR);

export const fetchUbProduct = makeUbApiActionCreator(ubApi.crawlProduct, UB_PRODUCT_FETCH_START, UB_PRODUCT_FETCH_SUCCESS, UB_PRODUCT_FETCH_ERROR);

export const fetchUser = makeApiActionCreator(usersApi.getUser, USER_FETCH_START, USER_FETCH_SUCCESS, USER_FETCH_ERROR);

export const fetchSavedScenesOfUser = makeApiActionCreator(scenesApi.getSavedScenesOfUser, SAVED_SCENES_OF_USER_FETCH_START, SAVED_SCENES_OF_USER_FETCH_SUCCESS, SAVED_SCENES_OF_USER_FETCH_ERROR);

export const fetchTvGuideEntries = makeApiActionCreator(tvGuideApi.fetchTvGuideEntries, TV_GUIDE_ENTRIES_FETCH_START, TV_GUIDE_ENTRIES_FETCH_SUCCESS, TV_GUIDE_ENTRIES_FETCH_ERROR);

export const fetchWishlistOfUser = makeApiActionCreator(wishlistsApi.getWishlistOfUser, WISHLIST_OF_USER_FETCH_START, WISHLIST_OF_USER_FETCH_SUCCESS, WISHLIST_OF_USER_FETCH_ERROR);

export const fetchWishlistsOfUser = makeApiActionCreator(wishlistsApi.getWishlistsOfUser, WISHLISTS_OF_USER_FETCH_START, WISHLISTS_OF_USER_FETCH_SUCCESS, WISHLISTS_OF_USER_FETCH_ERROR);

export const fetchWishlistProducts = makeApiActionCreator(productsApi.getWishlistProducts, WISHLIST_PRODUCTS_FETCH_START, WISHLIST_PRODUCTS_FETCH_SUCCESS, WISHLIST_PRODUCTS_FETCH_ERROR);

export const addWishlistProduct = makeApiActionCreator(wishlistsApi.addWishlistProduct, WISHLIST_PRODUCT_ADD_START, WISHLIST_PRODUCT_ADD_SUCCESS, WISHLIST_PRODUCT_ADD_ERROR);

export const createWishlist = makeApiActionCreator(wishlistsApi.createWishlist, WISHLIST_CREATE_START, WISHLIST_CREATE_SUCCESS, WISHLIST_CREATE_ERROR);

export const updateWishlist = makeApiActionCreator(wishlistsApi.updateWishlist, WISHLIST_UPDATE_START, WISHLIST_UPDATE_SUCCESS, WISHLIST_UPDATE_ERROR);

export const removeWishlist = makeApiActionCreator(wishlistsApi.removeWishlist, WISHLIST_REMOVE_START, WISHLIST_REMOVE_SUCCESS, WISHLIST_REMOVE_ERROR);

export const removeWishlistProduct = makeApiActionCreator(wishlistsApi.removeWishlistProduct, WISHLIST_PRODUCT_REMOVE_START, WISHLIST_PRODUCT_REMOVE_SUCCESS, WISHLIST_PRODUCT_REMOVE_ERROR);

export const fetchMedium = makeApiActionCreator(mediaApi.getMedium, MEDIUM_FETCH_START, MEDIUM_FETCH_SUCCESS, MEDIUM_FETCH_ERROR);

export const fetchMediumCharacters = makeApiActionCreator(charactersApi.getMediumCharacters, MEDIUM_CHARACTERS_FETCH_START, MEDIUM_CHARACTERS_FETCH_SUCCESS, MEDIUM_CHARACTERS_FETCH_ERROR);

export const fetchMediumProducts = makeApiActionCreator(productsApi.getMediumProducts, MEDIUM_PRODUCTS_FETCH_START, MEDIUM_PRODUCTS_FETCH_SUCCESS, MEDIUM_PRODUCTS_FETCH_ERROR);

export const fetchMediumTopProducts = makeApiActionCreator(productsApi.getMediumTopProducts, MEDIUM_TOP_PRODUCTS_FETCH_START, MEDIUM_TOP_PRODUCTS_FETCH_SUCCESS, MEDIUM_TOP_PRODUCTS_FETCH_ERROR);

export const fetchMediumTopUserProducts = makeApiActionCreator(productsApi.getMediumTopUserProducts, MEDIUM_TOP_USER_PRODUCTS_FETCH_START, MEDIUM_TOP_USER_PRODUCTS_FETCH_SUCCESS, MEDIUM_TOP_USER_PRODUCTS_FETCH_ERROR);

export const fetchMediumSeasons = makeApiActionCreator(mediaApi.getMediumSeasons, MEDIUM_SEASONS_FETCH_START, MEDIUM_SEASONS_FETCH_SUCCESS, MEDIUM_SEASONS_FETCH_ERROR);

export const fetchMediumEpisodes = makeApiActionCreator(mediaApi.getMediumEpisodes, MEDIUM_EPISODES_FETCH_START, MEDIUM_EPISODES_FETCH_SUCCESS, MEDIUM_EPISODES_FETCH_ERROR);

export const fetchNewEpisodes = makeApiActionCreator(mediaApi.getNewEpisodes, NEW_EPISODES_FETCH_START, NEW_EPISODES_FETCH_SUCCESS, NEW_EPISODES_FETCH_ERROR);

export const fetchMediumScenes = makeApiActionCreator(scenesApi.getMediumScenes, MEDIUM_SCENES_FETCH_START, MEDIUM_SCENES_FETCH_SUCCESS, MEDIUM_SCENES_FETCH_ERROR);

export const addMediumSubscriber = makeApiActionCreator(mediaApi.addMediumSubscriber, MEDIUM_SUBSCRIBER_ADD_START, MEDIUM_SUBSCRIBER_ADD_SUCCESS, MEDIUM_SUBSCRIBER_ADD_ERROR);

export const removeMediumSubscriber = makeApiActionCreator(mediaApi.removeMediumSubscriber, MEDIUM_SUBSCRIBER_REMOVE_START, MEDIUM_SUBSCRIBER_REMOVE_SUCCESS, MEDIUM_SUBSCRIBER_REMOVE_ERROR);

export const fetchNewScenesForYou = makeApiActionCreator(scenesApi.getNewScenesForYou, NEW_SCENES_FOR_YOU_FETCH_START, NEW_SCENES_FOR_YOU_FETCH_SUCCESS, NEW_SCENES_FOR_YOU_FETCH_ERROR);

export const fetchMediumNewScenesForYou = makeApiActionCreator(scenesApi.getMediumNewScenesForYou, MEDIUM_NEW_SCENES_FOR_YOU_FETCH_START, MEDIUM_NEW_SCENES_FOR_YOU_FETCH_SUCCESS, MEDIUM_NEW_SCENES_FOR_YOU_FETCH_ERROR);

export const fetchScene = makeApiActionCreator(scenesApi.getScene, SCENE_FETCH_START, SCENE_FETCH_SUCCESS, SCENE_FETCH_ERROR);

export const saveScene = makeApiActionCreator(scenesApi.saveScene, SAVE_SCENE_START, SAVE_SCENE_SUCCESS, SAVE_SCENE_ERROR);

export const removeSavedScene = makeApiActionCreator(scenesApi.removeSavedScene, REMOVE_SAVED_SCENE_START, REMOVE_SAVED_SCENE_SUCCESS, REMOVE_SAVED_SCENE_ERROR);

export const fetchPopularSeries = makeApiActionCreator(mediaApi.getPopularMedia, POPULAR_MEDIA_FETCH_START, POPULAR_MEDIA_FETCH_SUCCESS, POPULAR_MEDIA_FETCH_ERROR);

export const fetchMediumRecentEpisodes = makeApiActionCreator(mediaApi.getMediumRecentEpisodes, MEDIUM_RECENT_EPISODES_FETCH_START, MEDIUM_RECENT_EPISODES_FETCH_SUCCESS, MEDIUM_RECENT_EPISODES_FETCH_ERROR);
