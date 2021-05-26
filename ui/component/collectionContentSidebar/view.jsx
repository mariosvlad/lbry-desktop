// @flow
import React from 'react';
import ClaimList from 'component/claimList';
import Card from 'component/common/card';
import Button from 'component/button';
import * as PAGES from 'constants/pages';
import Icon from 'component/common/icon';
import * as ICONS from 'constants/icons';

type Props = {
  collectionUrls: Array<Claim>,
  collectionName: string,
  collection: any,
  createUnpublishedCollection: (string, Array<any>, ?string) => void,
  id: string,
  claim: Claim,
  isMine: boolean,
};

export default function CollectionContent(props: Props) {
  const { collectionUrls, collectionName, collection, createUnpublishedCollection, id, claim, isMine } = props;
  const items = collection && collection.items;
  const sourceId = claim ? id : undefined;

  return (
    <Card
      isBodyList
      className="file-page__recommended"
      title={
        <span>
          <Icon icon={ICONS.STACK} className="icon__left" />
          {collectionName}
        </span>
      }
      titleActions={
        <>
          {claim && !isMine && (
            <Button label={'Save'} onClick={() => createUnpublishedCollection(collectionName, items, sourceId)} />
          )}
          <Button label={'View Collection'} button="link" navigate={`/$/${PAGES.COLLECTION}/${id}`} />
        </>
      }
      body={
        <ClaimList isCardBody type="small" uris={collectionUrls} collectionId={id} empty={__('Playlist is empty')} />
      }
    />
  );
}
