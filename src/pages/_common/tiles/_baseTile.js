import Radium from 'radium';
import React, { Component, PropTypes } from 'react';

@Radium
export default class BaseTile extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  };

  static styles = {
    container: {
      backgroundColor: '#ffffff',
      borderRadius: '0.25em',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.3)',
      // marginBottom: '15px',
      transition: 'transform 0.25s ease-in-out',
      ':hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.4)'
      }
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { children, style } = this.props;
    return (
      <div style={style}>
        <div style={styles.container}>
          {children}
        </div>
      </div>
    );
  }
}
