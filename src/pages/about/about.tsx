


// #region Imports

import cssModObj from './about.module.css';   // What: CSS Module Object. Why: The About page's hero, promises, story, and closing panel are styled in its own module. How: This maps each class name in about.module.css to its hashed module class.
import selPorUrl from './self-portrait.webp'; // What: Self Portrait URL. Why: The hero shows z4nta0's portrait, so a visitor sees who answers. How: Vite resolves this to the image's fingerprinted URL.


import { Link         } from 'react-router';                           // What: Link. Why: The closing panel moves to the question form without a full page load. How: This renders it as a router link.
import { usePagDesFun } from 'techgeek-design/ui/page-description.ts'; // What: Use Page Description Function. Why: The page's search description differs from the home page's. How: The page calls it to swap the one description tag's text while it shows.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * about.tsx = About
 *
 * @summary
 * The About page: who answers the questions, beside z4nta0's portrait, the
 * three promises behind every answer, the short story of a life with
 * computers, a note on privacy, and an invitation to ask. Its job is trust:
 * a nervous visitor should finish it knowing a real, patient person is on
 * the other end.
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

const PRO_REC_ARR = [ // What: Promise Record Array. Why: The page lists the same three promises every visit. How: Each row holds a promise's title and description.


	{ titStr : 'Plain words',         desStr : "No jargon and no assumptions. If a term can't be avoided, I explain it the first time it comes up." }, // What: Plain Words Row. Why: Jargon is what makes tech feel hard. How: This promises plain explanations.
	{ titStr : 'Patience, always',    desStr : 'There are no silly questions here. Everyone starts somewhere, and asking is the smart move.' }, // What: Patience Row. Why: Many people are embarrassed to ask. How: This promises no judgment.
	{ titStr : 'Honest about limits', desStr : "If something needs a repair shop or the company that made it, I'll tell you so, and who to ask." } // What: Honest Limits Row. Why: Trust comes from saying what can't be fixed here. How: This promises an honest referral.


];



const STO_REC_ARR = [ // What: Story Record Array. Why: The story runs through the same milestones every visit, newest last. How: Each row holds a milestone's year and description.


	{ yeaStr : '2004', desStr : 'I bought my first computer and started figuring out how everything worked.' }, // What: First Computer Row. Why: The story starts with the first computer. How: This dates it.
	{ yeaStr : '2007', desStr : 'I started opening computers up, swapping parts, and upgrading them myself.' }, // What: Tinkering Row. Why: Taking computers apart is how hardware becomes familiar. How: This dates it.
	{ yeaStr : '2013', desStr : 'I wrote my first websites and learned how the web works from the inside.' }, // What: First Websites Row. Why: Building websites is the other half of the experience. How: This dates it.
	{ yeaStr : '2014', desStr : 'I built my first computer from scratch, part by part.' }, // What: Custom Computer Row. Why: Building a whole computer shows the depth of the hardware experience. How: This dates it.
	{ yeaStr : '2015', desStr : 'I built my first website for a client, and have been building them for people since.' } // What: Client Website Row. Why: Building for others is where helping people with tech became the work. How: This dates it.


];

// #endregion Constants



// #region Components

// #region AboPagCom

/**
 * AboPagCom = About Page Component
 *
 * @summary
 * Renders the About page with its own title, description, and canonical
 * address. The portrait carries its intrinsic size, so the hero doesn't
 * shift while it loads, and its alt text names who it shows.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's title, canonical link, and wrapper div.
 *
 * @example
 * ```tsx
 * AboPagCom() // => <AboPagCom />
 * ```
 *
*/

function AboPagCom () : JSX.Element {


	usePagDesFun( 'Meet z4nta0, who has worked with computers since 2004 and answers every TechGeek.support question personally, for free.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	return (


		<>{ /* What: Page Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>About the Person Behind TechGeek.support</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React 19 moves this title into the document head while the page is shown. */ }

			<link
				href='https://techgeek.support/about'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every address Netlify serves the page at should count as one page. How: React 19 moves this link into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page fades up into view as it opens. How: This wraps every section and plays the shared entrance. */ }


				<section className={ cssModObj.aboHerSec }>{ /* What: About Hero Section Element. Why: The page opens on who answers the questions. How: This holds the introduction beside the portrait. */ }


					<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The text and the portrait sit side by side on wide screens and stack on phones. How: This lays them out in the site's centered column. */ }


						<div className={ cssModObj.herTexDiv }>{ /* What: Hero Text Div Element. Why: The introduction reads as one column. How: This stacks the eyebrow, heading, and paragraphs. */ }


							<p className={ cssModObj.secEyePar }>About</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the page. How: This shows it in teal mono capitals. */ }

							<h1 className={ cssModObj.herTitHea }>Hi, I'm z4nta0</h1>{ /* What: Hero Title Heading Element. Why: The page introduces a person, so it says hello. How: This shows the page's h1. */ }

							<p className={ cssModObj.herLeaPar }>I'm the person who reads and answers every question sent to TechGeek.support. I've been working with computers since 2004 and building websites since 2013.</p>{ /* What: Hero Lead Paragraph Element. Why: A visitor should know a real person answers, and that they know what they're doing. How: This says who answers and for how long they've done this. */ }

							<p className={ cssModObj.herTexPar }>Technology should make life easier, but it often does the opposite, and help can be hard to find, full of jargon, or trying to sell you something. This site is the help I'd want for my own family: patient, plain-spoken, and free.</p>{ /* What: Hero Text Paragraph Element. Why: A visitor should understand why the help is free. How: This explains what the site is for. */ }


						</div>



						<div className={ cssModObj.porFraDiv }>{ /* What: Portrait Frame Div Element. Why: The portrait sits in a soft frame with the site's rings behind it. How: This holds the photo and draws the rings around it. */ }


							<img
								className={ cssModObj.porPhoIma }

								height='850' // What: Intrinsic Height. Why: The browser reserves the portrait's shape before it loads, so nothing moves. How: This is the encoded portrait's height in pixels.
								src={ selPorUrl }
								width='642' // What: Intrinsic Width. Why: The browser reserves the portrait's shape before it loads, so nothing moves. How: This is the encoded portrait's width in pixels.

								alt='z4nta0, who answers the questions on TechGeek.support'
							/>{ /* What: Portrait Photo Image Element. Why: A face makes the help personal. How: This shows z4nta0's portrait. */ }


						</div>


					</div>


				</section>



				<section className={ cssModObj.aboProSec }>{ /* What: About Promises Section Element. Why: A visitor should know what every answer promises. How: This holds the heading and three promise cards on a white band. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The section's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<p className={ cssModObj.secEyePar }>How I help</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the section. How: This shows it in teal mono capitals. */ }

						<h2 className={ cssModObj.secTitHea }>Three promises in every answer</h2>{ /* What: Section Title Heading Element. Why: The heading says what the cards are. How: This shows the section's h2. */ }


						<ul className={ cssModObj.proGriUno }>{ /* What: Promise Grid Unordered Element. Why: The promises sit side by side as equal cards. How: This lays them out three across, stacking on phones. */ }


							{ PRO_REC_ARR.map( ( proRecObj ) => ( // What: Promise Map Call. Why: Every promise gets a card. How: This renders one list item per promise.


								<li
									key={ proRecObj.titStr }

									className={ cssModObj.proIteIte }
								>{ /* What: Promise Item Item Element. Why: Each promise is a small card. How: This holds its title and description. */ }


									<h3 className={ cssModObj.proTitHea }>{ proRecObj.titStr }</h3>{ /* What: Promise Title Heading Element. Why: Each promise has a short name. How: This shows it as an h3. */ }

									<p className={ cssModObj.proDesPar }>{ proRecObj.desStr }</p>{ /* What: Promise Description Paragraph Element. Why: A sentence explains each promise. How: This shows it. */ }


								</li>


							))}


						</ul>


					</div>


				</section>



				<section className={ cssModObj.aboStoSec }>{ /* What: About Story Section Element. Why: A visitor can see how the experience was earned. How: This holds the heading and the milestones. */ }


					<div className={ cssModObj.stoInnDiv }>{ /* What: Story Inner Div Element. Why: The story reads best in a narrow column. How: This caps it near a reading width and centers it. */ }


						<p className={ cssModObj.secEyePar }>My tech story</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the section. How: This shows it in teal mono capitals. */ }

						<h2 className={ cssModObj.secTitHea }>Twenty years of figuring things out</h2>{ /* What: Section Title Heading Element. Why: The heading sums up the experience. How: This shows the section's h2. */ }


						<ol className={ cssModObj.stoLisOrd }>{ /* What: Story List Ordered Element. Why: The milestones happened in order. How: This stacks them along a teal line. */ }


							{ STO_REC_ARR.map( ( stoRecObj ) => ( // What: Story Map Call. Why: Every milestone gets a row. How: This renders one list item per milestone.


								<li
									key={ stoRecObj.yeaStr }

									className={ cssModObj.stoIteIte }
								>{ /* What: Story Item Item Element. Why: Each milestone is a point on the line. How: This holds its year and description. */ }


									<span className={ cssModObj.stoYeaSpa }>{ stoRecObj.yeaStr }</span>{ /* What: Story Year Span Element. Why: Each milestone is dated. How: This shows the year in dark teal mono. */ }

									<p className={ cssModObj.stoDesPar }>{ stoRecObj.desStr }</p>{ /* What: Story Description Paragraph Element. Why: A sentence says what happened. How: This shows it. */ }


								</li>


							))}


						</ol>


					</div>


				</section>



				<section className={ cssModObj.aboClaSec }>{ /* What: About Closing Section Element. Why: The page ends with a note on privacy and an invitation to ask. How: This holds the closing panel. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The panel sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<div className={ cssModObj.cloPanDiv }>{ /* What: Closing Panel Div Element. Why: Privacy and the invitation read together as one calm panel. How: This draws a pale teal panel holding the heading, the note, and the button. */ }


							<h2 className={ cssModObj.cloTitHea }>Your question stays yours</h2>{ /* What: Closing Title Heading Element. Why: A visitor may worry about who sees their question. How: This shows the panel's heading. */ }

							<p className={ cssModObj.cloTexPar }>Your email address has one job: letting me reply to you. It's never sold, shared, added to a mailing list, or used for anything else. When a question is common enough to become an article, it's rewritten from scratch, so nothing in it points back to you.</p>{ /* What: Closing Text Paragraph Element. Why: A visitor should know how their question and address are used. How: This states the privacy promise: the address is used only to reply, and an article never points back to whoever asked. */ }



							<Link
								className={ cssModObj.butPriAnc }

								to='/contact'
							>Ask a Question</Link>{ /* What: Ask Question Link. Why: The page ends where help begins. How: This routes to the question form as an orange button. */ }


						</div>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion AboPagCom

// #endregion Components



// #region Exports

export { AboPagCom }; // What: Named Exports. Why: The router's about route renders the page. How: This exports AboPagCom.

// #endregion Exports


