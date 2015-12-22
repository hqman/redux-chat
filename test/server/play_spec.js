import {expect} from "chai"

describe('Array.index', function() {
    it('should return -1 when not found', function() {
        var tmp = [1, 2, 3]
            // console.log(tmp.indexOf(4))
        expect(tmp.indexOf(4)).to.equal(-1)
    });
});
