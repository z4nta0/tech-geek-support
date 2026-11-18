


// #region Imports

import { expect    } from '@playwright/test';     // What: Expect. Why: Each width passes only when every card grid keeps its rows. How: This asserts the problem list is empty.
import { opeStaFun } from '../support/states.ts'; // What: Open State Function. Why: Each width is measured settled. How: This loads the page and waits for it.
import { test      } from '@playwright/test';     // What: Test. Why: Each page at each width is its own test. How: This declares them.

// #endregion Imports



/**
 * grids.spec.ts = Grids Spec
 *
 * @summary
 * Checks the Card Grids rule on every page with a grid of cards, in whichever
 * engine the project runs: at each width, a grid's visible cards are grouped
 * into rows by where their tops land, and every row has to hold the same
 * number of cards. The Contact sidebar follows the rule's centered odd card
 * exception instead, since its three cards pair up from 1,024px down to 641px:
 * every row but the last is full, and a short last row holds one card at the
 * others' width, the room left of it within 2px of the room right of it,
 * measured against the grid's own content box. The widths are the responsive
 * suite's, a pixel either side of each breakpoint included, since a grid
 * changes its column count there. A wrapping row of chips, such as the
 * Articles page's topic pills, isn't a grid of cards, so it isn't checked.
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

type GriCasTyp = { // What: Grid Case Type. Why: Each grid is found and judged the same way. How: This names the grid, its page, its module class, and how its rows are judged.


	griStr : string,  // What: Grid String. Why: The grid is found by its module class, whose hashed name keeps the source name between underscores. How: This names that class.
	ideStr : string,  // What: Identifier String. Why: A problem should name the grid in plain words. How: This opens each of its problem entries.
	oddBoo : boolean, // What: Odd Boolean. Why: The Contact sidebar may leave one centered card in its last row. How: This is true for that grid, and false for every grid that keeps even rows.
	pagStr : string   // What: Page String. Why: Each test opens one page and checks the grids on it. How: This names the page's case.


};

// #endregion Types



// #region Constants

const GRI_CAS_ARR : GriCasTyp[] = [ // What: Grid Case Array. Why: Every grid of cards on the site is checked the same way. How: Each row names a grid, its page, its module class, and how its rows are judged, in markup order.


	{ griStr : 'topGriUno', ideStr : 'topic tiles',     oddBoo : false, pagStr : 'home'    }, // What: Topic Tiles Grid Case. Why: The twelve tiles step through four, three, two, and one columns, at 1,024px, 768px, and 640px. How: This checks every row holds the same number.
	{ griStr : 'artGriUno', ideStr : 'newest articles', oddBoo : false, pagStr : 'home'    }, // What: Newest Articles Grid Case. Why: The four newest articles step through four, two, and one columns, at 1,024px and 640px. How: This checks every row holds the same number.
	{ griStr : 'steLisOrd', ideStr : 'steps',           oddBoo : false, pagStr : 'home'    }, // What: Steps Grid Case. Why: The three How It Works steps sit three across, then stack at 768px and below. How: This checks every row holds the same number.
	{ griStr : 'proGriUno', ideStr : 'promises',        oddBoo : false, pagStr : 'about'   }, // What: Promises Grid Case. Why: The three promises sit three across, then stack at 768px and below. How: This checks every row holds the same number.
	{ griStr : 'conSidAsi', ideStr : 'sidebar',         oddBoo : true,  pagStr : 'contact' }  // What: Sidebar Grid Case. Why: The sidebar's three cards stack, pair up with the third centered from 1,024px down to 641px, then stack again at 640px and below. How: This checks the full rows and the odd card's width and centering.


];



type PagCasTyp = { ideStr : string, patStr : string }; // What: Page Case Type. Why: Each test opens one page. How: This names the page and its path.

const PAG_CAS_ARR : PagCasTyp[] = [ // What: Page Case Array. Why: Only the pages holding a grid of cards are opened. How: Each row names a page and its path.


	{ ideStr : 'home',    patStr : '/'        }, // What: Home Case. Why: The home page holds the topic tiles, the newest articles, and the steps. How: This opens the home page.
	{ ideStr : 'about',   patStr : '/about'   }, // What: About Case. Why: The About page holds the promises. How: This opens the About page.
	{ ideStr : 'contact', patStr : '/contact' }  // What: Contact Case. Why: The Contact page holds the sidebar. How: This opens the Contact page.


];



const WID_LIS_ARR = [ 320, 360, 390, 414, 440, 441, 480, 640, 641, 768, 769, 1024, 1025, 1280, 1440, 1920 ]; // What: Width List Array. Why: A grid changes its column count at the breakpoints. How: This lists the responsive suite's widths, the site's 440px, 640px, 768px, and 1,024px breakpoints and the pixel past each included.

// #endregion Constants



// #region Helpers

type GriArgTyp = { casArr : GriCasTyp[], widStr : string }; // What: Grid Argument Type. Why: The page function can't read this file, so it takes what it checks as its argument. How: This names the grids to check and the width for the problem entries.

// #region griProFun

/**
 * griProFun = Grid Problems Function
 *
 * @summary
 * Runs inside the page and returns a problem for each grid whose rows break
 * the Card Grids rule. Each grid is found by its module class, and its visible
 * children are grouped into rows by their rounded tops. A grid that keeps even
 * rows fails when any two rows hold different numbers of cards. The odd card
 * grid fails when a row before the last holds fewer cards than the fullest
 * row, or when a short last row holds more than one card, a card more than 1px
 * narrower or wider than the first row's, or one whose room left and right
 * differ by more than 2px inside the grid's padding. A missing grid or one
 * with no visible cards is a problem too. Passed to Playwright's evaluate, so
 * it reads its grids from its argument rather than from this file.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param griArgObj - Grid Argument Object: {@link GriArgTyp}
 *
 * @returns Every grid problem found.
 * @see {@link proLisArr}
 *
 * @example
 * ```ts
 * page.evaluate(griProFun, griArgObj) // => [ 'topic tiles grid ...' ]
 * ```
 *
*/

function griProFun ( griArgObj : GriArgTyp ) : string[] {


	const proLisArr : string[] = []; // What: Problem List Array. Why: Every grid's problems should be reported, not just the first. How: This collects them.


	for ( const griCasObj of griArgObj.casArr ) { // What: Grid Loop. Why: Every grid named for the page is checked. How: This judges each in turn.


		const griCurEle = document.querySelector( `[class*="_${ griCasObj.griStr }_"]` ); // What: Grid Current Element. Why: The grid's rows are measured from its cards. How: This finds the grid by the source name inside its hashed module class.


		if ( !griCurEle ) { proLisArr.push( `${ griCasObj.ideStr } grid is missing` ); continue; } // What: Missing Grid Guard. Why: A grid that can't be found can't keep its rows, and the check shouldn't pass by finding nothing. How: This records it and moves to the next grid.



		const carEleArr = [ ...griCurEle.children ].filter( ( carCurEle ) => carCurEle.getBoundingClientRect().width > 0 ); // What: Card Element Array. Why: A hidden child takes no place in a row. How: This keeps the grid's children that have width.


		if ( !carEleArr.length ) { proLisArr.push( `${ griCasObj.ideStr } grid has no visible cards` ); continue; } // What: Empty Grid Guard. Why: A grid with no cards would pass without being checked. How: This records it and moves to the next grid.



		const rowTopMap = new Map< number, DOMRect[] >(); // What: Row Top Map. Why: Cards in one row share a top. How: This groups each card's box under its rounded top.


		for ( const carCurEle of carEleArr ) { // What: Card Loop. Why: Every card belongs to one row. How: This files each card's box under its row.


			const carRecObj = carCurEle.getBoundingClientRect(); // What: Card Rect Object. Why: A card's row and edges come from its box. How: This measures it.
			const rowTopNum = Math.round( carRecObj.top );       // What: Row Top Number. Why: Cards in one row can differ by a fraction of a pixel. How: This rounds the card's top to a whole pixel.


			rowTopMap.set( rowTopNum, [ ...( rowTopMap.get( rowTopNum ) ?? [] ), carRecObj ] ); // What: Row Add Call. Why: The card joins the row at its top. How: This appends its box to that row's list.


		}



		const labGriStr = `${ griCasObj.ideStr } grid at ${ griArgObj.widStr }`;                                                                                       // What: Label Grid String. Why: A problem should say which grid and width it appeared at. How: This names the grid and the width.
		const rowRecArr = [ ...rowTopMap.entries() ].sort( ( oneEntArr, twoEntArr ) => oneEntArr[ 0 ] - twoEntArr[ 0 ] ).map( ( rowEntArr ) => rowEntArr[ 1 ] );       // What: Row Rect Array. Why: Rows are judged from top to bottom, the last one by its place. How: This lists each row's card boxes, ordered by their top.
		const rowCouArr = rowRecArr.map( ( rowCurArr ) => rowCurArr.length );                                                                                          // What: Row Count Array. Why: The rule compares how many cards each row holds. How: This counts each row's cards.
		const fulCouArr = griCasObj.oddBoo ? rowCouArr.slice( 0, -1 ) : rowCouArr;                                                                                     // What: Full Count Array. Why: Every row of an even grid has to be full, while the odd card grid's last row may hold one card. How: This keeps every row's count, or every count but the last for the odd card grid.
		const maxCouNum = Math.max( ...rowCouArr ); // What: Maximum Count Number. Why: A full row holds as many cards as the fullest row. How: This finds the most cards any row holds.
		const rowLisStr = rowCouArr.length > 2 ? `${ rowCouArr.slice( 0, -1 ).join( ', ' ) }, and ${ rowCouArr[ rowCouArr.length - 1 ] }` : rowCouArr.join( ' and ' ); // What: Row List String. Why: A problem should read as a phrase. How: This joins the counts with commas and "and".


		if ( fulCouArr.some( ( rowCouNum ) => rowCouNum !== maxCouNum ) ) proLisArr.push( `${ labGriStr } has rows of ${ rowLisStr }` ); // What: Full Row Check. Why: A row short of the others breaks the Card Grids rule, apart from the odd card grid's last row. How: This records the row counts when a row that has to be full isn't.



		const lasRowArr = rowRecArr[ rowRecArr.length - 1 ]; // What: Last Row Array. Why: Only the odd card grid's last row may be short, so its card is what's checked. How: This holds its card boxes.


		if ( !griCasObj.oddBoo || lasRowArr.length === maxCouNum ) continue; // What: Full Last Row Guard. Why: Only a short last row in the odd card grid needs its odd card checked. How: This moves on from every even grid and every full last row.



		if ( lasRowArr.length > 1 ) { proLisArr.push( `${ labGriStr } leaves ${ lasRowArr.length } cards in a short last row` ); continue; } // What: Lone Card Guard. Why: The exception allows one leftover card, never a short row of several. How: This records a short last row of more than one card and moves on.



		const griRecObj = griCurEle.getBoundingClientRect();                                                                    // What: Grid Rect Object. Why: The odd card is centered within the grid. How: This measures the grid's box.
		const griStyObj = getComputedStyle( griCurEle );                                                                        // What: Grid Style Object. Why: The grid's padding sits outside its content box. How: This reads its computed styles.
		const conLefNum = griRecObj.left + griCurEle.clientLeft + parseFloat( griStyObj.paddingLeft );                          // What: Content Left Number. Why: The room left of the card is measured from the content box's edge. How: This is the grid's left edge inside its border and padding.
		const conRigNum = griRecObj.left + griCurEle.clientLeft + griCurEle.clientWidth - parseFloat( griStyObj.paddingRight ); // What: Content Right Number. Why: The room right of the card is measured to the content box's edge. How: This is the grid's right edge inside its border and padding.
		const oddRecObj = lasRowArr[ 0 ];                                                                                       // What: Odd Rect Object. Why: The leftover card is the one checked. How: This holds its box.
		const lefSpaNum = oddRecObj.left - conLefNum;                                                                           // What: Left Space Number. Why: A centered card leaves the same room on each side. How: This measures the room left of it.
		const rigSpaNum = conRigNum - oddRecObj.right;                                                                          // What: Right Space Number. Why: A centered card leaves the same room on each side. How: This measures the room right of it.


		if ( Math.abs( oddRecObj.width - rowRecArr[ 0 ][ 0 ].width ) > 1 ) proLisArr.push( `${ labGriStr } has its odd card ${ Math.round( oddRecObj.width ) }px wide, not ${ Math.round( rowRecArr[ 0 ][ 0 ].width ) }px like the others` ); // What: Odd Width Check. Why: The leftover card keeps the others' width, never stretching across its row. How: This records a card more than 1px off the first row's.



		if ( Math.abs( lefSpaNum - rigSpaNum ) > 2 ) proLisArr.push( `${ labGriStr } has its odd card ${ Math.round( lefSpaNum ) }px from the left and ${ Math.round( rigSpaNum ) }px from the right` ); // What: Centered Card Check. Why: The leftover card sits centered in its own row. How: This records the two rooms when they differ by more than 2px.


	}



	return proLisArr; // What: Problem List Return. Why: The test prints whatever was found. How: This hands back every problem collected.


}

// #endregion griProFun

// #endregion Helpers



// #region Module Init

for ( const pagCasObj of PAG_CAS_ARR ) { // What: Page Loop. Why: Every page with a grid of cards is checked. How: This declares each page's tests.


	const griCasArr = GRI_CAS_ARR.filter( ( griCasObj ) => griCasObj.pagStr === pagCasObj.ideStr ); // What: Grid Case Array. Why: Each test checks only the grids on its page. How: This keeps the rows naming the page.


	for ( const widCurNum of WID_LIS_ARR ) { // What: Width Loop. Why: A grid's rows change with the width. How: This declares one test per width.


		test( `${ pagCasObj.ideStr } card grids keep their rows at ${ widCurNum.toLocaleString( 'en-US' ) }px`, async ( { page : curPagObj } ) => { // What: Grid Rows Test. Why: Every grid of cards should keep its rows at every width. How: This opens the page at the width, then checks its grids.


			await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Emulation. Why: Entrance animations don't change the rows, so waiting on them only slows the run. How: This makes the page match prefers-reduced-motion, which turns them off.

			await opeStaFun( curPagObj, { heiNum : 900, ideStr : pagCasObj.ideStr, patStr : pagCasObj.patStr, widNum : widCurNum } ); // What: Page Open Call. Why: The rows are measured settled. How: This opens the page's path at the width, with the same height for every width.

			expect( await curPagObj.evaluate( griProFun, { casArr : griCasArr, widStr : `${ widCurNum.toLocaleString( 'en-US' ) }px` } ) ).toEqual( [] ); // What: No Grid Problems Assertion. Why: The width passes only when every grid keeps its rows. How: This checks the page's grids at the width, written with a thousands separator, and compares the problems with an empty list, so a failure prints each one.


		} );


	}


}

// #endregion Module Init


