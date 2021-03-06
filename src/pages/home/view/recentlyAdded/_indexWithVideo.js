// /* eslint-disable react/no-set-state */
// import React, { Component, PropTypes } from 'react';
// import Radium from 'radium';
// import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
// import { colors, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle, responsiveBackgroundImage, Button, Container, Title, UpperCaseSubtitle } from '../../../_common/buildingBlocks';
// import ImmutablePropTypes from 'react-immutable-proptypes';
// import TopLevelMediumTiles from '../../../_common/tiles/topLevelMediumTiles';
// import localized from '../../../_common/localized';
// import { recentlyAddedSelector } from '../../selectors';
// import Video from './video';
// import Playlist from './playlist';
// import { isServer } from '../../../../utils';
//
// class SharingHeaders extends Component {
//   static propTypes = {
//     currentLocale: PropTypes.string.isRequired,
//     video: PropTypes.object.isRequired
//   }
//
//   render () {
//     const { currentLocale, video } = this.props;
//     const meta = [
//       { property: 'fb:app_id', content: '418487828343937' },
//       { property: 'og:description', content: video.description[currentLocale] },
//       { property: 'og:image:height', content: video.social.dimension.height },
//       { property: 'og:image:secure_url', content: video.social.url },
//       { property: 'og:image:type', content: 'image/jpeg' },
//       { property: 'og:image:width', content: video.social.dimension.width },
//       { property: 'og:image', content: video.social.url },
//       { property: 'og:site_name', content: 'Spott' },
//       { property: 'og:title', content: video.title[currentLocale] },
//       { property: 'og:type', content: 'website' },
//       { property: 'og:url', content: location.href },
//       { property: 'twitter:card', content: 'summary' },
//       { property: 'twitter:creator', content: currentLocale === 'fr' ? '@SpottBE_fr' : '@SpottBE_nl' },
//       { property: 'twitter:description', content: video.description[currentLocale] },
//       { property: 'twitter:domain', content: 'https://spott.tv' },
//       { property: 'twitter:image', content: video.social.url },
//       { property: 'twitter:site', content: currentLocale === 'fr' ? '@SpottBE_fr' : '@SpottBE_nl' },
//       { property: 'twitter:title', content: video.title[currentLocale] }
//     ];
//     return <Helmet meta={meta} />;
//   }
// }
//
// @localized
// @connect(recentlyAddedSelector)
// @Radium
// export default class RecentlyAdded extends Component {
//
//   static propTypes = {
//     currentLocale: PropTypes.string.isRequired,
//     firstMedium: ImmutablePropTypes.mapContains({
//       profileImage: ImmutablePropTypes.mapContains({
//         url: PropTypes.string.isRequired
//       }).isRequired,
//       title: PropTypes.string.isRequired
//     }),
//     otherRecentlyAddedMedia: PropTypes.any.isRequired,
//     params: PropTypes.shape({
//       trailer: PropTypes.string
//     }),
//     playlist: PropTypes.array.isRequired,
//     style: PropTypes.object,
//     t: PropTypes.func.isRequired,
//     videosById: PropTypes.object.isRequired
//   }
//
//   constructor (props) {
//     super(props);
//     this.state = { fade: false };
//   }
//
//   componentWillReceiveProps (newProps) {
//     if (this.props.params.trailer !== newProps.params.trailer) {
//       this.setState({ fade: true });
//       setTimeout(() => this.setState({ fade: false }), 300);
//     }
//   }
//
//   static styles = {
//     button: {
//       marginBottom: '1.25em',
//       [mediaQueries.medium]: {
//         marginBottom: '2em'
//       }
//     },
//     wrapper: {
//       backgroundSize: 'cover',
//       backgroundPosition: 'center center',
//       position: 'relative',
//       paddingTop: '3em',
//       paddingBottom: 0,
//       marginBottom: '4.5em',
//       [mediaQueries.medium]: {
//         paddingTop: '5.875em'
//       }
//     },
//     overlay: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       bottom: 0,
//       right: 0,
//       opacity: 0.5,
//       backgroundImage: 'linear-gradient(to bottom, #000000, rgb(255, 255, 255))',
//       pointerEvents: 'none' // Don't capture pointer events. "Click through..."
//     },
//     title: {
//       color: 'white',
//       marginBottom: '0.17em',
//       fontSize: '2.8em',
//       paddingTop: 20,
//       [mediaQueries.small]: {
//         fontSize: '2.3em'
//       },
//       [mediaQueries.medium]: {
//         paddingTop: 0
//       },
//       [mediaQueries.large]: {
//         fontSize: '2.3em'
//       }
//     },
//     tilesTitle: {
//       color: colors.white
//     },
//     upperCaseSubtitle: {
//       color: colors.white,
//       marginBottom: '3.2em'
//     },
//     tiles: {
//       transform: 'translateY(3.8em)'
//     },
//     innerWrapper: {
//       width: '100%',
//       position: 'relative',
//       fontSize: '12px',
//       [mediaQueries.small]: {
//         fontSize: '14px'
//       },
//       [mediaQueries.medium]: {
//         fontSize: '16px',
//         width: 400,
//         paddingLeft: 20
//       },
//       [mediaQueries.large]: {
//         fontSize: '16px',
//         width: 600
//       }
//     },
//     playlistTitle: {
//       color: '#ffffff',
//       ...makeTextStyle(fontWeights.light, '1.125em', '0.4px'),
//       paddingBottom: 20
//     },
//     container: {
//       base: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         [mediaQueries.medium]: {
//           flexWrap: 'initial'
//         },
//         opacity: 1,
//         transition: 'opacity 300ms ease-in'
//       },
//       fade: {
//         opacity: 0,
//         transition: 'opacity 300ms ease-out'
//       }
//     },
//     video: {
//       // Aspect ratio: 16:9
//       paddingBottom: '56.25%',
//       [mediaQueries.medium]: {
//         paddingBottom: '37%'
//       }
//     }
//   };
//
//   render () {
//     const { styles } = this.constructor;
//     const { currentLocale, firstMedium, params, playlist, otherRecentlyAddedMedia, style, t, videosById } = this.props;
//     const videoId = params && params.trailer || 'trailer-1';
//     const video = videosById[videoId];
//     return (
//       <div style={[
//         styles.wrapper,
//         firstMedium && firstMedium.get('profileImage') && responsiveBackgroundImage(firstMedium.getIn([ 'profileImage', 'url' ])),
//         style
//       ]}>
//         {/* Only override the share headers if the trailer url was shared. */}
//         {params.trailer &&
//           <SharingHeaders currentLocale={currentLocale} video={video}/>}
//         <Container>
//           <div style={styles.overlay} />
//           <div style={[ styles.container.base, this.state.fade && styles.container.fade ]}>
//             {!isServer() && <Video style={styles.video} video={video}/>}
//             <div style={styles.innerWrapper}>
//               <Title style={styles.title}>
//                 {(video && video.label[currentLocale]) || (firstMedium && firstMedium.get('title')) || '\u00A0'}
//               </Title>
//               <UpperCaseSubtitle style={styles.upperCaseSubtitle} >{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
//               <Button disabled={!firstMedium} style={{ ...pinkButtonStyle, ...styles.button }} to={(video && video.medium.shareUrl[currentLocale]) || (firstMedium && firstMedium.get('shareUrl'))}>{t('home.recentlyAdded.browseButton')}</Button>
//
//               <h3 style={styles.playlistTitle}>{t('home.recentlyAdded.moreFiftyShades')}</h3>
//               <Playlist playlist={playlist.filter(({ id }) => id !== videoId)}/>
//             </div>
//           </div>
//
//           <TopLevelMediumTiles items={otherRecentlyAddedMedia}
//             style={styles.tiles} title={t('home.recentlyAdded.title')} titleStyle={styles.tilesTitle} />
//         </Container>
//       </div>
//     );
//   }
//
// }
