import React, { Component, PropTypes } from 'react';
// import NewScenesForYou from './newScenesForYou';
// import PickedForYou from './pickedForYou';
import TopProducts from './topProducts';
// import RecentEpisodes from './recentEpisodes';
// import PeopleAlsoWatch from './peopleAlsoWatch';

export default class Overview extends Component {

  static propTypes = {
    params: PropTypes.shape({
      seriesId: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    const { params: { seriesId } } = this.props;
    return (
      <div>
        {/*
        <NewScenesForYou />
        <PickedForYou />
        <RecentEpisodes />
        */}
        <TopProducts seriesId={seriesId} />
        {/*
        <PeopleAlsoWatch />
        */}
      </div>
    );
  }

}
