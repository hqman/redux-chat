import {fromJS, Map, List} from "immutable"

import {expect} from "chai"

describe('test immutable js', () => {

    it('操作 map', () => {
        var Immutable = require('immutable');
        var map1 = Immutable.Map({
            a: 1,
            b: 2,
            c: 3
        });
        var map2 = map1.set('b', 50);
        map1.get('b'); // 2
        map2.get('b'); // 50
        expect(map1.get('b')).to.equal(2)
        expect(map2.get('b')).to.equal(50)
    })
})
