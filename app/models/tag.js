import DS from 'ember-data';

export default DS.Model.extend({
    'name': DS.attr(),
    'description': DS.attr(),
    'news': DS.hasMany('news'),
    'events': DS.hasMany('event'),
    'places': DS.hasMany('place'),
    'pages': DS.hasMany('page'),
    'files': DS.hasMany('file')
});
