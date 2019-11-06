# BackendChallengeBot

### Allowed Inputs to Bot
1. `!hi` 
         
         hey

2. `!google search_string`

eg:   `!google nodejs` 

                     "https://www.w3schools.com/nodejs/nodejs_intro.asp"

                     "https://nodejs.org/en/download/"
                     
                     "https://en.wikipedia.org/wiki/Node.js"
                     
                     "https://nodejs.org/"
                     
                     "https://nodejs.org/en/docs/"
    
 3. `!recent string`
 
 
 eg:  `!recent nodejs`
  
                  nodejs

### Google Search Support
```
 This bot has the feature to search on google and return top five links using
 google custom-search api(max limit is 100 searches per day).
 !google search_string >>> this command is used to search "search_string" on google.
 ```

### Search History Persisted Using Redis
```
Search history of every google search is persisted in redis,
so if we search the same query on this bot again
repsonse will always be from redis instead of calling google serach api
 also this hitory is persistent if we kill the server and starts again.
```
### History Support
```
This bot also has the feature to return the recent google searches queries.
For eg: if we type in bot "!google apple games" and "!google game of thrones",
after this if we type "!recent game" then bot will send the two messages "apple games" 
and "game of thrones" beacuse "game" is substring in both the google search queries.
For now I am assuming for "!recent command" , second paramter is compulsory and
it searches the second paramater of "!recent" command as substring in the previous
google search queries.
For eg: "game" was the substring in both "apple games" and "game of thrones".
For now there is no other check of length or anythig,
so if we type "!recent g" then also it will return
both "game of thrones" and "apple games" because "g" is substring in both.
```

### Tools and languages used
1. Nodejs is used to write code of bot.
2. Redis is used as datastorage system to cache search history.
3. Heroku is used to deploy the discord bot.
4. Google custom search api is used to return search results.

### Future Scope
This bot can be enhanced and improved for more commands
and also current commands can be imporved.
This is just a sample discord bot which is deployed on heroku and
search history stored persistently on redis.
