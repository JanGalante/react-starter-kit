import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs'; // fs stands from 'file system' and comes with node

describe('Our first test', () => {
    it('Should pass', () => {
        expect(true).to.equal(true);
    });
});

describe('index.html', () => {
    it('Should have h1 that says Users', (done) => {
        const index = fs.readFileSync('./src/index.html', 'utf-8'); //get the content of index.html and place it in memory

        // We can send in more files, for example js files used by index.html
        // remember if a 'fetch' is done, then it must be isomorphic since it runs on the server
        jsdom.env(index, function(err, window){ //This is an async call with a callback function
            const h1 = window.document.getElementsByTagName('h1')[0];
            expect(h1.innerHTML).to.equal('Users');
            done(); // have to tell moch that the test is done when using async call(s)
            window.close(); // free up memory that was taken when we created the in memory dom
        });
    });
});