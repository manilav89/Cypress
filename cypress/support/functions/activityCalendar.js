export class ActivityCalendar{

    addActivity(activityName)
    {
        let numberOfActivities = 0
        cy.get('#add-activity > span').click();
        cy.get('#exercise_list').should('be.visible');
        cy.get('#searchfield').click().type(activityName).type('{enter}');
        cy.wait(4000)
        cy.get('#exercise_list').find('li').eq(1).click();
        cy.get('#ok_button > span').click({force:true});
        cy.get('#day_activities').find('li').should('have.length',numberOfActivities + 1);
        cy.get('#empty-data').should('not.exist');

    }

    deleteActivities()
    {
        cy.get('#right_col').then(attr => {
            if (attr.find("#empty-data").length !== 1)
              {
                cy.get('#activities_checkbox_all').click()
                cy.get('#del_btn').click();
                cy.get('#empty-data').should('be.visible');
             }
        })
    }  
}

export const activityCalendar = new ActivityCalendar()