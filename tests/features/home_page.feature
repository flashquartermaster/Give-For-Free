@home
Feature: Home Page
  As a user
  I want to be able to view the home page
  See details about the app
  Navigate externally
  And navigate around the app from there

  @requiresLogin @requiresLogout @dev
  Scenario: Home Page Elements
    Given I am on the home page
    Then I am greeted
    And told some information about the app

  @requiresLogin @requiresLogout
  Scenario: Home Page External Links
    Given I am on the home page
    Then I can link to the app's website
    And I can link to the app's facebook
    And I can link to the app's twitter
    And I can request email support

  @requiresLogin @requiresLogout
  Scenario: Home Page Tab Navigation To Charities
    Given I am on the home page
    Then I can navigate to the charities list

  @requiresLogin @requiresLogout
  Scenario: Home Page Tab Navigation To Settings
    Given I am on the home page
    Then I can navigate to the settings page

  @requiresLogin
  Scenario: Home Page Sign Out
    Given I am on the home page
    Then I can see a sign out button
    And can sign out of the app
