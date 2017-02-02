import { createSelector, createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, productsEntitiesSelector } from '../../data/selector';

export const currentProductIdSelector = (state) => state.getIn([ 'productDetail', 'currentProduct', 'id' ]);
const currentProductSelector = createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector);
const _selectedImageIdSelector = (state) => state.getIn([ 'productDetail', 'currentProduct', 'selectedImageId' ]);
export const selectedImageIdSelector = createSelector(
  currentProductSelector,
  _selectedImageIdSelector,
  (product, selectedImageId) => selectedImageId || (product.get('images') && product.getIn([ 'images', '0', 'id' ]))
);

export const selectedUbImageIdSelector = createSelector(
  currentProductSelector,
  _selectedImageIdSelector,
  (product, selectedImageId) => selectedImageId || (product.getIn([ 'ub', 'currentVariant', 'child', 'options', '0', 'images' ]) && product.getIn([ 'ub', 'currentVariant', 'child', 'options', '0', 'images', '0' ]))
);

const selectedUbProductVariantSelector = (state) => state.getIn([ 'productDetail', 'currentProduct', 'selectedUbProductVariant' ]);

// View selector for product detail page.
export const productSelector = createStructuredSelector({
  product: currentProductSelector,
  selectedImageId: selectedImageIdSelector,
  selectedUbImageId: selectedUbImageIdSelector,
  selectedUbProductVariant: selectedUbProductVariantSelector
});
