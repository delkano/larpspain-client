import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    tagName: 'nav',
    session: inject(),
    currentUser: inject(),
    showLogin: false,
    actions: {
        logout() {
            this.get("session").invalidate();
            return false;
        },
        toggleLogin() {
            this.toggleProperty("showLogin");
        }
    }
});
