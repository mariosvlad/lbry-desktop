import { connect } from 'react-redux';
import {
  doCollectionEdit,
  makeSelectClaimForUri,
  makeSelectClaimIsMine,
  makeSelectCollectionForIdHasClaimUrl,
  makeSelectNameForCollectionId,
  makeSelectCollectionIsMine,
} from 'lbry-redux';
import { makeSelectChannelIsMuted } from 'redux/selectors/blocked';
import { doToggleMuteChannel } from 'redux/actions/blocked';
import { doCommentModBlock, doCommentModUnBlock } from 'redux/actions/comments';
import { makeSelectChannelIsBlocked } from 'redux/selectors/comments';
import { doOpenModal } from 'redux/actions/app';
import { doToast } from 'redux/actions/notifications';
import ClaimPreview from './view';

const select = (state, props) => {
  const claim = makeSelectClaimForUri(props.uri)(state);
  const permanentUri = claim && claim.permanent_url;
  return {
    claim,
    claimIsMine: makeSelectClaimIsMine(props.uri)(state),
    hasClaimInWatchLater: makeSelectCollectionForIdHasClaimUrl('watchlater', permanentUri)(state),
    channelIsMuted: makeSelectChannelIsMuted(props.uri)(state),
    channelIsBlocked: makeSelectChannelIsBlocked(props.uri)(state),
    claimInCollection: makeSelectCollectionForIdHasClaimUrl(props.collectionId, permanentUri)(state),
    collectionName: makeSelectNameForCollectionId(props.collectionId)(state),
    isMyCollection: makeSelectCollectionIsMine(props.collectionId)(state),
  };
};

export default connect(select, {
  doToggleMuteChannel,
  doCommentModBlock,
  doCommentModUnBlock,
  doCollectionEdit,
  doOpenModal,
  doToast,
})(ClaimPreview);
