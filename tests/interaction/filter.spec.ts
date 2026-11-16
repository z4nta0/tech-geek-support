


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the list arrives as it should. How: This asserts on what the list and count play.
import { test   } from '@playwright/test'; // What: Test. Why: Each motion setting is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The helper reads a Playwright page. How: This types its page parameter.

// #endregion Imports



/**
 * filter.spec.ts = Filter Spec
 *
 * @summary
 * Checks the Articles page's topic filter in whichever engine the project
 * runs: the list and its count don't carry the arriving fade before a visitor
 * chooses, since the page's own entrance already plays, and after a topic
 * button is pressed they play the results' fade up, or no animation under
 * reduced motion. Each look is read from the computed animation name, which
 * the fade's both fill keeps in place, so the check holds however fast an
 * engine runs.
 *
 * Sections:
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

// #region aniNamFun

/**
 * aniNamFun = Animation Names Function
 *
 * @summary
 * Reads the computed animation name of the Articles page's count and of its
 * list, found by the source names inside their hashed module classes, and
 * returns them in that order, an empty string standing in for one that isn't
 * on the page.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The Articles page.
 *
 * @returns A promise that resolves with the count's and the list's animation
 *          names.
 *
 * @example
 * ```ts
 * aniNamFun(curPagObj) // => [ 'none', 'none' ]
 * ```
 *
*/

async function aniNamFun ( curPagObj : Page ) : Promise< string[] > {


	return curPagObj.evaluate( () => [ '_couTexSpa_', '_artLisUno_' ].map( ( claSouStr ) => { // What: Animation Names Return. Why: The test compares both parts at once. How: This reads each part's computed animation name, or an empty string when the part is missing.


		const parCurEle = document.querySelector( `[class*="${ claSouStr }"]` ); // What: Part Current Element. Why: The part is found by its module class's source name. How: This finds the count or the list.



		return parCurEle ? getComputedStyle( parCurEle ).animationName : ''; // What: Animation Name Return. Why: A missing part should fail the check rather than throw. How: This reads the part's animation name, or an empty string.


	} ) );


}

// #endregion aniNamFun

// #endregion Helpers



// #region Module Init

for ( const redMotBoo of [ false, true ] ) { // What: Motion Loop. Why: The list should arrive eased, and simply appear under reduced motion. How: This declares one test per motion setting.


	test( `a topic choice ${ redMotBoo ? 'swaps the list and count in at once under reduced motion' : 'eases the new list and count in' }`, async ( { page : curPagObj } ) => { // What: Topic Choice Test. Why: The narrowed list is the result of the press, so it should be seen arriving. How: This checks the list and count carry no arriving fade on load, presses a topic, and checks they play the fade, or none under reduced motion.


		if ( redMotBoo ) await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Emulation. Why: The reduced motion test reads the list as such a visitor sees it. How: This makes the page match prefers-reduced-motion.



		await curPagObj.goto( '/articles' ); // What: Articles Open Call. Why: The filter sits on the Articles page. How: This loads it.

		expect( ( await aniNamFun( curPagObj ) ).some( ( aniNamStr ) => aniNamStr.includes( 'resultSwapFadeUp' ) ) ).toBe( false ); // What: No Load Fade Assertion. Why: The page's own entrance already plays, so the list shouldn't fade again before a choice. How: This checks neither part carries the results' fade.

		await curPagObj.getByRole( 'button', { name : 'Scams & Safety' } ).click(); // What: Topic Click Call. Why: A choice is what the list's fade answers. How: This presses the "Scams & Safety" topic.

		await expect( curPagObj.getByText( 'Showing 1 article about Scams & Safety' ) ).toBeVisible(); // What: Narrowed List Assertion. Why: The check reads the list only once it has changed. How: This waits for the count to name the topic.


		const aniNamArr = await aniNamFun( curPagObj ); // What: Animation Name Array. Why: The count and the list are judged together. How: This reads both parts' animation names.


		expect( aniNamArr.map( ( aniNamStr ) => redMotBoo ? aniNamStr === 'none' : aniNamStr.includes( 'resultSwapFadeUp' ) ) ).toEqual( [ true, true ] ); // What: Arriving Fade Assertion. Why: The new list and count should fade up, or play nothing under reduced motion. How: This checks each part plays the results' fade, or has no animation under reduced motion.


	} );


}

// #endregion Module Init


