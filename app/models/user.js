import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'name': DS.attr(),
    'email': DS.attr(),
    'role': DS.attr(),
    'pages': DS.hasMany('page'),
    'files': DS.hasMany('file'),
    'news': DS.hasMany('news'),
    'events': DS.hasMany('event'),
    'created': DS.attr(),
    'password': DS.attr(),

    'dateCreated': computed('created', function() {
        return (new Date(+this.get("created"))).toLocaleString();
    }),
   'isAdmin': computed('role', function() {
        return this.get("role") === "ADMIN";
    })
});
