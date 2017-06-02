import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
var $ = require('jQuery');
import TestUtils from 'react-addons-test-utils';

import OpenSpotsList from '../../components/OpenSpotsList';
import OpenSpot from '../../components/OpenSpot';

describe('OpenSpotsList', () => {
    it('should exist', () => {
        expect(OpenSpotsList).toExist();
    });

    it('should render one OpenSpot component for each open spot', () => {

        var openSpots = [
            {
                lat: 43.303,
                lng: -23.2030,
                id: 5,
                available: true,
                markedOpenAt: "12:40",
                markedClosedAt: undefined
            },

            {
                lat: 33.303,
                lng: -63.2030,
                id: 7,
                available: true,
                markedOpenAt: "5:40",
                markedClosedAt: undefined
            }
        ];

        var openSpotsList = TestUtils.renderIntoDocument(<OpenSpotsList addresses={openSpots}/>);
        var openSpotComponents = TestUtils.scryRenderedComponentsWithType(openSpotsList, OpenSpot);

        expect(openSpotComponents.length).toBe(openSpots.length);
    });

});