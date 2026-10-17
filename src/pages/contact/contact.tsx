


// #region Imports

import cssModObj from './contact.module.css'; // What: CSS Module Object. Why: The Contact page's hero, question form, and sidebar are styled in its own module. How: This maps each class name in contact.module.css to its hashed module class.


import { HelTipCom       } from './help-tip.tsx';                         // What: Help Tip Component. Why: The email and question fields keep their longer hints behind a small question mark. How: The form renders one beside each of those labels.
import { Link            } from 'react-router';                           // What: Link. Why: The thank-you offers the articles without a full page load. How: This renders that link.
import { TOP_REC_ARR     } from '../../ui/topics.ts';                     // What: Topic Record Array. Why: The topic menu offers every help topic. How: The page renders one option per topic.
import { useEffect       } from 'react';                                  // What: Use Effect. Why: The thank-you takes focus once it appears. How: An effect moves focus to its heading after the question is sent.
import { usePagDesFun    } from 'techgeek-design/ui/page-description.ts'; // What: Use Page Description Function. Why: The page's search description differs from the home page's. How: The page calls it to swap the one description tag's text while it shows.
import { useRef          } from 'react';                                  // What: Use Ref. Why: The effect needs the thank-you's heading element. How: This holds a reference to it.
import { useSearchParams } from 'react-router';                           // What: Use Search Params. Why: A link can open the form with its topic already chosen. How: The page reads the topic parameter once.
import { useState        } from 'react';                                  // What: Use State. Why: The page remembers the form's fields and whether a question is sending, sent, or failed. How: This holds each of those.


import type { ChangeEvent } from 'react'; // What: Change Event. Why: The fields report each edit. How: This types chaFieFun's event.
import type { FormEvent   } from 'react'; // What: Form Event. Why: The form reports its submission. How: This types subForFun's event.
import type { JSX         } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * contact.tsx = Contact
 *
 * @summary
 * The Contact page, where a visitor asks their question: a calm hero, the
 * question form, its email address optional and its longer hints behind
 * small "?" help tips, and a sidebar saying what happens next, how soon a
 * reply comes, the email address, and a promise never to ask for a
 * password, payment, or remote access, since scammers do exactly that. The
 * form posts to Netlify Forms, which emails each question to
 * contact@techgeek.support, then shows a thank-you in its place, or an error
 * above the button when the send fails. A link can choose the topic ahead of
 * time (/contact?topic=mac).
 *
 * Sections:
 *  - Constants
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const EMP_FOR_OBJ = { 'bot-field' : '', email : '', name : '', question : '', topic : '' }; // What: Empty Form Object. Why: The form starts empty and empties again for another question. How: This holds a blank value for each field, keyed by the field's name attribute, which browsers read for autofill. // The bot-field key is the honeypot Netlify reads by that exact name, so it keeps Netlify's spelling.

// #endregion Constants



// #region Components

// #region ConPagCom

/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * Renders the Contact page. The form keeps its fields in state, keyed by
 * each field's name attribute, starting with the topic the address names
 * when it's a real topic. The browser checks the required fields and the
 * email format before letting it send. Sending posts the fields to Netlify
 * Forms, disabling the button and showing Sending while it waits; a reply
 * Netlify doesn't answer with ok counts as an error, like a network failure,
 * leaving the form in place with an error above the button, while a sent
 * question swaps the form for a thank-you with a button that empties the
 * form for another. It also sets the page's title and canonical address and
 * swaps the search description for its own while it shows.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's title, canonical link, and wrapper div.
 *
 * @example
 * ```tsx
 * ConPagCom() // => <ConPagCom />
 * ```
 *
*/

function ConPagCom () : JSX.Element {


	usePagDesFun( 'Ask a free tech question in plain words, about your phone, computer, Wi-Fi, or anything else, and hear back within 24 hours.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	// #region Form State

	const [ seaParObj ] = useSearchParams(); // What: Search Parameters Object. Why: A link may name the question's topic. How: This reads the address's parameters.

	const rawTopStr = seaParObj.get( 'topic' ) ?? '';                                       // What: Raw Topic String. Why: The address may name a topic, or nothing. How: This reads the topic parameter, or an empty string.
	const staTopStr = TOP_REC_ARR.some( ( topRecObj ) => topRecObj.ideStr === rawTopStr ) ? rawTopStr : ''; // What: Starting Topic String. Why: Only a real topic should be chosen ahead of time. How: This keeps the address's topic when it's on the list, or leaves the menu unchosen.

	const [ errMesStr, setErrMesStr ] = useState< string | null >( null );                           // What: Error Message String And Setter. Why: A failed send has to say so above the button. How: This starts with no error.
	const [ forDatObj, setForDatObj ] = useState( () => ( { ...EMP_FOR_OBJ, topic : staTopStr } ) ); // What: Form Data Object And Setter. Why: The fields are controlled, so their values live here. How: This starts with every field blank but the topic, which takes the address's when there is one.
	const [ hasEmaBoo, setHasEmaBoo ] = useState( true );                                            // What: Has Email Boolean And Setter. Why: The thank-you promises a reply only when there's an address to reply to. How: This records whether the sent question carried an email address.
	const [ isaLoaBoo, setIsaLoaBoo ] = useState( false );                                           // What: Is-A Loading Boolean And Setter. Why: The button shows Sending while the question is on its way. How: This starts false.
	const [ isaSenBoo, setIsaSenBoo ] = useState( false );                                           // What: Is-A Sent Boolean And Setter. Why: A sent question swaps the form for a thank-you. How: This starts false.

	const sucTitRef = useRef< HTMLHeadingElement >( null ); // What: Success Title Reference. Why: The thank-you's heading takes focus once it appears. How: This holds the heading element.



	useEffect( () => { // What: Success Focus Effect. Why: After sending, the page would stay scrolled where the button was, with the thank-you half under the bar, and a screen reader wouldn't hear that the question went out. How: This moves focus to the thank-you's heading and scrolls it into view.


		if ( !isaSenBoo ) return;



		sucTitRef.current?.focus( { preventScroll : true } ); // What: Heading Focus Call. Why: A screen reader should announce that the question went out. How: This focuses the heading without the browser's own scroll, which skips an element already partly on screen.

		sucTitRef.current?.scrollIntoView( { block : 'start' } ); // What: Heading Scroll Call. Why: The thank-you would otherwise sit half under the fixed bar. How: This scrolls the heading to the top, where its scroll margin leaves room for the bar and the check, following the page's own smooth scrolling, which reduced motion turns off.


	}, [ isaSenBoo ] ); // What: Effect Dependency Array. Why: Focus moves only when the thank-you appears. How: isaSenBoo turning true reruns the effect.



	// #region chaFieFun

	/**
	 * chaFieFun = Change Field Function
	 *
	 * @summary
	 * Writes one field's edit into the form's state. The edited field's name
	 * attribute picks the key it writes, so every field's name has to match a
	 * key of EMP_FOR_OBJ (name, email, topic, question, or bot-field). The
	 * previous fields are copied, so the other fields keep their values.
	 *
	 * @author z4nta0 <https://github.com/z4nta0>
	 *
	 * @param chaEveObj - Change Event Object: The edited field's change event.
	 *
	 * @returns This function does not return anything.
	 *
	 * @example
	 * ```ts
	 * chaFieFun(chaEveObj) // => void
	 * ```
	 *
	*/

	const chaFieFun = ( chaEveObj : ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > ) => setForDatObj( ( preForObj ) => ( { ...preForObj, [ chaEveObj.target.name ] : chaEveObj.target.value } ) ); // What: Change Field Function. Why: Every field writes its edits into the form's state. How: This copies the previous fields and replaces the one named by the edited field's name attribute.

	// #endregion chaFieFun



	const resForFun = () => { // What: Reset Form Function. Why: The thank-you's button lets a visitor ask another question. How: This hides the thank-you and empties the fields.


		setIsaSenBoo( false ); // What: Sent Flag Reset Call. Why: The form shows again in place of the thank-you. How: This clears the sent flag.

		setForDatObj( EMP_FOR_OBJ ); // What: Fields Reset Call. Why: The next question starts blank. How: This restores the empty form.


	};

	// #endregion Form State



	// #region subForFun

	/**
	 * subForFun = Submit Form Function
	 *
	 * @summary
	 * Sends the question through Netlify Forms, running only once the browser
	 * has passed the required fields and the email format. It stops the
	 * browser's own submission, marks the form as sending, and clears any
	 * earlier error, then posts the fields form-encoded to the site's root
	 * under the question form's name, which Netlify matches to the hidden copy
	 * of the form in index.html, with the topic's name, or Not sure when none
	 * was chosen, and the honeypot as it stands. Only an ok reply counts as
	 * success; a failed reply or a network failure is logged and shown as an
	 * error above the button. Sending ends either way.
	 *
	 * @author z4nta0 <https://github.com/z4nta0>
	 *
	 * @param subEveObj - Submit Event Object: The form's submit event.
	 *
	 * @returns A promise that settles once the send has succeeded or failed,
	 *          with no value.
	 *
	 * @example
	 * ```ts
	 * subForFun(subEveObj) // => Promise<void>
	 * ```
	 *
	*/

	const subForFun = async ( subEveObj : FormEvent ) => { // What: Submit Form Function. Why: The form's submission sends the question. How: This posts the fields to Netlify Forms and records the outcome.


		subEveObj.preventDefault(); // What: Default Submission Prevention Call. Why: The browser would otherwise reload the page to submit the form. How: This stops it, so the question is sent in the background.

		setIsaLoaBoo( true ); // What: Loading Flag Set Call. Why: The button shows Sending while the question is on its way. How: This sets the loading flag.

		setErrMesStr( null ); // What: Error Clear Call. Why: A new attempt shouldn't show the last one's error. How: This clears it.



		try {


			const senResObj = await fetch( '/', { // What: Send Response Object. Why: Netlify Forms takes a form-encoded POST on any path of the site, matches it to a detected form by its form-name field, and emails it on. How: This posts the fields to the site's root.


				headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }, // What: Headers. Why: Netlify only parses a form-encoded body. How: This sets the matching content type.
				method  : 'POST',                                                   // What: Method. Why: A form submission is a POST. How: This sets it.

				body : new URLSearchParams({ // What: Body. Why: Netlify reads a standard form-encoded body whose field names match the hidden form in index.html. How: This encodes the form's name, the honeypot, and the four real fields.


					'bot-field' : forDatObj[ 'bot-field' ],                                                                     // What: Bot Field. Why: Netlify drops a submission whose honeypot is filled, which a person never does. How: This posts the hidden field as it stands.
					email       : forDatObj.email,                                                                              // What: Email. Why: Netlify sets a field named email as the notification's reply-to, so a reply goes straight back to the visitor. How: This sends the address they entered.
					'form-name' : 'question',                                                                                   // What: Form Name. Why: Netlify matches the POST to its detected form by this field. How: This names the question form.
					name        : forDatObj.name,                                                                               // What: Name. Why: The email says who asked. How: This sends the name they entered.
					question    : forDatObj.question,                                                                           // What: Question. Why: The question is the point of the email. How: This sends what they wrote.
					topic       : TOP_REC_ARR.find( ( topRecObj ) => topRecObj.ideStr === forDatObj.topic )?.labStr ?? 'Not sure' // What: Topic. Why: The email shows the topic by name. How: This sends the chosen topic's name, or Not sure when none was chosen.


				}).toString() // What: Body String Call. Why: Netlify reads the fields as one form-encoded string. How: This serializes the URLSearchParams into it.


			} );


			if ( !senResObj.ok ) throw new Error( `Netlify Forms answered with status ${ senResObj.status }.` ); // What: Failed Reply Guard. Why: Netlify can take the connection yet reject the submission, which must not show the thank-you. How: This throws into the catch below.



			setHasEmaBoo( forDatObj.email.trim() !== '' ); // What: Email Presence Set Call. Why: The thank-you differs when there's no address to reply to. How: This records whether the visitor left one.

			setIsaSenBoo( true ); // What: Sent Flag Set Call. Why: The question went out. How: This swaps the form for the thank-you.


		}

		catch ( errCatObj ) {


			console.warn( errCatObj ); // What: Error Warning Call. Why: A failed send should stay visible to anyone debugging. How: This logs the error.

			setErrMesStr( "Your question didn't send. Please try again, or email it to contact@techgeek.support." ); // What: Error Message Set Call. Why: The visitor needs to know the question didn't go out and how else to ask it. How: This shows the error above the button.


		}

		finally {


			setIsaLoaBoo( false ); // What: Loading Flag Clear Call. Why: Sending is over whether it worked or not. How: This clears the loading flag.


		}


	};

	// #endregion subForFun



	return (


		<>{ /* What: Page Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>Ask a Free Tech Question | TechGeek.support</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React 19 moves this title into the document head while the page is shown. */ }

			<link
				href='https://techgeek.support/contact'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every address that reaches the page, with or without a topic, should count as one page. How: React 19 moves this link into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page fades up into view as it opens. How: This wraps every section and plays the shared entrance. */ }


				<section className={ cssModObj.conHerSec }>{ /* What: Contact Hero Section Element. Why: The page opens by inviting a visitor to ask. How: This holds the eyebrow, heading, and lead. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The hero's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<p className={ cssModObj.secEyePar }>Ask a question</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the page. How: This shows it in teal mono capitals. */ }

						<h1 className={ cssModObj.herTitHea }>Ask me anything about your tech</h1>{ /* What: Hero Title Heading Element. Why: The heading makes the invitation plainly. How: This shows the page's h1. */ }

						<p className={ cssModObj.herLeaPar }>Describe the problem in your own words. I read every question myself and reply by email within 24 hours. It's always free.</p>{ /* What: Hero Lead Paragraph Element. Why: A visitor should know who reads the question, how soon a reply comes, and what it costs. How: This says all three. */ }


					</div>


				</section>



				<section className={ cssModObj.conBodSec }>{ /* What: Contact Body Section Element. Why: The form and what to expect sit together. How: This holds the two columns. */ }


					<div className={ cssModObj.conGriDiv }>{ /* What: Contact Grid Div Element. Why: The form and the sidebar sit side by side on wide screens. How: This lays out the two columns in the site's centered column, stacking them on phones. */ }


						<div className={ cssModObj.forWraDiv }>{ /* What: Form Wrap Div Element. Why: The form and its thank-you share one white card. How: This holds whichever one shows. */ }


							{ isaSenBoo ? ( // What: Sent Or Form Check. Why: A sent question replaces the form with a thank-you. How: This renders the thank-you once sent, or the form otherwise.


								<div className={ cssModObj.sucStaDiv }>{ /* What: Success State Div Element. Why: A visitor learns the question went out and what happens next. How: This fades up into view with a check, a thank-you, and the next steps. */ }


									<svg
										className={ cssModObj.sucCheSvg }

										fill='none'
										viewBox='0 0 24 24'

										aria-hidden='true'
									>{ /* What: Success Check SVG Element. Why: A check in a circle says the question went out. How: This draws it in teal, popping in once, hidden from screen readers. */ }


										<circle
											cx='12'
											cy='12'
											r='10'
										/>{ /* What: Check Circle Element. Why: A circle frames the check. How: This draws it. */ }

										<path d='M 7.5 12.5 L 10.5 15.5 L 16.5 9' />{ /* What: Check Mark Path Element. Why: The check mark is the success sign. How: This draws it inside the circle. */ }


									</svg>


									<h2
										ref={ sucTitRef }

										className={ cssModObj.sucTitHea }

										tabIndex={ -1 } // What: Programmatic Focus Target. Why: The heading takes focus after sending without becoming a Tab stop. How: A tabIndex of -1 lets script focus it while Tab skips it.
									>Question sent!</h2>{ /* What: Success Title Heading Element. Why: The thank-you's heading says what happened. How: This shows it, taking focus as the thank-you appears. */ }

									<p className={ cssModObj.sucTexPar }>{ hasEmaBoo ? "Thank you. I'll reply by email within 24 hours. If you don't see my reply, please check your spam or junk folder." : "Thank you. Since you didn't leave an email address, I can't reply directly. If your question becomes an article, you'll find it on the Articles page, so check back in a few days." }</p>{ /* What: Success Text Paragraph Element. Why: A visitor should know what happens next, which depends on whether they left an address. How: This promises a reply within a day and mentions the spam folder, or, with no address, points them to the Articles page. */ }

									<div className={ cssModObj.sucActDiv }>{ /* What: Success Actions Div Element. Why: The two ways onward sit side by side. How: This sets them in a row that wraps. */ }


										<button
											className={ cssModObj.butSecBut }

											type='button'

											onClick={ resForFun }
										>Ask Another Question</button>{ /* What: Button Secondary Button Element. Why: A visitor may have more than one question. How: This empties the form and shows it again. */ }



										<Link
											className={ cssModObj.butPriAnc }

											to='/articles'
										>Browse Articles</Link>{ /* What: Browse Articles Link. Why: A visitor waiting for a reply may find their answer sooner. How: This routes to the Articles page as an orange button. */ }


									</div>


								</div>


							) : ( // What: Form Branch. Why: Until a question is sent, the form shows. How: This renders the form.


								<form
									className={ cssModObj.queForFor }

									onSubmit={ subForFun }
								>{ /* What: Question Form Form Element. Why: A visitor writes their question here. How: The browser first checks the required fields and the email format, then this sends the fields through subForFun. */ }


									<p
										className={ cssModObj.forHonPar }

										aria-hidden='true'
									>{ /* What: Form Honeypot Paragraph Element. Why: A person never sees or fills this field, so a bot that does gives itself away, and Netlify drops its submission. How: This holds a label and input moved off screen and hidden from screen readers. */ }


										<label>{ /* What: Honeypot Label Element. Why: A hidden field still needs a label. How: This wraps the honeypot input in its label text. */ }


											Leave this field blank:

											<input
												name='bot-field'

												autoComplete='off'
												value={ forDatObj[ 'bot-field' ] }

												tabIndex={ -1 }

												onChange={ chaFieFun }
											/>{ /* What: Bot Field Input Element. Why: A filled honeypot marks a bot. How: This writes into the form's bot-field through the shared change handler and posts with the other fields. */ }


										</label>


									</p>



									<div className={ cssModObj.forRowDiv }>{ /* What: Form Row Div Element. Why: The name and email fields share a row on wide screens. How: This sets them side by side. */ }


										<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The name's label and input read as one field. How: This stacks them. */ }


											<label
												className={ cssModObj.fieLabLab }

												htmlFor='forNamInp'
											>Your first name</label>{ /* What: Field Label Label Element. Why: The input needs a visible name, and a first name is all a reply needs. How: This labels it. */ }

											<input
												id='forNamInp'

												className={ cssModObj.forConInp }

												name='name'

												autoComplete='given-name'
												required
												type='text'
												value={ forDatObj.name }

												onChange={ chaFieFun }
											/>{ /* What: Form Control Input Element. Why: A reply should greet the visitor by name. How: This holds the name in the form's state, offering the browser's saved first name. */ }


										</div>


										<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The email's label, help tip, and input read as one field. How: This stacks them. */ }


											<div className={ cssModObj.fieHeaDiv }>{ /* What: Field Header Div Element. Why: The email's label and its help tip sit together, and the tip's bubble opens just under them. How: This lets the tip follow the label inline and positions the bubble against the row. */ }


												<label
													className={ cssModObj.fieLabLab }

													htmlFor='forEmaInp'
												>Your email address <span className={ cssModObj.fieOptSpa }>(optional)</span></label>{ /* What: Field Label Label Element. Why: The input needs a visible name, and saying it's optional lets a wary visitor ask without one. How: This labels it and marks it optional. */ }



												<HelTipCom
													bubIdeStr='forEmaHin'
													butLabStr='More about your email address'
													tipTexStr="Only used to reply to you, never for anything else. Without it I can't reply or ask you follow-up questions, so you'd need to check back for an article."
												/>{ /* What: Help Tip Component. Why: A visitor deciding whether to leave an address can learn how it's used and what skipping it means, without the hint crowding the form. How: This offers the hint behind a question mark, its bubble describing the email input for screen readers. */ }


											</div>

											<input
												id='forEmaInp'

												className={ cssModObj.forConInp }

												name='email'

												autoComplete='email'
												type='email'
												value={ forDatObj.email }

												aria-describedby='forEmaHin'

												onChange={ chaFieFun }
											/>{ /* What: Form Control Input Element. Why: A reply needs somewhere to go, when the visitor wants one. How: This holds the optional address in the form's state, offering the browser's saved address, described by its help tip's bubble. */ }


										</div>


									</div>



									<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The topic's label and menu read as one field. How: This stacks them. */ }


										<label
											className={ cssModObj.fieLabLab }

											htmlFor='forTopSel'
										>What is it about? <span className={ cssModObj.fieOptSpa }>(optional)</span></label>{ /* What: Field Label Label Element. Why: The menu needs a visible name, and saying it's optional keeps an unsure visitor from stalling. How: This labels it and marks it optional. */ }

										<select
											id='forTopSel'

											className={ cssModObj.forConSel }

											name='topic'

											value={ forDatObj.topic }

											onChange={ chaFieFun }
										>{ /* What: Form Control Select Element. Why: Knowing the topic helps the reply start in the right place. How: This offers every topic, holding the choice in the form's state. */ }


											<option value=''>I'm not sure</option>{ /* What: Not Sure Option Element. Why: Many visitors won't know which topic fits, and that's fine. How: This is the menu's starting choice, with an empty value. */ }

											{ TOP_REC_ARR.map( ( topRecObj ) => ( // What: Topic Option Map Call. Why: Every topic is a choice. How: This renders one option per topic.


												<option
													key={ topRecObj.ideStr }

													value={ topRecObj.ideStr }
												>{ topRecObj.labStr }</option> // What: Topic Option Element. Why: The visitor picks a topic by its name. How: This shows the topic's name, valued by its identifier.


											))}


										</select>


									</div>


									<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The question's label, help tip, and box read as one field. How: This stacks them. */ }


										<div className={ cssModObj.fieHeaDiv }>{ /* What: Field Header Div Element. Why: The question's label and its help tip sit together, and the tip's bubble opens just under them. How: This lets the tip follow the label inline and positions the bubble against the row. */ }


											<label
												className={ cssModObj.fieLabLab }

												htmlFor='forQueTex'
											>Your question</label>{ /* What: Field Label Label Element. Why: The box needs a visible name. How: This labels it. */ }



											<HelTipCom
												bubIdeStr='forQueHin'
												butLabStr='More about your question'
												tipTexStr='Tell me what you were trying to do and what happened, like any message on the screen. Please never include a password.'
											/>{ /* What: Help Tip Component. Why: A few details make a good answer possible, and nobody should share a password, here or anywhere, without the hint crowding the form. How: This offers the hint behind a question mark, its bubble describing the box for screen readers. */ }


										</div>

										<textarea
											id='forQueTex'

											className={ cssModObj.forConTex }

											name='question'

											placeholder='Please never include a password.'
											required
											rows={ 7 }
											value={ forDatObj.question }

											aria-describedby='forQueHin'

											onChange={ chaFieFun }
										/>{ /* What: Form Control Textarea Element. Why: The visitor writes their question here. How: This holds it in the form's state, seven rows tall, described by its help tip's bubble, its placeholder keeping the password warning in view until the visitor starts typing, a placeholder rather than text so it's never sent. */ }


									</div>


									{ errMesStr && ( // What: Error Presence Check. Why: An error shows only after a failed send. How: This renders the message when there is one.


										<p
											className={ cssModObj.errMesPar }

											role='alert'
										>{ errMesStr }</p> // What: Error Message Paragraph Element. Why: A visitor learns the question didn't go out, and a screen reader announces it. How: This fades the error into view above the button as an alert.


									) }

									<button
										className={ cssModObj.senQueBut }

										disabled={ isaLoaBoo }
										type='submit'
									>{ isaLoaBoo ? 'Sending…' : 'Send My Question' }</button>{ /* What: Send Question Button Element. Why: The visitor sends the question. How: This submits the form, disabled and reading Sending while it's on its way. */ }


								</form>


							) }


						</div>



						<aside className={ cssModObj.conSidAsi }>{ /* What: Contact Sidebar Aside Element. Why: A visitor should know what happens after they ask. How: This stacks the expectation, reply, email, and safety cards. */ }


							<div className={ cssModObj.sidCarDiv }>{ /* What: Sidebar Card Div Element. Why: The reply's timing is the first thing a visitor wonders about. How: This shows the 24-hour promise. */ }


								<h2 className={ cssModObj.sidTitHea }>When you'll hear back</h2>{ /* What: Sidebar Title Heading Element. Why: The card is named. How: This shows its title. */ }

								<p className={ cssModObj.sidTexPar }>Within <strong className={ cssModObj.sidStrStr }>24 hours</strong>, by email. Most questions get a step-by-step answer you can follow at your own pace.</p>{ /* What: Sidebar Text Paragraph Element. Why: A visitor learns how soon and in what form the answer comes. How: This states the promise, its time in bold. */ }


							</div>


							<div className={ cssModObj.sidCarDiv }>{ /* What: Sidebar Card Div Element. Why: Some people would rather write an email. How: This shows the address. */ }


								<h2 className={ cssModObj.sidTitHea }>Prefer email?</h2>{ /* What: Sidebar Title Heading Element. Why: The card is named. How: This shows its title. */ }

								<p className={ cssModObj.sidTexPar }>Write to <a className={ cssModObj.sidLinAnc } href='mailto:contact@techgeek.support'>contact@techgeek.support</a> and I'll reply just the same.</p>{ /* What: Sidebar Text Paragraph Element. Why: The address works as well as the form. How: This links it, opening the visitor's mail app. */ }


							</div>


							<div className={ cssModObj.safCarDiv }>{ /* What: Safety Card Div Element. Why: Scammers pose as tech support, so a visitor should know what real help never asks for. How: This draws a pale teal card with the promise. */ }


								<h2 className={ cssModObj.sidTitHea }>I'll never ask for</h2>{ /* What: Sidebar Title Heading Element. Why: The card is named by its promise. How: This shows its title. */ }


								<ul className={ cssModObj.safLisUno }>{ /* What: Safety List Unordered Element. Why: Each thing real help never asks for is its own point. How: This lists them. */ }


									<li className={ cssModObj.safIteIte }>Your passwords or passcodes</li>{ /* What: Safety Item Item Element. Why: Nobody needs your password to help you. How: This names passwords as the first thing real help never asks for. */ }

									<li className={ cssModObj.safIteIte }>Money, gift cards, or payment details</li>{ /* What: Safety Item Item Element. Why: The help is free, so any request for money is a scam. How: This names payment as the second. */ }

									<li className={ cssModObj.safIteIte }>Remote access to your computer or phone</li>{ /* What: Safety Item Item Element. Why: Scammers ask to take control of a device. How: This names remote access as the third. */ }


								</ul>


								<p className={ cssModObj.safTexPar }>If anyone claiming to be TechGeek.support asks for these, it isn't me.</p>{ /* What: Safety Text Paragraph Element. Why: A visitor should know what to make of an impostor. How: This says plainly that such a request isn't real. */ }


							</div>


						</aside>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion ConPagCom

// #endregion Components



// #region Exports

export { ConPagCom }; // What: Named Export. Why: The router's Contact route renders this page. How: This exports ConPagCom.

// #endregion Exports


