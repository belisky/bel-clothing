import React from 'react';
import { useParams } from 'react-router-dom';
import {selectCollection} from '../../redux/shop/shop.selector'
import CollectionItem from '../../components/collection-item/collection-item.component';
import { useSelector } from 'react-redux';
import './collection.styles.scss';

 
const CollectionPage = () => {
    const  {collectionId} = useParams();     
     const collection=useSelector(selectCollection(collectionId))
    const { title, items } = collection 
    
    return (
        <div className="collection-page">
            <h2 className='title'>{title}</h2>
            <div className="items">
                {items.map(item=><CollectionItem className='collection-item' key={item.id} item={item}/>)}
            </div>
             
        </div>
  );
};
 
 
export default  CollectionPage;
