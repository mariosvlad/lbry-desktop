import { connect } from 'react-redux';
import { makeSelectFilePartlyDownloaded, makeSelectClaimIsMine, makeSelectClaimForUri } from 'lbry-redux';
import { makeSelectIsSubscribed } from 'redux/selectors/subscriptions';
import PreviewOverlayProperties from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  downloaded: makeSelectFilePartlyDownloaded(props.uri)(state),
  isSubscribed: makeSelectIsSubscribed(props.uri)(state),
  claimIsMine: makeSelectClaimIsMine(props.uri)(state),
});

export default connect(select, null)(PreviewOverlayProperties);
