import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('profile');
  this.route('events');
  this.route('places');
  this.route('register');
  this.route('wiki', function() {
    this.route('view', { path: '/:page_id' }); 
    this.route('edit', { path: '/edit/:page_id' });
  });
});

export default Router;
