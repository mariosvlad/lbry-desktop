// @flow
import * as ICONS from 'constants/icons';
import * as React from 'react';
import classnames from 'classnames';
import Icon from 'component/common/icon';
import FilePrice from 'component/filePrice';
import ClaimType from 'component/claimType';

type Props = {
  uri: string,
  isSubscribed: boolean,
  small: boolean,
  claim: Claim | CollectionClaim,
};

export default function FileProperties(props: Props) {
  const { uri, isSubscribed, small = false, claim } = props;
  const isCollection = claim && claim.value_type === 'collection';
  // $FlowFixMe

  return (
    <div
      className={classnames('claim-properties', {
        'file-properties--small': small,
      })}
    >
      {
        <>
          <ClaimType uri={uri} />
          {/*   // $FlowFixMe */}
          {isCollection && claim && claim.value.claims && claim.value.claims.length}
          {isSubscribed && <Icon tooltip icon={ICONS.SUBSCRIBE} />}
          <FilePrice hideFree uri={uri} />
        </>
      }
    </div>
  );
}
