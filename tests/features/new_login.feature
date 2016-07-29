@login
Feature: New Login
  As a user
  I want to be able to log into the app
  To be able to use it

  Scenario: Logging in
    Given I am on the login page
    When I enter the correct details
    Then I successfully log in
    And I can sign out again