import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return this.get('store').findRecord('page', params.page_id).catch( e => {   
            if(e.errors[0].status == "404") {
                this.transitionTo("wiki.edit", params.page_id);
            } else 
                console.table(e);
        });
    },
});
