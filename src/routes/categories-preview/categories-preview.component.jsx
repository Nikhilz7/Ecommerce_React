import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector'

import CategoryPreview   from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';


const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return(
        <Fragment>
            { 
                isLoading?(
                    <Spinner />
                ):(
                    Object.keys(categoriesMap).map((title) => {
                        //object.keys gives an array of all the keys in categories like sneakers,hat,..
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })
                    
                )
            }
        </Fragment>
    );
};

export default CategoriesPreview;