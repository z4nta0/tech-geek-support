


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: A send is finished only once its result shows. How: This waits until the result is visible.


import type { Page } from '@playwright/test'; // What: Page. Why: Sending the form drives a Playwright page. How: This types the send helper's page parameter.

// #endregion Imports



/**
 * contact.ts = Contact
 *
 * @summary
 * The Contact form's error message and the helper that brings a send's
 * result about, for the suites that check what happens once the form is
 * sent. Netlify isn't there in testing, so the root's POST is answered here
 * instead, with a 200 for a sent question, which swaps the form for its
 * thank-you, and any other status for a failed one, which shows the error.
 * Adapted from TechGeek.cards' own.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const ERR_MES_STR = "Your question didn't send. Please try again, or email it to contact@techgeek.support."; // What: Error Message String. Why: A failed send has to put this message in the alert region. How: This is the error the page shows.

// #endregion Constants



// #region Helpers

// #region senForFun

/**
 * senForFun = Send Form Function
 *
 * @summary
 * Sends the Contact form and waits for its result: answers the root's POST
 * with the given status, fills in a first name, an email address, and a
 * question, presses "Send My Question", then waits until the thank-you's
 * heading shows for a 200, or the error shows in the alert region for any
 * other status. Any other request to the root falls back to the page's other
 * route handlers, such as one that adds the security policy's headers. It
 * expects the Contact page already loaded.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page showing the form.
 * @param staCodNum - Status Code Number: The status the root's POST answers
 *                    with.
 *
 * @returns A promise that settles once the result shows, with no value.
 *
 * @example
 * ```ts
 * senForFun(page, 500) // => Promise<void>
 * ```
 *
*/

async function senForFun ( curPagObj : Page, staCodNum : number ) : Promise< void > {


	await curPagObj.route( ( urlCurObj ) => urlCurObj.pathname === '/', async ( rouCurObj ) => { // What: Root Route Handler. Why: Netlify Forms answers the root's POST on the live site, but not in testing. How: This answers a POST with an empty body at the given status, and hands any other request to the root on to the routes added before it.


		if ( rouCurObj.request().method() !== 'POST' ) return rouCurObj.fallback(); // What: Other Request Guard. Why: Only the form's POST needs answering, while a route added earlier, such as the policy's headers, still has to see the rest. How: This passes any other request to the root on to the next handler, or to the network when there's none.



		await rouCurObj.fulfill( { body : '', status : staCodNum } ); // What: Status Answer Call. Why: The form shows its thank-you only on an ok reply, and its error otherwise. How: This answers with an empty body at the given status.


	} );


	await curPagObj.getByRole( 'main' ).getByLabel( 'Your first name' ).fill( 'Test' );                                       // What: Name Fill Call. Why: The name is required. How: This fills in a first name.
	await curPagObj.getByRole( 'main' ).getByLabel( 'Your email (optional)', { exact : true } ).fill( 'visitor@example.com' ); // What: Email Fill Call. Why: The thank-you differs without an address, so the form is sent with one. How: This fills in a reserved example address, matched by its whole name since its help tip button shares its label's words.
	await curPagObj.getByRole( 'main' ).getByLabel( 'Your question', { exact : true } ).fill( 'Hello.' );                     // What: Question Fill Call. Why: The question is required. How: This fills in a question, matched by its whole name since its help tip button shares its label's words.

	await curPagObj.getByRole( 'button', { name : 'Send My Question' } ).click(); // What: Send Click Call. Why: The filled-in form is submitted. How: This presses "Send My Question".


	const resLocObj = staCodNum === 200 ? curPagObj.getByRole( 'heading', { name : 'Question sent!' } ) : curPagObj.getByRole( 'alert' ).getByText( ERR_MES_STR ); // What: Result Locator Object. Why: Each status ends in its own result. How: This finds the thank-you's heading for a 200, or the error inside the alert region otherwise.


	await expect( resLocObj ).toBeVisible(); // What: Result Shown Assertion. Why: The checks read the page only once the result is there. How: This waits until the result shows.


}

// #endregion senForFun

// #endregion Helpers



// #region Exports

export { ERR_MES_STR, senForFun }; // What: Named Exports. Why: The suites that check a send's result share its error message and its sender. How: This exports the error message and the send helper.

// #endregion Exports


