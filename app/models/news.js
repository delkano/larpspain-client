import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'title': DS.attr(),
    'date': DS.attr(),
    'content': DS.attr(),
    'created': DS.attr(),
    'owner': DS.belongsTo('user'),
    'tags': DS.hasMany('tag'),
 
    'datePublished': computed('date', function() {
        return (new Date(+this.get("date"))).toLocaleString();
    }),
    'dateCreated': computed('created', function() {
        return (new Date(+this.get("created"))).toLocaleString();
    }),
});
