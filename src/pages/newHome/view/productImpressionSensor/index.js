import React, { Component, PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { trackProductImpression } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(null, (dispatch) => ({
  productImpression: bindActionCreators(trackProductImpression, dispatch)
}))
export default class ProductImpressionSensor extends Component {

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    productId: PropTypes.string,
    productImpression: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.handleVisibilitySensor = ::this.handleVisibilitySensor;
  }

  handleVisibilitySensor (isVisible) {
    if (isVisible && this.props.productId) {
      // console.log('Impression!');
      this.props.productImpression({ uuid: this.props.productId });
    }
  }

  render () {
    const { active, delay } = this.props;
    const isActive = typeof active === 'undefined' ? true : active;
    const delayVal = typeof delay === 'undefined' ? 1000 : delay;

    return (
      <VisibilitySensor active={isActive} delay={delayVal} delayedCall onChange={this.handleVisibilitySensor}>
        { this.props.children }
      </VisibilitySensor>
    );
  }
}
