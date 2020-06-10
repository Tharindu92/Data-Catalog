#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pymongo

uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
client = pymongo.MongoClient(uri)


# In[2]:


mydb = client["data-catalog"]


# In[5]:


#restricted tables data
database_tables = [
    {
        "_id":5001,
        "name":"Overall Transaction Data 2019",
        "description":"Data description for the above data. ",
        "tags": ['Transaction',"Restricted"],
        "data_source":"Transaction Management",
        "database_name":"transaction",
        "last_updated":"25/3/2020 18:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":5002,
        "name":"Housing Data 2019",
        "description":"Data description for the above data. ",
        "tags": ['Housing',"Building","Restricted"],
        "data_source":"Housing Management",
        "database_name":"Housing",
        "last_updated":"25/3/2020 08:44:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":5003,
        "name":"JMAP Customer",
        "description":"Data description for the above data. ",
        "tags": ['JMAP',"Customer","Restricted"],
        "data_source":"Jarvis - JMAP",
        "database_name":"jvs_customer",
        "last_updated":"25/3/2020 08:24:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":5004,
        "name":"JMAP Product",
        "description":"Data description for the above data. ",
        "tags": ['JMAP',"Product","Restricted"],
        "data_source":"Jarvis - JMAP",
        "database_name":"jvs_product",
        "last_updated":"25/3/2020 08:24:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":5005,
        "name":"JMAP Transaction",
        "description":"Data description for the above data. ",
        "tags": ['JMAP','Transaction',"Restricted"],
        "data_source":"Jarvis - JMAP",
        "database_name":"jvs_transaction",
        "last_updated":"25/3/2020 09:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    }

]


# In[6]:


collection_tables = mydb["data_restricted"]
collection_tables.insert_many(database_tables) 


# In[9]:


#unclassified tables data
database_tables = [
    {
        "_id":1001,
        "name":"Rental Index",
        "description":"Data description for the above data. ",
        "tags": ['Rental','Unclassified'],
        "data_source":"Transaction Management",
        "database_name":"Transaction",
        "last_updated":"25/3/2020 18:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":1002,
        "name":"Industrial Stock",
        "description":"Data description for the above data. ",
        "tags": ['Land','Unclassified'],
        "data_source":"Land Management",
        "database_name":"jvs_land",
        "last_updated":"25/3/2020 08:44:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":1003,
        "name":"Building Price Index",
        "description":"Data description for the above data. ",
        "tags": ['Building','Unclassified'],
        "data_source":"Jarvis",
        "database_name":"jvs_price",
        "last_updated":"25/3/2020 07:12:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":1004,
        "name":"JTC Industrial Space",
        "description":"Data description for the above data. ",
        "tags": ["Land","Unclassified"],
        "data_source":"Jarvis - JMAP",
        "database_name":"jvs_land",
        "last_updated":"25/3/2020 08:24:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":1005,
        "name":"JTC Industrial Land",
        "description":"Data description for the above data. ",
        "tags": ["Land","Unclassified"],
        "data_source":"Jarvis",
        "database_name":"jvs_land",
        "last_updated":"25/3/2020 09:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    }

]


# In[10]:


collection_tables = mydb["data_unclassified"]
collection_tables.insert_many(database_tables) 


# In[11]:


#Confidential tables data
database_tables = [
    {
        "_id":8001,
        "name":"Industrial Space Returns",
        "description":"Data description for the above data. ",
        "tags": ['Transaction',"Classified"],
        "data_source":"Transaction Management",
        "database_name":"jvs_transaction",
        "last_updated":"25/3/2020 18:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"

    },    {
        "_id":8002,
        "name":"Industrial Space Allocation",
        "description":"Data description for the above data. ",
        "tags": ["Land","Classified"],
        "data_source":"Land Management",
        "database_name":"jvs_land",
        "last_updated":"25/3/2020 08:44:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":8003,
        "name":"Business Park Buildings",
        "description":"Data description for the above data. ",
        "tags": ["Building","Classified"],
        "data_source":"Jarvis",
        "database_name":"jvs_building",
        "last_updated":"25/3/2020 07:12:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":8004,
        "name":"JTC Occupancy Rate",
        "description":"Data description for the above data. ",
        "tags": ["Building","Classified"],
        "data_source":"Jarvis",
        "database_name":"jvs_building",
        "last_updated":"25/3/2020 08:24:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    },    {
        "_id":8005,
        "name":"JTC Industrial Stock",
        "description":"Data description for the above data. ",
        "tags": ["Classified"],
        "data_source":"Jarvis",
        "database_name":"jvs_stock",
        "last_updated":"25/3/2020 09:14:07",
        "last_updated_by":"Junwei@jtc.gov.sg"


    }

]


# In[12]:


collection_tables = mydb["data_classified"]
collection_tables.insert_many(database_tables) 


# In[9]:


#database preview
collection_preview = mydb["database_preview"]


# In[14]:


#20 rows of sample data
sample_data = [
    {"building_id":100001,"building_name":"FUSHIONOPOLIS","street_name":"MARINE DRIVE 60","postal_code":436252,"year_of_lease":2004,"building_size":442432,"num_floor":34},
    {"building_id":100002,"building_name":"JTC SUMMIT","street_name":"JURONG DRIVE 40","postal_code":436252,"year_of_lease":2002,"building_size":442432,"num_floor":35},
    {"building_id":100003,"building_name":"NEPTUNE COURT","street_name":"EAST COAST DRIVE 20","postal_code":416252,"year_of_lease":2001,"building_size":342432,"num_floor":22},
    {"building_id":100004,"building_name":"LAGUNA PARK","street_name":"TEMPINES DRIVE 30","postal_code":436352,"year_of_lease":2014,"building_size":242432,"num_floor":14},
    {"building_id":100005,"building_name":"TAIPAN GRAND","street_name":"MARINE DRIVE 10","postal_code":432252,"year_of_lease":2003,"building_size":442432,"num_floor":24},
    {"building_id":100006,"building_name":"SILVERSEA","street_name":"WEST COAST DRIVE 61","postal_code":466252,"year_of_lease":2007,"building_size":412432,"num_floor":12},
    {"building_id":100007,"building_name":"MARINE BLUE","street_name":"MARINE DRIVE 43","postal_code":436752,"year_of_lease":2012,"building_size":442232,"num_floor":6},
    {"building_id":100008,"building_name":"PARKWAY VIEW","street_name":"MARINE DRIVE 23","postal_code":136252,"year_of_lease":2011,"building_size":243432,"num_floor":8},
    {"building_id":100009,"building_name":"LAGOON VIEW","street_name":"SUNSET DRIVE 33","postal_code":336252,"year_of_lease":2004,"building_size":342432,"num_floor":9},
    {"building_id":100010,"building_name":"COTE D AZUR","street_name":"MARINE DRIVE 16","postal_code":736252,"year_of_lease":2014,"building_size":542432,"num_floor":10},
    {"building_id":100011,"building_name":"TOUCH CENTER","street_name":"MARINE DRIVE 14","postal_code":836252,"year_of_lease":2007,"building_size":142432,"num_floor":11},
    {"building_id":100012,"building_name":"IMALL","street_name":"MARINE DRIVE 7","postal_code":436652,"year_of_lease":2008,"building_size":242432,"num_floor":14},
    {"building_id":100013,"building_name":"LILLIPUTT","street_name":"MARINE DRIVE 19","postal_code":733252,"year_of_lease":2009,"building_size":232432,"num_floor":6},
    {"building_id":100014,"building_name":"RAINTREE COVE","street_name":"MARINE DRIVE 9","postal_code":526252,"year_of_lease":2011,"building_size":352432,"num_floor":4},
    {"building_id":100015,"building_name":"LE COVE","street_name":"MARINE DRIVE 99","postal_code":536252,"year_of_lease":2011,"building_size":342432,"num_floor":11},
    {"building_id":100016,"building_name":"MARINE VILLE","street_name":"MARINE DRIVE 11","postal_code":916252,"year_of_lease":2012,"building_size":242432,"num_floor":14},
    {"building_id":100017,"building_name":"RAINTREE COVE","street_name":"MARINE DRIVE 18","postal_code":126252,"year_of_lease":2013,"building_size":342432,"num_floor":12},
    {"building_id":100018,"building_name":"PARKWAY PARADE","street_name":"MARINE DRIVE 2","postal_code":568252,"year_of_lease":2016,"building_size":142432,"num_floor":23},
    {"building_id":100019,"building_name":"PLAZA SINGAPURA","street_name":"DOBYGHAUT DRIVE 3","postal_code":236252,"year_of_lease":2000,"building_size":242432,"num_floor":8},
    {"building_id":100020,"building_name":"ORCHARD TOWER","street_name":"ORCHARD DRIVE 4","postal_code":437752,"year_of_lease":2002,"building_size":242432,"num_floor":11}
]
x='x'
y='y'

bar_chart = [
        { x: "word", y: 19000 },
        { x: "data", y: 16500 },
        { x: "numbers", y: 14250 },
        { x: "text", y: 13000 },
    ]


line_chart = [
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                ]

pie_chart = [
                { x: 1, y: 2, 'label': "Non-Unique" },
                { x: 2, y: 8, 'label': "Unique" },
              ]


sample_columns = {
    "building_id":{"data_type":"int","percent_missing":"0","description":"The ID of the building","display_name":"Building ID","variable_name":"building_id","data_format":"int(6)","data_sample":"100001","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "building_name":{"data_type":"string","percent_missing":"0.05","description":"The name of the building","display_name":"Building Name","variable_name":"building_name","data_format":"varchar(60)","data_sample":"IMALL","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "street_name":{"data_type":"string","percent_missing":"0.3","description":"Street name of the building","display_name":"Street Name","variable_name":"street_name","data_format":"varchar(120)","data_sample":"Marine parade 45","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "postal_code":{"data_type":"int","percent_missing":"0","description":"Postal code of the building","display_name":"Postal Code","variable_name":"postal_code","data_format":"int(6)","data_sample":"449536","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "year_of_lease":{"data_type":"int","percent_missing":"0","description":"Year of lease initiated","display_name":"Year Of Lease","variable_name":"year_of_lease","data_format":"int(4)","data_sample":"2012","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "building_size":{"data_type":"int","percent_missing":"0","description":"Building size in square feet","display_name":"Building Size","variable_name":"building_size","data_format":"int(8)","data_sample":"122,503","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart},
    "num_floor":{"data_type":"int","percent_missing":"0","description":"Number of floors in the building","display_name":"Number Of Floors","variable_name":"num_floors","data_format":"int(3)","data_sample":"6","security_classification":"restricted","security_level":"non-sensitive","remarks":"None","most_occurence":bar_chart,"unique_values":pie_chart,"trend":line_chart}
}


# In[15]:


#sample preview data
db_preview = [
    {
        "_id":1001,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":1002,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":1003,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":1004,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":1005,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":5001,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":5002,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":5003,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":5004,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":5005,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":8001,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":8002,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":8003,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":8004,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    },{
        "_id":8005,
        "num_rows":203053,
        "num_cols": 7,
        "preview":sample_data,
        "headers":sample_columns,
        "download_url":"http://localhost:8080/api/v2/datacatalog/_table/databases/101"


    }
]


# In[18]:


collection_preview.insert_many(db_preview)


# In[ ]:


#User credentials
# collection_user = mydb["user_credentials"]


# In[ ]:


#sample credentials data
# user_credentials = [
#     {
#         "_id":1001,
#         "user_name":"Gary",
#         "Login_ID": "Gary@jtc.com",
#         "Login_Password":"d1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082",
#         "Authroization_level":"admin",



#     },
#     {
#         "_id":1002,
#         "user_name":"Jun Wei",
#         "Login_ID": "Junwei@jtc.com",
#         "Login_Password":"d1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082",
#         "Authroization_level":"confidential",



#     },{
#         "_id":1003,
#         "user_name":"Jay",
#         "Login_ID": "Jay@jtc.com",
#         "Login_Password":"d1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082",
#         "Authroization_level":"restricted",



#     }
# ]


# In[ ]:


# collection_user.insert_many(user_credentials)


# In[ ]:


# User Downloads
# collection_download = mydb["user_downloads"]


# In[ ]:


# #sample download data
# user_downloads = [
#     {
#         "_id":10001,
#         "user_id":1001,
#         "db_id": 101,
#         "date_downloaded":"02/04/2020"
#     },
#      {
#         "_id":10002,
#         "user_id":1001,
#         "db_id": 102,
#         "date_downloaded":"03/04/2020"
#     },
#      {
#         "_id":10003,
#         "user_id":1001,
#         "db_id": 103,
#         "date_downloaded":"12/04/2020"
#     },
#      {
#         "_id":10004,
#         "user_id":1002,
#         "db_id": 104,
#         "date_downloaded":"13/04/2020"
#     },
#      {
#         "_id":10005,
#         "user_id":1002,
#         "db_id": 105,
#         "date_downloaded":"14/04/2020"
#     },
# ]


# In[ ]:


# collection_download.insert_many(user_downloads)


# In[ ]:


# #Ratings 
# collection_rating = mydb["database_rating"]


# In[ ]:


# #sample rating data
# user_downloads = [
#     {
#         "_id":10001,
#         "user_id":1001,
#         "db_id": 101,
#         "date_rated":"02/04/2020",
#         "rating":4
#     },
#      {
#         "_id":10002,
#         "user_id":1001,
#         "db_id": 102,
#         "date_rated":"02/04/2020",
#         "rating":4
#     },
#      {
#         "_id":10003,
#         "user_id":1001,
#         "db_id": 103,
#         "date_rated":"02/04/2020",
#         "rating":3
#     },
#      {
#         "_id":10004,
#         "user_id":1002,
#         "db_id": 104,
#         "date_rated":"02/04/2020",
#         "rating":3
#     },
#      {
#         "_id":10005,
#         "user_id":1002,
#         "db_id": 105,
#         "date_rated":"02/04/2020",
#         "rating":5
#     },
# ]


# In[ ]:


# collection_rating.insert_many(user_downloads)


# In[30]:


mydb.close


# In[ ]:




