import Component from '@ember/component';
import { inject } from '@ember/service';
import { allSettled } from 'rsvp';

export default Component.extend({
    flashMessages: inject(),
    store: inject(),
    i18n: inject(),
    init() {
        this._super(...arguments);
        if(!this.get("place")) {
            this.set("place", this.get("store").createRecord("place"));
        }
        this.get("store").findAll("tag"); // Let's (re)load them into the cache
    },
    actions: {
        save() {
            var place = this.get("place");

            // If no coords, given, let's try to find them via the address and GeoCoding
            if(!place.get("coords")) {
                if(place.get("address")) {
                    //
                } else {
                    this.get("flashMessages").warning("No hay dirección ni coordenadas.");
                    return;
                }
            }

            let promises = place.get("tags").map( tag => tag.save() );

            allSettled( promises).then( () => { // We're ignoring errors with saved tags for the moment
                place.save().then(
                    () => { // Success
                        this.get("flashMessages").info(this.get("i18n").t("places.saved"));
                        if(this.get("afterSave")) {
                            this.get("afterSave")();
                        }
                    },
                    (reason) => { // Failure
                        if(reason.errors)
                            this.get("flashMessages").warning(reason.errors.reduce( (msg, e) => msg += "<li>"+e.detail+"</li>", ""));
                        else
                            this.get("flashMessages").warning("<li>"+this.get("i18n").t("error.noconnection")+"</li>"); 
                    }
                );
            });
        },
        cancel() {
            this.get("place").rollbackAttributes();
            this.get("afterSave")();
        },
        addTag(t) {
            if(!t) return;
            let tags = this.get("store").peekAll('tag');
            let tag = tags.filter( (tag) => tag.get("name") === t);
            if(tag.length === 0) {
                tag = this.get("store").createRecord("tag", {
                    'name': t,
                });
            } else {
                tag = tag[0];
            }
            this.get("place").get("tags").pushObject(tag);
        },
        removeTag(i) {
            this.get("place").get("tags").then( tags => tags.removeAt(i) );
        }
    }
});
