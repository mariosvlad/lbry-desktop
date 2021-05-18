// @flow
import React from 'react';
import { Modal } from 'modal/modal';
import Button from 'component/button';
import Card from 'component/common/card';
import I18nMessage from 'component/i18nMessage';

type Props = {
  closeModal: () => void,
  collectionDelete: (string) => void,
  claim: Claim,
  collectionId: string,
  collectionName: string,
  uri: ?string,
};

function ModalRemoveCollection(props: Props) {
  const { closeModal, claim, collectionDelete, collectionId, collectionName, uri } = props;
  const title = claim && claim.value && claim.value.title;

  return (
    <Modal isOpen contentLabel={__('Confirm Collection Unpublish')} type="card" onAborted={closeModal}>
      <Card
        title={__('Delete Collection')}
        subtitle={
          <I18nMessage tokens={{ title: <cite>{uri && title ? `"${title}"` : `"${collectionName}"`}</cite> }}>
            Are you sure you'd like to remove collection %title%?
          </I18nMessage>
        }
        actions={
          <>
            <div className="section__actions">
              <Button
                button="primary"
                label={__('Delete')}
                onClick={() => {
                  collectionDelete(collectionId);
                  closeModal();
                }}
              />
              <Button button="link" label={__('Cancel')} onClick={closeModal} />
            </div>
          </>
        }
      />
    </Modal>
  );
}

export default ModalRemoveCollection;
