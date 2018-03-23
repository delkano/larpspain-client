import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'name': DS.attr(),
    'description': DS.attr(),
    'address': DS.attr(),
    'created': DS.attr(),
    'edited': DS.attr(),
    'coords': DS.attr(),
    'link': DS.attr(),
    'events': DS.hasMany('event'),
    'tags': DS.hasMany('tag'),
    'owner': DS.belongsTo('user'),

    'createdString': computed('created', function() {
        return (new Date(+this.get("created"))).toLocaleString();
    }),
    'editedString': computed('edited', function() {
        return (new Date(+this.get("edited"))).toLocaleString();
    }),
});
