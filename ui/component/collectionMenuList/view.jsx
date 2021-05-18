// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import classnames from 'classnames';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import Icon from 'component/common/icon';
// import { useHistory } from 'react-router';

type Props = {
  inline?: boolean,
  doOpenModal: (string, {}) => void,
  collectionName?: string,
  collectionId: string,
};

function ClaimMenuList(props: Props) {
  const { inline = false, collectionId, collectionName } = props; // doOpenModal, for delete modal

  // const { push } = useHistory(); for view link

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
        {/* if stream, add to watch later, add to collection modal */}
        {collectionId && collectionName && (
          <>
            <MenuItem className="comment__menu-option" onSelect={() => alert('view')}>
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.VIEW} />
                {__('View Collection')}
              </div>
            </MenuItem>
            <MenuItem className="comment__menu-option" onSelect={() => alert('del')}>
              <div className="menu__link">
                <Icon aria-hidden icon={ICONS.DELETE} />
                {__('Delete collection')}
              </div>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default ClaimMenuList;
