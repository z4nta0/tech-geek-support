


// #region Imports

import { ART_FIL_ARR   } from '../../scripts/article-files.ts'; // What: Article File Array. Why: Every article gets its own link preview image. How: The script captures one per row, named after the article's address.
import { chromium      } from '@playwright/test';               // What: Chromium. Why: The images are captured in a real browser, in the site's own fonts and tokens. How: This launches Playwright's Chromium.
import { fileURLToPath } from 'node:url';                       // What: File URL To Path. Why: The output paths are resolved from this script's own location. How: This turns a file URL into a path.
import { mkdirSync     } from 'node:fs';                        // What: Make Directory Sync. Why: The articles' images go in their own folder, which a fresh checkout may lack. How: This creates it if needed.
import { statSync      } from 'node:fs';                        // What: Stat Sync. Why: Every image has to stay under the size WhatsApp accepts. How: This reads a saved image's size in bytes.
import { TOP_REC_ARR   } from '../../src/ui/topics.ts';         // What: Topic Record Array. Why: Each article's image names its topic. How: The script looks the label up by the article's topic identifier.

// #endregion Imports



/**
 * render.mts = Social Preview Image Renderer
 *
 * @summary
 * Rebuilds every link preview image, each a 1,200x630 PNG, since they're
 * flat artwork, captured from card.html beside this script in the site's own
 * fonts and tokens. The site's own, public/og-image.png, shows the hexagon
 * mark, the TechGeek.support wordmark, and "Free, Friendly Tech Help". Each
 * article's, public/social/<address>.png, shows its topic, its title, and the
 * wordmark instead. Both keep their lines inside the center 630px square some
 * apps crop to, between the signal rings on the left and an echo of them on
 * the right. Every image has to stay under 300 KB, the most WhatsApp will
 * show. Run it with npm run og-images whenever an article is added or
 * retitled, or the site's look changes, and give a changed image a new
 * filename, since apps cache previews.
 *
 * Sections:
 *  - Constants
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const CAR_URL_STR = new URL( './card.html', import.meta.url ).href;                           // What: Card URL String. Why: The card loads its fonts and styles by paths relative to itself. How: This is card.html's own file URL.
const MAX_BYT_NUM = 300 * 1024;                                                               // What: Maximum Bytes Number. Why: WhatsApp drops a preview image of 300 KB or more. How: This is the limit every image is checked against.
const OUT_PAT_STR = fileURLToPath( new URL( '../../public/og-image.png', import.meta.url ) ); // What: Output Path String. Why: The home page's tags point at the site's card in public/. How: This resolves that path from this script's folder.
const SOC_DIR_STR = fileURLToPath( new URL( '../../public/social/', import.meta.url ) );      // What: Social Directory String. Why: Each article's tags point at its own image in public/social/. How: This resolves that folder from this script's folder.

// #endregion Constants



// #region Module Init

const broInsObj = await chromium.launch();                                                  // What: Browser Instance Object. Why: Every image is drawn by a real browser. How: This launches Chromium.
const capPagObj = await broInsObj.newPage( { viewport : { height : 630, width : 1200 } } ); // What: Capture Page Object. Why: Every capture has to be exactly 1,200x630. How: This opens a page at that size.



// #region capImaFun

/**
 * capImaFun = Capture Image Function
 *
 * @summary
 * Captures one preview image from card.html. For the site's card it removes
 * the article lines; for an article's it fills in the topic and title and
 * removes the site's mark and tag line. It waits for the fonts before saving,
 * so no line is captured in a fallback face, and fails the run when the
 * saved image reaches the 300 KB limit, which would drop it from WhatsApp's
 * previews.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param imaPatStr - Image Path String: Where the PNG is saved.
 * @param artTexArr - Article Text Array: The article's topic label and title,
 *                    or null for the site's card.
 *
 * @returns A promise that settles once the image is saved and checked, with
 *          no value.
 *
 * @example
 * ```ts
 * capImaFun(OUT_PAT_STR, null) // => Promise<void>
 * ```
 *
*/

async function capImaFun ( imaPatStr : string, artTexArr : [ string, string ] | null ) : Promise< void > {


	await capPagObj.goto( CAR_URL_STR ); // What: Card Load Call. Why: Each capture starts from a fresh card. How: This opens card.html.

	await capPagObj.evaluate( ( filTexArr ) => { // What: Card Fill Call. Why: The same card serves the site and every article. How: This keeps one set of lines, removes the other, and fills an article's topic and title.


		document.querySelectorAll( filTexArr ? '[data-site-only]' : '[data-article-only]' ).forEach( ( linCurEle ) => linCurEle.remove() ); // What: Line Removal Call. Why: An article's card has no mark or tag line, and the site's has no topic or title. How: This removes whichever set doesn't belong.



		if ( !filTexArr ) return; // What: Site Card Guard. Why: The site's card has nothing to fill in. How: This stops here for it.



		document.querySelector( '[data-topic-label]' )!.textContent   = filTexArr[ 0 ]; // What: Topic Label Fill. Why: The card names the article's topic. How: This sets the label's text. // What: Non-Null Note. Why: card.html always holds the label. How: The ! drops the null querySelector's type allows.
		document.querySelector( '[data-article-title]' )!.textContent = filTexArr[ 1 ]; // What: Article Title Fill. Why: The card leads with the article's title. How: This sets the heading's text. // What: Non-Null Note. Why: card.html always holds the heading. How: The ! drops the null querySelector's type allows.


	}, artTexArr );

	await capPagObj.evaluate( () => document.fonts.ready ); // What: Fonts Ready Wait. Why: Text captured before its web font loads would be set in a fallback. How: This waits for every font face.

	await capPagObj.screenshot( { path : imaPatStr, type : 'png' } ); // What: Image Capture Call. Why: This writes the image. How: This saves the page as a PNG.



	if ( statSync( imaPatStr ).size >= MAX_BYT_NUM ) throw new Error( `${ imaPatStr } is at or over the ${ MAX_BYT_NUM } byte limit.` ); // What: Size Guard. Why: An image over the limit would quietly drop out of WhatsApp previews. How: This fails the run.



	console.log( `Wrote ${ imaPatStr } (${ statSync( imaPatStr ).size } bytes).` ); // What: Result Log Call. Why: The run should say what it wrote. How: This prints the path and size.


}

// #endregion capImaFun



await capImaFun( OUT_PAT_STR, null ); // What: Site Card Capture Call. Why: The home page and every page but an article's share the site's card. How: This captures it.

mkdirSync( SOC_DIR_STR, { recursive : true } ); // What: Social Folder Creation. Why: The articles' images need their folder. How: This creates it if it's missing.



for ( const artFilObj of ART_FIL_ARR ) { // What: Article Capture Loop. Why: Every article gets its own preview. How: This captures each in turn, with its topic's label and its title.


	const topLabStr = TOP_REC_ARR.find( ( topRecObj ) => topRecObj.ideStr === artFilObj.topStr )?.labStr ?? ''; // What: Topic Label String. Why: The card names the article's topic by its label. How: This looks it up by the article's topic identifier.


	await capImaFun( `${ SOC_DIR_STR }${ artFilObj.ideStr }.png`, [ topLabStr, artFilObj.titStr ] ); // What: Article Capture Call. Why: The article's tags point at its own image. How: This captures it into public/social/, named after the article's address.


}



await broInsObj.close(); // What: Browser Close Call. Why: The script should exit once every image is saved. How: This shuts Chromium down.

// #endregion Module Init


