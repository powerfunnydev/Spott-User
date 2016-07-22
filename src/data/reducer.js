/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
import { fromJS, List, Map } from 'immutable';
import * as actions from './actions';
import { FETCHING, UPDATING, ERROR, LOADED } from './statusTypes';

function fetchStart (state, path) {
  // Get the data (entity/relations) from the state, which can be undefined.
  const data = state.getIn(path);
  // The data is already fetched if the data exist and there is no status.
  const loaded = data && data.get('_status') === LOADED;
  // When the data is already present, set it's status to 'updating'.
  // This way we now if there is already data, but it's updating.
  if (loaded) {
    return state.mergeIn(path, { _status: UPDATING });
  }
  // If the data do not exist, set the status to 'fetching'.
  return state.mergeIn(path, { _status: FETCHING });
}

function fetchSuccess (state, path, data) {
  return state.setIn(path, fromJS({ ...data, _status: LOADED }));
}

function fetchError (state, path, error) {
  return state.setIn(path, Map({ _error: error, _status: ERROR }));
}

function fetchListStart (state, listKey) {
  return fetchStart(state, [ 'lists', listKey ]);
}
function fetchListSuccess (state, listKey, entitiesKey, data) {
  data.forEach((item) => item._status = LOADED); // Add _status 'loaded' to each fetched entity.
  return state
    .mergeIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'lists', listKey ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}
function fetchListError (state, listKey, error) {
  return fetchError(state, [ 'lists', listKey ], error);
}

function fetchRelationsStart (state, relationsKey, relationEntryKey) {
  return fetchStart(state, [ 'relations', relationsKey, relationEntryKey ]);
}
function fetchRelationsSuccess (state, relationsKey, relationEntryKey, entitiesKey, data) {
  data.forEach((item) => item._status = LOADED); // Add _status 'loaded' to each fetched entity.
  return state
    .mergeIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'relations', relationsKey, relationEntryKey ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}
function fetchRelationsError (state, relationsKey, relationEntryKey, error) {
  return fetchError(state, [ 'relations', relationsKey, relationEntryKey ], error);
}

export default (state = fromJS({
  entities: {
    media: {},
    products: {},
    users: {},
    wishlists: {}
  },
  relations: {
    userHasWishlists: {},
    wishlistHasProducts: {}
  },
  lists: {
    popularProducts: {},
    recentlyAddedMedia: {},
    recentlyAddedToWishlistProducts: {}
  }
}), action) => {
  switch (action.type) {

    // Media
    // /////

    case actions.MEDIA_RECENTLY_ADDED_FETCH_START:
      return fetchListStart(state, 'recentlyAddedMedia');
    case actions.MEDIA_RECENTLY_ADDED_FETCH_SUCCESS:
      return fetchListSuccess(state, 'recentlyAddedMedia', 'media', action.data);
    case actions.MEDIA_RECENTLY_ADDED_FETCH_ERROR:
      return fetchListError(state, 'recentlyAddedMedia', action.error);

    // Products
    // ////////

    case actions.PRODUCT_FETCH_START:
      return fetchStart(state, [ 'entities', 'products', action.productId ]);
    case actions.PRODUCT_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId ], action.data);
    case actions.PRODUCT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'products', action.productId ], action.error);

    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START:
      return fetchListStart(state, 'recentlyAddedToWishlistProducts');
    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS:
      return fetchListSuccess(state, 'recentlyAddedToWishlistProducts', 'products', action.data);
    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR:
      return fetchListError(state, 'recentlyAddedToWishlistProducts', action.error);

    case actions.POPULAR_PRODUCTS_FETCH_START:
      return fetchListStart(state, 'popularProducts');
    case actions.POPULAR_PRODUCTS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'popularProducts', 'products', action.data);
    case actions.POPULAR_PRODUCTS_FETCH_ERROR:
      return fetchListError(state, 'popularProducts', action.error);

    case actions.WISHLIST_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'wishlistHasProducts', action.wishlistId);
    case actions.WISHLIST_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'wishlistHasProducts', action.wishlistId, 'products', action.data.data);
    case actions.WISHLIST_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'wishlistHasProducts', action.wishlistId, action.error);

    // Users
    // /////

    case actions.USER_FETCH_START:
      return fetchStart(state, [ 'entities', 'users', action.userId ]);
    case actions.USER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'users', action.userId ], action.data);
    case actions.USER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'users', action.userId ], action.error);

    // Wishlists
    // /////////

    case actions.WISHLISTS_OF_USER_FETCH_START:
      return fetchRelationsStart(state, 'userHasWishlists', action.userId);
    case actions.WISHLISTS_OF_USER_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'userHasWishlists', action.userId, 'wishlists', action.data.data);
    case actions.WISHLISTS_OF_USER_FETCH_ERROR:
      return fetchRelationsError(state, 'userHasWishlists', action.userId, action.error);

    // Uninteresting actions
    // ---------------------

    default:
      return state;

  }
};
