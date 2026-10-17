


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the form behaves as it should. How: This asserts on what the page shows and what was sent.
import { test   } from '@playwright/test'; // What: Test. Why: Each way of using the form is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The helper drives a Playwright page. How: This types its page parameter.

// #endregion Imports



/**
 * form.spec.ts = Form Spec
 *
 * @summary
 * Checks the Contact page's question form in whichever engine the project
 * runs. The browser checks the required fields and the email format before the
 * form sends, so an empty form or a malformed address never reaches Netlify.
 * A filled-in form posts its fields form-encoded to the site's root as form
 * question, then shows the thank-you, and since the email is optional, a form
 * without one sends too, its thank-you saying no reply can come. Netlify isn't
 * there in testing, so the root's POST is answered here instead and counted.
 *
 * Sections:
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

// #region forOpeFun

/**
 * forOpeFun = Form Open Function
 *
 * @summary
 * Loads the Contact page with the root's POST answered by the test, the way
 * Netlify Forms would answer it, and returns the bodies the form sent there,
 * so each test can check whether anything was sent and what.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to open the form on.
 *
 * @returns A promise that resolves with the list the sent bodies collect in,
 *          empty until the form sends.
 * @see {@link senBodArr}
 *
 * @example
 * ```ts
 * forOpeFun(page) // => Promise<string[]>
 * ```
 *
*/

async function forOpeFun ( curPagObj : Page ) : Promise< string[] > {


	const senBodArr : string[] = []; // What: Sent Body Array. Why: Each test checks whether the form sent anything, and what. How: This collects every body posted to the root.


	await curPagObj.route( ( urlCurObj ) => urlCurObj.pathname === '/', async ( rouCurObj ) => { // What: Root Route Handler. Why: Netlify Forms answers the root's POST on the live site, but not in testing. How: This answers a POST with an empty success and records its body, letting the page's own load through.


		if ( rouCurObj.request().method() !== 'POST' ) return rouCurObj.continue(); // What: Page Load Guard. Why: Loading the page also requests the root. How: This lets any request but a POST through untouched.



		senBodArr.push( rouCurObj.request().postData() ?? '' ); // What: Sent Body Record. Why: The test checks what the form sent. How: This keeps the POST's body.

		await rouCurObj.fulfill( { body : '', status : 200 } ); // What: Success Answer Call. Why: The form shows its thank-you only on an ok reply. How: This answers with an empty 200, as Netlify does.


	} );

	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.



	return senBodArr; // What: Sent Body Return. Why: Each test reads what was sent. How: This hands back the list the handler fills.


}

// #endregion forOpeFun

// #endregion Helpers



// #region Module Init

test.use( { reducedMotion : 'reduce' } ); // What: Reduced Motion Use. Why: The thank-you's fade would otherwise still be running when the checks read it. How: This makes every page in this file match prefers-reduced-motion: reduce.



test( 'an empty form stays put and sends nothing', async ( { page : curPagObj } ) => { // What: Empty Form Test. Why: A blank question shouldn't reach Netlify or show a thank-you. How: This presses Send on the empty form and checks that nothing was sent and the form is still there.


	const senBodArr = await forOpeFun( curPagObj ); // What: Sent Body Array. Why: The check needs to know whether anything was sent. How: This opens the form with the root's POST answered and counted.


	await curPagObj.getByRole( 'button', { name : 'Send My Question' } ).click(); // What: Send Click Call. Why: The empty form is submitted. How: This presses Send.

	await expect( curPagObj.getByLabel( 'Your first name' ) ).toBeFocused(); // What: First Invalid Field Assertion. Why: The browser stops a form with an empty required field and points to it. How: This checks focus moved to the empty name field.

	expect( senBodArr ).toEqual( [] ); // What: Nothing Sent Assertion. Why: An empty form must never reach Netlify. How: This checks no POST was made.

	await expect( curPagObj.getByRole( 'heading', { name : 'Question sent!' } ) ).toHaveCount( 0 ); // What: No Thank-You Assertion. Why: The visitor shouldn't be told an empty form was sent. How: This checks the thank-you never appeared.


} );



test( 'a malformed email stays put and sends nothing', async ( { page : curPagObj } ) => { // What: Malformed Email Test. Why: A question with an unreachable reply address shouldn't be sent. How: This fills every field with a bad email, presses Send, and checks that nothing was sent.


	const senBodArr = await forOpeFun( curPagObj ); // What: Sent Body Array. Why: The check needs to know whether anything was sent. How: This opens the form with the root's POST answered and counted.


	await curPagObj.getByLabel( 'Your first name' ).fill( 'Test' ); // What: Name Fill Call. Why: Only the email should be wrong. How: This fills in a first name.

	await curPagObj.getByLabel( 'Your email (optional)', { exact : true } ).fill( 'not-an-email' ); // What: Bad Email Fill Call. Why: The address has no @, so it isn't an email. How: This fills it in. // What: Exact Match Note. Why: The question field's help tip button shares its label's words, so every field with a tip is matched the same way. How: Matching the field's whole name finds only the field.

	await curPagObj.getByLabel( 'Your question', { exact : true } ).fill( 'Hello.' ); // What: Question Fill Call. Why: Only the email should be wrong. How: This fills in a question. // What: Exact Match Note. Why: The field's help tip button is named More about your question, which a partial match would also find. How: Matching the field's whole name finds only the field.

	await curPagObj.getByRole( 'button', { name : 'Send My Question' } ).click(); // What: Send Click Call. Why: The form with the bad email is submitted. How: This presses Send.

	await expect( curPagObj.getByLabel( 'Your email (optional)', { exact : true } ) ).toBeFocused(); // What: Bad Email Focus Assertion. Why: The browser stops the form at the malformed address. How: This checks focus moved to the email field. // What: Exact Match Note. Why: The question field's help tip button shares its label's words, so every field with a tip is matched the same way. How: Matching the field's whole name finds only the field.

	expect( senBodArr ).toEqual( [] ); // What: Nothing Sent Assertion. Why: A bad address must never reach Netlify. How: This checks no POST was made.


} );



test( 'a filled-in form sends to Netlify and shows the thank-you', async ( { page : curPagObj } ) => { // What: Sent Form Test. Why: A valid question has to reach Netlify as form question and thank the visitor. How: This fills every field, presses Send, and checks the thank-you and the posted fields.


	const senBodArr = await forOpeFun( curPagObj ); // What: Sent Body Array. Why: The check reads what was sent. How: This opens the form with the root's POST answered and counted.


	await curPagObj.getByLabel( 'Your first name' ).fill( 'Test' ); // What: Name Fill Call. Why: Every field is filled. How: This fills in a first name.

	await curPagObj.getByLabel( 'Your email (optional)', { exact : true } ).fill( 'visitor@example.com' ); // What: Email Fill Call. Why: Every field is filled. How: This fills in a reserved example address. // What: Exact Match Note. Why: The question field's help tip button shares its label's words, so every field with a tip is matched the same way. How: Matching the field's whole name finds only the field.

	await curPagObj.getByLabel( 'What is it about?' ).selectOption( 'internet-wi-fi' ); // What: Topic Pick Call. Why: Every field is filled. How: This picks Internet & Wi-Fi by its identifier.

	await curPagObj.getByLabel( 'Your question', { exact : true } ).fill( 'Hello.' ); // What: Question Fill Call. Why: Every field is filled. How: This fills in a question. // What: Exact Match Note. Why: The field's help tip button is named More about your question, which a partial match would also find. How: Matching the field's whole name finds only the field.

	await curPagObj.getByRole( 'button', { name : 'Send My Question' } ).click(); // What: Send Click Call. Why: The valid form is submitted. How: This presses Send.

	await expect( curPagObj.getByRole( 'heading', { name : 'Question sent!' } ) ).toBeVisible(); // What: Thank-You Assertion. Why: The visitor should learn the question went out. How: This checks the thank-you's heading shows.

	await expect( curPagObj.getByText( "I'll reply by email within 24 hours." ) ).toBeVisible(); // What: Reply Promise Assertion. Why: A visitor who left an address should hear when to expect the reply. How: This checks the thank-you promises one.

	expect( senBodArr ).toHaveLength( 1 ); // What: One Send Assertion. Why: The question should be sent exactly once. How: This checks a single POST was made.


	const senParObj = new URLSearchParams( senBodArr[ 0 ] ); // What: Sent Parameters Object. Why: The body's fields are checked one by one. How: This parses the form-encoded body.


	expect( [ senParObj.get( 'form-name' ), senParObj.get( 'email' ), senParObj.get( 'name' ), senParObj.get( 'question' ), senParObj.get( 'topic' ) ] ).toEqual( [ 'question', 'visitor@example.com', 'Test', 'Hello.', 'Internet & Wi-Fi' ] ); // What: Sent Fields Assertion. Why: Netlify matches the form by its name and reads the fields by theirs. How: This checks the form name and every field came through, the topic by its label so the email reads plainly.


} );



test( 'a form without an email still sends, and says no reply can come', async ( { page : curPagObj } ) => { // What: No Email Form Test. Why: The email is optional, so a wary visitor can still ask, but they should know no reply can reach them. How: This fills only the required fields, presses Send, and checks the thank-you and the empty email.


	const senBodArr = await forOpeFun( curPagObj ); // What: Sent Body Array. Why: The check reads what was sent. How: This opens the form with the root's POST answered and counted.


	await curPagObj.getByLabel( 'Your first name' ).fill( 'Test' ); // What: Name Fill Call. Why: The name is required. How: This fills in a first name.

	await curPagObj.getByLabel( 'Your question', { exact : true } ).fill( 'Hello.' ); // What: Question Fill Call. Why: The question is required. How: This fills in a question. // What: Exact Match Note. Why: The field's help tip button is named More about your question, which a partial match would also find. How: Matching the field's whole name finds only the field.

	await curPagObj.getByRole( 'button', { name : 'Send My Question' } ).click(); // What: Send Click Call. Why: The form without an email is submitted. How: This presses Send.

	await expect( curPagObj.getByRole( 'heading', { name : 'Question sent!' } ) ).toBeVisible(); // What: Thank-You Assertion. Why: The visitor should learn the question went out. How: This checks the thank-you's heading shows.

	await expect( curPagObj.getByText( "I can't reply directly." ) ).toBeVisible(); // What: No Reply Assertion. Why: A visitor without an address should know to check back instead. How: This checks the thank-you says no reply can come.

	expect( new URLSearchParams( senBodArr[ 0 ] ).get( 'email' ) ).toBe( '' ); // What: Empty Email Assertion. Why: Netlify should get the field, just empty. How: This checks the sent body's email is blank.


} );

// #endregion Module Init


