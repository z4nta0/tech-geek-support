


// #region Imports

import { expect      } from '@playwright/test'; // What: Expect. Why: A narrowed state is ready only once the list has changed. How: This waits until it has.
import { STA_REC_ARR } from './states.ts';      // What: State Record Array. Why: The narrowed states reuse the Articles page's phone and desktop states. How: This lists every state, from which the Articles ones are picked.


import type { Page      } from '@playwright/test'; // What: Page. Why: Choosing a topic drives a Playwright page. How: This types the pill action's page parameter.
import type { StaRecTyp } from './states.ts';      // What: State Record Type. Why: The narrowed states are opened like any other state. How: This types the narrowed state lists.

// #endregion Imports



/**
 * articles.ts = Articles
 *
 * @summary
 * The Articles page's narrowed states, for the suites that check every state
 * a visitor can reach: the list narrowed to one topic by pressing its pill,
 * and narrowed to another by an address naming it, the way Home's topic tiles
 * and a shared link open the page, each at the page's phone and desktop
 * widths. Every topic holds at least one article, so the empty topic's
 * invitation is a look no control reaches and isn't listed. They're kept out
 * of the shared state list, since the rendering suite captures every state
 * there against a baseline.
 *
 * Sections:
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const ART_STA_ARR = STA_REC_ARR.filter( ( staRecObj ) => staRecObj.patStr === '/articles' ); // What: Articles State Array. Why: Each narrowed state is opened at the Articles page's phone and desktop widths. How: This picks the Articles rows from the shared state list.



const ADR_STA_ARR : StaRecTyp[] = ART_STA_ARR.map( ( staRecObj ) => ( { // What: Address State Array. Why: An address naming a topic opens the list already narrowed, as Home's topic tiles do. How: For each Articles state, this copies the state with the Internet & Wi-Fi topic added to its address, and names it after the state.


	...staRecObj, // What: State Record Spread. Why: The address state keeps the Articles state's viewport. How: This copies the row.

	ideStr : `${ staRecObj.ideStr }-address`, // What: Identifier String. Why: Each test names its width and how the topic was chosen. How: This adds address to the Articles state's name, such as articles-desktop-address.
	patStr : '/articles?topic=internet-wi-fi'  // What: Path String. Why: The topic parameter narrows the list as the page loads. How: This names the Internet & Wi-Fi topic in the address.


} ) );



const PIL_STA_ARR : StaRecTyp[] = ART_STA_ARR.map( ( staRecObj ) => ( { // What: Pill State Array. Why: Pressing a topic's pill narrows the list and leaves that pill pressed, a state of its own. How: For each Articles state, this copies the state, presses "Scams & Safety" in its action, and names it after the state.


	...staRecObj, // What: State Record Spread. Why: The pill state keeps the Articles state's path and viewport. How: This copies the row.

	ideStr : `${ staRecObj.ideStr }-pill`, // What: Identifier String. Why: Each test names its width and how the topic was chosen. How: This adds pill to the Articles state's name, such as articles-desktop-pill.

	actFun : async ( curPagObj : Page ) => { // What: Action Function. Why: The state shows the list narrowed by a pressed pill. How: This presses "Scams & Safety" and waits until the count names it.


		await curPagObj.getByRole( 'button', { name : 'Scams & Safety' } ).click(); // What: Pill Click Call. Why: A topic other than the address state's shows a different article in the list. How: This presses its pill.

		await expect( curPagObj.getByText( 'Showing 1 article about Scams & Safety' ) ).toBeVisible(); // What: Narrowed List Assertion. Why: The checks read the page only once the filter has applied. How: This waits until the count names the topic.


	}


} ) );

// #endregion Constants



// #region Exports

export { ADR_STA_ARR, PIL_STA_ARR }; // What: Named Exports. Why: The suites that check every reachable state share the narrowed states. How: This exports the address and pill state lists.

// #endregion Exports


