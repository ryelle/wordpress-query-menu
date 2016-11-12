/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	// action-types
	MENU_REQUEST,
	MENU_REQUEST_FAILURE,
	MENU_REQUEST_SUCCESS,
	// reducers
	items,
	requests
} from '../src/state';

import primary from './fixtures/primary';
import footer from './fixtures/footer';

describe( 'Menu reducer', () => {
	describe( 'items', () => {
		it( 'should have no change by default', () => {
			const newState = items( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should store the new menu in state', () => {
			const action = {
				type: MENU_REQUEST_SUCCESS,
				location: 'primary',
				menu: primary
			}
			const newState = items( undefined, action );
			expect( newState ).to.eql( { primary } );
		} );

		it( 'should add new menus into the correct location slots', () => {
			const originalState = deepFreeze( { primary } );
			const action = {
				type: MENU_REQUEST_SUCCESS,
				location: 'footer',
				menu: footer
			}
			const newState = items( originalState, action );
			expect( newState ).to.eql( { primary, footer } );
		} );
	} );

	describe( 'requests', () => {
		it( 'should have no change by default', () => {
			const newState = requests( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the requesting state of a new menu', () => {
			const newState = requests( undefined, { type: MENU_REQUEST, location: 'primary' } );
			expect( newState ).to.eql( { primary: true } );
		} );

		it( 'should track the requesting state of successful post requests', () => {
			const originalState = deepFreeze( { primary: true } );
			const newState = requests( originalState, { type: MENU_REQUEST_SUCCESS, location: 'primary' } );
			expect( newState ).to.eql( { primary: false } );
		} );

		it( 'should track the requesting state of failed post requests', () => {
			const originalState = deepFreeze( { primary: true } );
			const newState = requests( originalState, { type: MENU_REQUEST_FAILURE, location: 'primary' } );
			expect( newState ).to.eql( { primary: false } );
		} );

		it( 'should track the requesting state of additional post requests', () => {
			const originalState = deepFreeze( { primary: false } );
			const newState = requests( originalState, { type: MENU_REQUEST, location: 'footer' } );
			expect( newState ).to.eql( { ...originalState, footer: true } );
		} );
	} );
} );
