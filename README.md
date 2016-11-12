WordPress Query Menu
====================

This package contains a query component, along with redux state & selectors for posts pulled from a WordPress site. This uses the [`node-wpapi`](https://github.com/WP-API/node-wpapi) package to get your site's data via Query Components ([inspired by calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/our-approach-to-data.md#query-components)). The Query Components call the API, which via actions set your site's data into the state.

To use any of these helpers, you'll need to set your Site URL & nonce in a global (`SiteSettings`), so that the API knows what site to connect to. For example:

```js
window.SiteSettings = {
	endpoint: 'url/wp-json',
};
```

QueryMenu
=========

QueryMenu is a React component used in managing the fetching of menu data by theme location.

## Usage

Render the component, passing the requested `location`, the menu location set up by the theme. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryMenu from 'wordpress-query-menu';
import Navigation from './navigation';

export default function MyMenu( { menu } ) {
	return (
		<div>
			<QueryMenu location={ 'primary' } />
			<Navigation menu={ menu } />
		</div>
	);
}
```

## Props

### `location`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The menu location as set by the theme. See [`register_nav_menus`](https://developer.wordpress.org/reference/functions/register_nav_menus/).

Menu Selectors
==============

You can import these into your project by grabbing them from the `selectors` file:

```jsx
import { getMenu, isRequestingMenu } from 'wordpress-query-menu/lib/selectors';
```

#### `getMenu( state, location )`

#### `isRequestingMenu( state, location )`

Menu State
==========

If you need access to the reducers, action types, or action creators, you can import these from the `state` file. For example, to use this in your global redux state, mix it into your reducer tree like this:

```jsx
import menu from 'wordpress-query-menu/lib/state';

let reducer = combineReducers( { ...otherReducers, menu } );
```

If you need to call an action (the query component should take care of this most of the time), you can pull the action out specifically:

```jsx
import { requestMenu } from 'wordpress-query-menu/lib/state';
```

[View the file itself](src/state.js) to see what else is available.
