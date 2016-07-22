import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformDetailedProduct, transformListProduct } from './transformers';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getProduct (baseUrl, authenticationToken, locale, { productId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/product/products/${productId}`);
  const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/product/products/${productId}/similar`);
  const product = transformDetailedProduct(body);
  transformDetailedProduct.similarProducts = data.map((p) => ({
    shortName: p.shortName,
    image: p.image ? p.image.url : null,
    price: { currency: p.price.currency, amount: p.price.amount },
    id: p.uuid }
  ));
  return product;
}

/**
 * GET /user/users/:userId/wishlists/searches/products
 * Get recently added products of my wishlists. First 30.
 * @param {string} authenticationToken
 * @param {string} seriesId
 * @returnExample
 * {
 *   id: '123'
 *   posterImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47',
 *   profileImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90',
 *   subscribed: true,
 *   subscriberCount: 111
 * }
 * @throws NotFoundError
 * @throws UnauthorizedError
 * @throws UnexpectedError
 */
export async function getRecentlyAddedToWishlist (baseUrl, authenticationToken, locale, { userId }) {
  try {
    // TODO: currently 'Get all products that appear in a whishlist' https://appiness.atlassian.net/browse/SPOTBACK-440
    // TODO: must become 'Recently added to my wish list section' https://appiness.atlassian.net/browse/SWEWBSITE-43
    const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/searches/products?pageSize=30`);
    return data.map(transformListProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('user', error);
    }
    throw new UnexpectedError(error);
  }
}

// Returns only first 30 products.
export async function getPopularProducts (baseUrl, authenticationToken, locale) {
  try {
    // TODO: currently 'Get the top products based on the number of times they were tagged' https://appiness.atlassian.net/browse/APPTCORE-253
    // TODO: must become 'Get the top selling products for a medium' https://appiness.atlassian.net/browse/APPTCORE-252
    const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/product/products/searches/popular?pageSize=30`);
    return data.map(transformListProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
    }
    throw new UnexpectedError(error);
  }
}

/* TODO: out of scope
/**
 * GET /media/media/:mediumId/products
 * Get medium products.
 * @param {string} authenticationToken
 * @param {string} mediumId
 * @param {number} page
 * @returnExample see transformProduct
 * @throws NotFoundError
 * @throws UnauthorizedError
 * @throws UnexpectedError
 *
export async function getMediumProducts (baseUrl, authenticationToken, locale, { mediumId, page = 0 }) {
  try {
    const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media/${mediumId}/products?pageSize=50&page=${page}`);
    return data.map(transformProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('medium', error);
    }
    throw new UnexpectedError(error);
  }
}
*/

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistProducts (baseUrl, authenticationToken, locale, { page, userId, wishlistId }) {
  const { body: { data, pageCount } } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}/products?pageSize=500&page=${page}`);
  // Transform items
  return {
    data: data.map(transformListProduct),
    pageCount
  };
}
