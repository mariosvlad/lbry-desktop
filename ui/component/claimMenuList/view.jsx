// @flow
import { URL, SHARE_DOMAIN_URL } from 'config';
import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import * as MODALS from 'constants/modal_types';
import React from 'react';
import classnames from 'classnames';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import Icon from 'component/common/icon';
import { generateShareUrl } from 'util/url';
import { useHistory } from 'react-router';

const SHARE_DOMAIN = SHARE_DOMAIN_URL || URL;

type Props = {
  uri: string,
  claim: Claim,
  inline?: boolean,
  claimIsMine: boolean,
  channelIsMuted: boolean,
  channelIsBlocked: boolean,
  doToggleMuteChannel: (string) => void,
  doCommentModBlock: (string) => void,
  doCommentModUnBlock: (string) => void,
  doCollectionEdit: (string, any) => void,
  hasClaimInWatchLater: boolean,
  doOpenModal: (string, {}) => void,
  claimInCollection: boolean,
  collectionName?: string,
  collectionId: string,
  isMyCollection: boolean,
};

function ClaimMenuList(props: Props) {
  const {
    uri,
    claim,
    inline = false,
    claimIsMine,
    doToggleMuteChannel,
    channelIsMuted,
    channelIsBlocked,
    doCommentModBlock,
    doCommentModUnBlock,
    doCollectionEdit,
    hasClaimInWatchLater,
    doOpenModal,
    collectionId,
    claimInCollection,
    collectionName,
    isMyCollection,
  } = props;

  const { push } = useHistory();

  const channelUri = claim
    ? claim.value_type === 'channel'
      ? claim.permanent_url
      : (claim.signing_channel && claim.signing_channel.permanent_url) || ''
    : '';

  const shareUrl: string = generateShareUrl(SHARE_DOMAIN, uri);
  const isCollectionClaim = claim && claim.value_type === 'collection';

  if (!claim) {
    // TODO: allow copying collection link
    return null;
  }

  const isStream = claim.value_type === 'stream';

  function handleToggleMute() {
    doToggleMuteChannel(channelUri);
  }

  function handleToggleBlock() {
    if (channelIsBlocked) {
      doCommentModUnBlock(channelUri);
    } else {
      doCommentModBlock(channelUri);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
  }

  function handleReportContent() {
    push(`/$/${PAGES.REPORT_CONTENT}?claimId=${claim.claim_id}`);
  }

  return (
    <Menu>
      <MenuButton
        className={classnames('menu__button', { 'claim__menu-button': !inline, 'claim__menu-button--inline': inline })}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Icon size={20} icon={ICONS.MORE_VERTICAL} />
      </MenuButton>
      <MenuList className="menu__list">
        {/* WATCH LATER */}
        {isStream && !collectionId && (
          <>
            <MenuItem
              className="comment__menu-option"
              onSelect={() =>
                doCollectionEdit('watchlater', { claims: [claim], remove: hasClaimInWatchLater, type: 'playlist' })
              }
            >
              <div className="menu__link">
                <Icon aria-hidden icon={hasClaimInWatchLater ? ICONS.DELETE : ICONS.TIME} />
                {hasClaimInWatchLater ? __('In Watch Later') : __('Watch Later')}
              </div>
            </MenuItem>
          </>
        )}
        {/* ADD/REMOVE CURRENT COLLECTION... */}
        {collectionId && collectionName && false && (
          <MenuItem
            className="comment__menu-option"
            onSelect={() =>
              doCollectionEdit(collectionId, { claims: [claim], remove: claimInCollection, type: 'playlist' })
            }
          >
            <div className="menu__link">
              <Icon aria-hidden icon={claimInCollection ? ICONS.DELETE : ICONS.STACK} />
              {claimInCollection
                ? __('Remove from  %collection%', { collection: collectionName })
                : __('Add to %collection%', { collection: collectionName })}
            </div>
          </MenuItem>
        )}
        {/* COLLECTION OPERATIONS */}
        {collectionId && collectionName && isCollectionClaim && (
          <>
            <MenuItem className="comment__menu-option" onSelect={() => push(`/$/${PAGES.COLLECTION}/${collectionId}`)}>
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.VIEW} />
                {__('Edit Collection')}
              </div>
            </MenuItem>
            <MenuItem
              className="comment__menu-option"
              onSelect={() => doOpenModal(MODALS.COLLECTION_DELETE, { collectionId })}
            >
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.DELETE} />
                {__('Delete collection')}
              </div>
            </MenuItem>
          </>
        )}
        <MenuItem
          className="comment__menu-option"
          onSelect={() => doOpenModal(MODALS.COLLECTION_ADD, { uri, type: 'playlist' })}
        >
          <div className="menu__link">
            <Icon aria-hidden icon={ICONS.STACK} />
            {__('Add to Lists')}
          </div>
        </MenuItem>
        <hr className="menu__separator" />
        {channelUri && !claimIsMine && !isMyCollection && (
          <>
            <MenuItem className="comment__menu-option" onSelect={handleToggleBlock}>
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.BLOCK} />
                {channelIsBlocked ? __('Unblock Channel') : __('Block Channel')}
              </div>
            </MenuItem>

            <MenuItem className="comment__menu-option" onSelect={handleToggleMute}>
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.MUTE} />
                {channelIsMuted ? __('Unmute Channel') : __('Mute Channel')}
              </div>
            </MenuItem>

            <hr className="menu__separator" />
          </>
        )}

        <MenuItem className="comment__menu-option" onSelect={handleCopyLink}>
          <div className="menu__link">
            <Icon aria-hidden icon={ICONS.SHARE} />
            {__('Copy Link')}
          </div>
        </MenuItem>

        {!claimIsMine && !isMyCollection && (
          <MenuItem className="comment__menu-option" onSelect={handleReportContent}>
            <div className="menu__link">
              <Icon aria-hidden icon={ICONS.REPORT} />
              {__('Report Content')}
            </div>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default ClaimMenuList;
