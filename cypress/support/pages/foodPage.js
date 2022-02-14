export class FoodPage {


    
    searchFoodWhenTraking(searchText) {
        cy.get('.page_content.clear').find('.add_food_button').eq(0).click();

        cy.get('#searchfield').click().clear().type(searchText);
    }

    searchFoodWhenCreatingPlan(searchText) {
        cy.get(':nth-child(1) > .cursor-pointer > [colspan="1"]').eq(0).click();

        cy.get('#search_field').click().clear().type(searchText);
    }

}

export const onFoodPage = new FoodPage()