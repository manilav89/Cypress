/// <reference types="Cypress"/>
import food from '../../fixtures/food.json'
import clubs from '../../fixtures/clubs.json'
import { onFoodPage } from "../../support/pages/foodPage"

describe('Food search user', () => {

  let cluburl;
  let userTrakingUrl;

  before(() => {
    cy.getURL(clubs.guil.url, '').then(url => {
      cluburl = url;
    })

    cy.getURL(clubs.guil.url, food.userTraking).then(url => {
      userTrakingUrl = url;
    })
  })

  beforeEach(() => {

    cy.visit(cluburl);

    cy.loginUI(clubs.guil.members.user.username, clubs.guil.members.user.pass);
    cy.visit(userTrakingUrl);

  })

  it('Found no product', () => {

    onFoodPage.searchFoodWhenTraking(food.noFoundSearch);

    cy.get('div[id="foodlist"]').contains(food.noFoundResult);

  })

  it('Search for partial products name returns results', () => {

    onFoodPage.searchFoodWhenTraking(food.partialSearch);

    cy.get('div[id="foodlist"]').contains(food.partialResult);

  })

  it('Search for multiple words returns results for all the words', () => {

    onFoodPage.searchFoodWhenTraking(food.multipleSearch);

    const stringsMultiple = food.multipleResult;
    cy.get(stringsMultiple).each(text => {
      cy.get('div[id="foodlist"]').contains(text);
    })

  })

  it('Search for capital and lowercase should return the same results', () => {

    onFoodPage.searchFoodWhenTraking(food.capitalSearch);

    const stringsCapital = food.capitalResult;
    cy.get(stringsCapital).each(text => {
      cy.get('div[id="foodlist"]').contains(text);
    })

    cy.get('.notification_close').click();

    onFoodPage.searchFoodWhenTraking(food.capitalSearch.toLowerCase());

    const strings = food.capitalResult;
    cy.get(strings).each(text => {
      cy.get('div[id="foodlist"]').contains(text);
    })

  })

})

describe('Food search coach', () => {

  let cluburl;
  let coachNewMealPlanurl;
  let coachTrakingUrl;
  let userTrakingUrl;

  before(() => {
    cy.getURL(clubs.guil.url, '').then(url => {
      cluburl = url;
    })

    cy.getURL(clubs.guil.url, food.coachNewMealPlan).then(url => {
      coachNewMealPlanurl = url;
    })

    cy.getURL(clubs.guil.url, food.coachTraking).then(url => {
      coachTrakingUrl = url;
    })

    cy.getURL(clubs.guil.url, food.userTraking).then(url => {
      userTrakingUrl = url;
    })
  })

  beforeEach(() => {

    cy.visit(cluburl);
    cy.loginUI(clubs.guil.members.coach.username, clubs.guil.members.coach.pass);
    cy.visit(coachNewMealPlanurl);
  })

  it('Found no product', () => {

    cy.setProfileTo('Professional');

    cy.visit(coachNewMealPlanurl);

    onFoodPage.searchFoodWhenCreatingPlan(food.noFoundSearch);

    cy.get('div[id="search-results-container"]').contains(food.noFoundResult);

    cy.visit(userTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.noFoundSearch);

    cy.get('div[id="foodlist"]').contains(food.noFoundResult);

    cy.get('.notification_close').click();

    cy.setProfileTo('Personal');

    cy.visit(coachTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.noFoundSearch)

    cy.get('div[id="foodlist"]').contains(food.noFoundResult);

  })

  it('Search for partial products name returns results', () => {

    cy.setProfileTo('Professional');

    cy.visit(coachNewMealPlanurl);

    onFoodPage.searchFoodWhenCreatingPlan(food.partialSearch);

    cy.get('div[id="search-results-container"]').contains(food.partialResult);

    cy.visit(userTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.partialSearch);

    cy.get('div[id="foodlist"]').contains(food.partialResult);

    cy.get('.notification_close').click();

    cy.setProfileTo('Personal');

    cy.visit(coachTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.partialSearch)

    cy.get('div[id="foodlist"]').contains(food.partialResult);

  })

  it('Search for multiple words returns results for all the words', () => {

    cy.setProfileTo('Professional');

    cy.visit(coachNewMealPlanurl);

    onFoodPage.searchFoodWhenCreatingPlan(food.multipleSearch);

    const strings = food.multipleResult;
    cy.get(strings).each(text => {
      cy.get('div[id="search-results-container"]').contains(text);
    })

    cy.visit(userTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.multipleSearch);

    cy.get(strings).each(text => {
      cy.get('div[id="foodlist"]').contains(text);
    })

    cy.get('.notification_close').click();

    cy.setProfileTo('Personal');

    cy.visit(coachTrakingUrl);

    onFoodPage.searchFoodWhenTraking(food.multipleSearch)

    cy.get(strings).each(text => {
      cy.get('div[id="foodlist"]').contains(text);
    })

  })


})
