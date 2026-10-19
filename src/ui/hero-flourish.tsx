


// #region Imports

import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * hero-flourish.tsx = Hero Flourish
 *
 * @summary
 * A small drawing of the site's motif, set on either side of a stacked
 * hero's picture to fill the room a phone or tablet's single column leaves
 * beside it, as TechGeek.dev's About page does around its portrait. The left
 * drawing holds a speech bubble with typing dots, signal arcs, and a small
 * ringed disc, and the right one a sparkle, a dot, small rings, and a reply
 * bubble, in the site's teal with touches of orange. Each is decoration,
 * hidden from screen readers, drawn on a 60 by 240 space that scales to the
 * box the page gives it.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type HfcProTyp = { className : string, sidStr : 'left' | 'right' }; // What: Hero-Flourish-Component Props Type. Why: A page places and sizes each drawing and picks its side. How: This types the class and the side.

// #region HerFloCom

/**
 * HerFloCom = Hero Flourish Component
 *
 * @summary
 * Renders one side's drawing as an SVG with the class the page passes, which
 * shows, sizes, and places it beside the picture. The left drawing reads as
 * a question, a bubble with typing dots and a signal, and the right one as
 * the answer, a sparkle and a reply bubble, so the pair frames the picture
 * as a conversation.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.className - Class Name: The page's own class, which shows,
 *                          sizes, and places the drawing.
 * @param props.sidStr    - Side String: Which side's drawing to draw, left or
 *                          right.
 *
 * @returns The drawing's SVG element.
 *
 * @example
 * ```tsx
 * HerFloCom({className: cssModObj.visFloSvg, sidStr: 'left'}) // => <HerFloCom />
 * ```
 *
*/

function HerFloCom ( { className, sidStr } : HfcProTyp ) : JSX.Element {


	return (


		<svg
			className={ className }

			viewBox='0 0 60 240'

			aria-hidden='true'
		>{ /* What: Hero Flourish SVG Element. Why: The drawing fills the room beside a stacked hero's picture with a little of the site's motif. How: This draws one side's shapes on a 60 by 240 space, hidden from screen readers as decoration. */ }


			{ sidStr === 'left' ? ( // What: Left Side Check. Why: Each side draws its own half of the conversation. How: This draws the question side on the left and the answer side on the right.


				<>{ /* What: Question Drawing Fragment. Why: The left drawing reads as someone asking. How: This groups the bubble with typing dots, the signal arcs, and the ringed disc. */ }


				<path
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					d='M18 10 H42 A8 8 0 0 1 50 18 V30 A8 8 0 0 1 42 38 H26 L18 46 V38 A8 8 0 0 1 10 30 V18 A8 8 0 0 1 18 10 Z'
					fill='none'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeLinejoin='round'
					strokeWidth='1.5'
				/>{ /* What: Flourish Bubble Path Element. Why: A speech bubble echoes the one at the heart of the rings, the site's promise of a conversation. How: This traces an outlined bubble in teal at about 57% strength at the drawing's top. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='22'
					cy='24'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='2'
				/>{ /* What: Flourish Typing Dot Circle Element. Why: Three dots inside the bubble read as someone typing a reply. How: This draws one of them in teal at about 57% strength. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='30'
					cy='24'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='2'
				/>{ /* What: Flourish Typing Dot Circle Element. Why: Three dots inside the bubble read as someone typing a reply. How: This draws one of them in teal at about 57% strength. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='38'
					cy='24'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='2'
				/>{ /* What: Flourish Typing Dot Circle Element. Why: Three dots inside the bubble read as someone typing a reply. How: This draws one of them in teal at about 57% strength. */ }

				<path
					style={{ opacity : 'var( --cdn-pow-001-rec )' }} // Core-Design-Number to the Power of 1 Reciprocal ~= 0.755

					d='M22 148 A8 8 0 0 1 38 148'
					fill='none'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeLinecap='round'
					strokeWidth='1.5'
				/>{ /* What: Flourish Signal Arc Path Element. Why: Arcs fanning out from a dot read as a signal, the rings' motif in miniature. How: This draws the smallest arc in teal at about 75% strength. */ }

				<path
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					d='M14 148 A16 16 0 0 1 46 148'
					fill='none'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeLinecap='round'
					strokeWidth='1.5'
				/>{ /* What: Flourish Signal Arc Path Element. Why: Arcs fanning out from a dot read as a signal, the rings' motif in miniature. How: This draws the middle arc in teal at about 57% strength. */ }

				<path
					style={{ opacity : 'var( --cdn-pow-004-rec )' }} // Core-Design-Number to the Power of 4 Reciprocal ~= 0.325

					d='M6 148 A24 24 0 0 1 54 148'
					fill='none'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeLinecap='round'
					strokeWidth='1.5'
				/>{ /* What: Flourish Signal Arc Path Element. Why: Arcs fanning out from a dot read as a signal, the rings' motif in miniature. How: This draws the widest arc in teal at about 33% strength, fading outward like the rings. */ }

				<circle
					cx='30'
					cy='152'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='3'
				/>{ /* What: Flourish Signal Dot Circle Element. Why: The arcs need a source. How: This draws a teal dot under them. */ }

				<circle
					cx='30'
					cy='208'
					fill='var( --act-tin-col )' // Accent-Tertiary Tint Color = #D3EEE9
					r='7'
				/>{ /* What: Flourish Pool Circle Element. Why: A small pale disc echoes the rings' center pool. How: This fills it in the pale teal at the drawing's bottom. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-004-rec )' }} // Core-Design-Number to the Power of 4 Reciprocal ~= 0.325

					cx='30'
					cy='208'
					fill='none'
					r='14'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeWidth='1'
				/>{ /* What: Flourish Ring Circle Element. Why: One ring around the disc completes the miniature rings. How: This outlines it in teal at about 33% strength. */ }


				</>


			) : ( // What: Right Side Branch. Why: The right side draws the answer. How: This draws the sparkle, the rings, and the reply bubble.


				<>{ /* What: Answer Drawing Fragment. Why: The right drawing reads as the reply. How: This groups the sparkle, the dot, the small rings, and the reply bubble. */ }


				<path
					style={{ opacity : 'var( --cdn-pow-001-rec )' }} // Core-Design-Number to the Power of 1 Reciprocal ~= 0.755

					d='M32 12 L35.5 22.5 L46 26 L35.5 29.5 L32 40 L28.5 29.5 L18 26 L28.5 22.5 Z'
					fill='var( --acc-mai-col )' // Accent Main Color = #F26419
				/>{ /* What: Flourish Sparkle Path Element. Why: The hero's orange sparkle repeats once, the theme's touch of whimsy. How: This fills a four-point star in orange at about 75% strength at the drawing's top. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='16'
					cy='62'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='3'
				/>{ /* What: Flourish Dot Circle Element. Why: A lone dot links the sparkle to the rings below it. How: This draws a teal dot at about 57% strength. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='30'
					cy='118'
					fill='none'
					r='12'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeWidth='1.5'
				/>{ /* What: Flourish Ring Circle Element. Why: Two rings around a dot echo the hero's rings. How: This outlines the inner ring in teal at about 57% strength. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-004-rec )' }} // Core-Design-Number to the Power of 4 Reciprocal ~= 0.325

					cx='30'
					cy='118'
					fill='none'
					r='22'
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeWidth='1'
				/>{ /* What: Flourish Ring Circle Element. Why: Two rings around a dot echo the hero's rings. How: This outlines the outer ring in teal at about 33% strength, fading outward like the rings. */ }

				<circle
					cx='30'
					cy='118'
					fill='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					r='3.5'
				/>{ /* What: Flourish Ring Dot Circle Element. Why: The rings need a center. How: This draws a teal dot inside them. */ }

				<path
					style={{ opacity : 'var( --cdn-pow-001-rec )' }} // Core-Design-Number to the Power of 1 Reciprocal ~= 0.755

					d='M18 178 H42 A8 8 0 0 1 50 186 V198 A8 8 0 0 1 42 206 V214 L34 206 H18 A8 8 0 0 1 10 198 V186 A8 8 0 0 1 18 178 Z'
					fill='var( --act-tin-col )' // Accent-Tertiary Tint Color = #D3EEE9
					stroke='var( --act-mai-col )' // Accent-Tertiary Main Color = #2A9D8F
					strokeLinejoin='round'
					strokeWidth='1'
				/>{ /* What: Flourish Reply Bubble Path Element. Why: A second bubble, its tail on the other side, reads as the reply to the first drawing's question. How: This fills a pale teal bubble with a thin teal outline at about 75% strength. */ }

				<circle
					style={{ opacity : 'var( --cdn-pow-002-rec )' }} // Core-Design-Number to the Power of 2 Reciprocal ~= 0.570

					cx='46'
					cy='230'
					fill='var( --acc-mai-col )' // Accent Main Color = #F26419
					r='2.5'
				/>{ /* What: Flourish Dot Circle Element. Why: A small orange dot balances the sparkle at the drawing's bottom. How: This draws it at about 57% strength. */ }


				</>


			) }


		</svg>


	);


}

// #endregion HerFloCom

// #endregion Components



// #region Exports

export { HerFloCom }; // What: Named Export. Why: Home's and About's stacked heroes draw the flourishes beside their pictures. How: This exports HerFloCom.

// #endregion Exports


