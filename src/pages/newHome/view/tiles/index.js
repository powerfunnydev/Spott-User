/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import { IconArrow3 } from '../icons';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Tiles extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    tileOffsetWidth: PropTypes.number.isRequired,
    tilesCount: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);
    this.onMoveLeft = ::this.onMoveLeft;
    this.onMoveRight = ::this.onMoveRight;
    this.state = {
      tileIndex: 0,
      translateOffset: 0,
      tilesStyle: {
        transform: 'translateX(0px)'
      }
    };
    this.tilesWidths = [];
    this.elsInContainerCount = 0;
  }

  componentDidMount () {
    this.tilesWidths = new Array(this.props.tilesCount).fill(1).map((item, index) => {
      return ReactDOM.findDOMNode(this.refs[index]).clientWidth + this.props.tileOffsetWidth;
    });

    let width = this.tilesContainer.clientWidth;
    let elsCount = 0;
    this.tilesWidths.map((elWidth) => {
      width -= elWidth;
      Math.round(width / elWidth) >= 0 && elsCount++;
    });
    this.elsInContainerCount = elsCount;
  }

  onMoveLeft () {
    if (this.state.tileIndex > 0) {
      const translateOffset = this.state.translateOffset + this.tilesWidths[this.state.tileIndex - 1];
      this.setState({
        translateOffset,
        tilesStyle: {
          transform: `translateX(${translateOffset}px)`
        },
        tileIndex: this.state.tileIndex - 1
      });
    }
  }

  onMoveRight () {
    if (this.elsInContainerCount + this.state.tileIndex < this.props.tilesCount) {
      const translateOffset = this.state.translateOffset - this.tilesWidths[this.state.tileIndex];
      this.setState({
        translateOffset,
        tilesStyle: {
          transform: `translateX(${translateOffset}px)`
        },
        tileIndex: this.state.tileIndex + 1
      });
    }
  }

  render () {
    const { tilesCount, children } = this.props;
    const { tilesStyle, tileIndex } = this.state;

    return (
      <div ref={(ref) => { this.tilesContainer = ref; }} styleName='tiles-wrapper'>
        <div className={tileIndex ? styles['tiles-btn-active'] : styles['tiles-btn-inactive']} styleName='tiles-btn-left' onClick={this.onMoveLeft}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
        <div style={tilesStyle} styleName='tiles-list'>
          {React.Children.map(children, (element, idx) => {
            return React.cloneElement(element, { ref: idx });
          })}
        </div>
        <div className={this.elsInContainerCount + tileIndex >= tilesCount ? styles['tiles-btn-inactive'] : styles['tiles-btn-active']} styleName='tiles-btn-right' onClick={this.onMoveRight}>
          <div styleName='tiles-btn'>
            <i><IconArrow3/></i>
          </div>
        </div>
      </div>
    );
  }
}
