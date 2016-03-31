/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs', function() {
            //Created for loop to loop through each object in
            //allFeeds array to test if url is defined
            //and to test if url is not empty
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            //Created for loop to loop through each object in
            //in allFeeds array to test if name is defined
            //and to test if name is not empty
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /* This is a new test suite named "The menu" */
    describe('Menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            //The menu-hidden class allows the menu to be
            //hidden using CSS.
            //This test checks if the body has the menu-hidden class
            //by default.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            //This tests checks that when the menu-icon-link is clicked,
            //the body does not have the menu-hidden class.
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //This tests checks that when the menu-icon-link is clicked again,
            //the body does have the menu-hidden class.
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //This is to load the asynchronous loadFeed function.
        //The loadFeed() can take id and cb (callback) as its parameters.
        //The 0 is sent as the id and the done() is sent as the cb.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        //When loadFeed() is complete the test executes.
        //This test expects that the feed has at least a single .entry
        //element.
        //This is done by checking if .feed has a .entry and checking if
        //the length is greater than 0.
        it('have single entry element within feed container', function(done) {
            expect($('.feed').has($('.entry')).length).toBeGreaterThan(0);
            done();
        });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //These will be the variables comparing the old feed content
        //with the new feed content.
        var oldFeedContent, newFeedContent;

        //This is to load the asynchronous loadFeed function.
        //The loadFeed() can take id and cb (callback) as its parameters.
        //The 0 is sent as the id and the done() is sent as the cb.
        //When loadFeed() is complete, the oldFeedContent variable is
        //set to the html of .feed
        beforeEach(function(done) {
            loadFeed(1, function(){
                oldFeedContent = $('.feed').html();
                done();
            });

        });

        //This test expects the new feed content is different from
        //the old feed content.
        //This executes loadFeed() again and when loadFeed() is
        //complete, newFeedContent variable is set to the html of .feed.
        //Then newFeedContent and oldFeedContent are checked to see
        //if they are not equal.
        it('changes html content', function(done) {
            loadFeed(0, function(){
                newFeedContent = $('.feed').html();
                done();
            });

            expect(newFeedContent).not.toEqual(oldFeedContent);
        });
    });
}());
