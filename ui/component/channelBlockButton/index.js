import { connect } from 'react-redux';
import {
  doCommentModUnBlock,
  doCommentModBlock,
  doCommentModBlockAsAdmin,
  doCommentModUnBlockAsAdmin,
  doFetchModBlockedList,
} from 'redux/actions/comments';
import {
  makeSelectChannelIsBlocked,
  makeSelectChannelIsAdminBlocked,
  makeSelectUriIsBlockingOrUnBlocking,
} from 'redux/selectors/comments';
import ChannelBlockButton from './view';

const select = (state, props) => {
  let isBlocked;
  if (props.asAdmin) {
    isBlocked = makeSelectChannelIsAdminBlocked(props.uri)(state);
  } else {
    isBlocked = makeSelectChannelIsBlocked(props.uri)(state);
  }

  return {
    isBlocked: isBlocked,
    isBlockingOrUnBlocking: makeSelectUriIsBlockingOrUnBlocking(props.uri)(state),
  };
};

export default connect(select, {
  doCommentModUnBlock,
  doCommentModBlock,
  doCommentModUnBlockAsAdmin,
  doCommentModBlockAsAdmin,
  doFetchModBlockedList,
})(ChannelBlockButton);
