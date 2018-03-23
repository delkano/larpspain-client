import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    tagName: '',
    session: inject(),
    router: inject(),
    i18n: inject(),
    actions: {
        login() {
            var [username, password] = [ this.get("username"), this.get("password") ];

            this.get("session").authenticate('authenticator:oauth2', username, password).then(
                () => { //Success
                    if(this.get("afterLogin")) {
                        this.get("afterLogin")();
                    } else {
                        this.get("router").transitionTo('index');
                    }
                },
                reason => { // Failure
                    if(reason)
                        this.set("message", reason.errors.reduce( (msg, e) => msg += "<li>"+e.detail+"</li>", ""));
                    else
                        this.set("message", "<li>"+this.get("i18n").t("error.noconnection")+"</li>");
                }
            );
        }
    }
});
