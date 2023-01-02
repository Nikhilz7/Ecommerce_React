import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories

    //array output will be the argument for the function for createSelector
)

export const selectCategoriesMap = createSelector(
        [selectCategories],
        (categories) => 
        categories.reduce((acc, category) => 
        {
            const { title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{})
);