export const addIngredient = ortsNer => {
    return {
        type: 'ADD_INGREDIENT',
        ortsNer    //ortsNer: ortsNer  es6 bichiglel
    };
};
export const removeIngredient = ortsNer => {
    return {
        type: 'REMOVE_INGREDIENT',
        ortsNer
    };
};