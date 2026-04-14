LAST UPDATED 04/13/2026

This is the documentation for the student hub database. This will be updated as the database is updated.
The aim of this document is to help the rest of the team understand the data saved in each of the tables,
so that they may be able to make queries to them

LEGEND:
PRIMARY KEY - data constraint, data must be unique and not null. Reserved for immutable data values
IDENTITY - automatically incrementing, there's some other special stuff about it but I can't figure it out rn
item_type - enum, (event, place, resource)

items -- the table that holds all of the student events, resources, and places
 + item_id          | INT       | PRIMARY KEY GENERATED ALWAYS AS IDENTITY
 + item_name        | TEXT      | NOT NULL
 + type             | item_type
 + item_desc        | TEXT
 + is_timed         | BOOLEAN
    -(true if the item goes on for a limited time, otherwise timeframe is permanent)
 + timeframe        | TEXT
 + loc_is_coordinate| BOOLEAN
    -(true if location is in person, provide longitude and latitude in Decimal Degrees form, otherwise provide a link or short description
 + loc_content      | TEXT
 + img_url
 + created_at       | TIMESTAMP
 + updated_at       | TIMESTAMP
 
users --

reviews --