[![Build Status](https://travis-ci.org/GovWizely/taxonomy-browser.svg?branch=master)](https://travis-ci.org/GovWizely/taxonomy-browser)

# Thesaurus of International Trade Terms

The International Trade Administration’s (ITA) Thesaurus of International Trade Terms is a controlled and structured list of words and phrases used to tag and index information found on the ITA’s websites and databases. The thesaurus covers all subjects related to international trade and foreign investment with particular emphasis on exporting, trade promotion, market access and enforcement and compliance.

The thesaurus is structured into six domains or micro-thesauri:
* Trade Topics
* Industries
* Countries
* World Regions
* Trade Regions
* U.S. Trade Initiatives

The thesaurus is available to the software developer community as a JSON endpoint, the documentation for which is available here; https://developer.trade.gov/ita-taxonomies.html

The thesaurus was developed by ITA’s staff of international trade specialists, consulting several authoritative sources and vocabularies covering the language of international trade and investment.

## Adding it to a page
1. Host the JS and CSS files
2. Add the following lines to the `<head>` of the html doc:

    ```html
    <link rel="stylesheet" type="text/css" href="taxonomy-browser.css">
    <script type="text/javascript" src="taxonomy-browser.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        API_KEY = "your_API_KEY"; // get it from http://api.trade.gov/
        divID = "taxonomy_container"; // Or the ID of the div where you'd like it to appear
        window.Explorer.renderTaxonomy(divID, API_KEY);
      });
    </script>
    ```

3. Input the appropriate API_KEY and div ID into the script.
4. Place the element `<div id="taxonomy_container"></div>` where the taxonomy container should appear in the `<body>`.

## Known issues
* The checkbox for `Trade Topics` doesn't return any results when passed as part of the search query.

## Additional Info
* This project was bootstrapped with Create React App, and has been ejected to enable customization of webpack.
* Two polyfill packages are implemented to support IE11: `react-app-polyfill/ie11`, and `babel-polyfill`.  They must be imported *in that order* in `src/index.js`.  Eventually, if IE11 support is no longer required, those two import statements (and the `babel-polyfill` npm package) can be safely removed.