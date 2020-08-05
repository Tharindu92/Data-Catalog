
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
Home*   | First page user see after login
Search | Search results page
Publish | Intended for user to publish datasets
Login | Login page using email only
Login2 | Alternate login page using email and password


### Components

File name | Description | Used in
------------- | ------------- | -------------
AboutDataSet | Basic information of Dataset | DrawerContent
ApiGuide | Sample guide on how to access respective datasets via API | AboutDataSet
DataAttributeInfo | Additional info when clicking on individual Data Attributes | DataAttributes
DataAttributes | DataAttributes tab of DrawerContent | DrawerContent
DatabaseCard | Card layout for individual search result | SearchDisplay
DataPreview | Preview tab of DrawerContent | DrawerContent
DataSetComments | Segmect for commenting on datasets | DrawerContent
DrawerContent | Drawer content shown when user click on any DatabaseCard/search result | SearchDisplay
ExportCsvButton | Download button for exporting datasets into csv | DatabaseCard
Footer | Footer | Index
NavBar | Navigation bar | Index
RatingDisplay | Star rating of datasets | AboutDataSet
SearchBar | Search bar for user search entries | Home, Search
SearchDisplay | The entire section containing the search results | Search
SearchFilter | Filter options for landscape mode | Search
SearchFilterPortrait | Filter options for portrait mode | Search
SearchSort | Sort options for landscape mode | Search
SearchSortPortrait | Sort options for portrait mode | Search
Tags | Tags of individual DatabaseCard/search result | DatabaseCard


*Temporarily not in use