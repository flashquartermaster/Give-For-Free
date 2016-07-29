@app
Feature: App load
  As a user
  I want to be able to load the app
  So that I can use it

  Scenario: Loading the app successfully
    Given I load the app
    Then I should see the login screen