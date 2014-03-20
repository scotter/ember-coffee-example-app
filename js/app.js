(function() {
  var meetups,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.App = Ember.Application.create();

  App.Router.map(function() {
    return this.route('meetups', {
      path: '/'
    });
  });

  App.MeetupsRoute = Ember.Route.extend({
    model: function() {
      return meetups;
    }
  });

  App.MeetupsController = Ember.ArrayController.extend({
    needs: 'filterList',
    updateFilters: (function() {
      return this.get('controllers.filterList').updateFilters();
    }).observes('content.@each')
  });

  App.FilterListController = Ember.ArrayController.extend({
    needs: 'meetups',
    fields: ['speakers', 'tags'],
    updateFilters: (function() {
      var f, meetups, _i, _len, _ref, _results;
      meetups = this.get('controllers.meetups').get('content');
      _ref = this.get('fields');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        _results.push(this.get('content').pushObject(App.FilterController.create({
          field: f,
          content: this.collectValues(meetups, f)
        })));
      }
      return _results;
    }),
    collectValues: function(data, key) {
      var d, keys, _i, _len;
      keys = [];
      data = data.getEach(key);
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        keys.pushObjects(d.split(','));
      }
      return keys.uniq().sort();
    },
    activeFilters: (function() {
      return this.get('content').filter(function(i) {
        return i.get('active').length > 0;
      });
    }).property('content.@each.active'),
    filteredContent: (function() {
      var f, meetups;
      meetups = this.get('controllers.meetups').get('content');
      if (this.get('activeFilters').length === 0) {
        return meetups;
      } else {
        return f = meetups.filter((function(_this) {
          return function(t) {
            var i, tests, _i, _len, _ref;
            tests = [];
            _ref = _this.get('activeFilters');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              f = _ref[_i];
              i = _this.intersect(t[f.get('field')].split(','), f.get('active').getEach('value'));
              console.log(i);
              if (i.length > 0) {
                tests.push(true);
              }
            }
            return tests.length === _this.get('activeFilters').length;
          };
        })(this));
      }
    }).property('activeFilters'),
    meetupCount: (function() {
      var filteredContent, w;
      filteredContent = this.get('filteredContent');
      w = filteredContent.length === 1 ? 'talk' : 'talks';
      return "" + filteredContent.length + " " + w;
    }).property('filteredContent'),
    intersect: function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    }
  });

  App.FilterController = Ember.ArrayController.extend({
    init: function() {
      this._super();
      return this.set('content', this.get('content').map(function(k) {
        return App.Filter.create({
          value: k
        });
      }));
    },
    active: (function() {
      var a;
      return a = this.get('content').filter(function(i) {
        return i.get('isActive');
      });
    }).property('content.@each.isActive')
  });

  App.Filter = Ember.Object.extend();

  App.FilterListView = Ember.View.extend({
    templateName: 'filter-list'
  });

  App.FilterView = Ember.View.extend({
    templateName: 'filter'
  });

  meetups = [
    {
      name: 'CoffeeScript + User Auth patterns',
      speakers: 'Steve C.',
      tags: 'Coffeescript,Ember,Django,Authentication',
      content: 'We will have the make-up presentation on CoffeeScript and Ember.js that we didn\'t have time for last month, and a discussion of how to handle users in Ember apps.'
    }, {
      name: 'Ember Build Tools',
      speakers: 'Craig T.',
      tags: 'Build Tools,Ember',
      content: 'For any web application, build tools are an essential part of the development workflow. We will primarily discuss using Grunt and the many plugin tasks available to handle file combining/template compilation/minification/testing/etc.'
    }, {
      name: 'Kick-off meeting and intro to Ember.js',
      speakers: 'Craig T.,Steve C.,Steve M.',
      tags: 'Ember',
      content: 'Welcome to the first Ember.js Pittsburgh meetup! The first half of the agenda is to introduce Ember.js and showcase some interesting examples. Then we\'ll walk through building a simple application to highlight a few core pieces of the framework.'
    }
  ];

}).call(this);
