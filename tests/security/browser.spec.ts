


// #region Imports

import { ADR_STA_ARR } from '../support/articles.ts'; // What: Address State Array. Why: An address naming a topic narrows the Articles list as it loads, a state the policy has to allow too. How: This lists the Articles states opened with a topic in the address, one per width.
import { expect      } from '@playwright/test';       // What: Expect. Why: Each check passes only when the policy is enforced and the page breaks none of its rules. How: This asserts on what each check collects from the page.
import { heaPatFun   } from '../support/headers.ts';  // What: Headers Path Function. Why: The pages are loaded under the headers Netlify really sends with each path. How: This reads the headers the built dist/_headers sends with one path.
import { INV_STA_ARR } from '../support/contact.ts';  // What: Invalid State Array. Why: The Contact form after a refused empty send is a state the policy has to allow too. How: This lists the Contact states after that send, one per width.
import { opeStaFun   } from '../support/states.ts';   // What: Open State Function. Why: Each state is opened the way the other page suites open it. How: This loads the state and waits until it's settled.
import { PIL_STA_ARR } from '../support/articles.ts'; // What: Pill State Array. Why: A pressed topic pill narrows the Articles list, a state the policy has to allow too. How: This lists the Articles states with a topic's pill pressed, one per width.
import { RES_STA_ARR } from '../support/contact.ts';  // What: Result State Array. Why: Sending the form posts to the site and swaps in the thank-you or the error, which the policy has to allow too. How: This lists the Contact states with the form sent, one per result and width.
import { STA_REC_ARR } from '../support/states.ts';   // What: State Record Array. Why: The policy has to hold in every state the suites visit. How: This is the list of states to load.
import { test        } from '@playwright/test';       // What: Test. Why: Each state is its own test. How: This declares them.
import { TIP_STA_ARR } from '../support/contact.ts';  // What: Tip State Array. Why: A help tip's bubble opens over the form, a state the policy has to allow too. How: This lists the Contact states with a tip pinned open, one per tip and width.


import type { Page } from '@playwright/test'; // What: Page. Why: The policy setup drives a Playwright page. How: This types the policy helpers' page parameters.

// #endregion Imports



/**
 * browser.spec.ts = Browser Spec
 *
 * @summary
 * Checks that the site works under its own security policy, in whichever
 * engine the project runs. Each page loads from the production build, which
 * the preview server serves, since the dev server injects inline scripts the
 * policy would block. Neither server reads Netlify's headers file, so every
 * response is given the headers the built dist/_headers sends with its path.
 * First a check proves the policy is live, by injecting an inline script and
 * seeing it refused and reported. Then every state the suites visit, the
 * looks a control leads to and the Contact form's sent and failed results
 * included, is checked for policy violations, apart from the one WebKit
 * reports for every select element, and checked to close off every new tab
 * link, with neither an opener nor a referrer.
 *
 * Sections:
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

// #region polSetFun

/**
 * polSetFun = Policy Setup Function
 *
 * @summary
 * Readies a page to be checked against the policy. Every response the page
 * receives is given the headers the built dist/_headers sends with its path,
 * the way Netlify gives them once deployed, and a listener added before any
 * of the page's own script runs records every violation the browser reports,
 * as a line naming the directive broken and what broke it, on the page's
 * window, where polVioFun reads them back.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to ready.
 *
 * @returns A promise that settles once the headers and the listener are in
 *          place, with no value.
 *
 * @example
 * ```ts
 * polSetFun(page) // => Promise<void>
 * ```
 *
*/

async function polSetFun ( curPagObj : Page ) : Promise< void > {


	await curPagObj.route( '**/*', async ( rouCurObj ) => { // What: Header Route Call. Why: The preview server sends none of the policy's headers. How: This fetches every response as normal and fulfills it with its path's headers added.


		const resCurObj = await rouCurObj.fetch(); // What: Response Current Object. Why: The page should get the real file. How: This fetches it from the preview server.


		await rouCurObj.fulfill( { headers : { ...resCurObj.headers(), ...heaPatFun( new URL( rouCurObj.request().url() ).pathname ) }, response : resCurObj } ); // What: Fulfill Call. Why: The browser applies this site's policy from a response's headers. How: This answers with the real response and the headers its path is sent with on top.


	} );



	await curPagObj.addInitScript( () => { // What: Violation Listener Call. Why: The listener has to be in place before the page's own script runs, or an early violation would be missed. How: This runs before every page's script and records each violation the browser reports.


		const winVioObj = window as unknown as { __polVioArr : string[] }; // What: Window Violation Object. Why: The violations are kept where the test can read them back. How: This views the window with its violation list. // What: Type Assertion Note. Why: The window has no such field in its type. How: The as names the one the listener adds.


		winVioObj.__polVioArr = []; // What: Violation List Assignment. Why: Each page starts with none. How: This sets an empty list.


		document.addEventListener( 'securitypolicyviolation', ( vioEveObj ) => winVioObj.__polVioArr.push( `${ vioEveObj.effectiveDirective } blocked ${ vioEveObj.blockedURI || 'inline code' } on ${ ( vioEveObj.target as Element | null )?.tagName?.toLowerCase() ?? 'the page' }` ) ); // What: Violation Listener. Why: The browser reports each refused resource as an event. How: This records the directive broken, what it blocked, and the element it was on. // What: Type Assertion Note. Why: An event's target is typed as a plain event target. How: A violation's target is the element or document it happened on, so this reads it as an element, falling back for the document.


	} );


}

// #endregion polSetFun



// #region polVioFun

/**
 * polVioFun = Policy Violation Function
 *
 * @summary
 * Reads back the violations the listener polSetFun adds has recorded on the
 * page so far, one line each naming the directive broken and what broke it,
 * leaving out the one WebKit reports for every select element, even one with
 * no style of its own, which no page can avoid short of allowing inline style
 * attributes everywhere.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to read.
 * @param broNamStr - Browser Name String: The engine the page runs in.
 *
 * @returns A promise that resolves with the list of violations recorded.
 *
 * @example
 * ```ts
 * polVioFun(page, 'webkit') // => []
 * ```
 *
*/

async function polVioFun ( curPagObj : Page, broNamStr : string ) : Promise< string[] > {


	const vioAllArr = await curPagObj.evaluate( () => ( window as unknown as { __polVioArr : string[] } ).__polVioArr ); // What: Violation All Array. Why: The test reads what the browser reported. How: This reads the page's list. // What: Type Assertion Note. Why: The window has no such field in its type. How: The as names the one polSetFun's listener adds.



	return vioAllArr.filter( ( vioCurStr ) => !( broNamStr === 'webkit' && vioCurStr === 'style-src-attr blocked inline on select' ) ); // What: Violation List Return. Why: WebKit's select report says nothing about the site. How: This hands back every violation but that one.


}

// #endregion polVioFun



// #region relCheFun

/**
 * relCheFun = Relationship Check Function
 *
 * @summary
 * Checks that every link on the page that opens a new tab carries noopener,
 * so the opened page gets no handle on this one, and noreferrer, so the
 * opened site doesn't learn the address it came from.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to check.
 *
 * @returns A promise that settles once both checks have passed, with no
 *          value.
 *
 * @example
 * ```ts
 * relCheFun(page) // => Promise<void>
 * ```
 *
*/

async function relCheFun ( curPagObj : Page ) : Promise< void > {


	const opeRelArr = await curPagObj.locator( 'a[target="_blank"]' ).evaluateAll( ( ancEleArr ) => ancEleArr.map( ( ancCurEle ) => ancCurEle.getAttribute( 'rel' ) ?? '' ) ); // What: Opener Relationship Array. Why: A new tab opened without noopener can reach back and change this page. How: This collects the rel of every link that opens a new tab.


	expect( opeRelArr.filter( ( relValStr ) => !/\bnoopener\b/.test( relValStr ) ) ).toEqual( [] );   // What: No Opener Assertion. Why: The opened page shouldn't get a handle on this one. How: This checks every new tab link carries noopener.
	expect( opeRelArr.filter( ( relValStr ) => !/\bnoreferrer\b/.test( relValStr ) ) ).toEqual( [] ); // What: No Referrer Assertion. Why: The opened site shouldn't learn the address it came from. How: This checks every new tab link carries noreferrer.


}

// #endregion relCheFun

// #endregion Helpers



// #region Module Init

test( 'the policy refuses an injected inline script', async ( { browserName : broNamStr, page : curPagObj } ) => { // What: Policy Live Test. Why: A clean run means nothing unless the policy was really applied and its violations really recorded. How: This loads the Home page under the policy, injects an inline script, and checks it didn't run and was reported.


	await polSetFun( curPagObj ); // What: Policy Setup Call. Why: The page has to load under the policy. How: This adds the headers and the violation listener.

	await curPagObj.goto( '/' ); // What: Home Open Call. Why: The script is injected into a real page. How: This loads the Home page.


	const injRanBoo = await curPagObj.evaluate( async () => { // What: Injection Ran Boolean. Why: A refused script never sets its flag. How: This adds an inline script that sets a flag, waits a moment for any violation event, and reports whether the flag was set.


		const scrNewEle = document.createElement( 'script' ); // What: Script New Element. Why: Injected markup is how a cross-site scripting attack runs code. How: This makes an inline script.


		scrNewEle.textContent = 'document.documentElement.dataset.injectedScriptRan = "true";'; // What: Script Text Assignment. Why: The flag shows whether the script ran. How: This sets a data attribute on the page's root if it does.


		document.body.append( scrNewEle ); // What: Script Append Call. Why: An inline script runs as soon as it joins the page, unless the policy refuses it. How: This adds it to the body.

		await new Promise( ( resWaiFun ) => setTimeout( resWaiFun, 100 ) ); // What: Event Wait Call. Why: The browser reports a violation as an event shortly after refusing the script. How: This waits 100ms for it.



		return document.documentElement.dataset.injectedScriptRan === 'true'; // What: Flag Return. Why: The test checks the script stayed off. How: This reports whether it set its flag.


	} );


	expect( injRanBoo ).toBe( false );                                                                           // What: Script Refused Assertion. Why: The policy has to stop inline script. How: This checks the injected script never ran.
	expect( await polVioFun( curPagObj, broNamStr ) ).toContainEqual( expect.stringContaining( 'script-src' ) ); // What: Violation Reported Assertion. Why: The later checks rely on violations being recorded. How: This checks the refusal was recorded as a script-src violation.


} );



for ( const staRecObj of [ ...STA_REC_ARR, ...PIL_STA_ARR, ...ADR_STA_ARR, ...TIP_STA_ARR, ...INV_STA_ARR, ...RES_STA_ARR ] ) { // What: State Loop. Why: Every state the suites visit has to work under the policy, and so does every look a control leads to, the Articles list narrowed to a topic, an open help tip, the Contact form's refused send, and its sent and failed results included. How: This declares one test per state, the shared states first, then the reachable ones.


	test( `${ staRecObj.ideStr } breaks no rule of the security policy and closes off every new tab link`, async ( { browserName : broNamStr, page : curPagObj } ) => { // What: State Policy Test. Why: A blocked resource, such as a font, would break the page once deployed, and the policy can't be loosened to hide it. How: This opens the state under the policy and checks nothing was refused and every new tab link is closed off.


		await polSetFun( curPagObj ); // What: Policy Setup Call. Why: The page has to load under the policy. How: This adds the headers and the violation listener.

		await opeStaFun( curPagObj, staRecObj ); // What: State Open Call. Why: The state's fonts, images, and open menu or tip have to load before the page is checked. How: This opens the state the way the other page suites do.

		expect( await polVioFun( curPagObj, broNamStr ) ).toEqual( [] ); // What: No Violation Assertion. Why: Everything the state loads should be allowed by the policy. How: This checks none was refused.

		await relCheFun( curPagObj ); // What: Relationship Check Call. Why: Every new tab link has to be closed off. How: This checks each carries noopener and noreferrer.


	} );


}

// #endregion Module Init


