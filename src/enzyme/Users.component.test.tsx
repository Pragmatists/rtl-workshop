import React from 'react';
import nock from 'nock';
import Enzyme, {mount} from 'enzyme'
import 'jest-enzyme/lib/index.js'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {UsersComponent} from "./Users.component";
import {act} from "react-dom/test-utils";

const httpMock = nock('http://localhost');
Enzyme.configure({adapter: new Adapter()})

describe('Users', () => {
    test('show header', () => {
        const component = mount(<UsersComponent/>);

        expect(component.find('header')).toExist()
        expect(component.find('header').html()).toContain('Users')
    });

    test('show load button', () => {
        const component = mount(<UsersComponent/>);

        expect(component.find('button')).toExist()
        expect(component.find('button')).toHaveText('Załaduj')
    });

    test('load users after click', (done) => {
        httpMock.get('/users/').reply(200, [
            {id: '1', name: 'Jan', surname: 'Kowalski'},
            {id: '2', name: 'Piotr', surname: 'Nowak'},
            {id: '3', name: 'Stefan', surname: 'Wyczesany'},
        ]);

        const component = mount(<UsersComponent/>);
        act(() => {
            component.find('button').simulate('click')
        });

        // enzyme-wait library can be used heredded not so preattyy
        setTimeout(() => {
            component.update()
            const cells = component.find('tr').map(row => row.find('td').map(cell => cell.text()))
            expect(cells[0][0]).toEqual('Jan')
            expect(cells[1][0]).toEqual('Piotr')
            expect(cells[2][0]).toEqual('Stefan')
            done()
        }, 1000);

    });
});

