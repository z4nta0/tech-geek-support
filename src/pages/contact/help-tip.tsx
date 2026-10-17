



// #region Imports

import cssModObj from './help-tip.module.css'; // What: CSS Module Object. Why: The tip's button and bubble are styled in their own module. How: This maps each class name in help-tip.module.css to its hashed module class.


import { useEffect } from 'react'; // What: Use Effect. Why: An open tip listens for Escape and for presses elsewhere. How: An effect adds those listeners while it's open.
import { useRef    } from 'react'; // What: Use Ref. Why: A press elsewhere is told apart from a press on the tip. How: This holds the tip's wrapper element.
import { useState  } from 'react'; // What: Use State. Why: The tip remembers whether a hover or a press opened it. How: This holds each of those.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * help-tip.tsx = Help Tip
 *
 * @summary
 * A small round "?" button that follows a form field's label and opens a
 * bubble of extra help, so the Contact form's longer hints stay out of the
 * way until a visitor wants them. A mouse opens it by hovering, and a click
 * or tap opens it until it's pressed again, Escape is pressed, or a press
 * lands anywhere else. The bubble's text stays tied to its field for screen
 * readers, open or closed, and spans the width of whatever positioned
 * element holds the tip (the field's header row), so it never runs off a
 * phone's edge.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type HtcProTyp = { bubIdeStr : string, butLabStr : string, tipTexStr : string }; // What: Help-Tip-Component Props Type. Why: Each tip names its bubble, its button, and its help. How: This types the bubble's id, the button's accessible name, and the help text.

// #region HelTipCom

/**
 * HelTipCom = Help Tip Component
 *
 * @summary
 * Renders the "?" button and its bubble in one wrapper. Hovering the
 * wrapper with a mouse opens the bubble and leaving it closes it, while a
 * click or tap pins it open, and pressing again closes it outright, even
 * under a resting mouse. While it's open, Escape or a press outside the
 * wrapper closes it. The bubble is always in the page, hidden while closed,
 * so a field can name it with aria-describedby and a screen reader reads the
 * help with the field. The button names the bubble too, and reports whether
 * it's open. The bubble is positioned against the nearest positioned
 * ancestor, which the caller sets on the field's header row.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.bubIdeStr - Bubble Identifier String: The bubble's id, which
 *                          the field's aria-describedby names.
 * @param props.butLabStr - Button Label String: The button's accessible
 *                          name, such as More about your email address.
 * @param props.tipTexStr - Tip Text String: The help the bubble shows.
 *
 * @returns The tip's wrapper span, holding its button and bubble.
 *
 * @example
 * ```tsx
 * HelTipCom({bubIdeStr: 'forEmaHin', butLabStr: 'More about your email address', tipTexStr: 'Only used to reply to you...'}) // => <HelTipCom />
 * ```
 *
*/

function HelTipCom ( { bubIdeStr, butLabStr, tipTexStr } : HtcProTyp ) : JSX.Element {


	const [ hovOpeBoo, setHovOpeBoo ] = useState( false ); // What: Hover Open Boolean And Setter. Why: A mouse resting on the tip opens it. How: This is true while a mouse is over the tip.
	const [ pinOpeBoo, setPinOpeBoo ] = useState( false ); // What: Pin Open Boolean And Setter. Why: A click or tap keeps the tip open after the pointer leaves. How: This is true from one press until the tip is closed.

	const isaOpeBoo = hovOpeBoo || pinOpeBoo;           // What: Is-An Open Boolean. Why: Either a hover or a press opens the tip. How: This is true when either one holds.
	const tipWraRef = useRef< HTMLSpanElement >( null ); // What: Tip Wrapper Reference. Why: A press outside the tip closes it. How: This holds the wrapper, whose contents count as inside.



	const togPinFun = () => { // What: Toggle Pin Function. Why: A press keeps the tip open, and another closes it, even under a resting mouse. How: This pins a closed or hover-opened tip, or closes a pinned one outright, clearing the hover too.


		if ( pinOpeBoo ) {


			setHovOpeBoo( false ); // What: Hover Clear Call. Why: A resting mouse would otherwise hold the tip open. How: This clears the hover.
			setPinOpeBoo( false ); // What: Pin Clear Call. Why: A second press closes the tip. How: This clears the pin.


		}

		else setPinOpeBoo( true ); // What: Pin Set Call. Why: A press keeps the tip open. How: This pins it.


	};



	useEffect( () => { // What: Dismiss Listener Effect. Why: An open tip has to close on Escape or on a press anywhere else. How: While the tip is open, this listens on the document and closes it either way, removing its listeners once it closes.


		if ( !isaOpeBoo ) return; // What: Closed Tip Guard. Why: A closed tip has nothing to dismiss. How: This leaves without adding listeners.



		const cloTipFun = () => { // What: Close Tip Function. Why: Escape and a press elsewhere close the tip the same way. How: This clears both the hover and the pin.


			setHovOpeBoo( false ); // What: Hover Clear Call. Why: The tip closes even under a resting mouse. How: This clears the hover.
			setPinOpeBoo( false ); // What: Pin Clear Call. Why: The tip closes even after a press opened it. How: This clears the pin.


		};


		const keyDowFun = ( keyEveObj : KeyboardEvent ) => { if ( keyEveObj.key === 'Escape' ) cloTipFun(); };                         // What: Key Down Function. Why: Escape dismisses the tip without moving the pointer. How: This closes it when the key is Escape.
		const poiDowFun = ( poiEveObj : PointerEvent ) => { if ( !tipWraRef.current?.contains( poiEveObj.target as Node ) ) cloTipFun(); }; // What: Pointer Down Function. Why: A press anywhere else dismisses the tip. How: This closes it when the press lands outside the wrapper. // What: Type Assertion Note. Why: A pointer event's target is typed as a general event target. How: A press always lands on a node in the page, so it's read as a Node.


		document.addEventListener( 'keydown', keyDowFun );     // What: Key Down Listener Call. Why: Escape works wherever focus is. How: This listens on the document.
		document.addEventListener( 'pointerdown', poiDowFun ); // What: Pointer Down Listener Call. Why: A press anywhere can close the tip. How: This listens on the document.



		return () => { // What: Listener Cleanup Function. Why: A closed tip shouldn't keep listening. How: This removes both listeners when the tip closes or leaves the page.


			document.removeEventListener( 'keydown', keyDowFun );     // What: Key Down Removal Call. Why: The Escape listener ends with the open tip. How: This removes it.
			document.removeEventListener( 'pointerdown', poiDowFun ); // What: Pointer Down Removal Call. Why: The press listener ends with the open tip. How: This removes it.


		};


	}, [ isaOpeBoo ] ); // What: Effect Dependency Array. Why: The listeners belong to an open tip only. How: isaOpeBoo changing adds them as the tip opens and removes them as it closes.



	return (


		<span
			ref={ tipWraRef }

			className={ cssModObj.helTipSpa }

			onPointerEnter={ ( poiEveObj ) => { if ( poiEveObj.pointerType === 'mouse' ) setHovOpeBoo( true ); } } // What: Mouse Enter Handler. Why: Only a mouse hovers, while a touch reaches the button's click. How: This opens the tip when a mouse enters the wrapper.
			onPointerLeave={ () => setHovOpeBoo( false ) }
		>{ /* What: Help Tip Span Element. Why: The button and its bubble share one hover area, so a mouse can move onto the bubble without closing it. How: This holds both, opening the tip while a mouse is over either. */ }


			<button
				className={ cssModObj.helTipBut }

				type='button'

				aria-controls={ bubIdeStr }
				aria-describedby={ bubIdeStr }
				aria-expanded={ isaOpeBoo }
				aria-label={ butLabStr }

				onClick={ togPinFun }
			>?</button>{ /* What: Help Tip Button Element. Why: A small question mark offers more help without crowding the form. How: This toggles the bubble, reads its help when focused, and says whether it's open. */ }

			<span
				id={ bubIdeStr }

				className={ cssModObj.helBubSpa }

				data-tip-bubble-open={ isaOpeBoo || undefined }
			>{ tipTexStr }</span>{ /* What: Help Bubble Span Element. Why: The help appears just under its field's label. How: This shows the text in a white card that fades in while the tip is open, always in the page so its field can name it. */ }


		</span>


	);


}

// #endregion HelTipCom

// #endregion Components



// #region Exports

export { HelTipCom }; // What: Named Exports. Why: The Contact form's email and question fields offer extra help. How: This exports HelTipCom.

// #endregion Exports


