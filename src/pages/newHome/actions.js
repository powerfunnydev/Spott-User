import { makeApiActionCreator } from '../../data/actions';
import * as api from '../../api/new';

// Action types
// ////////////

export const GET_TRENDING_TOPICS_START = 'NEW/GET_TRENDING_TOPICS_START';
export const GET_TRENDING_TOPICS_SUCCESS = 'NEW/GET_TRENDING_TOPICS_SUCCESS';
export const GET_TRENDING_TOPICS_ERROR = 'NEW/GET_TRENDING_TOPICS_ERROR';

export const GET_TOPIC_START = 'NEW/GET_TOPIC_START';
export const GET_TOPIC_SUCCESS = 'NEW/GET_TOPIC_SUCCESS';
export const GET_TOPIC_ERROR = 'NEW/GET_TOPIC_ERROR';

export const GET_TOPIC_SPOTTS_START = 'NEW/GET_TOPIC_SPOTTS_START';
export const GET_TOPIC_SPOTTS_SUCCESS = 'NEW/GET_TOPIC_SPOTTS_SUCCESS';
export const GET_TOPIC_SPOTTS_ERROR = 'NEW/GET_TOPIC_SPOTTS_ERROR';

export const GET_TOPIC_RELATED_START = 'NEW/GET_TOPIC_RELATED_START';
export const GET_TOPIC_RELATED_SUCCESS = 'NEW/GET_TOPIC_RELATED_SUCCESS';
export const GET_TOPIC_RELATED_ERROR = 'NEW/GET_TOPIC_RELATED_ERROR';

export const SET_TOPIC_SUBSCRIBER_START = 'NEW/SET_TOPIC_SUBSCRIBER_START';
export const SET_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/SET_TOPIC_SUBSCRIBER_SUCCESS';
export const SET_TOPIC_SUBSCRIBER_ERROR = 'NEW/SET_TOPIC_SUBSCRIBER_ERROR';

export const REMOVE_TOPIC_SUBSCRIBER_START = 'NEW/REMPVE_TOPIC_SUBSCRIBER_START';
export const REMOVE_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/REMOVE_TOPIC_SUBSCRIBER_SUCCESS';
export const REMOVE_TOPIC_SUBSCRIBER_ERROR = 'NEW/REMOVE_TOPIC_SUBSCRIBER_ERROR';

export const GET_SPOTTS_LIST_START = 'NEW/GET_SPOTTS_LIST_START';
export const GET_SPOTTS_LIST_SUCCESS = 'NEW/GET_SPOTTS_LIST_SUCCESS';
export const GET_SPOTTS_LIST_ERROR = 'NEW/GET_SPOTTS_LIST_ERROR';

export const LOAD_SPOTT_START = 'NEW/LOAD_SPOTT_START';
export const LOAD_SPOTT_SUCCESS = 'NEW/LOAD_SPOTT_SUCCESS';
export const LOAD_SPOTT_ERROR = 'NEW/LOAD_SPOTT_ERROR';

export const GET_SPOTT_START = 'NEW/GET_SPOTT_START';
export const GET_SPOTT_SUCCESS = 'NEW/GET_SPOTT_SUCCESS';
export const GET_SPOTT_ERROR = 'NEW/GET_SPOTT_ERROR';

export const GET_SPOTT_LOVERS_START = 'NEW/GET_SPOTT_LOVERS_START';
export const GET_SPOTT_LOVERS_SUCCESS = 'NEW/GET_SPOTT_LOVERS_SUCCESS';
export const GET_SPOTT_LOVERS_ERROR = 'NEW/GET_SPOTT_LOVERS_ERROR';

export const SET_SPOTT_LOVER_START = 'NEW/SET_SPOTT_LOVER_START';
export const SET_SPOTT_LOVER_SUCCESS = 'NEW/SET_SPOTT_LOVER_SUCCESS';
export const SET_SPOTT_LOVER_ERROR = 'NEW/SET_SPOTT_LOVER_ERROR';

export const REMOVE_SPOTT_LOVER_START = 'NEW/REMOVE_SPOTT_LOVER_START';
export const REMOVE_SPOTT_LOVER_SUCCESS = 'NEW/REMOVE_SPOTT_LOVER_SUCCESS';
export const REMOVE_SPOTT_LOVER_ERROR = 'NEW/REMOVE_SPOTT_LOVER_ERROR';

// Actions creators
// ////////////////

export const loadTrendingTopics = makeApiActionCreator(api.getTrendingTopics, GET_TRENDING_TOPICS_START, GET_TRENDING_TOPICS_SUCCESS, GET_TRENDING_TOPICS_ERROR);

export const loadTopic = makeApiActionCreator(api.getTopic, GET_TOPIC_START, GET_TOPIC_SUCCESS, GET_TOPIC_ERROR);

export const loadTopicSpotts = makeApiActionCreator(api.getTopicSpotts, GET_TOPIC_SPOTTS_START, GET_TOPIC_SPOTTS_SUCCESS, GET_TOPIC_SPOTTS_ERROR);

export const loadTopicRelated = makeApiActionCreator(api.getTopicRelated, GET_TOPIC_RELATED_START, GET_TOPIC_RELATED_SUCCESS, GET_TOPIC_RELATED_ERROR);

export const setTopicSubscriber = makeApiActionCreator(api.setTopicSubscriber, SET_TOPIC_SUBSCRIBER_START, SET_TOPIC_SUBSCRIBER_SUCCESS, SET_TOPIC_SUBSCRIBER_ERROR);

export const removeTopicSubscriber = makeApiActionCreator(api.removeTopicSubscriber, REMOVE_TOPIC_SUBSCRIBER_START, REMOVE_TOPIC_SUBSCRIBER_SUCCESS, REMOVE_TOPIC_SUBSCRIBER_ERROR);

export function loadTopicDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch(loadTopic({ uuid }));
      dispatch(loadTopicSpotts({ uuid }));
      dispatch(loadTopicRelated({ uuid }));
    } catch (error) {
      throw error;
    }
  };
}

export const loadSpottsList = makeApiActionCreator(api.getSpottsList, GET_SPOTTS_LIST_START, GET_SPOTTS_LIST_SUCCESS, GET_SPOTTS_LIST_ERROR);

export const fetchSpott = makeApiActionCreator(api.getSpott, GET_SPOTT_START, GET_SPOTT_SUCCESS, GET_SPOTT_ERROR);

export function loadSpott ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_SPOTT_START, uuid });
      return await dispatch(fetchSpott({ uuid }));
    } catch (error) {
      return dispatch({ type: LOAD_SPOTT_ERROR, uuid, error });
    }
  };
}

export const loadSpottLovers = makeApiActionCreator(api.getSpottLovers, GET_SPOTT_LOVERS_START, GET_SPOTT_LOVERS_SUCCESS, GET_SPOTT_LOVERS_ERROR);

export const setSpottLover = makeApiActionCreator(api.setSpottLover, SET_SPOTT_LOVER_START, SET_SPOTT_LOVER_SUCCESS, SET_SPOTT_LOVER_ERROR);

export const removeSpottLover = makeApiActionCreator(api.removeSpottLover, REMOVE_SPOTT_LOVER_START, REMOVE_SPOTT_LOVER_SUCCESS, REMOVE_SPOTT_LOVER_ERROR);
