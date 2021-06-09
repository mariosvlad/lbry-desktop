// @flow
import React from 'react';
import Button from 'component/button';

type Props = {
  uri: string,
  asAdmin: boolean,
  asModerator: boolean,
  isBlocked: boolean,
  isBlockingOrUnBlocking: boolean,
  doCommentModUnBlock: (string) => void,
  doCommentModBlock: (string) => void,
  doCommentModUnBlockAsAdmin: (string, string) => void,
  doCommentModBlockAsAdmin: (string, string) => void,
  doFetchModBlockedList: () => void,
};

function ChannelBlockButton(props: Props) {
  const {
    uri,
    asAdmin,
    asModerator,
    doCommentModUnBlock,
    doCommentModBlock,
    doCommentModUnBlockAsAdmin,
    doCommentModBlockAsAdmin,
    doFetchModBlockedList,
    isBlocked,
    isBlockingOrUnBlocking,
  } = props;

  function handleClick() {
    if (asAdmin) {
      if (isBlocked) {
        doCommentModUnBlockAsAdmin(uri, '');
      } else {
        doCommentModBlockAsAdmin(uri, '');
      }
      setTimeout(() => {
        doFetchModBlockedList();
      }, 2000);
    } else {
      if (isBlocked) {
        doCommentModUnBlock(uri);
      } else {
        doCommentModBlock(uri);
      }
    }
  }

  if (asModerator) {
    return null;
  }

  return (
    <Button
      button={isBlocked ? 'alt' : 'secondary'}
      label={
        isBlocked
          ? isBlockingOrUnBlocking
            ? __('Unblocking...')
            : __('Unblock')
          : isBlockingOrUnBlocking
          ? __('Blocking...')
          : __('Block')
      }
      onClick={handleClick}
    />
  );
}

export default ChannelBlockButton;
