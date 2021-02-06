import { connect } from 'react-redux';
import { makeSelectClaimForUri, SETTINGS, COLLECTIONS_CONSTS, makeSelectNextUrlForCollection } from 'lbry-redux';
import { withRouter } from 'react-router';
import { makeSelectIsPlayerFloating, makeSelectNextUnplayedRecommended } from 'redux/selectors/content';
import { makeSelectClientSetting } from 'redux/selectors/settings';
import { doSetPlayingUri, doPlayUri } from 'redux/actions/content';
import AutoplayCountdown from './view';
import { selectModal } from 'redux/selectors/app';

/*
AutoplayCountdown does not fetch it's own next content to play, it relies on <RecommendedContent> being rendered. This is dumb but I'm just the guy who noticed

get collectionId and collectionIndex from content to use in collectoinSelector

 */
const select = (state, props) => {
  const { location } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const collectionId = urlParams.get(COLLECTIONS_CONSTS.COLLECTION_ID);
  const collectionIndex = urlParams.get(COLLECTIONS_CONSTS.COLLECTION_INDEX);
  const collectionIndexNumber = collectionIndex ? Number(collectionIndex) : 0;

  let nextRecommendedUri;
  if (collectionId) {
    nextRecommendedUri = makeSelectNextUrlForCollection(collectionId, Number(collectionIndexNumber) || 0)(state);
  } else {
    nextRecommendedUri = makeSelectNextUnplayedRecommended(props.uri)(state);
  }

  return {
    collectionId,
    collectionIndexNumber,
    nextRecommendedUri,
    nextRecommendedClaim: makeSelectClaimForUri(nextRecommendedUri)(state),
    isFloating: makeSelectIsPlayerFloating(props.location)(state),
    autoplay: makeSelectClientSetting(SETTINGS.AUTOPLAY)(state),
    modal: selectModal(state),
  };
};

export default withRouter(
  connect(select, {
    doSetPlayingUri,
    doPlayUri,
  })(AutoplayCountdown)
);
