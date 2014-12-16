Feature: Validate sample app

  Scenario: validate text on a sample app
    Given I navigate to my landing page "<%= targetBaseUrl %>"
    Then I see presence of text "<%= landingPageText %>"
