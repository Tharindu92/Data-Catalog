
### Setup
File name | Description
------------- | -------------
Index | Base page
globalcss | css for all pages
Routes | For routing between pages
history | Session history


### Pages

File name | Description
------------- | -------------
Index | Base page
Home   | First page user see after login
Search | Search results page
Publish | Intended for user to publish datasets

### Components

File name | Description | Used in
------------- | ------------- | -------------
NavBar | Navigation bar | Index
SearchDisplay | The entire section containing the search results | Search
DatabaseCard | Card layout for individual search result | SearchDisplay
DrawerContent | Drawer content shown when user click on any DatabaseCard/search result | SearchDisplay
Tags | Tags of individual DatabaseCard/search result | DatabaseCard
DatabaseColumns | Column tab of DrawerContent | DrawerContent
DatabasePreview | Preview tab of DrawerContent | DrawerContent
SearchBar | Search bar for user search entries | Home, Search
SearchFilter | Filter options for landscape mode | Search
SearchFilterPortrait | Filter options for portrait mode | Search
SearchSort | Sort options for landscape mode | Search
SearchSortPortrait | Sort options for portrait mode | Search
