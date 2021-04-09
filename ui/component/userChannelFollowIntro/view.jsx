// @flow
import React, { useEffect } from 'react';
import ClaimListDiscover from 'component/claimListDiscover';
import * as CS from 'constants/claim_search';
import Nag from 'component/common/nag';
import { parseURI } from 'lbry-redux';
import Button from 'component/button';
import Card from 'component/common/card';
import { AUTO_FOLLOW_CHANNELS, SIMPLE_SITE, SITE_NAME } from 'config';

type Props = {
  subscribedChannels: Array<Subscription>,
  onContinue: () => void,
  channelSubscribe: (sub: Subscription) => void,
  homepageData: any,
  prefsReady: boolean,
  hasSyncedWallet: boolean,
  syncEnabled: boolean,
  syncIsLocked: boolean,
};

const channelsToSubscribe = AUTO_FOLLOW_CHANNELS.trim()
  .split(' ')
  .filter((x) => x !== '');

function UserChannelFollowIntro(props: Props) {
  const {
    subscribedChannels,
    channelSubscribe,
    onContinue,
    homepageData,
    prefsReady,
    syncEnabled,
    hasSyncedWallet,
    syncIsLocked,
  } = props;
  const { PRIMARY_CONTENT_CHANNEL_IDS } = homepageData;
  const followingCount = (subscribedChannels && subscribedChannels.length) || 0;
  const shouldAutoFollow = syncEnabled ? hasSyncedWallet : prefsReady;

  useEffect(() => {
    console.log('shouldFollow', shouldAutoFollow);
    if (shouldAutoFollow && !syncIsLocked) {
      if (channelsToSubscribe && channelsToSubscribe.length) {
        channelsToSubscribe.forEach((c) =>
          channelSubscribe({
            channelName: parseURI(c).claimName,
            uri: c,
          })
        );
      }
    }
  }, [syncIsLocked, shouldAutoFollow]);

  return (
    <Card
      title={__('Find channels to follow')}
      subtitle={__(
        `${SITE_NAME} works better if you find and follow a couple creators you like. You can also block channels you never want to see.`
      )}
      actions={
        <React.Fragment>
          <div className="section__body">
            <ClaimListDiscover
              hideFilters
              meta={
                <Button
                  button={subscribedChannels.length < 1 ? 'alt' : 'primary'}
                  onClick={onContinue}
                  label={subscribedChannels.length < 1 ? __('Skip') : __('Continue')}
                />
              }
              defaultOrderBy={CS.ORDER_BY_TRENDING}
              defaultFreshness={CS.FRESH_ALL}
              claimIds={SIMPLE_SITE ? PRIMARY_CONTENT_CHANNEL_IDS : undefined}
              claimType={CS.CLAIM_CHANNEL}
              maxPages={3}
            />
            {followingCount > 0 && (
              <Nag
                type="helpful"
                message={
                  followingCount === 1
                    ? __('Nice! You are currently following %followingCount% creator', { followingCount })
                    : __('Nice! You are currently following %followingCount% creators', { followingCount })
                }
                actionText={__('Continue')}
                onClick={onContinue}
              />
            )}
          </div>
        </React.Fragment>
      }
    />
  );
}

export default UserChannelFollowIntro;
