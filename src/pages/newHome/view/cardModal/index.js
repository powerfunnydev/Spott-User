/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconHeart, IconDots } from '../icons';
import CardMarkers from '../cardMarkers';
import Card from '../card';
import Topics from '../topics';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class CardModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.users = [
      'http://lorempixel.com/26/26/people/1',
      'http://lorempixel.com/26/26/abstract/1',
      'http://lorempixel.com/26/26/abstract/2',
      'http://lorempixel.com/26/26/abstract/3',
      'http://lorempixel.com/26/26/abstract/4',
      'http://lorempixel.com/26/26/abstract/5',
      'http://lorempixel.com/26/26/abstract/6',
      'http://lorempixel.com/26/26/abstract/7',
      'http://lorempixel.com/26/26/abstract/8',
      'http://lorempixel.com/26/26/abstract/9',
      'http://lorempixel.com/26/26/abstract/10'
    ];
  }

  componentDidMount () {
    this._originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount () {
    document.body.style.overflow = this._originalOverflow;
  }

  render () {
    const { onClose } = this.props;

    return (
      <ReactModal
        className={styles['modal-content']}
        isOpen
        overlayClassName={styles['modal-overlay']}
        onRequestClose={onClose}>
        <div styleName='card'>
          <div styleName='image'>
            <img src='http://lorempixel.com/592/830/abstract/7'/>
            <CardMarkers/>
          </div>
          <div styleName='products'>
            {new Array(7).fill(1).map((item, index) =>
              <div key={`product_${index}`} style={{ backgroundImage: `url(http://lorempixel.com/80/80/abstract/${index})` }} styleName='product'/>
            )}
          </div>
          <div styleName='content'>
            <h3 styleName='title'>Erin Lindsay in Chicago Med</h3>
            <div styleName='description'>
              Taken from Season 2 Episode 5 — Extreme Measures
            </div>
            <div styleName='topic-links'>
              <Link styleName='topic-link' to='#'>Gabriel Macht</Link>
              <Link styleName='topic-link' to='#'>Harvey Specter</Link>
              <Link styleName='topic-link' to='#'>Red Carpet</Link>
              <Link styleName='topic-link' to='#'>Tom Ford</Link>
              <Link styleName='topic-link' to='#'>Suits</Link>
              <Link styleName='topic-link' to='#'>Series</Link>
              <Link styleName='topic-link' to='#'>Suit</Link>
            </div>
          </div>
          <div styleName='footer'>
            <Link styleName='likes' to='#'>
              <i><IconHeart/></i>
              <span>24</span>
            </Link>
            <div styleName='users'>
              {new Array(5).fill(1).map((item, index) =>
                <Link
                  key={`user_${index}`}
                  style={{ zIndex: 5 - index, backgroundImage: `url(${this.users[Math.floor(Math.random() * this.users.length)]})` }}
                  styleName='user' to='#'/>
              )}
            </div>
            <Link styleName='moar' to='#'>
              <i><IconDots/></i>
            </Link>
          </div>
        </div>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics/>
          </div>
        </div>
        <div styleName='spotts'>
          <div styleName='spotts-title'>Similar Spotts</div>
          <div styleName='spotts-list'>
            {new Array(9).fill(1).map((item, index) =>
              <Card key={`modal_card_${index}`} />
            )}
          </div>
        </div>
      </ReactModal>
    );
  }
}