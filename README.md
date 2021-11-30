# Maps

## Introduction

Discover, share, and rate campgrounds.

## Description

Add, display, and delete map list entries. Select an entry from the list to display the full Google map with custom marker popover.

> MongoDB Atlas is used for the database. Authentication and database interface functions are handled by MongoDB Realm.

## Setup

Ensure a `.env` file exists containing these values (see `.env_example`):

- Realm App ID (`REACT_APP_REALM_APP_ID`)
  - https://realm.mongodb.com/
- Google Map API Key (`REACT_APP_GOOGLE_MAP_API_KEY`)
  - https://console.cloud.google.com/google/maps-apis/credentials

```
npm install
npm start
```
