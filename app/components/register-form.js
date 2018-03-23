import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    message: null,
    i18n: inject(),
    store: inject(),
    actions: {
        save() {
            if(this.get("password") !== this.get("repassword")) {
                this.set("message", "<li>"+this.get("i18n").t("errror.passwords_differ")+"</li>");
                return;
            }

            var user = this.get("store").createRecord('user', {
                "name": this.get("name"),
                "email": this.get("username"),
                "password": this.get("password"),
            });
            user.save().then( 
                () => { // Success
                    // Let's redirect to a static page about checking the email, with a link back to the login page
                    this.get("postRegistration")();
                },
                (reason) => { // Failure
                    if(reason)
                        this.set("message", reason.errors.reduce( (msg, e) => msg += "<li>"+e.detail+"</li>", ""));
                    else
                        this.set("message", "<li>"+this.get("i18n").t("error.noconnection")+"</li>");
                }
            );
        }
    }
});
