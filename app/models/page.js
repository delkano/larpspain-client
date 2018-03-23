import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'title': DS.attr(),
    'content': DS.attr(),
    'created': DS.attr(),
    'edited': DS.attr(),
    'owner': DS.belongsTo('user'),
    'tags': DS.hasMany('tag'),
 
    'createdString': computed('created', function() {
        return (new Date(+this.get("created"))).toLocaleString();
    }),
    'editedString': computed('edited', function() {
        return (new Date(+this.get("edited"))).toLocaleString();
    }),
});
