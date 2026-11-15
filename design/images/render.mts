


// #region Imports

import { chromium      } from '@playwright/test'; // What: Chromium. Why: The portrait is scaled and encoded by a real browser's canvas, so no image library is needed. How: This launches Playwright's Chromium.
import { fileURLToPath } from 'node:url';         // What: File URL To Path. Why: Every path is resolved from this script's own location. How: This turns a file URL into a path.
import { readFileSync  } from 'node:fs';          // What: Read File Sync. Why: The original is handed to the browser as data. How: This reads its bytes.
import { statSync      } from 'node:fs';          // What: Stat Sync. Why: The run reports how much the portrait shrank. How: This reads the original's size in bytes.
import { writeFileSync } from 'node:fs';          // What: Write File Sync. Why: The encoded portrait is saved. How: This writes it.

// #endregion Imports



/**
 * render.mts = Image Renderer
 *
 * @summary
 * Rebuilds the About portrait from its original in originals/, a folder kept
 * out of git so the large source file never bloats the repository. The
 * portrait is scaled to cover its box, three times the largest size the About
 * page's frame shows it at, so it stays sharp on the densest phones, its
 * height kept to the shape the frame has always shown, cut to exactly that box
 * around its center, the way object-fit cover crops it, and never scaled up.
 * It's encoded as WebP at 0.93 quality, the lowest that showed no difference
 * from the original at 3x zoom, since 0.92 and below smoothed the photo's
 * grain, and written beside the About page. Run it with npm run images
 * whenever the portrait is replaced or its frame's largest size changes.
 *
 * Sections:
 *  - Constants
 *  - Module State
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const BOX_HEI_NUM = 1251;                                                                                    // What: Box Height Number. Why: The About frame shows the portrait up to about 417.4 tall, measured in all three engines at 1,000px wide and up, its height following the image's own shape. How: This is the box's width at the shape the portrait has always had, 642 by 850, rounded down, which stays within three times that height and keeps the page's layout as close as whole pixels allow.
const BOX_WID_NUM = 945;                                                                                     // What: Box Width Number. Why: The About frame shows the portrait up to about 315.3 wide, measured in all three engines at 1,000px wide and up. How: This is three times that, rounded down.
const ORI_PAT_STR = fileURLToPath( new URL( './originals/self-portrait.jpg', import.meta.url ) );            // What: Original Path String. Why: The original lives beside this script, outside git. How: This resolves its path.
const OUT_PAT_STR = fileURLToPath( new URL( '../../src/pages/about/self-portrait.webp', import.meta.url ) ); // What: Output Path String. Why: The About page imports the portrait from beside itself. How: This resolves the WebP's path there.
const QUA_VAL_NUM = 0.93;                                                                                    // What: Quality Value Number. Why: This is the lowest quality that showed no difference from the original at 3x zoom, while 0.92 and below visibly smoothed the photo's grain. How: The portrait is encoded at it.

// #endregion Constants



// #region Module State

const SOU_URL_STR = `data:image/jpeg;base64,${ readFileSync( ORI_PAT_STR ).toString( 'base64' ) }`; // What: Source URL String. Why: A canvas drawn from a file URL can't be read back, while one drawn from data can. How: This reads the original and hands it to the page as a data URL, throwing when the original is missing.

// #endregion Module State



// #region Module Init

const broInsObj = await chromium.launch();   // What: Browser Instance Object. Why: The portrait is drawn by a real browser. How: This launches Chromium.
const encPagObj = await broInsObj.newPage(); // What: Encode Page Object. Why: The canvas work runs in a page. How: This opens a blank one.


const encResStr = await encPagObj.evaluate( async ( [ souUrlStr, boxHeiNum, boxWidNum, quaValNum ] ) => { // What: Encode Result String. Why: The browser scales and encodes the portrait. How: This decodes the original, draws it onto a canvas cut to the box, and returns the encoded data.


	const souImaEle = new Image(); // What: Source Image Element. Why: The original has to be decoded before it's drawn. How: This creates an image to load it into.


	souImaEle.src = souUrlStr; // What: Source Address Assignment. Why: The image loads the original's data. How: This sets its source.


	await souImaEle.decode(); // What: Source Decode Wait. Why: Drawing an undecoded image draws nothing. How: This waits until it's ready.


	const souHeiNum = souImaEle.naturalHeight;                                                 // What: Source Height Number. Why: The fit is measured against the original. How: This reads its height.
	const souWidNum = souImaEle.naturalWidth;                                                  // What: Source Width Number. Why: The fit is measured against the original. How: This reads its width.
	const scaValNum = Math.min( 1, Math.max( boxWidNum / souWidNum, boxHeiNum / souHeiNum ) ); // What: Scale Value Number. Why: The portrait covers its box, as object-fit cover shows it, but is never enlarged. How: This takes the larger of the two fits, capped at 1.
	const draHeiNum = Math.round( souHeiNum * scaValNum );                                     // What: Drawn Height Number. Why: The original is drawn at the fitted size. How: This scales its height.
	const draWidNum = Math.round( souWidNum * scaValNum );                                     // What: Drawn Width Number. Why: The original is drawn at the fitted size. How: This scales its width.
	const outCanEle = document.createElement( 'canvas' );                                      // What: Output Canvas Element. Why: The portrait is redrawn at its new size. How: This creates the canvas.


	outCanEle.height = boxHeiNum; // What: Canvas Height Assignment. Why: The portrait is cut to exactly its box. How: This sets the canvas's height to the box's.
	outCanEle.width  = boxWidNum; // What: Canvas Width Assignment. Why: The portrait is cut to exactly its box. How: This sets the canvas's width to the box's.


	const outConObj = outCanEle.getContext( '2d' )!; // What: Output Context Object. Why: Drawing goes through the canvas's 2D context. How: This reads it. // What: Non-Null Note. Why: getContext can return null for an unsupported type. How: Every browser supports a 2D context.


	outConObj.imageSmoothingQuality = 'high'; // What: Smoothing Quality Assignment. Why: A large downscale should stay sharp without jagged edges. How: This asks for the browser's best resampling.


	outConObj.drawImage( souImaEle, ( boxWidNum - draWidNum ) / 2, ( boxHeiNum - draHeiNum ) / 2, draWidNum, draHeiNum ); // What: Image Draw Call. Why: The cut portrait keeps its center, the way object-fit cover crops it. How: This draws the scaled original centered on the canvas, so whatever runs past the box is cut evenly from both sides.



	return outCanEle.toDataURL( 'image/webp', quaValNum ).split( ',' )[ 1 ]; // What: Encoded Data Return. Why: Only text crosses back from the page. How: This encodes the canvas as WebP and keeps the base64 data after the data URL's comma.


}, [ SOU_URL_STR, BOX_HEI_NUM, BOX_WID_NUM, QUA_VAL_NUM ] as const ); // What: Encode Arguments. Why: The page can't read this script's variables. How: This passes the original, the box's height and width, and the quality in. // What: Type Assertion Note. Why: Without it the array widens to one mixed type, so the page function's destructured parameters lose their own types. How: as const keeps it a readonly tuple, so each parameter is typed by its position.


const outBufObj = Buffer.from( encResStr, 'base64' ); // What: Output Buffer Object. Why: The file is written as bytes. How: This decodes the base64 data.


writeFileSync( OUT_PAT_STR, outBufObj ); // What: Image Write Call. Why: The About page reads the encoded portrait. How: This saves it.



await broInsObj.close(); // What: Browser Close Call. Why: The script should exit once the portrait is written. How: This shuts Chromium down.



console.log( `Wrote the portrait at ${ BOX_WID_NUM }x${ BOX_HEI_NUM }, ${ Math.round( statSync( ORI_PAT_STR ).size / 1024 ).toLocaleString( 'en-US' ) } KB down to ${ Math.round( outBufObj.length / 1024 ).toLocaleString( 'en-US' ) } KB.` ); // What: Result Log Call. Why: The run should say what it wrote. How: This prints the portrait's size in pixels and its file size before and after.

// #endregion Module Init


