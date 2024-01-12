# Hippotech

![Screenshot of hippotech landing page](/app/assets/images/Hippotech%20Screenshot.PNG)

## Live Demo
https://hippotech-33c168d59092.herokuapp.com/

## Made with: 
* Ruby on Rails v6.1.6
* React v18.2
* React Router v5
* Chart.js v4.4.1
* Bootstrap v5.1.3
* SCSS v6
* Moment v2.29.4

## Wireframes
https://app.uizard.io/p/21f06b9c/preview

## Features
*Patient list that can be organized by last name or patient id
*Easy patient search through last name
*Customizable patient list allowing quick and easy retrieval of important patient information
*Detailed patient summary, organized by topic and color coded
*Flowsheet with simple to use UI
*Graphs that help visualize patient vitals

## Installation

#### Run the following to locally install this app.

1. Clone repository 

```
git clone https://github.com/marioperez094/hippotech.git
```

2. Install Ruby Gems

```
bundle
```


3. Use yarn for NPM packages

```
yarn
```

4. Start Rails

```
rails s
```

Use foreman if installed

```
foreman start -f Procfile.dev
```

5. Load "localhost:3000" as a webpage

```
rails s
```

## Overview
From the beginning, the goal of this project was to make a charting system that was easy to use and navigate for healthcare workers. This project took about two months to complete. The front-end was initially drafted on paper and improved on uizard. Two healthcare workers of different fields completed user testing. 

The front-end was the first part to be developed using react and bootstrap. The flowsheet in particular was difficult to design and has gone through many revisions. Ultimately settling on a simpler approach of only including the date and time of vitals in the data base. The back-end was initally much simpler with the admission and patient being one table. By seperating the admission and patient, it allows for one patient to be discharged and admitted, thus keeping better track of their health records. Allergies and past medical history were also seperated into their own tables. The last step of development was making the full-stack project. Several changes to the back-end and front-end were made throughout the full-stack process for easy data access and visibility. 

## User Story
This app is intended for healthcare workers. The app allows for adding patient information in one location and easily be able to retrieve and visualize that data.

## Issues and future plans
As explained earlier the flowsheet was the most difficult aspect of the app to develop. The flowsheet was initally designed to be like a calendar with each day having hours or minutes listed based on user preference. The app would also allow for multiple vital uploads instead of having to add them one at a time. Instead, the app only renders time slots based on the vitals in the data base. 

Adding more tables for patient assessments, and any patient lines such as intravenous catheters, urinary catheters are also something that would be a great addition to this app. 