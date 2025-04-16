# Buggy_Repo
1st commit :
-----------
for news.js and news.html
Added Event Listeners for Search and Source Dropdown

    Implemented input event listener for the search bar (#search) to trigger filtered news loading.

    Added change event listener for the source dropdown (#source) to reload news based on selected source.

Reset Articles on Search or Source Change

    Used the reset = true flag when loading news after search or source selection to avoid article duplication.

Ensured allArticles Array is Cleared Properly

    allArticles is now cleared (allArticles = []) when reset is true, preventing duplicate entries on refresh or filter.

Improved Error Display

    Added meaningful error messages in the UI when a feed fails to load.

Optimized DOM Updates

    Emptied the #newsList before displaying new articles to avoid stacking previous results.
