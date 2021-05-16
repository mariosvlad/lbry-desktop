// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Icon from 'component/common/icon';

type Props = {
  claim: Claim,
  isLivestream: boolean,
};

function ClaimType(props: Props) {
  const { claim } = props;
  const { value_type: claimType } = claim || {};

  if (claimType === 'collection') {
    return <Icon icon={ICONS.STACK} />;
  } else if (claimType === 'repost') {
    return <Icon icon={ICONS.REPOST} />;
  }

  return <Icon icon={ICONS.DOWNLOADABLE} />;
}

export default ClaimType;
