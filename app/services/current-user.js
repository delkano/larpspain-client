import Service from '@ember/service';
import { inject } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { resolve } from 'rsvp';

export default Service.extend({
    session: inject(),
    store: inject(),

    load() {
        let userId = this.get('session.data.authenticated.account_id');
        if (!isEmpty(userId)) {
            return this.get('store').findRecord('user', userId).then((user) => {
                this.set('user', user);
            });
        } else {
            return resolve();
        }
    }
});
