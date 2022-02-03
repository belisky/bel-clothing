import React,{useState} from 'react';
import  SHOP_DATA  from './shop.data';
import './shop.styles.scss'
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = () => {
    const [collections, setCollections] = useState(SHOP_DATA);
    
    return (
        <div className='shop'>
             
            {
                collections.map(({ id, ...otherCollections}) => (                    
            <CollectionPreview key={id} {...otherCollections}/>
                    ))
            }
        </div>
    );
};

export default ShopPage;
