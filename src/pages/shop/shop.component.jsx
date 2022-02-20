import React, { useEffect,useState } from 'react';

// import { connect } from 'react-redux'

// import { updateCollections } from '../../redux/shop/shop.actions'

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import { firestore } from '../../config/firebase.config'
// import { convertCollectionsSnapshotToMap } from '../../config/firebase.config';
// import { collection, doc, onSnapshot } from 'firebase/firestore';
// import CollectionPage from '../collection/collection.component';
import './shop.styles.scss'
 

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const ShopPage = ({ isLoading }) => {  

    return (
        <div className='shop-page'>
            <CollectionsOverviewWithSpinner isLoading={isLoading}/>
       
        </div>
    );
};

// const mapDispatchToProps = (dispatch) = ({
//     updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
// });

export default  ShopPage;
  