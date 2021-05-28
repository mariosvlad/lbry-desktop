// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Icon from 'component/common/icon';

type Props = {
  claim: Claim,
  small: boolean,
};

function ClaimType(props: Props) {
  const { claim, small } = props;
  const { value_type: claimType } = claim || {};

  const size = small ? 12 : undefined;

  if (claimType === 'collection') {
    return <Icon size={size} icon={ICONS.STACK} />;
  } else if (claimType === 'channel') {
    return <Icon size={size} icon={ICONS.CHANNEL} />;
  } else if (claimType === 'repost') {
    return <Icon size={size} icon={ICONS.REPOST} />;
  }

  return <Icon icon={ICONS.DOWNLOADABLE} />;
}

export default ClaimType;
