import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import 'jest-enzyme/lib/index.js'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {Users} from "./Users";

Enzyme.configure({adapter: new Adapter()})

describe('Users', () => {
    test('renders User component for each user', () => {
        let onDelete = jest.fn();
        const component = shallow(<Users onDelete={onDelete} users={[{id: 1, name: 'Jan', surname: 'Kowalski'}]}/>);

        //console.log(component.debug()) //you can see that content of UserComponent is not rendered because use of shallow

        expect(component.find('UserComponent')).toExist()
        expect(component.find('UserComponent').props().user).toEqual({id: 1, name: 'Jan', surname: 'Kowalski'})
        expect(component.find('UserComponent').props().onDelete).toEqual(onDelete)
    });

});

