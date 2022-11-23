import { useContext, Fragment } from 'react';
import CategoryPreview   from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext); 
    return(
        <Fragment>
            {   
                Object.keys(categoriesMap).map((title) => {
                    //object.keys gives an array of all the keys in categories like sneakers,hat,..
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </Fragment>
    );
};

export default CategoriesPreview;