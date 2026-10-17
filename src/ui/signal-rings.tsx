


// #region Imports

import cssModObj from './signal-rings.module.css'; // What: CSS Module Object. Why: The drawing's colors, ring strengths, and entrance are styled in its own module. How: This maps each class name in signal-rings.module.css to its hashed module class.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * signal-rings.tsx = Signal Rings
 *
 * @summary
 * The site's motif: a friendly speech bubble at the center of soft rings that
 * spread out like a calm signal, with an orange sparkle and a blue dot
 * nearby. It says "someone is listening" without a word. As it first
 * appears, the rings ripple out from the bubble one after another and the
 * sparkle pops in, once, never looping. It's decoration, hidden from screen
 * readers, and sized by whatever holds it. A small version crops the drawing
 * to its inner rings, for a spot too small for the faint outer one to show.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type SrcProTyp = { className? : string, smaBoo? : boolean }; // What: Signal-Rings-Component Props Type. Why: A page places and sizes the drawing, and a small spot needs the cropped version. How: This types the optional class and the small flag it passes.

// #region SigRinCom

/**
 * SigRinCom = Signal Rings Component
 *
 * @summary
 * Renders the motif as one SVG on a 400 by 400 drawing space, with the class
 * a page passes for its size and placement. Every shape's color, strength,
 * and entrance comes from the module. The small version shows only the middle
 * 300 by 300 and leaves out the outer ring, which that crop would cut into
 * stray arcs, so the bubble reads clearly even at about 60px.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.className - Class Name: The page's own class, which places and
 *                          sizes the drawing; none by default.
 * @param props.smaBoo    - Small Boolean: True for the cropped version without
 *                          the outer ring; false by default.
 *
 * @returns The motif's SVG element.
 *
 * @example
 * ```tsx
 * SigRinCom({className: cssModObj.herRinSvg}) // => <SigRinCom />
 * ```
 *
*/

function SigRinCom ( { className, smaBoo = false } : SrcProTyp ) : JSX.Element {


	return (


		<svg
			className={` ${ cssModObj.sigRinSvg }   ${ className ?? '' } `}

			viewBox={ smaBoo ? '50 50 300 300' : '0 0 400 400' } // What: View Box. Why: The small version needs its bubble larger in the same space. How: This crops to the middle 300 units for it, and shows the whole 400 otherwise.

			aria-hidden='true'
		>{ /* What: Signal Rings SVG Element. Why: The motif is one drawing. How: This holds the rings, the bubble, the sparkle, and the dot on a square drawing space, cropped for the small version, hidden from screen readers. */ }


			{ !smaBoo && ( // What: Full Size Check. Why: The small version's crop would cut the outer ring into stray arcs. How: This draws the outer ring only at full size.


				<circle
					className={ cssModObj.rinOutCir }

					cx='200'
					cy='200'
					r='190'
				/> // What: Ring Outer Circle Element. Why: The signal's faintest ring reaches furthest. How: This draws the outer ring.


			) }

			<circle
				className={ cssModObj.rinMidCir }

				cx='200'
				cy='200'
				r='150'
			/>{ /* What: Ring Middle Circle Element. Why: The signal grows stronger toward the bubble. How: This draws the middle ring. */ }

			<circle
				className={ cssModObj.rinInnCir }

				cx='200'
				cy='200'
				r='110'
			/>{ /* What: Ring Inner Circle Element. Why: The ring nearest the bubble is the strongest. How: This draws the inner ring. */ }

			<circle
				className={ cssModObj.corTinCir }

				cx='200'
				cy='200'
				r='72'
			/>{ /* What: Core Tint Circle Element. Why: The bubble sits on a calm pool of color. How: This draws a filled pale teal circle. */ }

			<path
				className={ cssModObj.bubOutPat }

				d='M 170 186 H 230 A 10 10 0 0 1 240 196 V 222 A 10 10 0 0 1 230 232 H 200 L 186 244 V 232 H 170 A 10 10 0 0 1 160 222 V 196 A 10 10 0 0 1 170 186 Z'
			/>{ /* What: Bubble Outline Path Element. Why: A speech bubble says a person is there to talk to. How: This draws a rounded bubble with a tail. */ }

			<circle
				className={ cssModObj.bubDotCir }

				cx='186'
				cy='209'
				r='3.5'
			/>{ /* What: Bubble Dot Circle Element. Why: Three dots read as someone typing a reply. How: This draws the first dot. */ }

			<circle
				className={ cssModObj.bubDotCir }

				cx='200'
				cy='209'
				r='3.5'
			/>{ /* What: Bubble Dot Circle Element. Why: Three dots read as someone typing a reply. How: This draws the second dot. */ }

			<circle
				className={ cssModObj.bubDotCir }

				cx='214'
				cy='209'
				r='3.5'
			/>{ /* What: Bubble Dot Circle Element. Why: Three dots read as someone typing a reply. How: This draws the third dot. */ }

			<path
				className={ cssModObj.spaOraPat }

				d='M 326 96 L 332 110 L 346 116 L 332 122 L 326 136 L 320 122 L 306 116 L 320 110 Z'
			/>{ /* What: Sparkle Orange Path Element. Why: A sparkle adds the touch of fun. How: This draws a four-pointed orange star near the outer ring. */ }

			<circle
				className={ cssModObj.dotBluCir }

				cx='88'
				cy='300'
				r='6'
			/>{ /* What: Dot Blue Circle Element. Why: A small blue dot balances the sparkle and brings in the family's blue. How: This draws it across from the sparkle. */ }


		</svg>


	);


}

// #endregion SigRinCom

// #endregion Components



// #region Exports

export { SigRinCom }; // What: Named Exports. Why: Home's hero, its eyebrow on phones, the Articles page's help card, and the 404 page show the motif. How: This exports SigRinCom.

// #endregion Exports


