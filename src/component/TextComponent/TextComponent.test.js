import TextComponent from "./TextComponent";
import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

it('renders TextComponent', () => {
    const tree = renderer.create(<TextComponent text="mock" fontSize={12} color="red" isTitle={false} />).toJSON();
    expect(tree).toMatchSnapshot();
});