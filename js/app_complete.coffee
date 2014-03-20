window.App = do Ember.Application.create

# Routes

App.Router.map -> 
  @route('meetups', path: '/')

App.MeetupsRoute = Ember.Route.extend
  model: -> meetups

# Controllers

App.MeetupsController = Ember.ArrayController.extend
  needs: 'filterList'

  updateFilters: (->
      @get('controllers.filterList').updateFilters()
    ).observes('content.@each')



App.FilterListController = Ember.ArrayController.extend
  needs: 'meetups'

  fields: ['speakers','topics']

  updateFilters: ->
    meetups = @get('controllers.meetups').get('content')

    for f in @get('fields')
      @get('content').pushObject( 
        App.FilterController.create( 
          field: f, content: @collectValues(meetups, f) 
        )
      )


  collectValues: (data, key) ->
    keys = []
    keys.pushObjects(d.split(',')) for d in data.getEach(key)
    keys.uniq().sort()


  activeFilters: (->
      @get('content').filter (i) -> i.get('active').length > 0
    ).property('content.@each.active')

  
  filteredContent: (->
    meetups = @get('controllers.meetups').get('content')

    if @get('activeFilters').length == 0
      meetups
    else
      f = meetups.filter(
        (t) =>
          tests = []
          for f in @get('activeFilters')
            i = @intersect(
              t[f.get('field')].split(','), 
              f.get('active').getEach('value')
            )
            console.log(i)
            if i.length > 0 then tests.push(true)
          tests.length  == @get('activeFilters').length
        )
    ).property('activeFilters')


  intersect: (a,b) ->
    [a, b] = [b, a] if a.length > b.length
    value for value in a when value in b


  meetupCount: (->
      filteredContent = @get('filteredContent')
      w = if filteredContent.length == 1 then 'talk' else 'talks'
      "#{filteredContent.length} #{w}"
    ).property('filteredContent')




App.FilterController = Ember.ArrayController.extend
  init: -> 
    @_super()
    @set('content', @get('content').map((k) -> App.Filter.create(value: k)))

  active: (-> 
    @get('content').filter(
      (i) -> i.get('isActive')
    )
  ).property('content.@each.isActive')


# Models

App.Filter = Ember.Object.extend()


# Views

App.FilterView = Ember.View.extend
  templateName: 'filter'


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











