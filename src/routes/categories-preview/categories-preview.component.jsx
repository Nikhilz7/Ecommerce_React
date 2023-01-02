import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview   from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/categories/category.selector'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
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