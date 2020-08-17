# E-commerce model

React Native mobile application which can be used as a model for a real E-commerce app.\
Created with help from the course "React Native - The Practical Guide 2020"

# Application features

- Browse through product listings
- Add new listings to your cart and send orders
- View past orders
- Create new listings/edit listings you created. All users will have access to the same database of listings
- Sign up and login to user accounts

# New React Native features/concepts I learned while making this app

1. Handling store products - adding, deleting, editing.
2. Features + validation of TextInput.
3. useReducer for forms.
4. Redux thunk + using fetch to communicate with firebase server.
5. setting up a loading screen with useState and async functions.
6. Use a navigation listener to refresh page whenever we open page with drawer nav.
7. Refresh page by scrolling up, using FlatList's onRefresh and refreshing.
8. Creating accounts and logging in with firebase authentication (including error handling).
9. Auto login feature using AsyncStorage.
10. Auto logout after token expiry using a navigation container to check if authentication is gone.
