# inquests.ca frontend

![Node.js CI CD](https://github.com/inquests-ca/inquests.ca-frontend/workflows/Node.js%20CI%20CD/badge.svg)

[inquests.ca](http://inquests.ca) is a website which provides public access to Canadian inquests and inquest guidance.

The front end is written in JavaScript with React, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Background

<!-- TODO: consider moving this to my personal website to avoid redundancy between repos. -->
<!-- TODO: is this all applicable to Ontario law? -->
An inquest, also known as a fatality inquiry in some jurisdictions, is a public hearing meant to focus public attention on the circumstances of a death. Inquests are not meant to provide findings of blame (e.g., an inquest will not make a finding of criminality), but rather inquests are inquisitorial processes which answer questions about the circumstances of a death.

In Ontario, an inquest is conducted by a coroner before a jury. The jury is tasked with making findings about the circumstances of a death, but they may also provide recommendations to prevent future deaths under similar circumstances.

[inquests.ca](http://inquests.ca) provides a database of inquests and authorities.

An inquest includes logistical details of the inquest, information about the deceased, and documents such as the verdict and exhibits.

An authority provides guidance for inquests. Inquests are conducted under the common law model, meaning that precedence applies (i.e., a ruling made at one inquest may apply to future rulings at inquests).

## Installation

1. Clone this repo and `cd` into the project root.
2. `npm install`
3. `npm start`
