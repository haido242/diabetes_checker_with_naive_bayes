Diabetes Check Project
======================

Introduction
------------

The Diabetes Check Project is a web application built using Python with the FastAPI framework for the backend and Angular for the frontend. This application utilizes the Naive Bayes algorithm to predict the likelihood of diabetes based on input factors.

Installation
------------

### Backend (FastAPI)

1.  Clone the project from the repository:

 `https://github.com/haido242/diabetes_checker_with_naive_bayes.git`

2.  Create a virtual environment and install dependencies:
    
     `pip install -r requirements.txt`

3.  Run the application:

    `uvicorn app:app --reload`

### Frontend (Angular)

1.  Install Angular CLI:

    `npm install -g @angular/cli`

2.  Navigate to the frontend directory:
    
        `cd navie_bayes`

3.  Install dependencies:
        
            `npm install`

4.  Run the application:
        
            `ng serve`

Usage
-----

1.  Open your browser and go to `http://localhost:4200` to use the application.

2.  Enter the input information to be checked in the user interface.

3.  Press the "Check" button to perform the prediction using the Naive Bayes algorithm.

Naive Bayes Algorithm
---------------------

The Naive Bayes algorithm is used to predict the likelihood of diabetes based on input factors. The source code for the algorithm can be found in the `naive_bayes.py` directory.

Contribution
------------

If you wish to contribute to the project, create a pull request on GitHub. All contributions and feedback are welcome.

Author
------

The project is developed by [Do Trung Hai].

* * * * *

Note: Make sure you have Python, Node.js, npm, mongoDB and Angular CLI installed before running the project.
