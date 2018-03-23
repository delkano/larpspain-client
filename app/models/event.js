import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'name': DS.attr(),
    'description': DS.attr(),
    'date': DS.attr(),
    'link': DS.attr(),
    'editors': DS.hasMany('user'),
    'tags': DS.hasMany('tag'),
    'place': DS.belongsTo('place'),
 
    'dateString': computed('date', function() {
        return (new Date(+this.get("date"))).toLocaleString();
    }),
});

