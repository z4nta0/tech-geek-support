


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
 * is read from the computed animation name, which stays set after the fade
 * ends, so the check holds however fast an engine runs, and the name has
 * to lead to a keyframes rule the page really holds. A mark set before each
 * choice has to be gone from the count and the list after it, which shows
 * both remounted and so replayed their fade, and still on the region.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



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



type ParStaTyp = { aniStr : string, kefBoo : boolean, marBoo : boolean }; // What: Part State Type. Why: Each part is judged by what it plays and whether it's the element marked before. How: This types the part's animation name, whether the page holds keyframes of that name, and whether it still carries the mark.

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
 * parStaFun(curPagObj) // => [ { aniStr : 'none', ... }, ... ]
 * ```
 *
*/

async function parStaFun ( curPagObj : Page ) : Promise< ParStaTyp[] > {


	return curPagObj.evaluate( ( selLisArr ) => selLisArr.map( ( selCurStr ) => { // What: Part States Return. Why: The test judges the parts at once. How: This reads each part's animation name, its keyframes, and its mark.


		const parCurEle = document.querySelector( selCurStr );                                                                                                                 // What: Part Current Element. Why: The part is read where it now is. How: This finds it.
		const aniNamStr = parCurEle ? getComputedStyle( parCurEle ).animationName : '';                                                                                        // What: Animation Name String. Why: The part's fade is named in its computed style. How: This reads the name, or an empty string when the part is missing.
		const kefRulArr = [ ...document.styleSheets ].flatMap( ( styShtObj ) => [ ...styShtObj.cssRules ] ).filter( ( cssRulObj ) => cssRulObj instanceof CSSKeyframesRule ); // What: Keyframes Rule Array. Why: A named fade only plays when its keyframes exist. How: This lists every keyframes rule the page's stylesheets hold.



		return { // What: Part State Return. Why: The test compares each part's three readings. How: This hands them back as one record.


			aniStr : aniNamStr,                                                       // What: Animation String. Why: The test reads what the part plays. How: This is its computed animation name.
			kefBoo : kefRulArr.some( ( kefRulObj ) => kefRulObj.name === aniNamStr ), // What: Keyframes Boolean. Why: A named fade with no keyframes plays nothing. How: This is true when the page holds keyframes of that name.
			marBoo : parCurEle?.hasAttribute( 'data-part-mark-old' ) ?? false        // What: Mark Boolean. Why: A part still marked wasn't remounted. How: This is true when it still carries the mark.


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

		expect( ( await parStaFun( curPagObj ) ).slice( 0, 2 ).map( ( parStaObj ) => parStaObj.aniStr.includes( 'resultSwapFadeUp' ) ) ).toEqual( [ false, false ] ); // What: No Load Fade Assertion. Why: The page's own entrance already plays, so the list shouldn't fade again before a choice. How: This checks neither the count nor the list carries the results' fade.


		for ( const [ topLabStr, couTexStr ] of [ [ 'Scams & Safety', 'Showing 1 article about Scams & Safety' ], [ 'Mac', 'Showing 1 article about Mac' ] ] ) { // What: Choice Loop. Why: The fade has to replay on every choice, not just the first. How: This presses the "Scams & Safety" topic, then the "Mac" topic, checking the parts after each.


			await parMarFun( curPagObj ); // What: Part Mark Call. Why: Each choice should remount the parts it changes and keep the region. How: This marks the count, the list, and the region before the press.

			await curPagObj.getByRole( 'button', { name : topLabStr } ).click(); // What: Topic Click Call. Why: A choice is what the list's fade answers. How: This presses the topic's button.

			await expect( curPagObj.locator( 'p[aria-live="polite"]' ) ).toHaveText( couTexStr ); // What: Region Count Assertion. Why: A screen reader hears the live region's new text. How: This waits for the region to name the topic.


			const parStaArr = await parStaFun( curPagObj ); // What: Part State Array. Why: The count, the list, and the region are judged together. How: This reads all three.


			expect( parStaArr.map( ( parStaObj ) => parStaObj.marBoo ) ).toEqual( [ false, false, true ] ); // What: Remount Assertion. Why: The count and the list replay their fade only when remounted, while the live region has to stay for its change to be announced. How: This checks the count and the list lost the mark and the region kept it.
			expect( parStaArr.slice( 0, 2 ).map( ( parStaObj ) => redMotBoo ? parStaObj.aniStr === 'none' : parStaObj.aniStr.includes( 'resultSwapFadeUp' ) && parStaObj.kefBoo ) ).toEqual( [ true, true ] ); // What: Arriving Fade Assertion. Why: The new list and count should fade up, or play nothing under reduced motion. How: This checks each plays the results' fade from keyframes the page holds, or has no animation under reduced motion.


		}


	} );


}



test( 'a topic choice keeps the page in place and the topic in the address, which a reload keeps and a router link replaces', async ( { page : curPagObj } ) => { // What: Topic Address Test. Why: A press shouldn't jump the page to its top, while the choice stays shareable and a real navigation takes over. How: This scrolls a phone-wide page to the topic buttons, presses topics, and checks the scroll position, the address, a reload, and the footer's "Articles" link.


	await curPagObj.setViewportSize( { height : 844, width : 390 } ); // What: Phone Viewport Call. Why: A jump to the top hides the list most on a phone. How: This sets a phone-sized window.

	await curPagObj.goto( '/articles' ); // What: Articles Open Call. Why: The filter sits on the Articles page. How: This loads it.

	await curPagObj.evaluate( () => window.scrollTo( { behavior : 'instant', top : 450 } ) ); // What: Page Scroll Call. Why: A visitor reading down the page presses the buttons part way down it. How: This scrolls the page 450px down, past the hero, at once.

	await curPagObj.evaluate( () => new Promise( ( resFun ) => requestAnimationFrame( () => requestAnimationFrame( resFun ) ) ) ); // What: Two Frame Wait. Why: The scroll should be recorded before the press. How: This waits two animation frames.


	const befTopNum = await curPagObj.evaluate( () => scrollY ); // What: Before Top Number. Why: The page should stay where it was through the press. How: This reads the scroll position before it.


	expect( befTopNum ).toBeGreaterThan( 0 ); // What: Scrolled Premise Assertion. Why: A page already at its top couldn't show a jump. How: This checks the page has scrolled.

	await curPagObj.getByRole( 'button', { name : 'Scams & Safety' } ).dispatchEvent( 'click' ); // What: Topic Click Call. Why: The press is the change under test, and a pointer click would first scroll a button the bar covers into view, moving the page itself. How: This sends the click straight to the "Scams & Safety" topic.

	await expect( curPagObj ).toHaveURL( '/articles?topic=scams-safety' );                   // What: Topic Address Assertion. Why: The choice should stay shareable. How: This checks the address names the topic.
	await expect( curPagObj.locator( 'p[aria-live="polite"]' ) ).toHaveText( 'Showing 1 article about Scams & Safety' ); // What: Narrowed Count Assertion. Why: The list should follow the press. How: This checks the count names the topic.

	expect( Math.abs( await curPagObj.evaluate( () => scrollY ) - befTopNum ) ).toBeLessThanOrEqual( 1 ); // What: Kept Place Assertion. Why: A press shouldn't jump the page to its top. How: This checks the scroll position moved no more than a pixel.

	await curPagObj.getByRole( 'button', { name : 'All topics' } ).dispatchEvent( 'click' ); // What: All Topics Click Call. Why: Clearing the filter is a press too, and a pointer click would first scroll the button into view. How: This sends the click straight to "All topics".

	await expect( curPagObj ).toHaveURL( '/articles' ); // What: Cleared Address Assertion. Why: "All topics" should leave no topic in the address. How: This checks the address holds none.

	expect( Math.abs( await curPagObj.evaluate( () => scrollY ) - befTopNum ) ).toBeLessThanOrEqual( 1 ); // What: Cleared Place Assertion. Why: Clearing the filter shouldn't jump the page either. How: This checks the scroll position moved no more than a pixel.

	await curPagObj.getByRole( 'button', { name : 'Mac' } ).click(); // What: Mac Click Call. Why: The reload check needs a topic chosen. How: This presses the "Mac" topic.

	await curPagObj.reload(); // What: Page Reload Call. Why: A chosen topic should survive a reload, as it would any address. How: This reloads the page.

	await expect( curPagObj.locator( 'p[aria-live="polite"]' ) ).toHaveText( 'Showing 1 article about Mac' ); // What: Reloaded Count Assertion. Why: The reload should open the chosen topic. How: This checks the count names it.

	await curPagObj.getByRole( 'navigation', { name : 'Footer navigation' } ).getByRole( 'link', { exact : true, name : 'Articles' } ).click(); // What: Footer Articles Click Call. Why: A router navigation to the page should show the address it leads to. How: This follows the footer's "Articles" link.

	await expect( curPagObj.locator( 'p[aria-live="polite"]' ) ).toHaveText( /^Showing \d+ articles$/ ); // What: Full Count Assertion. Why: The link's address names no topic, so every article should show. How: This checks the count reads as the whole list, naming no topic.


} );

// #endregion Module Init


