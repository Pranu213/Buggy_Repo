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

2nd commit:
------------
Backend (FastAPI):

    Set up API routes for serving quiz questions and handling answers (/quiz/question and /quiz/answer).

    Added CORS middleware to allow cross-origin requests from the frontend.

Frontend (JavaScript):

    Ensured the frontend fetches quiz questions using the correct API endpoint (/quiz/question).

    Handled form submission to send answers to the backend via POST requests.

    Updated UI to show quiz questions and handle score display, attempts, and game-over conditions.

Frontend (HTML):

    Basic structure to display the quiz and handle user interactions (form for answers, score display, etc.).
3rd commit:
-------------
deleted the extra js file (home.js) in Buggy_repo/frontend/scripts

4th commit:
Analytic file,
Overview: A web application that combines FastAPI, MongoDB, and a front-end using HTML, CSS, and JavaScript for real-time data analytics and visualization.

Backend: FastAPI handles API requests, processes data, and interacts with MongoDB to store and retrieve analytics data.

Frontend: Uses HTML, CSS, and JavaScript to display interactive charts and graphs.

Installation: Clone the repository, create a virtual environment, install dependencies, and run the FastAPI server.

Access: Visit http://127.0.0.1:8001 to interact with the application.
