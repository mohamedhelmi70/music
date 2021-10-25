import React from 'react';
import renderer from 'react-test-renderer';
import BackButton from '../BackButton';

// Describing a test suite
describe('<BackButton />', () => {
    test('Renders Back button correctly', () => {
        const tree = renderer.create(<BackButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
