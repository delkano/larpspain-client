import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    message: null,
    i18n: inject(),
    flashMessages: inject(),
    store: inject(),
    actions: {
        save() {
            let user = this.get("user");
            if(this.get("password").length > 0) {
                if(this.get("password") !== this.get("repassword")) {
                    this.get("flashMessages").warning("<li>"+this.get("i18n").t("errror.passwords_differ")+"</li>");
                    return;
                }
                user.set("password", this.get("password"));
            }

            user.save().then( 
                () => { // Success
                    this.get("flashMessages").info(this.get("i18n").t("user.saved"));
                    if(this.get("postSave")) {
                        // Let's redirect to a static page about checking the email, with a link back to the login page
                        this.get("postSave")();
                    } else {
                        
                    }
                },
                (reason) => { // Failure
                    if(reason)
                        this.get("flashMessages").warning(reason.errors.reduce( (msg, e) => msg += "<li>"+e.detail+"</li>", ""));
                    else
                        this.get("flashMessages").warning("<li>"+this.get("i18n").t("error.noconnection")+"</li>"); 
                }
            );
        },
        create() {
            if(this.get("password") !== this.get("repassword")) {
                this.get("flashMessages").warning("<li>"+this.get("i18n").t("errror.passwords_differ")+"</li>");
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
                    this.get("postSave")();
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

