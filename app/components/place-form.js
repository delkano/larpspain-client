import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    flashMessages: inject(),
    store: inject(),
    i18n: inject(),
    init() {
        this._super(...arguments);
        if(!this.get("place")) {
            this.set("place", this.get("store").createRecord("place"));
        }
    },
    actions: {
        save() {
            var place = this.get("place");

            // If no coords, given, let's try to find them via the address and GeoCoding
            if(!place.get("coords")) {
                if(place.get("address")) {
                    //
                } else {
                    this.get("flashMessages").warning("No hay dirección ni coordenadas");
                    return;
                }
            }

            place.save().then(
                () => { // Success
                    this.get("flashMessages").info(this.get("i18n").t("places.saved"));
                    if(this.get("postSave")) {
                        this.get("postSave")();
                    }
                },
                (reason) => { // Failure
                   if(reason)
                        this.get("flashMessages").warning(reason.errors.reduce( (msg, e) => msg += "<li>"+e.detail+"</li>", ""));
                    else
                        this.get("flashMessages").warning("<li>"+this.get("i18n").t("error.noconnection")+"</li>"); 
                }
            );
        }
    }
});
