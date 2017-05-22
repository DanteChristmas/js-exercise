# js-exercise
asyncMap.js contains the solution for an array map function the asynchronously calls a simple js mapping function and only resolves once the have all completed.  There's some setTimeouts and console.logs commented out that can be used to test all the async action.

asyncAsyncMap.js contains an experiment I did because I had some extra time for this.  It extends the Array prototype to add another asynchronous map function that can be passed another asynchronous mapping function. That function will be asynchronously called on all items of the array until they the are all wrapped up in one glorious anychronous all function... asynchronously.  Basically it's bulk upload for Node in one handy-dandy function.

index.html is a blank webpage I used to run some test cases for this.  Serve it up with http-server or whatever static web server you fancy.  
