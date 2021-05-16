// @flow
import React from 'react';
import classnames from 'classnames';
import * as ICONS from 'constants/icons';
import Icon from 'component/common/icon';

export default function collectionCount() {
  return (
    <div className={classnames('claim-properties', 'file-properties--small')}>
      <Icon icon={ICONS.LOCK} />
      {__('Private')}
    </div>
  );
}
