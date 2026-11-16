


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the list arrives as it should. How: This asserts on what the list, count, and live region show.
import { test   } from '@playwright/test'; // What: Test. Why: Each motion setting is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The helpers read a Playwright page. How: This types their page parameter.

// #endregion Imports



/**
 * filter.spec.ts = Filter Spec
 *
 * @summary
 * Checks the Articles page's topic filter in whichever engine the project
 * runs: the list and its count don't carry the arriving fade before a visitor
 * chooses, since the page's own entrance already plays, and after each topic
 * button is pressed they remount and play the results' fade up, or no
 * animation under reduced motion, while the polite live region holding the
 * count stays in the page, so a screen reader hears the new count. Each look
 * is read from the computed animation name, which the fade's both fill keeps
 * in place, so the check holds however fast an engine runs, and the name has
 * to lead to a keyframes rule the page really holds. A mark set before each
 * choice has to be gone from the count and the list after it, which shows
 * both remounted and so replayed their fade, and still on the region.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type ParStaTyp = { aniNamStr : string, kfrHasBoo : boolean, marOldBoo : boolean }; // What: Part State Type. Why: Each part is judged by what it plays and whether it's the element marked before. How: This types the part's animation name, whether the page holds keyframes of that name, and whether it still carries the mark.

// #endregion Types



// #region Constants

const PAR_SEL_ARR = [ '[class*="_couTexSpa_"]', '[class*="_artLisUno_"]', 'p[aria-live="polite"]' ]; // What: Part Selector Array. Why: The count and the list arrive on each choice, inside a live region that has to stay. How: This finds the count and the list by the source names inside their hashed module classes, then the region by its live attribute.

// #endregion Constants



// #region Helpers

// #region parMarFun

/**
 * parMarFun = Part Mark Function
 *
 * @summary
 * Marks the count, the list, and the live region now on the page with a
 * data-part-mark-old attribute, so a later read can tell whether each is
 * still the same element or was remounted since.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The Articles page.
 *
 * @returns A promise that settles once the parts are marked, with no value.
 *
 * @example
 * ```ts
 * parMarFun(curPagObj) // => Promise<void>
 * ```
 *
*/

async function parMarFun ( curPagObj : Page ) : Promise< void > {


	await curPagObj.evaluate( ( selLisArr ) => selLisArr.forEach( ( selCurStr ) => document.querySelector( selCurStr )?.setAttribute( 'data-part-mark-old', '' ) ), PAR_SEL_ARR ); // What: Part Mark Call. Why: A remounted part comes back without the mark. How: This sets the attribute on the count, the list, and the region.


}

// #endregion parMarFun



// #region parStaFun

/**
 * parStaFun = Part States Function
 *
 * @summary
 * Reads the count, the list, and the live region, in that order: each one's
 * computed animation name, whether the page's stylesheets hold a keyframes
 * rule of that name, and whether it still carries the mark parMarFun sets. A
 * part that isn't on the page reads as an empty name with no keyframes and no
 * mark.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The Articles page.
 *
 * @returns A promise that resolves with the three parts' states.
 *
 * @example
 * ```ts
 * parStaFun(curPagObj) // => [ { aniNamStr : 'none', ... }, ... ]
 * ```
 *
*/

async function parStaFun ( curPagObj : Page ) : Promise< ParStaTyp[] > {


	return curPagObj.evaluate( ( selLisArr ) => selLisArr.map( ( selCurStr ) => { // What: Part States Return. Why: The test judges the parts at once. How: This reads each part's animation name, its keyframes, and its mark.


		const parCurEle = document.querySelector( selCurStr );                                                                                                                 // What: Part Current Element. Why: The part is read where it now is. How: This finds it.
		const aniNamStr = parCurEle ? getComputedStyle( parCurEle ).animationName : '';                                                                                        // What: Animation Name String. Why: The part's fade is named in its computed style. How: This reads the name, or an empty string when the part is missing.
		const kfrRulArr = [ ...document.styleSheets ].flatMap( ( styShtObj ) => [ ...styShtObj.cssRules ] ).filter( ( cssRulObj ) => cssRulObj instanceof CSSKeyframesRule ); // What: Keyframes Rule Array. Why: A named fade only plays when its keyframes exist. How: This lists every keyframes rule the page's stylesheets hold.



		return { // What: Part State Return. Why: The test compares each part's three readings. How: This hands them back as one record.


			aniNamStr,

			kfrHasBoo : kfrRulArr.some( ( kfrRulObj ) => kfrRulObj.name === aniNamStr ),
			marOldBoo : parCurEle?.hasAttribute( 'data-part-mark-old' ) ?? false


		};


	} ), PAR_SEL_ARR );


}

// #endregion parStaFun

// #endregion Helpers



// #region Module Init

for ( const redMotBoo of [ false, true ] ) { // What: Motion Loop. Why: The list should arrive eased, and simply appear under reduced motion. How: This declares one test per motion setting.


	test( `each topic choice ${ redMotBoo ? 'swaps the list and count in at once under reduced motion' : 'eases the new list and count in' }`, async ( { page : curPagObj } ) => { // What: Topic Choice Test. Why: The narrowed list is the result of each press, so it should be seen arriving every time and heard. How: This checks the list and count carry no fade on load, then after each of two topic presses checks they remounted and play the fade, or none under reduced motion, inside the same live region.


		if ( redMotBoo ) await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Emulation. Why: The reduced motion test reads the list as such a visitor sees it. How: This makes the page match prefers-reduced-motion.



		await curPagObj.goto( '/articles' ); // What: Articles Open Call. Why: The filter sits on the Articles page. How: This loads it.

		expect( ( await parStaFun( curPagObj ) ).slice( 0, 2 ).map( ( parStaObj ) => parStaObj.aniNamStr.includes( 'resultSwapFadeUp' ) ) ).toEqual( [ false, false ] ); // What: No Load Fade Assertion. Why: The page's own entrance already plays, so the list shouldn't fade again before a choice. How: This checks neither the count nor the list carries the results' fade.


		for ( const [ topLabStr, couTexStr ] of [ [ 'Scams & Safety', 'Showing 1 article about Scams & Safety' ], [ 'Mac', 'Showing 1 article about Mac' ] ] ) { // What: Choice Loop. Why: The fade has to replay on every choice, not just the first. How: This presses the "Scams & Safety" topic, then the "Mac" topic, checking the parts after each.


			await parMarFun( curPagObj ); // What: Part Mark Call. Why: Each choice should remount the parts it changes and keep the region. How: This marks the count, the list, and the region before the press.

			await curPagObj.getByRole( 'button', { name : topLabStr } ).click(); // What: Topic Click Call. Why: A choice is what the list's fade answers. How: This presses the topic's button.

			await expect( curPagObj.locator( 'p[aria-live="polite"]' ) ).toHaveText( couTexStr ); // What: Region Count Assertion. Why: A screen reader hears the live region's new text. How: This waits for the region to name the topic.


			const parStaArr = await parStaFun( curPagObj ); // What: Part State Array. Why: The count, the list, and the region are judged together. How: This reads all three.


			expect( parStaArr.map( ( parStaObj ) => parStaObj.marOldBoo ) ).toEqual( [ false, false, true ] ); // What: Remount Assertion. Why: The count and the list replay their fade only when remounted, while the live region has to stay for its change to be announced. How: This checks the count and the list lost the mark and the region kept it.
			expect( parStaArr.slice( 0, 2 ).map( ( parStaObj ) => redMotBoo ? parStaObj.aniNamStr === 'none' : parStaObj.aniNamStr.includes( 'resultSwapFadeUp' ) && parStaObj.kfrHasBoo ) ).toEqual( [ true, true ] ); // What: Arriving Fade Assertion. Why: The new list and count should fade up, or play nothing under reduced motion. How: This checks each plays the results' fade from keyframes the page holds, or has no animation under reduced motion.


		}


	} );


}

// #endregion Module Init


