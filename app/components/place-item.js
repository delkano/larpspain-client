import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
    tagName: 'article',
    currentUser: inject(),
    editable: computed( 'currentUser.user', 'place.owner', function() {
        return this.get("currentUser.user.isAdmin") || this.get("place").get("owner") === this.get("currentUser.user")
    }),
    editing: false,
    actions: {
        toggleEdit() {
            this.toggleProperty("editing");
        }
    }
});
