import Controller from '@ember/controller';

export default Controller.extend({
    showForm: false,
    newForm: null,
    actions: {
        toggleForm() {
            this.toggleProperty("showForm");
        }
    }
});
