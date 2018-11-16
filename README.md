# Espresso Reads

## Your Book Store Companion


Live App: https://silly-noether-09bfca.netlify.com 

Backend Repo: https://github.com/WillHDev/EspressoReads-Server

![screen shot 2018-11-09 at 5 51 40 pm](https://user-images.githubusercontent.com/40006828/48293317-6f415480-e44c-11e8-8d95-6a50cfa4b48d.png)


"I read many, many books, but with most books I read, I only read the first few pages because most books aren't very good."
-Yuval Noah Harari, Author of Sapiens


“Some books shake the ground beneath you, but most books should have been articles instead.”

“Books are built out of other books."

-Tyler Cowen, Author of The Complacent Class

## Tech Stack:

Frontend:
React, Redux, Redux-Form, React-Router, React-Spring, React-Icons, Jest, Redux Thunk 

Backend:
Node/Express,  JSON Webtoken, Passport.js 

Build Tools:
Heroku Continuous Deployment  

![screen shot 2018-11-08 at 8 14 07 pm](https://user-images.githubusercontent.com/40006828/48293370-b4fe1d00-e44c-11e8-98cd-52d1f2eea35a.png)

## Summary:

Espresso Reads is an app designed to help you quickly navigate to the high points in the nonfiction landscape.   It’s like Yelp for book passages.  

Users post book profiles featuring ‘book nuggets’, which tell you which pages contain the best a book has to offer.  Profiles are upvoted to give the user easy access to the best of the best.  Book Nugget descriptions help you refine your search so you can keep your insight rate espresso strong.

Some books are worth reading cover to cover, but often times the economic pressures of the publishing industry deliver you a few
diamonds of fresh and important insight hidden in a mountain of fluff.  Espresso Reads helps you spend less time navigating the landscape of nonfiction.  That's less time finding the right book, 
and less time finding the most worthwhile parts of a nonfiction book.  

Users can search for a particular book, find the best passages of a book, and join the conversation in the comments section.

Users can also add their own entries (see below).

## API at a Glance

### API Documentation

##### Authorization

###### GET a JSON Web Token (Login)

* Request Type: `POST`

* URL: `https://silly-noether-09bfca.netlify.com/`

* Required Request Headers: 
```
{
  Content-Type: `application/json`
}
```

* Required Request JSON Body: 
```
{
  username: 'UsernameStringGoesHere',
  password: 'PasswordStringGoesHere'
}
```

* Response Body will be a JSON Web Token: 
```
{
  authToken: 'theTokenWillBeHereAsAString'
}
```

* Note - Web Token is valid for 7 days from the issue date



##### Book Data

###### GET all communal books

* Requires valid JSON Webtoken

* Request Type: `GET`

* URL: `https://silly-noether-09bfca.netlify.com/dashboard`

* Required Request Headers: 
```
{
  Authorization: `Bearer JSONWebToken`
}
```

* Response Body will be an array of events: 
(nuggets are highlighted passages of a book)
```
[
  {
        "nuggets": [
            {
                "fromPage": "20",
                "toPage": "49",
                "description": "Deutsch is a genius.  Here, he sums up his worldview, from quantum mechanics to the future of mankind.  Never heard a better case for optimism.",
                "id": "5be76c68783f4904bfc0211d"
            },
            {
                "fromPage": "300",
                "toPage": "340",
                "description": "I had to throw this one in there.  A theory of art by a quantum computing physicist.  Bizarre but fascinating.",
                "id": "5be76c68783f4904bfc0211e"
            }
        ],
        "comments": [
            {
                "text": "Have you read Pinker's 'How the Mind Works'?  There are some insights there that put a lot of this book into a larger context of Pinker's work in linguistics.",
                "author": "gatsby",
                "id": "5be76901783f4904bfc02116"
            }
        ],
        "userId": "000000000000000000000001",
        "title": "The Beginning of Infinity",
        "subtitle": "",
        "description": "The New York Times bestseller: A provocative, imaginative exploration of the nature and progress of knowledge In this groundbreaking book, award-winning physicist David Deutsch argues that explanations have a fundamental place in the universe—and that improving them is the basic regulating principle of all successful human endeavor. Taking us on a journey through every fundamental field of science, as well as the history of civilization, art, moral values, and the theory of political institutions, Deutsch tracks how we form new explanations and drop bad ones, explaining the conditions under which progress—which he argues is potentially boundless—can and cannot happen. Hugely ambitious and highly original, The Beginning of Infinity explores and establishes deep connections between the laws of nature, the human condition, knowledge, and the possibility for progress.",
        "authors": "David Deutsch",
        "Url": "https://play.google.com/store/books/details?id=jZHanN5_KPgC&source=gbs_api",
        "image": "http://books.google.com/books/content?id=jZHanN5_KPgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
       
        "id": "5be76c68783f4904bfc0211f"
    }, ...
]
```



# Adding a New Entry

## Click 'New'

![bookgrid](https://user-images.githubusercontent.com/40006828/48427877-c474b300-e737-11e8-8181-456afcd8623f.png)

## Search by book or author

![booksearch](https://user-images.githubusercontent.com/40006828/48427840-b45cd380-e737-11e8-9431-e49bde9ff03d.png)

## Double tap/click your book

![newentryselected](https://user-images.githubusercontent.com/40006828/48427899-cfc7de80-e737-11e8-99ef-1d45a95c10d6.png)

## Click 'Add Nugget'

![addnuggets](https://user-images.githubusercontent.com/40006828/48427911-d8b8b000-e737-11e8-9fac-80be616687a8.png)

## Enter the pages and an optional description

![enteringnuggetdata](https://user-images.githubusercontent.com/40006828/48427930-e3734500-e737-11e8-839e-e3e133388063.png)

## Click 'Submit' to serve up your book espresso

![nuggetsandcomments](https://user-images.githubusercontent.com/40006828/48427940-e9692600-e737-11e8-8f93-0a7f0c706fab.png)






