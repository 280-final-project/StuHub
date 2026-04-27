LAST UPDATED 04/13/2026

This is the documentation for the student hub database. This will be updated as the database is updated.
The aim of this document is to help the rest of the team understand the data saved in each of the tables,
so that they may be able to make queries to them

LEGEND:
PRIMARY KEY - data constraint, data must be unique and not null. Reserved for immutable data values
IDENTITY - integer that automatically increments whenever a row is added
TIMESTAMPTZ - time stamp with time zone
ON DELETE CASCADE - whenever the thing that the foreign key references is deleted, this row is deleted too



items -- the table that holds all of the student events on campus
 items -- the table that holds all of the student events on campus
 + item_id            | INT         | PRIMARY KEY GENERATED ALWAYS AS IDENTITY
 + item_name          | TEXT        | NOT NULL
 + item_desc          | TEXT
 + is_timed           | BOOLEAN
 + timeframe          | TEXT
 + loc_is_coordinate  | BOOLEAN
 + loc_content        | TEXT
 + img_url            | TEXT
 + user_id            | INT         | FOREIGN KEY REFERENCES users(user_id)
 + approval_status    | TEXT        | NOT NULL DEFAULT 'pending'
    -(used for admin moderation: pending, approved, rejected)
 + created_at         | TIMESTAMPTZ
 + updated_at         | TIMESTAMPTZ
 
users -- this table holds all of the users
 + user_id            | INT         | PRIMARY KEY GENERATED ALWAYS AS IDENTITY
 + user_name          | TEXT        | NOT NULL
 + email              | TEXT        | NOT NULL
 + pfp_url            | TEXT
 + bio                | TEXT
 + verified_at        | TIMESTAMPTZ
    -(automatically updates when the verification token is updated)
 + verification_token | TEXT
    -(ideally this is provided by the google authentication)
 + created_at         | TIMESTAMPTZ
 + updated_at         | TIMESTAMPTZ
    -(automatically updated whenever the row is updated)

reviews -- this table holds the reviews left by users on items, referencing both the user and the item
 + review_id          | INT         | PRIMARY KEY GENERATED ALWAYS AS IDENTITY
 + review_header      | TEXT        
 + review_desc        | TEXT
 + user_id            | INT         | FOREIGN KEY REFERENCES user(user_id)
    -(there's no delete cascade on this one because I don't think users will be able to be deleted)
 + item_id            | INT         | FOREIGN KEY REFERENCES item(item_id) ON DELETE CASCADE
 + created_at         | TIMESTAMPTZ
 + updated_at         | TIMESTAMPTZ
    -(automatically updated whenever the row is updated)

