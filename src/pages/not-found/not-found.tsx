


// #region Imports

import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * not-found.tsx = Not Found Page
 *
 * @summary
 * The 404 page, a placeholder that renders its heading and one line until the
 * page is built.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region NotFouCom

/**
 * NotFouCom = Not Found Component
 *
 * @summary
 * Renders the 404 page's placeholder: its heading and one line
 * of text, until the real page replaces it.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The placeholder section.
 *
 * @example
 * ```tsx
 * NotFouCom() // => <NotFouCom />
 * ```
 *
*/

function NotFouCom () : JSX.Element {



	return (


		<section>{ /* What: Placeholder Section Element. Why: The page needs a body until it's built. How: This holds its heading and line. */ }


			<h1>Page Not Found</h1>{ /* What: Placeholder Heading Element. Why: Every page has one main heading. How: This names the page. */ }

			<p>This page doesn't exist.</p>{ /* What: Placeholder Paragraph Element. Why: The page says what it will hold. How: This is one line of text. */ }


		</section>


	);


}

// #endregion NotFouCom

// #endregion Components



// #region Exports

export { NotFouCom }; // What: Named Exports. Why: app.tsx routes to this page. How: This exports NotFouCom.

// #endregion Exports


