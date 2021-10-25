import React from 'react';
import renderer from 'react-test-renderer';
import {View} from '../../Themed';
import Container from '../Container';

// Describing a test suite
describe('<Container />', () => {
    test('Renders Container correctly', () => {
        const tree = renderer.create(<Container loading={false} children={<View />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
