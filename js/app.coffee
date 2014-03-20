window.App = do Ember.Application.create

# Routes

App.Router.map -> 
  @route('meetups', path: '/')

App.MeetupsRoute = Ember.Route.extend
  model: -> meetups

# Controllers

App.MeetupsController = Ember.ArrayController.extend()


# Models


# Views


# Data

meetups = [
  { 
    name: 'CoffeeScript + User Auth patterns' 
    speakers: 'Steve C.'
    topics: 'Coffeescript,Ember,Django,Authentication'
    content: 'We will have the make-up presentation on CoffeeScript and Ember.js that we didn\'t have time for last month, and a discussion of how to handle users in Ember apps.'
  },
  { 
    name: 'Ember Build Tools'
    speakers: 'Craig T.'
    topics: 'Build Tools,Ember'
    content: 'For any web application, build tools are an essential part of the development workflow. We will primarily discuss using Grunt and the many plugin tasks available to handle file combining/template compilation/minification/testing/etc.' 
  },
  {
    name: 'Kick-off meeting and intro to Ember.js'
    speakers: 'Craig T.,Steve C.,Steve M.'
    topics: 'Ember'
    content: 'Welcome to the first Ember.js Pittsburgh meetup! The first half of the agenda is to introduce Ember.js and showcase some interesting examples. Then we\'ll walk through building a simple application to highlight a few core pieces of the framework.'
  }
]

