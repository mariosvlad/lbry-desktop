// @flow
import type { Node } from 'react';
import * as ICONS from 'constants/icons';
import * as React from 'react';
import classnames from 'classnames';
import Icon from 'component/common/icon';
import FilePrice from 'component/filePrice';
import VideoDuration from 'component/videoDuration';
import FileType from 'component/fileType';
import ClaimType from 'component/claimType';

type Props = {
  uri: string,
  downloaded: boolean,
  claimIsMine: boolean,
  isSubscribed: boolean,
  small: boolean,
  claim: Claim,
  properties?: (Claim) => ?Node,
  iconOnly: boolean,
};

export default function PreviewOverlayProperties(props: Props) {
  const { uri, downloaded, claimIsMine, isSubscribed, small = false, properties, claim, iconOnly } = props;
  const isCollection = claim && claim.value_type === 'collection';
  // $FlowFixMe
  const claimCount = claim && claim.value.claims && claim.value.claims.length;
  const isStream = claim && claim.value_type === 'stream';
  const size = small ? 12 : undefined;

  return (
    <div
      className={classnames('claim-preview__overlay-properties', {
        '.claim-preview__overlay-properties--small': small,
      })}
    >
      {typeof properties === 'function' ? (
        properties(claim)
      ) : (
        <>
          {!isStream && <ClaimType uri={uri} small={small} />}
          {isCollection && claim && !iconOnly && <div>{claimCount}</div>}
          {!iconOnly && isStream && <VideoDuration uri={uri} />}
          {isStream && <FileType uri={uri} small={small} />}
          {isSubscribed && <Icon tooltip size={size} icon={ICONS.SUBSCRIBE} />}
          {!claimIsMine && downloaded && <Icon size={size} tooltip icon={ICONS.LIBRARY} />}
          <FilePrice hideFree uri={uri} />
        </>
      )}
    </div>
  );
}
