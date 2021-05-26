// @flow
import React from 'react';
import ClaimList from 'component/claimList';
import Page from 'component/page';
import * as PAGES from 'constants/pages';
import { useHistory } from 'react-router-dom';
import CollectionEdit from 'component/collectionEdit';
import Card from 'component/common/card';
import CollectionActions from 'component/collectionActions';
import classnames from 'classnames';
import ClaimAuthor from 'component/claimAuthor';
import FileDescription from 'component/fileDescription';
import { COLLECTIONS_CONSTS } from 'lbry-redux';
import Icon from 'component/common/icon';
import * as ICONS from 'constants/icons';

export const PAGE_VIEW_QUERY = 'view';
export const PUBLISH_PAGE = 'publish';
export const EDIT_PAGE = 'edit';
export const ADVANCED_EDIT_PAGE = 'advanced';

type Props = {
  collectionId: string,
  uri: string,
  claim: Claim,
  title: string,
  thumbnail: string,
  collection: Collection,
  collectionUrls: Array<string>,
  collectionCount: number,
  isResolvingCollection: boolean,
  isMyClaim: boolean,
  isMyCollection: boolean,
  claimIsPending: boolean,
  collectionHasEdits: boolean,
  deleteCollection: (string) => void,
  editCollection: (string, CollectionUpdateParams) => void,
  fetchCollectionItems: (string, () => void) => void,
  resolveUris: (string) => void,
  user: ?User,
};

export default function CollectionPage(props: Props) {
  const {
    collectionId,
    uri,
    claim,
    // title,
    // thumbnail,
    collection,
    collectionUrls,

    collectionCount,
    collectionHasEdits,
    isResolvingCollection,

    fetchCollectionItems,
  } = props;

  const {
    replace,
    location: { search },
  } = useHistory();

  const [didTryResolve, setDidTryResolve] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  // const isClaim = Boolean(claim); do I need this for anything related to unpublished collection ids?

  const { name, totalItems } = collection || {};
  const isBuiltin = COLLECTIONS_CONSTS.BUILTIN_LISTS.includes(collectionId);

  const urlParams = new URLSearchParams(search);
  const editing = urlParams.get(PAGE_VIEW_QUERY) === EDIT_PAGE;

  const urlsReady =
    (collectionUrls && totalItems === undefined) || // ready if totalItems is missing
    (collectionUrls && totalItems && totalItems === collectionUrls.length); // ready if collectionUrls length = resolved totalItems
  const shouldFetch = !claim && !collection;

  React.useEffect(() => {
    if (collectionId && !urlsReady && !didTryResolve && shouldFetch) {
      fetchCollectionItems(collectionId, () => setDidTryResolve(true)); // implicitly does claimSearch if necessary
    }
  }, [collectionId, urlsReady, didTryResolve, shouldFetch, setDidTryResolve, fetchCollectionItems]);

  const subTitle = (
    <div>
      {uri ? <span>{collectionCount} items</span> : <span>{collectionCount} items</span>}
      {uri && <ClaimAuthor uri={uri} />}
    </div>
  );
  const info = (
    <Card
      title={
        <span>
          <Icon icon={ICONS.STACK} className="icon__left" />
          {claim ? claim.value.title || claim.name : collection && collection.name}
          {collectionHasEdits && <span className={'collection-title__hasEdits'}>(*)</span>}
        </span>
      }
      subtitle={subTitle}
      body={
        !isBuiltin && (
          <CollectionActions uri={uri} collectionId={collectionId} setShowInfo={setShowInfo} showInfo={showInfo} />
        )
      }
      actions={
        showInfo &&
        uri && (
          <div className="section">
            <FileDescription uri={uri} />
          </div>
        )
      }
    />
  );

  if (!collection && (isResolvingCollection || !didTryResolve)) {
    return (
      <Page>
        <h2 className="main--empty empty">{__('Loading...')}</h2>
      </Page>
    );
  }

  if (!collection && !isResolvingCollection && didTryResolve) {
    return (
      <Page>
        <h2 className="main--empty empty">{__('Nothing here')}</h2>
      </Page>
    );
  }

  if (editing) {
    return (
      <Page
        noFooter
        noSideNavigation={editing}
        backout={{
          title: __('%action% %collection%', { collection: name, action: uri ? __('Editing') : __('Publishing') }),
          simpleTitle: uri ? __('Editing') : __('Publishing'),
        }}
      >
        <CollectionEdit
          uri={uri}
          collectionId={collectionId}
          onDone={(id) => {
            replace(`/$/${PAGES.COLLECTION}/${id}`);
          }}
        />
      </Page>
    );
  }
  // some kind of header here?
  // pass up, down, delete controls through claim list
  if (urlsReady) {
    return (
      <Page>
        <div className={classnames('section card-stack')}>
          {info}
          <ClaimList uris={collectionUrls} collectionId={collectionId} />
        </div>
      </Page>
    );
  }
}
