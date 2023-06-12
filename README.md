Simple backend API that uses the petfinder API for its dog and cat data. Displayed with EJS.

USER CASES: (for users)
- user can search directory for dogs and cats available for adoption
- user can filter results with many parameters including:
  - location
  - breed
  - age
  - size
  - gender
  - color
  - care and behaviour (special needs / house-trained)
  - Out-of-town pets that can be transported to your area
- user can click on the pet's profile card to view the rest of its data, which includes:
  - photos
  - "About" (characteristics, coat length, health, breed, etc...) // possibly include other filter data if available
  - the bio of the pet
  - location of pet/whichever rescue manages them
    - this will include the rescue's contact info
- user can search for pet by name (dogs and cats directory separated)

PLANNED COMPONENTS:
- Search for pet through search bar
- save pet to a "favourites" list and possibly separate dog/cat categories ???
- paginate data 
- user login/signup
- card display for pets
- organize pets by their name in alphabetical order
- toggle between dog/cat directory (tabs)
- access saved list
- display pet profile through modal/page ??? 
- filter options

TOP 5 COMPONENTS:
- user login/signup
- paginate data
- save to favourites
- search pets by name
- filter options

TECHNOLOGIES: 
- expressjs
- mongoose (mongoDB)
- firebase
- firebase-admin
