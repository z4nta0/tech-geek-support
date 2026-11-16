


// #region Imports

import { ADR_STA_ARR } from '../support/articles.ts'; // What: Address State Array. Why: An address naming a topic opens the Articles list narrowed, a state a visitor reaches, with its chosen pill pressed. How: This lists the Articles states opened that way, one per width.
import { cliBloFun   } from '../support/feedback.ts'; // What: Click Block Function. Why: Pressing a control shouldn't navigate or close anything mid-check. How: This cancels every click in the page.
import { CON_PRO_ARR } from '../support/feedback.ts'; // What: Control Property Array. Why: A control's looks, such as its hover, are compared over the same properties. How: This lists them.
import { expect      } from '@playwright/test';       // What: Expect. Why: Each state passes only when every reachable control and toggle responds. How: This asserts on what each check reads, such as that its problem list is empty.
import { FOC_PRO_ARR } from '../support/feedback.ts'; // What: Focus Property Array. Why: A focus look is compared over the control properties and the ring's outline. How: This lists them.
import { INV_STA_ARR } from '../support/contact.ts';  // What: Invalid State Array. Why: The Contact form after a refused empty send is a state a visitor reaches, with a field already focused. How: This lists the Contact states after that send, one per width.
import { movProFun   } from '../support/feedback.ts'; // What: Moving Problems Function. Why: Under reduced motion a change has to switch rather than ease. How: This turns two snapshots into a problem for each eased change.
import { opeStaFun   } from '../support/states.ts';   // What: Open State Function. Why: Each check opens and settles its state first. How: This loads it and waits for it.
import { PIL_STA_ARR } from '../support/articles.ts'; // What: Pill State Array. Why: A pressed topic pill narrows the Articles list and stays pressed, a state a visitor reaches. How: This lists the Articles states with a topic's pill pressed, one per width.
import { RES_STA_ARR } from '../support/contact.ts';  // What: Result State Array. Why: The Contact form's results hold controls the plain states don't, such as the thank-you's "Ask Another Question" button. How: This lists the Contact states with the form sent, one per result and width.
import { snaEleFun   } from '../support/feedback.ts'; // What: Snapshot Element Function. Why: Each look is recorded with whether each part of it would ease. How: This runs inside the page to read it.
import { snaProFun   } from '../support/feedback.ts'; // What: Snap Problems Function. Why: A change has to ease rather than snap. How: This turns two snapshots into a problem for each snapped change.
import { STA_REC_ARR } from '../support/states.ts';   // What: State Record Array. Why: The shared page states are each checked. How: This lists them.
import { test        } from '@playwright/test';       // What: Test. Why: Each check of each state is its own test. How: This declares them.
import { TIP_STA_ARR } from '../support/contact.ts';  // What: Tip State Array. Why: A help tip pinned open shows its bubble, a state a visitor reaches. How: This lists the Contact states with a tip open, one per tip and width.
import { valSigFun   } from '../support/feedback.ts'; // What: Value Signature Function. Why: Two looks are told apart by their values alone. How: This joins a snapshot's values into one string.


import type { ElementHandle } from '@playwright/test'; // What: Element Handle. Why: Each control and toggle is probed through a handle to its element. How: This types the element handles the helpers collect and read.
import type { Page          } from '@playwright/test'; // What: Page. Why: The helpers that drive the page from the test take a Playwright page, while those that run inside it take none. How: This types the driving helpers' page parameters.

// #endregion Imports



/**
 * feedback.spec.ts = Feedback Spec
 *
 * @summary
 * Checks the interaction feedback rule on every page state and each reachable
 * state a control leads to, in whichever engine the project runs. Every
 * reachable link and button has to look different hovered than at rest,
 * pressed than hovered, and focused than unfocused, and every form field
 * focused than unfocused, and every probed property each of those changes, on
 * it or anything inside it, its pseudo-elements included, has to be eased by
 * a transition, its focus ring included. The probed properties are the ones
 * the site's controls change. Each kind of element with a state that switches
 * on and off, such as a topic pill's chosen state or a help tip's bubble, is
 * flipped off, on, and off again by its attribute, and has to look different
 * and ease each change both ways. On the plain Home and About states, the
 * cards that lift on hover without being controls have to show and ease their
 * hover. A control that waits above the screen until it's focused, the skip
 * link, is focused before it's hovered, and on every state but the open menu
 * the probe fails when it isn't found. On the shared states the first keyboard
 * stop has to draw its ring at full width, and on one with nothing opened it
 * has to be the skip link. Under reduced motion every change stays but
 * switches at once. Real clicks are blocked during the checks, so pressing a
 * control never navigates or closes anything mid-check. The snapshot and
 * comparison helpers live in tests/support/feedback.ts. Adapted from
 * TechGeek.cards' own feedback spec.
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

type TogTarTyp = { // What: Toggle Target Type. Why: Each kind of element with a state that switches on and off is flipped the same way. How: This holds what to find, which attribute marks the state, its two values, and the states it has to be found in.


	actStr : string,        // What: Active String. Why: The state is switched on by setting its attribute. How: This holds the value that marks it on, '' for an attribute that only has to be present.
	attStr : string,        // What: Attribute String. Why: The state lives in one attribute the stylesheet reacts to. How: This holds its name.
	inaStr : string | null, // What: Inactive String. Why: The state is switched off by its attribute too. How: This holds the value that marks it off, or null for an attribute that's removed.
	selStr : string,        // What: Selector String. Why: Each kind is found by its own class. How: This holds the selector that matches it.
	staArr : string[]       // What: State Array. Why: A kind the probe silently stopped finding would pass without checking anything. How: This names each page state the kind has to be found in.


};

// #endregion Types



// #region Constants

const ALL_STA_ARR = [ ...STA_REC_ARR, ...PIL_STA_ARR, ...ADR_STA_ARR, ...TIP_STA_ARR, ...INV_STA_ARR, ...RES_STA_ARR ];          // What: All State Array. Why: Every shared state is checked, and so are the reachable states listed beside them, since each holds looks or controls the plain ones don't, such as an open tip's bubble. How: This lists the shared states first, then the reachable ones.
const CON_SEL_STR = 'a, button, input:not([type="hidden"]), select, textarea';                                                   // What: Control Selector String. Why: Focusing or filling a form field is an interaction too, so Contact's fields are probed beside every link and button, while a hidden input never shows. How: This matches the links, the buttons, and every form field but a hidden input, and the reachable check drops the honeypot, which is taken out of the tab order.
const FIE_SEL_STR = 'input, select, textarea';                                                                                   // What: Field Selector String. Why: A form field has no hover or press look of its own, since pressing one only focuses it. How: This matches the fields, which the probe reads for focus alone.
const HOV_TAR_STR = '[class*="proIteIte"], [class*="steIteIte"]';                                                                // What: Hover Target String. Why: Home's How It Works step cards and About's promise cards lift on hover without being controls, so the control probe never reaches them. How: This matches each by its CSS module class, whose name Vite keeps inside the hashed class.
const IDE_LIS_ARR = ALL_STA_ARR.map( ( staRecObj ) => staRecObj.ideStr );                                                        // What: Identifier List Array. Why: Each toggle row names the states it has to be found in. How: This lists every checked state's name.
const ART_IDE_ARR = IDE_LIS_ARR.filter( ( ideCurStr ) => ideCurStr.startsWith( 'articles-' ) );                                  // What: Articles Identifier Array. Why: The topic pills show on every Articles state, narrowed or not. How: This lists the Articles states' names.
const DES_IDE_ARR = IDE_LIS_ARR.filter( ( ideCurStr ) => ideCurStr.includes( '-desktop' ) );                                     // What: Desktop Identifier Array. Why: The bar's links show above 1,024px, on every desktop state. How: This lists the desktop states' names.
const FOR_IDE_ARR = IDE_LIS_ARR.filter( ( ideCurStr ) => ideCurStr.startsWith( 'contact-' ) && !ideCurStr.endsWith( '-sent' ) ); // What: Form Identifier Array. Why: The question form, its help tips, and its send button show on every Contact state but a sent one, where the thank-you replaces them. How: This lists those states' names.
const PHO_IDE_ARR = IDE_LIS_ARR.filter( ( ideCurStr ) => ideCurStr.includes( '-phone' ) );                                       // What: Phone Identifier Array. Why: The menu toggle shows at 1,024px and narrower, on every phone state. How: This lists the phone states' names, the open menu's included.
const TIP_IDE_ARR = IDE_LIS_ARR.filter( ( ideCurStr ) => ideCurStr.endsWith( '-tip' ) );                                         // What: Tip Identifier Array. Why: A help tip's bubble shows only on the states that open it. How: This lists those states' names.

const HOV_KIN_OBJ : Record< string, string[] > = { about : [ 'proIteIte' ], home : [ 'steIteIte' ] }; // What: Hover Kind Object. Why: A kind of card that stopped matching, such as after a class rename, would drop out without failing. How: This lists, by page, the classes of the cards the hover probe has to find there. // What: About Hover Kinds. Why: About's promise cards lift without being controls. How: This names their class. // What: Home Hover Kinds. Why: Home's How It Works step cards lift without being controls. How: This names their class.



// #region TOG_TAR_ARR

/**
 * TOG_TAR_ARR = Toggle Target Array
 *
 * @summary
 * The kinds of element with a state that switches on and off, each flipped on
 * and off again in turn, in the order listed. Every row shares one shape, so
 * its fields carry no comments of their own:
 *
 * - `actStr` (String): Active String, the value that marks the state on.
 *
 * - `attStr` (String): Attribute String, the attribute that marks the state.
 *
 * - `inaStr` (String or null): Inactive String, the value that marks it off,
 *   or null to remove the attribute.
 *
 * - `selStr` (String): Selector String, the selector that finds the element,
 *   by the class name Vite keeps inside each hashed module class.
 *
 * - `staArr` (Array): State Array, the page states, by their names, where the
 *   kind is flipped, and where at least one element of it has to be found and
 *   flipped.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const TOG_TAR_ARR : TogTarTyp[] = [ // What: Toggle Target Array. Why: A switched state is feedback as much as a hover, and has to ease in and out. How: This lists each kind of element to flip.


	{ // What: Menu Toggle Row. Why: The phone menu's toggle turns its three bars into a cross while the menu is open. How: This flips its aria-expanded, on the phone states, where it shows.


		actStr : 'true',
		attStr : 'aria-expanded',
		inaStr : 'false',
		selStr : '[class*="menTogBut"]',
		staArr : PHO_IDE_ARR


	},

	{ // What: Current Bar Link Row. Why: The bar's link for the page being shown darkens to the ink and grows its orange underline. How: This flips each bar link's aria-current, on the desktop states, where the bar's links show.


		actStr : 'page',
		attStr : 'aria-current',
		inaStr : null,
		selStr : '[class*="barLinAnc"]',
		staArr : DES_IDE_ARR


	},

	{ // What: Current Drawer Link Row. Why: The drawer's link for the page being shown turns the dark orange. How: This flips each drawer link's aria-current, on the open menu state, where the drawer shows.


		actStr : 'page',
		attStr : 'aria-current',
		inaStr : null,
		selStr : '[class*="draLinAnc"]',
		staArr : [ 'menu-phone' ]


	},

	{ // What: Open Drawer Row. Why: The phone menu's drawer slides down and fades in while it's open, its rows arriving one after another. How: This flips its data-mobile-menu-open, on the open menu state, the only one where it shows.


		actStr : '',
		attStr : 'data-mobile-menu-open',
		inaStr : null,
		selStr : '[class*="menDraDiv"]',
		staArr : [ 'menu-phone' ]


	},

	{ // What: Open Scrim Row. Why: The page dims behind the open phone menu. How: This flips the scrim's data-mobile-menu-open, on the open menu state, where it shows.


		actStr : '',
		attStr : 'data-mobile-menu-open',
		inaStr : null,
		selStr : '[class*="navScrDiv"]',
		staArr : [ 'menu-phone' ]


	},

	{ // What: Scrolled Bar Row. Why: Once the page moves under the bar, the bar firms up its background, shows its bottom border, and casts its shadow. How: This flips its data-nav-bar-scrolled, on every state, since the bar shows on each.


		actStr : '',
		attStr : 'data-nav-bar-scrolled',
		inaStr : null,
		selStr : '[class*="navBarHed"]',
		staArr : IDE_LIS_ARR


	},

	{ // What: Chosen Pill Row. Why: The Articles page's chosen topic pill fills in with the ink. How: This flips each pill's aria-pressed, on the Articles states, where the filter shows.


		actStr : 'true',
		attStr : 'aria-pressed',
		inaStr : 'false',
		selStr : '[class*="filPilBut"]',
		staArr : ART_IDE_ARR


	},

	{ // What: Open Tip Button Row. Why: A help tip's button fills with pale teal while its bubble is open. How: This flips each tip button's aria-expanded, on the Contact states where the form shows.


		actStr : 'true',
		attStr : 'aria-expanded',
		inaStr : 'false',
		selStr : '[class*="helTipBut"]',
		staArr : FOR_IDE_ARR


	},

	{ // What: Open Bubble Row. Why: A help tip's bubble fades in and settles into place while it's open, and fades out before it hides. How: This flips the open bubble's data-tip-bubble-open, on the states that open a tip, the only ones where a bubble shows.


		actStr : '',
		attStr : 'data-tip-bubble-open',
		inaStr : null,
		selStr : '[class*="helBubSpa"]',
		staArr : TIP_IDE_ARR


	},

	{ // What: Sending Button Row. Why: Contact's "Send My Question" button dims while a question sends. How: This flips its disabled attribute, on the Contact states where the form shows.


		actStr : '',
		attStr : 'disabled',
		inaStr : null,
		selStr : '[class*="senQueBut"]',
		staArr : FOR_IDE_ARR


	}


];

// #endregion TOG_TAR_ARR

// #endregion Constants



// #region Helpers

// #region aniFinFun

/**
 * aniFinFun = Animation Finish Function
 *
 * @summary
 * Runs inside the page and waits until a look just changed has settled: two
 * animation frames first, so the hover, press, focus, or attribute change has
 * been styled and its transitions have started, then every animation and
 * transition on the element, everything inside it, and each of its ancestors
 * has finished, leaving out any that repeat forever. An ancestor counts since
 * a color fading on it reaches the element through inheritance. A look with
 * nothing easing, such as every look under reduced motion, is read after the
 * two frames alone, and one easing longer than usual, such as a staggered
 * entrance or a transition WebKit runs behind the clock on a heavy page, is
 * waited out. One cancelled midway counts as ended. Passed to Playwright's
 * evaluate, so it can't read anything from this file.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param eleCurEle - Element Current Element: The element to wait on.
 *
 * @returns A promise that settles once every finite animation has finished,
 *          with no value.
 *
 * @example
 * ```ts
 * handle.evaluate(aniFinFun) // => Promise<void>
 * ```
 *
*/

async function aniFinFun ( eleCurEle : Element ) : Promise< void > {


	for ( let fraIndNum = 0; fraIndNum < 2; fraIndNum++ ) await new Promise( ( resCurFun ) => requestAnimationFrame( resCurFun ) ); // What: Frame Wait Loop. Why: A change applied from outside the page, such as the pointer moving onto the element, may not be styled until the next frame, so its transitions wouldn't be listed yet. How: This waits two animation frames.



	const ancEleArr : Element[] = []; // What: Ancestor Element Array. Why: An ancestor's fading color reaches the element through inheritance. How: This collects every element above it.


	for ( let ancCurEle = eleCurEle.parentElement; ancCurEle; ancCurEle = ancCurEle.parentElement ) ancEleArr.push( ancCurEle ); // What: Ancestor Walk Loop. Why: Each level up can pass a color down. How: This climbs from the parent to the root, recording each element.



	const finAniArr = [ ...eleCurEle.getAnimations( { subtree : true } ), ...ancEleArr.flatMap( ( ancCurEle ) => ancCurEle.getAnimations() ) ].filter( ( aniCurObj ) => aniCurObj.effect?.getTiming().iterations !== Infinity ); // What: Finite Animation Array. Why: A loop never finishes, so waiting on one would hang. How: This lists the animations and transitions of the element, its descendants, and its ancestors' own that end.


	await Promise.all( finAniArr.map( ( aniCurObj ) => aniCurObj.finished.catch( () => undefined ) ) ); // What: Animation Finish Wait. Why: The look is read only once every entrance and transition has ended. How: This waits on each one's finished promise, treating one cancelled midway, such as a transition a new one replaced, as ended too, since its promise rejects rather than resolves.


}

// #endregion aniFinFun



// #region attSetFun

/**
 * attSetFun = Attribute Set Function
 *
 * @summary
 * Sets an attribute on an element the test holds a handle to, or removes it
 * when given null, the way the page itself marks a state on or off, so the
 * stylesheet's look for that state applies without a click.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param hanCurObj - Handle Current Object: The element to mark.
 * @param attNamStr - Attribute Name String: The attribute to set.
 * @param attValStr - Attribute Value String: Its value, or null to remove it.
 *
 * @returns A promise that settles once the attribute is set, with no value.
 *
 * @example
 * ```ts
 * attSetFun(togCurObj, 'aria-expanded', 'true') // => Promise<void>
 * ```
 *
*/

async function attSetFun ( hanCurObj : ElementHandle< Element >, attNamStr : string, attValStr : string | null ) : Promise< void > {


	await hanCurObj.evaluate( ( hanCurEle, attArgArr ) => { // What: Attribute Set Call. Why: The page function takes one argument. How: This passes the name and value as a pair. // What: Type Assertion Note. Why: Without it the array widens to a mixed array, so the page function's argument loses its pairing. How: as const keeps it a tuple, its first slot a string and its second a string or null.


		if ( attArgArr[ 1 ] === null ) hanCurEle.removeAttribute( attArgArr[ 0 ] ); // What: Attribute Remove Branch. Why: A null value means the state is off. How: This removes the attribute.

		else hanCurEle.setAttribute( attArgArr[ 0 ], attArgArr[ 1 ] ); // What: Attribute Set Branch. Why: Any other value marks the state on. How: This sets the attribute to it.


	}, [ attNamStr, attValStr ] as const ); // What: Attribute Pair Argument. Why: The page function reads the name and value from one argument. How: This hands them over as a pair.


}

// #endregion attSetFun



// #region conLisFun

/**
 * conLisFun = Control List Function
 *
 * @summary
 * Collects the elements a visitor can reach on the page as it stands: each
 * element the selector matches that's visible, not taken out of the tab order
 * with tabindex -1, not disabled, and not inside inert content (the page
 * behind the open phone menu), so the same list serves the controls, the
 * cards, and the toggles. Handles are taken once, so the list stays fixed
 * while the checks scroll.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to collect from.
 * @param conSelStr - Control Selector String: The elements to collect, such as
 *                    every link and button.
 *
 * @returns A promise that resolves with the reachable elements the selector
 *          matches.
 * @see {@link conHanArr}
 *
 * @example
 * ```ts
 * conLisFun(page, 'a, button') // => [ ElementHandle, ... ]
 * ```
 *
*/

async function conLisFun ( curPagObj : Page, conSelStr : string ) : Promise< ElementHandle< Element >[] > {


	const conHanArr : ElementHandle< Element >[] = []; // What: Control Handle Array. Why: The reachable elements are gathered one by one. How: This collects them.


	for ( const conCurObj of await curPagObj.$$( conSelStr ) ) { // What: Control Loop. Why: Every element the selector matches is judged on its own. How: This keeps each one a visitor can reach.


		const conReaBoo = await conCurObj.evaluate( ( conCurEle ) => { // What: Control Reachable Boolean. Why: An element outside the tab order, disabled, or inside inert content can't be reached. How: This checks all three inside the page.


			const notDisBoo = !conCurEle.matches( ':disabled' );             // What: Not Disabled Boolean. Why: A disabled control takes no input. How: This is true when the element isn't disabled.
			const notIneBoo = !conCurEle.closest( '[inert]' );               // What: Not Inert Boolean. Why: Inert content can't be reached. How: This is true when no ancestor is inert.
			const tabOrdBoo = conCurEle.getAttribute( 'tabindex' ) !== '-1'; // What: Tab Order Boolean. Why: A control taken out of the tab order can't be reached by Tab. How: This is true unless its tabindex is -1.

			const reaConBoo = notDisBoo && notIneBoo && tabOrdBoo; // What: Reachable Control Boolean. Why: A control counts only when all three hold. How: This combines them.



			return reaConBoo; // What: Reachable Control Return. Why: The test reads the verdict back. How: This returns the combined boolean.


		} );


		if ( conReaBoo && await conCurObj.isVisible() ) conHanArr.push( conCurObj ); // What: Reachable Control Record. Why: Only elements a visitor can see and reach are checked. How: This keeps the element when it's both.


	}



	return conHanArr; // What: Control Handle Return. Why: The checks probe each element in turn. How: This hands back every reachable element's handle.


}

// #endregion conLisFun



// #region feeProFun

/**
 * feeProFun = Feedback Problems Function
 *
 * @summary
 * Probes every reachable link, button, and form field and returns a problem
 * for each one that gives no feedback, or a single problem when it finds no
 * control at all, no field on the Contact states that show the form, or no
 * skip link waiting above the screen on a state with no menu open. Each
 * control is scrolled into view, and one that still waits above the screen
 * until it's focused, the skip link, is focused so it slides in before it's
 * hovered. Each is read at rest with the pointer away, again while hovered,
 * and again while the mouse button is held on it, a field skipping the
 * press, since pressing one only focuses it, then blurred with the pointer
 * away and read once more while focused the way a keyboard focuses it, every
 * look read once its transition has settled. A control that looks the same
 * unfocused and focused is a problem, and so is a link or button that looks
 * the same at rest and hovered or hovered and pressed, while a field, which
 * has no hover or press look, isn't held to those two. Normally every probed
 * property that changes on hover, press, or focus, on the control or anything
 * inside it, has to be eased by a transition ({@link snaProFun}), the focus
 * ring's outline included; under reduced motion none of them may ease ({@link
 * movProFun}), and the control's own transition durations, read while it is
 * pressed, or hovered for a field, must all be zero. It expects real clicks
 * already blocked, so releasing the mouse does nothing.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to probe.
 * @param staIdeStr - State Identifier String: The page state's name, which
 *                    says whether the form's fields and the skip link have to
 *                    be found.
 * @param redMotBoo - Reduced Motion Boolean: Whether the page is emulating
 *                    reduced motion.
 *
 * @returns A promise that resolves with every feedback problem found.
 * @see {@link proLisArr}
 *
 * @example
 * ```ts
 * feeProFun(page, 'contact-phone', false) // => [] when every control responds
 * ```
 *
*/

async function feeProFun ( curPagObj : Page, staIdeStr : string, redMotBoo : boolean ) : Promise< string[] > {


	const conHanArr = await conLisFun( curPagObj, CON_SEL_STR ); // What: Control Handle Array. Why: Every reachable link, button, and form field is probed. How: This collects their handles.

	const proLisArr : string[] = []; // What: Problem List Array. Why: Every problem should be reported, not just the first. How: This collects them.


	if ( !conHanArr.length ) proLisArr.push( 'no control to probe' ); // What: Empty Probe Check. Why: A probe that finds nothing would pass without checking anything, and every state has at least one reachable control. How: This records a problem when no control is found.



	const fieFouArr = await Promise.all( conHanArr.map( ( conCurObj ) => conCurObj.evaluate( ( conCurEle, fieSelStr ) => conCurEle.matches( fieSelStr ), FIE_SEL_STR ) ) ); // What: Field Found Array. Why: Each control is probed for the looks it has, a field for focus alone. How: This marks, in the controls' order, each one that's a form field.


	if ( FOR_IDE_ARR.includes( staIdeStr ) && !fieFouArr.includes( true ) ) proLisArr.push( 'no form field to probe' ); // What: Empty Field Check. Why: A selector that stopped matching the fields would let their focus snap without failing. How: On the Contact states where the form shows, this records a problem when no field is found.



	const skiFouArr = await Promise.all( conHanArr.map( ( conCurObj ) => conCurObj.evaluate( ( conCurEle ) => conCurEle.textContent?.trim() === 'Skip to main content' && conCurEle.getBoundingClientRect().bottom <= 0 ) ) ); // What: Skip Found Array. Why: The skip link is the control that waits above the screen until it's focused, so the probe's focus-first branch has to reach it. How: This marks each control that is the skip link resting above the screen.


	if ( staIdeStr !== 'menu-phone' && !skiFouArr.includes( true ) ) proLisArr.push( "the skip link isn't probed waiting above the screen" ); // What: Missing Skip Link Check. Why: A skip link that stopped waiting above the screen, or went missing, would let the focus-first branch drop out without failing. How: This records a problem when no probed control is the skip link resting above the screen, on every state but the open menu, which makes the page behind it inert.



	for ( const [ conIndNum, conCurObj ] of conHanArr.entries() ) { // What: Control Probe Loop. Why: Every reachable control has to respond. How: This reads each one at rest, hovered, pressed, unfocused, and focused, a field skipping the press.


		const conDesStr = await conCurObj.evaluate( ( conCurEle ) => `${ conCurEle.tagName.toLowerCase() } "${ ( conCurEle.getAttribute( 'aria-label' ) || ( conCurEle.matches( 'input, select, textarea' ) ? conCurEle.getAttribute( 'name' ) : conCurEle.textContent ) || '' ).trim().slice( 0, 30 ) }"` ); // What: Control Description String. Why: A problem should name the control a person would recognize. How: This joins its tag with its label, its text, or for a form field its name, since a select's text runs through every option.
		const conFieBoo = fieFouArr[ conIndNum ]; // What: Control Field Boolean. Why: A field has no hover or press look to require. How: This is true when the control is a form field.


		await conCurObj.scrollIntoViewIfNeeded(); // What: Control Scroll Call. Why: A control has to be on screen to hover or press. How: This scrolls it into view.


		const offScrBoo = await conCurObj.evaluate( ( conCurEle ) => conCurEle.getBoundingClientRect().bottom <= 0 ); // What: Off Screen Boolean. Why: A control that waits above the screen until it's focused, the skip link, can't be hovered where it rests. How: This is true when its box still sits wholly above the viewport after the scroll.


		if ( offScrBoo ) await conCurObj.evaluate( ( conCurEle ) => { if ( conCurEle instanceof HTMLElement ) conCurEle.focus( { focusVisible : true } ); } ); // What: Off Screen Focus Call. Why: The skip link only slides into view once it's focused, and is hovered and pressed there. How: This focuses it, so the rest settle call lets it arrive before its resting look is read.



		await curPagObj.mouse.move( 0, 0 ); // What: Pointer Away Call. Why: The resting look is read with nothing hovered. How: This moves the pointer to the corner of the bar.

		await conCurObj.evaluate( aniFinFun ); // What: Rest Settle Call. Why: Any earlier hover has to finish fading before the resting look is read. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const resSnaArr = await conCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Rest Snapshot Array. Why: The resting look is what hover is compared with. How: This records the control and everything inside it.


		await conCurObj.hover(); // What: Control Hover Call. Why: Hover feedback is the first thing checked. How: This moves the pointer onto the control.

		await conCurObj.evaluate( aniFinFun ); // What: Hover Settle Call. Why: The hover look is read once it has eased in. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const hovSnaArr = await conCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Hover Snapshot Array. Why: The hovered look is compared with rest and with pressed. How: This records it.


		if ( !conFieBoo ) await curPagObj.mouse.down(); // What: Mouse Down Call. Why: A press shows while the button is held, while pressing a field only focuses it, which the focus read below covers. How: This holds the mouse button down on a link or button.



		await conCurObj.evaluate( aniFinFun ); // What: Press Settle Call. Why: The pressed look is read once it has eased in. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const preSnaArr = await conCurObj.evaluate( snaEleFun, CON_PRO_ARR );                                            // What: Press Snapshot Array. Why: The pressed look is compared with hovered. How: This records it.
		const traDurStr = await conCurObj.evaluate( ( conCurEle ) => getComputedStyle( conCurEle ).transitionDuration ); // What: Transition Duration String. Why: Reduced motion should leave nothing moving. How: This reads the control's transition durations.


		if ( !conFieBoo ) await curPagObj.mouse.up(); // What: Mouse Up Call. Why: The press has to end before the focus is read. How: This releases the button, which does nothing further since clicks are blocked.



		await curPagObj.mouse.move( 0, 0 ); // What: Pointer Away Call. Why: The focus look is compared with no hover on it. How: This moves the pointer to the corner of the bar.

		await conCurObj.evaluate( ( conCurEle ) => { if ( conCurEle instanceof HTMLElement ) conCurEle.blur(); } ); // What: Control Blur Call. Why: The focus look is compared with the control unfocused, and a press or the off screen focus may have focused it. How: This blurs it, so the skip link slides back out.
		await conCurObj.evaluate( aniFinFun );                                                                      // What: Blur Settle Call. Why: The unfocused look is read once the hover and focus have faded. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const bluSnaArr = await conCurObj.evaluate( snaEleFun, FOC_PRO_ARR ); // What: Blur Snapshot Array. Why: The unfocused look is what focus is compared with. How: This records the control and everything inside it, outline included.


		await conCurObj.evaluate( ( conCurEle ) => { if ( conCurEle instanceof HTMLElement ) conCurEle.focus( { focusVisible : true } ); } ); // What: Keyboard Focus Call. Why: The focus ring shows only for keyboard focus, and a script's focus draws it in every engine only when it asks to show the ring. How: This focuses the control with focusVisible set.
		await conCurObj.evaluate( aniFinFun );                                                                                                // What: Focus Settle Call. Why: The focused look is read once it has eased in. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const focSnaArr = await conCurObj.evaluate( snaEleFun, FOC_PRO_ARR ); // What: Focus Snapshot Array. Why: The focused look is compared with unfocused. How: This records it.


		await conCurObj.evaluate( ( conCurEle ) => { if ( conCurEle instanceof HTMLElement ) conCurEle.blur(); } ); // What: Control Blur Call. Why: Left focused, the control would keep its ring, or the skip link would stay in view over whatever is probed next. How: This blurs it, and the next rest settle wait lets it fade.


		if ( offScrBoo ) await conCurObj.evaluate( aniFinFun ); // What: Skip Link Exit Wait. Why: Before the design package's v0.7.3 the skip link lifted on hover even while unfocused, so a pointer landing on the next control while the link still slid out over it held it in view, measured in WebKit hanging the next hover for ten minutes, and the wait still keeps each hover clear of the slide. How: For the control that waited above the screen, this waits two frames, then for its slide back out to end.



		if ( !conFieBoo && valSigFun( resSnaArr ) === valSigFun( hovSnaArr ) ) proLisArr.push( `${ conDesStr } looks the same hovered` ); // What: Hover Check. Why: A hovered link or button has to respond. How: This records one that doesn't change, leaving out a field, which has no hover look.



		if ( !conFieBoo && valSigFun( hovSnaArr ) === valSigFun( preSnaArr ) ) proLisArr.push( `${ conDesStr } looks the same pressed` ); // What: Press Check. Why: A press has to register before anything happens. How: This records a link or button that doesn't change, leaving out a field, which isn't pressed.



		if ( valSigFun( bluSnaArr ) === valSigFun( focSnaArr ) ) proLisArr.push( `${ conDesStr } looks the same focused` ); // What: Focus Check. Why: A focused control has to show where focus is. How: This records one whose look and ring don't change.



		if ( redMotBoo && !/^0s(, 0s)*$/.test( traDurStr ) ) proLisArr.push( `${ conDesStr } still transitions under reduced motion (${ traDurStr })` ); // What: Reduced Motion Duration Check. Why: Asking for less motion should stop every transition. How: This records a control with any duration above zero.



		if ( redMotBoo ) proLisArr.push( ...movProFun( resSnaArr, hovSnaArr, CON_PRO_ARR, conDesStr, 'when hovered' ), ...movProFun( hovSnaArr, preSnaArr, CON_PRO_ARR, conDesStr, 'when pressed' ), ...movProFun( bluSnaArr, focSnaArr, FOC_PRO_ARR, conDesStr, 'when focused' ) ); // What: Reduced Motion Change Check. Why: Under reduced motion every change should switch at once, inside the control too. How: This records each property that changes while a transition still eases it.

		else proLisArr.push( ...snaProFun( resSnaArr, hovSnaArr, CON_PRO_ARR, conDesStr, 'when hovered' ), ...snaProFun( hovSnaArr, preSnaArr, CON_PRO_ARR, conDesStr, 'when pressed' ), ...snaProFun( bluSnaArr, focSnaArr, FOC_PRO_ARR, conDesStr, 'when focused' ) ); // What: Snapped Change Check. Why: Every probed property a hover, press, or focus changes should ease rather than snap, the focus ring included. How: This records each one that changes without a transition, on the control or anything inside it.


	}



	return proLisArr; // What: Problem List Return. Why: The test prints whatever was found. How: This hands back every problem collected.


}

// #endregion feeProFun



// #region hovProFun

/**
 * hovProFun = Hover Problems Function
 *
 * @summary
 * Probes the reachable step and promise cards, which lift on hover without
 * being controls, and returns a problem for each one that gives no hover
 * feedback, a single problem when it finds none, and one for each kind {@link
 * HOV_KIN_OBJ} names for the page that it doesn't find. Each card is scrolled
 * into view, read at rest with the pointer away and again while hovered,
 * every look read once its transition has settled, and one that looks the
 * same both ways is a problem. Normally every probed property that changes,
 * on the card or anything inside it, has to be eased by a transition ({@link
 * snaProFun}); under reduced motion none of them may ease ({@link movProFun}),
 * and every one of the card's own transition durations must be zero, while
 * the hover look still has to change.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to probe.
 * @param staIdeStr - State Identifier String: The page state's name, whose
 *                    page part picks the card kinds it has to find.
 * @param redMotBoo - Reduced Motion Boolean: Whether the page is emulating
 *                    reduced motion.
 *
 * @returns A promise that resolves with every hover feedback problem found.
 * @see {@link proLisArr}
 *
 * @example
 * ```ts
 * hovProFun(page, 'home-desktop', false) // => [] when every card responds
 * ```
 *
*/

async function hovProFun ( curPagObj : Page, staIdeStr : string, redMotBoo : boolean ) : Promise< string[] > {


	const tarHanArr = await conLisFun( curPagObj, HOV_TAR_STR );                                                                         // What: Target Handle Array. Why: Every reachable card is probed. How: This collects them the way the controls are collected.
	const tarClaArr = await Promise.all( tarHanArr.map( ( tarHanObj ) => tarHanObj.evaluate( ( tarCurEle ) => tarCurEle.className ) ) ); // What: Target Class Array. Why: The kind check reads which classes the reachable cards carry. How: This reads each collected card's class list as one string.

	const proLisArr : string[] = []; // What: Problem List Array. Why: Every problem should be reported, not just the first. How: This collects them.


	if ( !tarHanArr.length ) proLisArr.push( 'no card to probe' ); // What: Empty Probe Check. Why: A probe that finds nothing would pass without checking anything. How: This records a problem when no card is found.



	for ( const kinClaStr of HOV_KIN_OBJ[ staIdeStr.split( '-' )[ 0 ] ] || [] ) if ( !tarClaArr.some( ( tarClaStr ) => tarClaStr.includes( kinClaStr ) ) ) proLisArr.push( `no reachable card matches ${ kinClaStr }` ); // What: Missing Kind Loop. Why: One kind of card dropping out would otherwise pass without failing. How: This records each class the page's row in the kind table names that no reachable card carries.



	for ( const tarCurObj of tarHanArr ) { // What: Target Probe Loop. Why: Every card has to respond to hover. How: This reads each one at rest and hovered.


		const tarDesStr = await tarCurObj.evaluate( ( tarCurEle ) => `${ tarCurEle.tagName.toLowerCase() } "${ ( tarCurEle.textContent || tarCurEle.className ).trim().slice( 0, 30 ) }"` ); // What: Target Description String. Why: A problem should name the card a person would recognize. How: This joins its tag with the start of its text.


		await tarCurObj.scrollIntoViewIfNeeded(); // What: Target Scroll Call. Why: A card has to be on screen to hover. How: This scrolls it into view.

		await curPagObj.mouse.move( 0, 0 ); // What: Pointer Away Call. Why: The resting look is read with nothing hovered. How: This moves the pointer to the corner of the bar.

		await tarCurObj.evaluate( aniFinFun ); // What: Rest Settle Call. Why: Any earlier hover has to finish fading before the resting look is read. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const resSnaArr = await tarCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Rest Snapshot Array. Why: The resting look is what hover is compared with. How: This records the card and everything inside it.


		await tarCurObj.hover(); // What: Target Hover Call. Why: Hover is the one interaction a card has. How: This moves the pointer onto it.

		await tarCurObj.evaluate( aniFinFun ); // What: Hover Settle Call. Why: The hover look is read once it has eased in. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const hovSnaArr = await tarCurObj.evaluate( snaEleFun, CON_PRO_ARR );                                            // What: Hover Snapshot Array. Why: The hovered look is compared with rest. How: This records it.
		const traDurStr = await tarCurObj.evaluate( ( tarCurEle ) => getComputedStyle( tarCurEle ).transitionDuration ); // What: Transition Duration String. Why: Reduced motion should leave nothing moving. How: This reads the card's transition durations.


		if ( valSigFun( resSnaArr ) === valSigFun( hovSnaArr ) ) proLisArr.push( `${ tarDesStr } looks the same hovered` ); // What: Hover Check. Why: A hovered card has to respond, under reduced motion too. How: This records one that doesn't change.



		if ( redMotBoo && !/^0s(, 0s)*$/.test( traDurStr ) ) proLisArr.push( `${ tarDesStr } still transitions under reduced motion (${ traDurStr })` ); // What: Reduced Motion Duration Check. Why: Asking for less motion should stop every transition. How: This records a card with any duration above zero.



		if ( redMotBoo ) proLisArr.push( ...movProFun( resSnaArr, hovSnaArr, CON_PRO_ARR, tarDesStr, 'when hovered' ) ); // What: Reduced Motion Change Check. Why: Under reduced motion a card's hover changes, such as its lift, should switch at once. How: This records each property that changes while a transition still eases it.

		else proLisArr.push( ...snaProFun( resSnaArr, hovSnaArr, CON_PRO_ARR, tarDesStr, 'when hovered' ) ); // What: Snapped Change Check. Why: A hover change, such as the lift, should ease rather than snap. How: This records each property that changes without a transition, on the card or anything inside it.


	}



	return proLisArr; // What: Problem List Return. Why: The test prints whatever was found. How: This hands back every problem collected.


}

// #endregion hovProFun



// #region togProFun

/**
 * togProFun = Toggle Problems Function
 *
 * @summary
 * Flips every reachable element with a state that switches on and off, each
 * kind listed in {@link TOG_TAR_ARR} whose row names the page state, and
 * returns a problem for each one that gives no feedback. The pointer is moved
 * away, and each element is scrolled into view, marked off, read, marked on,
 * read again, marked off, and read a third time, every look read once its
 * transitions and finite animations have finished, then left as the page had
 * it. An element that looks the same off and on is a problem. Normally every
 * probed property that changes either way, on the element or anything inside
 * it, has to be eased by a transition ({@link snaProFun}); under reduced
 * motion none of them may ease ({@link movProFun}). A kind that flips nothing
 * in a state its row names is a problem too, so the check can't pass by
 * quietly losing one.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to probe.
 * @param staIdeStr - State Identifier String: The page state's name, which
 *                    each row's states are checked against.
 * @param redMotBoo - Reduced Motion Boolean: Whether the page is emulating
 *                    reduced motion.
 *
 * @returns A promise that resolves with every toggle feedback problem found.
 * @see {@link proLisArr}
 *
 * @example
 * ```ts
 * togProFun(page, 'menu-phone', false) // => [] when every toggle eases
 * ```
 *
*/

async function togProFun ( curPagObj : Page, staIdeStr : string, redMotBoo : boolean ) : Promise< string[] > {


	const fliTarSet : Set< TogTarTyp >                          = new Set(); // What: Flipped Target Set. Why: Each kind has to be flipped in the states its row names. How: This records every kind at least one element was flipped for.
	const proLisArr : string[]                                  = [];        // What: Problem List Array. Why: Every problem should be reported, not just the first. How: This collects them.
	const togHanArr : [ TogTarTyp, ElementHandle< Element > ][] = [];        // What: Toggle Handle Array. Why: Each reachable element of each kind is flipped. How: This pairs each element's handle with its kind's row.


	for ( const togTarObj of TOG_TAR_ARR.filter( ( togFilObj ) => togFilObj.staArr.includes( staIdeStr ) ) ) for ( const togCurObj of await conLisFun( curPagObj, togTarObj.selStr ) ) togHanArr.push( [ togTarObj, togCurObj ] ); // What: Toggle Collect Loop. Why: Only elements a visitor can see and reach are flipped, and only in the states where their kind shows, since the toggle and the drawer replace the bar's links at 1,024px and narrower, and the bar's links show only above that. How: This collects the reachable elements of each kind whose row names this state, in the table's order.



	for ( const [ togTarObj, togCurObj ] of togHanArr ) { // What: Toggle Probe Loop. Why: Every switched state has to show and ease. How: This reads each element off, on, and off again.


		fliTarSet.add( togTarObj ); // What: Flipped Kind Call. Why: Each kind is checked for in the states its row names once the loop ends. How: This records the element's row.


		const oriValStr = await togCurObj.getAttribute( togTarObj.attStr ); // What: Original Value String. Why: The element is left as the page had it. How: This reads the attribute's value, or null when it's absent.
		const togDesStr = await togCurObj.evaluate( ( togCurEle ) => `${ togCurEle.tagName.toLowerCase() } "${ ( togCurEle.getAttribute( 'aria-label' ) || togCurEle.className ).trim().slice( 0, 30 ) }"` ); // What: Toggle Description String. Why: A problem should name the element a person or a reader of the stylesheet would recognize. How: This joins its tag with its label, or its class for an element with no label, such as the scrim.


		await togCurObj.scrollIntoViewIfNeeded(); // What: Toggle Scroll Call. Why: An element's look is read on screen. How: This scrolls it into view.

		await curPagObj.mouse.move( 0, 0 ); // What: Pointer Away Call. Why: The state's look is read with nothing hovered. How: This moves the pointer to the corner of the bar.

		await attSetFun( togCurObj, togTarObj.attStr, togTarObj.inaStr ); // What: Off Set Call. Why: The state is read switching on from off. How: This marks it off.

		await togCurObj.evaluate( aniFinFun ); // What: Off Settle Call. Why: Any earlier look has to finish fading, a staggered entrance inside the element included. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const inaSnaArr = await togCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Inactive Snapshot Array. Why: The off look is what the on look is compared with. How: This records the element and everything inside it.


		await attSetFun( togCurObj, togTarObj.attStr, togTarObj.actStr ); // What: On Set Call. Why: Switching the state on is the change checked first. How: This marks it on.

		await togCurObj.evaluate( aniFinFun ); // What: On Settle Call. Why: The on look is read once it has eased in. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const actSnaArr = await togCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Active Snapshot Array. Why: The on look is compared with off both ways. How: This records it.


		await attSetFun( togCurObj, togTarObj.attStr, togTarObj.inaStr ); // What: Off Again Set Call. Why: Switching the state off has to ease too. How: This marks it off again.

		await togCurObj.evaluate( aniFinFun ); // What: Off Again Settle Call. Why: The off look is read once it has eased out. How: This waits two frames, then for every finite animation on the element, inside it, and above it to end.


		const retSnaArr = await togCurObj.evaluate( snaEleFun, CON_PRO_ARR ); // What: Return Snapshot Array. Why: The look switched back off is compared with on. How: This records it.


		await attSetFun( togCurObj, togTarObj.attStr, oriValStr ); // What: Original Set Call. Why: The next element is read on the page as it was. How: This puts the attribute back as the page had it.



		if ( valSigFun( inaSnaArr ) === valSigFun( actSnaArr ) ) proLisArr.push( `${ togDesStr } looks the same toggled on` ); // What: Toggle Check. Why: A switched state has to show. How: This records an element that doesn't change.



		if ( redMotBoo ) proLisArr.push( ...movProFun( inaSnaArr, actSnaArr, CON_PRO_ARR, togDesStr, 'when toggled on' ), ...movProFun( actSnaArr, retSnaArr, CON_PRO_ARR, togDesStr, 'when toggled off' ) ); // What: Reduced Motion Check. Why: Asking for less motion should switch a state at once. How: This records each property that changes while a transition still eases it, both ways.

		else proLisArr.push( ...snaProFun( inaSnaArr, actSnaArr, CON_PRO_ARR, togDesStr, 'when toggled on' ), ...snaProFun( actSnaArr, retSnaArr, CON_PRO_ARR, togDesStr, 'when toggled off' ) ); // What: Snapped Change Check. Why: A state switching on or off should ease rather than snap. How: This records each property that changes without a transition, both ways.


	}



	for ( const togTarObj of TOG_TAR_ARR ) if ( togTarObj.staArr.includes( staIdeStr ) && !fliTarSet.has( togTarObj ) ) proLisArr.push( `${ togTarObj.selStr } flips nothing` ); // What: Missing Kind Loop. Why: A kind that stopped matching, such as after a class rename, would otherwise drop out without failing. How: This records each kind whose row names this state but which flipped no element.



	return proLisArr; // What: Problem List Return. Why: The test prints whatever was found. How: This hands back every problem collected.


}

// #endregion togProFun

// #endregion Helpers



// #region Module Init

test.describe.configure( { mode : 'parallel' } ); // What: Parallel Mode Call. Why: Each test opens its own state in its own page, so none depends on another, and run in sequence this file alone set the pace of the whole suite. How: This lets the file's tests spread across the workers.



for ( const staRecObj of ALL_STA_ARR ) { // What: State Test Loop. Why: Every page state is checked, plus the reachable states a control leads to. How: This declares each check once per state, the shared states first, then the reachable ones.


	test( `${ staRecObj.ideStr } gives every reachable link and button hover, press, and focus feedback, every form field its focus, and every toggle its switch`, async ( { page : curPagObj } ) => { // What: Feedback Test. Why: Every interaction should visibly register. How: This opens the state, blocks clicks, probes every reachable link, button, and form field and each reachable element of the toggle kinds listed for the state, and on the plain Home and About states every card that lifts, and checks it finds no problems.


		test.setTimeout( 600000 ); // What: Test Timeout Call. Why: Probing every control's hover, press, focus, and toggles waits out each look's transitions, and an article's many links add up across a slow engine. How: This gives the test ten minutes.

		await opeStaFun( curPagObj, staRecObj ); // What: State Open Call. Why: The controls are probed with the state settled. How: This loads and settles it.

		await curPagObj.evaluate( cliBloFun ); // What: Click Block Call. Why: Pressing a control shouldn't navigate or close anything. How: This cancels every click from here on.


		const proLisArr = [ ...await togProFun( curPagObj, staRecObj.ideStr, false ), ...await feeProFun( curPagObj, staRecObj.ideStr, false ) ]; // What: Problem List Array. Why: The state passes only when every reachable link, button, and form field responds and every switched state shows and eases. How: This gathers both probes' problems, so a failure prints each one, flipping the toggles first, since probing the controls moves focus, which closes an open help tip's bubble.


		if ( /^(home|about)-(desktop|phone)$/.test( staRecObj.ideStr ) ) proLisArr.push( ...await hovProFun( curPagObj, staRecObj.ideStr, false ) ); // What: Hover Probe Call. Why: The cards that lift are probed on the plain Home and About states, where nothing covers them. How: On those pages' desktop and phone states, this adds the cards' problems.



		expect( proLisArr ).toEqual( [] ); // What: No Feedback Problems Assertion. Why: The state passes only when every probe finds nothing. How: This compares the problems with an empty list, so a failure prints each one.


	} );



	test( `${ staRecObj.ideStr } keeps feedback without motion under reduced motion`, async ( { page : curPagObj } ) => { // What: Reduced Motion Feedback Test. Why: Visitors who ask for less motion still need to see their actions register. How: This probes every reachable link, button, and form field, each reachable element of the toggle kinds listed for the state, and on the plain Home and About states every card that lifts, with reduced motion on, and checks it finds no problems.


		test.setTimeout( 600000 ); // What: Test Timeout Call. Why: Probing every control's hover, press, focus, and toggles waits out each look's transitions, and an article's many links add up across a slow engine. How: This gives the test ten minutes.

		await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Emulation. Why: The preference has to be set before the page loads. How: This makes the page match prefers-reduced-motion: reduce.

		await opeStaFun( curPagObj, staRecObj ); // What: State Open Call. Why: The controls are probed with the state settled. How: This loads and settles it.

		await curPagObj.evaluate( cliBloFun ); // What: Click Block Call. Why: Pressing a control shouldn't navigate or close anything. How: This cancels every click from here on.


		const proLisArr = [ ...await togProFun( curPagObj, staRecObj.ideStr, true ), ...await feeProFun( curPagObj, staRecObj.ideStr, true ) ]; // What: Problem List Array. Why: Every reachable link, button, and form field has to respond, and every switched state show, without moving. How: This gathers both probes' problems, so a failure prints each one, flipping the toggles first, since probing the controls moves focus, which closes an open help tip's bubble.


		if ( /^(home|about)-(desktop|phone)$/.test( staRecObj.ideStr ) ) proLisArr.push( ...await hovProFun( curPagObj, staRecObj.ideStr, true ) ); // What: Hover Probe Call. Why: The cards that lift are probed on the plain Home and About states, where nothing covers them. How: On those pages' desktop and phone states, this adds the cards' problems.



		expect( proLisArr ).toEqual( [] ); // What: No Reduced Motion Problems Assertion. Why: Every probe has to find its feedback without motion. How: This compares the problems with an empty list, so a failure prints each one.


	} );


}



for ( const staRecObj of STA_REC_ARR ) { // What: Shared State Ring Loop. Why: The first keyboard stop's ring is read on the shared states, where the first Tab lands on a link or button. How: This declares the ring check once per shared state.


	test( `${ staRecObj.ideStr } eases its focus ring in to full width`, async ( { browserName : engNamStr, page : curPagObj } ) => { // What: Focus Ring Test. Why: A keyboard user has to see where focus lands. How: This tabs to the first stop and reads its ring once it has eased in.


		await opeStaFun( curPagObj, staRecObj ); // What: State Open Call. Why: The walk starts from the state settled. How: This loads and settles it.

		await curPagObj.keyboard.press( engNamStr === 'webkit' ? 'Alt+Tab' : 'Tab' ); // What: First Tab Press Call. Why: The ring shows only for keyboard focus. How: This tabs to the first stop, holding Alt in WebKit, which otherwise skips links the way Safari does.

		await curPagObj.locator( ':focus' ).evaluate( aniFinFun ); // What: Ring Settle Call. Why: The ring is read once it has grown in. How: This waits two frames, then for every finite animation on the focused stop, inside it, and above it to end.


		if ( !staRecObj.actFun ) expect( await curPagObj.evaluate( () => document.activeElement?.textContent?.trim() ) ).toBe( 'Skip to main content' ); // What: First Stop Check. Why: The ring checked should be the skip link's, the page's first stop. How: On a state with nothing opened, where focus starts at the top of the page, this reads the focused element's text, while the open menu starts the walk from its toggle.



		expect( await curPagObj.evaluate( () => getComputedStyle( document.activeElement as Element ).outlineWidth ) ).toBe( '2px' ); // What: Full Ring Assertion. Why: The ring has to reach its full width. How: This reads the focused stop's outline width, which the large border width token snaps to 2px. // What: Type Assertion Note. Why: activeElement types as possibly null. How: The Tab press just put focus on a stop.


	} );


}

// #endregion Module Init


