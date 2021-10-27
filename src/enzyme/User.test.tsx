import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import 'jest-enzyme/lib/index.js'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {UserComponent} from "./User";

Enzyme.configure({adapter: new Adapter()})

describe('User', () => {
    test('renders User data', () => {
        let onDelete = jest.fn();
        const component = shallow(<UserComponent onDelete={onDelete} user={{id: 1, name: 'Jan', surname: 'Kowalski'}}/>);

        expect(component.find('[data-test="user-name"]').text()).toEqual('Jan')
        expect(component.find('[data-test="user-surname"]').text()).toEqual('Kowalski')
    });

    test('calls callback function on delete', () => {
        let onDelete = jest.fn();
        const component = shallow(<UserComponent onDelete={onDelete} user={{id: 1, name: 'Jan', surname: 'Kowalski'}}/>);

        component.find('[data-test="delete-user"]').simulate('click')

        expect(onDelete).toHaveBeenCalledWith(1)
    });

});

