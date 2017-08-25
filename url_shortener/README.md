# URL Shortener

### [Check it out live](http://bvus.herokuapp.com/)

#### Steps for installation:
##### Note: You will need Ruby, Rails, PostgreSQL, npm, Node and bundler installed
1. clone repo locally
2. run `bundle install`
3. run `npm install`
4. run `bundle exec rake db:setup`
5. run `rails s`
6. run `npm run "webpack -w"`
7. navigate to `localhost:3000` in your favorite browser
8. enjoy!

#### [Simple bot included to populate production database](https://github.com/keithm-thompson/bvus/blob/master/url_shortener/url_bot.rb)
  ###### Process: 
  * generates a random integer below 20
  * searches Google for that number
  * iterates through each link on the page and sends a post request to the API (with a delay between each request)
  * repeats process 50 times 
  
  ###### This process was choosen for the following reasons:
  * guarantees that there will be links that are entered multiple times
  * provides enough unique links to generate more than 100 urls
  * can be easily changed to serve a different Google search
  * links entered into the database are of varying length
