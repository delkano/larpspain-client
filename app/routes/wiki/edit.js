import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return this.get("store").findRecord("page", params.page_id).catch( e => {
            if(e.errors[0].status == "404") {
                return this.get("store").createRecord("page")
            } else 
                console.table(e);
        });
    }
});
