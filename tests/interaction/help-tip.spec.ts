


// #region Imports

import { expect      } from '@playwright/test';      // What: Expect. Why: Each check passes only when the tip opens and closes as it should. How: This asserts on what the tip's button reports.
import { test        } from '@playwright/test';      // What: Test. Why: Each tip's closing is its own test. How: This declares them.
import { TIP_REC_ARR } from '../support/contact.ts'; // What: Tip Record Array. Why: The tests cover the same tips the Contact states open. How: This lists each tip and its button's name.


import type { Locator } from '@playwright/test'; // What: Locator. Why: The helper drives a tip's button. How: This types its button parameter.
import type { Page    } from '@playwright/test'; // What: Page. Why: The helper drives a Playwright page. How: This types its page parameter.

// #endregion Imports



/**
 * help-tip.spec.ts = Help Tip Spec
 *
 * @summary
 * Checks the Contact form's help tips in whichever engine the project runs:
 * each tip pinned open by a press closes when focus moves outside it, when
 * Escape is pressed, and when the visitor presses somewhere else, so an open
 * bubble never covers the field a keyboard user moves on to. The Tab walk
 * can't show this for every tip, since the question tip's bubble leaves the
 * middle of the box below it clear, so each closing is read here from the
 * button's own report.
 *
 * Sections:
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

// #region tipPinFun

/**
 * tipPinFun = Tip Pin Function
 *
 * @summary
 * Pins a tip's bubble open the way a tap does: it presses the tip's button,
 * moves the pointer off it, and waits until the button reports the bubble
 * open, so each closing starts from a pinned bubble rather than a hovered one.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page holding the tip.
 * @param tipButLoc - Tip Button Locator: The tip's button.
 *
 * @returns A promise that settles once the bubble is open, with no value.
 *
 * @example
 * ```ts
 * tipPinFun(curPagObj, tipButLoc) // => Promise<void>
 * ```
 *
*/

async function tipPinFun ( curPagObj : Page, tipButLoc : Locator ) : Promise< void > {


	await tipButLoc.click(); // What: Tip Click Call. Why: A press pins the bubble open, the way a tap does on a phone. How: This presses the tip's button.

	await curPagObj.mouse.move( 0, 0 ); // What: Pointer Move Call. Why: A pinned bubble stays open once the pointer leaves, so the closing shouldn't come from the pointer leaving. How: This parks the pointer in the page's top corner.

	await expect( tipButLoc ).toHaveAttribute( 'aria-expanded', 'true' ); // What: Tip Open Assertion. Why: Each closing has to start from an open bubble, or it proves nothing. How: This waits until the button reports the bubble open.


}

// #endregion tipPinFun

// #endregion Helpers



// #region Module Init

for ( const tipRecObj of TIP_REC_ARR ) { // What: Tip Loop. Why: Each tip's bubble covers a different field. How: This declares one test per tip.


	test( `the ${ tipRecObj.ideStr.replace( '-', ' ' ) } closes when focus moves on, on Escape, and on a press elsewhere`, async ( { page : curPagObj } ) => { // What: Tip Close Test. Why: A pinned bubble that stays open could cover the next field a keyboard user reaches. How: This pins the tip open before each of the three closings and checks the button reports it closed after each.


		await curPagObj.goto( '/contact' ); // What: Contact Open Call. Why: The tips sit in the Contact form. How: This loads the Contact page.


		const tipButLoc = curPagObj.getByRole( 'button', { name : tipRecObj.butStr } ); // What: Tip Button Locator. Why: The tip's button opens the bubble and reports whether it's open. How: This finds the button by its announced name.


		await tipPinFun( curPagObj, tipButLoc ); // What: Tab Pin Call. Why: The first closing starts from a pinned bubble. How: This pins it open.

		await curPagObj.keyboard.press( 'Tab' ); // What: Tab Press Call. Why: Focus moving to the next field should close the bubble. How: This moves focus on.

		await expect( tipButLoc ).toHaveAttribute( 'aria-expanded', 'false' ); // What: Tab Close Assertion. Why: A bubble left open after focus moves on could cover the field. How: This checks the button reports it closed.

		await tipPinFun( curPagObj, tipButLoc ); // What: Escape Pin Call. Why: The second closing starts from a pinned bubble. How: This pins it open again.

		await curPagObj.keyboard.press( 'Escape' ); // What: Escape Press Call. Why: Escape should close the bubble. How: This presses it.

		await expect( tipButLoc ).toHaveAttribute( 'aria-expanded', 'false' ); // What: Escape Close Assertion. Why: Escape is the keyboard's way out of a pop-up. How: This checks the button reports it closed.

		await tipPinFun( curPagObj, tipButLoc ); // What: Press Pin Call. Why: The third closing starts from a pinned bubble. How: This pins it open again.

		await curPagObj.getByRole( 'heading', { level : 1 } ).click(); // What: Elsewhere Press Call. Why: A press outside the tip should close the bubble. How: This presses the page's heading, away from the tip.

		await expect( tipButLoc ).toHaveAttribute( 'aria-expanded', 'false' ); // What: Press Close Assertion. Why: A press elsewhere means the visitor has moved on. How: This checks the button reports it closed.


	} );


}

// #endregion Module Init


