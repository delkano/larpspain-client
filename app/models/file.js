import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    'name': DS.attr(),
    'description': DS.attr(),
    'created': DS.attr(),
    'filename': DS.attr(),
    'owner': DS.belongsTo('user'),
    'tags': DS.hasMany('tag'),
 
    'createdString': computed('date', function() {
        return (new Date(+this.get("date"))).toLocaleString();
    }),
});
