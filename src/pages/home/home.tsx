


// #region Imports

import cssModObj from './home.module.css'; // What: CSS Module Object. Why: Home's hero, topic tiles, and steps are styled in its own module. How: This maps each class name in home.module.css to its hashed module class.


import { ART_REC_ARR } from '../../ui/articles.ts';       // What: Article Record Array. Why: Home features the newest articles. How: The page shows the first four, which the catalog lists newest first.
import { HerFloCom   } from '../../ui/hero-flourish.tsx'; // What: Hero Flourish Component. Why: The stacked hero fills the room beside its rings. How: The hero sets a drawing on each side of them.
import { Link        } from 'react-router';               // What: Link. Why: The hero's buttons and the topic tiles move to other pages without a full page load. How: This renders those links.
import { SigRinCom   } from '../../ui/signal-rings.tsx';  // What: Signal Rings Component. Why: The hero carries the site's motif. How: The hero sets it beside the pitch.
import { TOP_REC_ARR } from '../../ui/topics.ts';         // What: Topic Record Array. Why: The topic tiles list every help topic. How: The page renders one tile per row.
import { TopTagCom   } from '../../ui/topic-tag.tsx';     // What: Topic Tag Component. Why: Each featured article shows its topic. How: The page renders one tag per card.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * home.tsx = Home
 *
 * @summary
 * The home page: a calm hero with the site's pitch beside the signal rings on
 * wide screens, the rings stacked above it at 768px and below with a small
 * drawing on each side down to 441px, the help topics as tiles that open the
 * Articles page filtered to each one, plus a last tile for anything else, the
 * four newest articles, and the three steps from asking a question to being
 * sorted. Every way onward leads to asking a question or reading an article.
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

const STE_REC_ARR = [ // What: Step Record Array. Why: How It Works walks through the same three steps every visit. How: Each row holds a step's title and description.


	{ desStr : "Tell me what's going on, the way you'd tell a friend. No tech terms needed.", titStr : 'Ask in plain words' },       // What: Ask Step Row. Why: Asking starts everything, and plain words are welcome. How: This invites a visitor to describe the problem their own way.
	{ desStr : 'A real person reads every question and answers by email, one step at a time.', titStr : 'I reply within 24 hours' }, // What: Reply Step Row. Why: A visitor should know who answers and how soon. How: This promises an email reply within a day.
	{ desStr : 'Still stuck? Just reply. The most common answers become articles that help everyone.', titStr : "You're sorted" }    // What: Sorted Step Row. Why: A visitor should know the help doesn't stop at one reply. How: This invites a reply and explains where articles come from.


];

// #endregion Constants



// #region Components

// #region HomPagCom

/**
 * HomPagCom = Home Page Component
 *
 * @summary
 * Renders the home page and its canonical link. The page's title and
 * description are index.html's own, so crawlers that never run the script read
 * them too. Each topic tile links to the Articles page with its topic in the
 * address (/articles?topic=windows), which the Articles page reads as its
 * filter, and the last tile leads to the question form for anything the topics
 * don't cover. The signal rings and their flourishes are decoration, hidden
 * from screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's canonical link and its wrapper div.
 *
 * @example
 * ```tsx
 * HomPagCom() // => <HomPagCom />
 * ```
 *
*/

function HomPagCom () : JSX.Element {


	return (


		<>{ /* What: Home Fragment. Why: The page's canonical link and its content render side by side. How: This groups them without adding an element. */ }


			<link
				href='https://techgeek.support/'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Search engines should treat every address that reaches Home as one page. How: React 19 moves this link into the head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page fades up into view as it opens. How: This wraps every section and plays the shared entrance. */ }


				<section className={ cssModObj.homHerSec }>{ /* What: Home Hero Section Element. Why: The page opens on the site's pitch and its calm motif. How: This holds the text and the signal rings. */ }


					<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The text and the rings sit side by side on wide screens and stack on phones. How: This lays them out in a centered, capped grid. */ }


						<div className={ cssModObj.herTexDiv }>{ /* What: Hero Text Div Element. Why: The pitch reads as one column. How: This stacks the eyebrow, heading, lead, buttons, and note. */ }


							<p className={ cssModObj.herEyePar }>{ /* What: Hero Eyebrow Paragraph Element. Why: A small label greets the visitor before the heading does, a playful nod to Spider-Man's friendly neighborhood tagline. How: This shows a teal dot and the label in mono capitals. */ }
								<span
									className={ cssModObj.herDotSpa }

									aria-hidden='true'
								/>{ /* What: Hero Dot Span Element. Why: A small teal dot leads the label. How: This draws the dot, hidden from screen readers. */ }
								Your friendly neighborhood Tech Geek
							</p>

							<h1 className={ cssModObj.herTitHea }>Tech trouble? Let's sort it out <span className={ cssModObj.herAccSpa }>together</span>.</h1>{ /* What: Hero Title Heading Element. Why: The heading names the worry and promises help with it. How: This shows the page's h1, its last word in teal. */ }

							<p className={ cssModObj.herLeaPar }>{ /* What: Hero Lead Paragraph Element. Why: A short paragraph says what help is on offer and how fast. How: This sums up the topics and the 24-hour promise. */ }
								Help with phones, computers, Wi-Fi, and everything in between. Ask in plain words, and I'll answer you by email within 24 hours.
							</p>

							<div className={ cssModObj.herActDiv }>{ /* What: Hero Actions Div Element. Why: The two ways onward sit side by side. How: This sets the buttons in a row that wraps. */ }


								<Link
									className={ cssModObj.butPriAnc }

									to='/contact'
								>Ask a Question</Link>{ /* What: Ask Question Link. Why: Asking a question is the site's main action. How: This routes to the Contact page's question form as an orange button. */ }



								<Link
									className={ cssModObj.butSecAnc }

									to='/articles'
								>Browse Articles</Link>{ /* What: Browse Articles Link. Why: A visitor may prefer to look for an answer first. How: This routes to the Articles page as an outlined button. */ }


							</div>

							<p className={ cssModObj.herNotPar }>No question is too basic. Really.</p>{ /* What: Hero Note Paragraph Element. Why: Many visitors worry their question is too simple to ask. How: This reassures them in the warm italic accent face. */ }


						</div>



						<div className={ cssModObj.herVisDiv }>{ /* What: Hero Visual Div Element. Why: The rings and their flourishes form the hero's picture. How: This holds the rings, beside the text on wide screens and above it at 768px and below, where a small drawing fills the room on each side of them. */ }


							<SigRinCom className={ cssModObj.herRinSvg } />{ /* What: Signal Rings Component. Why: The hero's picture is the site's calm motif. How: This draws the rings, sized by the hero's grid on wide screens and a step smaller in the stacked hero at 768px and below. */ }



							<HerFloCom
								className={` ${ cssModObj.visFloSvg }   ${ cssModObj.visFloSvgLeft } `}

								sidStr='left'
							/>{ /* What: Hero Flourish Component. Why: The stacked hero leaves empty room beside the smaller rings, which a little of the site's motif fills. How: This draws the question side's drawing down the left at 768px and below, down to 441px. */ }



							<HerFloCom
								className={` ${ cssModObj.visFloSvg }   ${ cssModObj.visFloSvgRight } `}

								sidStr='right'
							/>{ /* What: Hero Flourish Component. Why: The stacked hero leaves empty room beside the smaller rings, which a little of the site's motif fills. How: This draws the answer side's drawing down the right at 768px and below, down to 441px. */ }


						</div>


					</div>


				</section>



				<section className={ cssModObj.homTopSec }>{ /* What: Home Topic Section Element. Why: A visitor can jump straight to help with their kind of device or problem. How: This holds the heading and the topic tiles on a white band. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The section's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<p className={ cssModObj.secEyePar }>Topics</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the section. How: This shows it in teal mono capitals. */ }

						<h2 className={ cssModObj.secTitHea }>Popular things people ask about</h2>{ /* What: Section Title Heading Element. Why: The heading tells a visitor they're not alone in asking. How: This shows the section's h2. */ }


						<ul className={ cssModObj.topGriUno }>{ /* What: Topic Grid Unordered Element. Why: The topics sit in an even grid of tiles. How: This lays them out four, three, or two across, and in one column of short rows on a phone. */ }


							{ TOP_REC_ARR.map( ( topRecObj ) => ( // What: Topic Map Call. Why: Every topic gets a tile. How: This renders one list item per topic.


								<li key={ topRecObj.ideStr }>{ /* What: Topic Item Element. Why: Each tile is one item in the list. How: This holds the tile's link. */ }


									<Link
										className={ cssModObj.topTilAnc }

										to={ `/articles?topic=${ topRecObj.ideStr }` } // What: Topic Address. Why: The tile should open the Articles page already showing this topic. How: This puts the topic's identifier in the address, which the Articles page reads as its filter.
									>{ /* What: Topic Tile Link. Why: A tile opens the articles for its topic. How: This draws a stitched tile with the icon, name, and hint, lifting on hover. */ }


										<svg
											className={ cssModObj.topIcoSvg }

											fill='none'
											viewBox='0 0 24 24'

											aria-hidden='true'
										>{ /* What: Topic Icon SVG Element. Why: A small speech bubble marks each tile as something people ask about. How: This draws a teal bubble outline, hidden from screen readers. */ }


											<path d='M 4 5 H 20 V 16 H 9 L 4 20 Z' />{ /* What: Topic Bubble Path Element. Why: The icon is a speech bubble. How: This draws its outline with a tail. */ }


										</svg>

										<span className={ cssModObj.topNamSpa }>{ topRecObj.labStr }</span>{ /* What: Topic Name Span Element. Why: The tile names its topic. How: This shows the label in bold. */ }

										<span className={ cssModObj.topHinSpa }>{ topRecObj.hinStr }</span>{ /* What: Topic Hint Span Element. Why: A few examples help a visitor pick the right topic. How: This shows the hint in muted mono. */ }


									</Link>


								</li>


							))}



							<li>{ /* What: Something Else Item Element. Why: The last tile catches everything the topics don't. How: This holds its link. */ }


								<Link
									className={ cssModObj.topTilAnc }

									to='/contact'
								>{ /* What: Something Else Tile Link. Why: A visitor whose question fits no topic can still ask it. How: This draws the same stitched tile, leading to the question form. */ }


									<svg
										className={ cssModObj.topIcoSvg }

										fill='none'
										viewBox='0 0 24 24'

										aria-hidden='true'
									>{ /* What: Topic Icon SVG Element. Why: The last tile carries the same speech bubble as the others. How: This draws a teal bubble outline, hidden from screen readers. */ }


										<path d='M 4 5 H 20 V 16 H 9 L 4 20 Z' />{ /* What: Topic Bubble Path Element. Why: The icon is a speech bubble. How: This draws its outline with a tail. */ }


									</svg>

									<span className={ cssModObj.topNamSpa }>Something else</span>{ /* What: Topic Name Span Element. Why: The tile names what it's for. How: This shows the label in bold. */ }

									<span className={ cssModObj.topHinSpa }>Ask me anyway</span>{ /* What: Topic Hint Span Element. Why: A visitor should feel welcome to ask about anything. How: This shows the hint in muted mono. */ }


								</Link>


							</li>


						</ul>


					</div>


				</section>



				<section className={ cssModObj.homArtSec }>{ /* What: Home Articles Section Element. Why: A visitor can jump straight into the newest help. How: This holds the header and four article cards. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The section's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<div className={ cssModObj.artHeaDiv }>{ /* What: Articles Header Div Element. Why: The heading and the link to every article sit on one line on wide screens. How: This spreads them apart, wrapping on phones. */ }


							<div>{ /* What: Articles Heading Div Element. Why: The eyebrow and heading read as one block beside the link. How: This stacks them. */ }


								<p className={ cssModObj.secEyePar }>New articles</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the section. How: This shows it in teal mono capitals. */ }

								<h2 className={ cssModObj.secTitHea }>Fresh help, step by step</h2>{ /* What: Section Title Heading Element. Why: The heading introduces the newest articles. How: This shows the section's h2. */ }


							</div>



							<Link
								className={ cssModObj.allArtAnc }

								to='/articles'
							>See all articles <span className={ cssModObj.allArrSpa } aria-hidden='true'>→</span></Link>{ /* What: See All Articles Link. Why: Four articles are only a taste. How: This routes to the Articles page, its arrow nudging on hover and hidden from screen readers. */ }


						</div>


						<ul className={ cssModObj.artGriUno }>{ /* What: Article Grid Unordered Element. Why: The newest articles sit side by side as equal cards. How: This lays them out four across, two by two on tablets, and stacked on phones. */ }


							{ ART_REC_ARR.slice( 0, 4 ).map( ( artRecObj ) => ( // What: Article Map Call. Why: The newest four articles each get a card, a count that divides evenly into four, two, or one column. How: This renders one list item per article, taking the catalog's first four.


								<li key={ artRecObj.ideStr }>{ /* What: Article Item Element. Why: Each card is one item in the list. How: This holds the card's link. */ }


									<Link
										className={ cssModObj.artCarAnc }

										to={ `/articles/${ artRecObj.ideStr }` }
									>{ /* What: Article Card Link. Why: The whole card opens the article. How: This draws a white card with the topic, title, and reading time, lifting on hover. */ }


										<TopTagCom topIdeStr={ artRecObj.topStr } />{ /* What: Topic Tag Component. Why: The card shows which topic the article belongs to. How: This renders the topic's pill. */ }



										<h3 className={ cssModObj.artTitHea }>{ artRecObj.titStr }</h3>{ /* What: Article Title Heading Element. Why: The title is the card's main line. How: This shows it as an h3 under the section's h2. */ }

										<span className={ cssModObj.artMetSpa }>{ `${ artRecObj.minNum } min read` }<span className={ cssModObj.artArrSpa } aria-hidden='true'>→</span></span>{ /* What: Article Meta Span Element. Why: A reader can see how long it takes, and an arrow invites a click. How: This shows the reading time with an arrow that nudges on hover, hidden from screen readers. */ }


									</Link>


								</li>


							))}


						</ul>


					</div>


				</section>



				<section className={ cssModObj.homSteSec }>{ /* What: Home Steps Section Element. Why: A first-time visitor learns how asking works before they ask. How: This holds the heading and the three steps. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The section's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<p className={ cssModObj.secEyePar }>How it works</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the section. How: This shows it in teal mono capitals. */ }

						<h2 className={ cssModObj.secTitHea }>From stuck to sorted</h2>{ /* What: Section Title Heading Element. Why: The heading sums up what the steps get a visitor. How: This shows the section's h2. */ }


						<ol className={ cssModObj.steLisOrd }>{ /* What: Step List Ordered Element. Why: The steps happen in order. How: This lays the three steps out in a row, stacking on phones. */ }


							{ STE_REC_ARR.map( ( steRecObj, steIndNum ) => ( // What: Step Map Call. Why: Every step gets a card. How: This renders one list item per step.


								<li
									key={ steRecObj.titStr }

									className={ cssModObj.steIteIte }
								>{ /* What: Step Item Item Element. Why: Each step is a small card. How: This holds the step's label, title, and description. */ }


									<span
										className={ cssModObj.steLabSpa }

										aria-hidden='true'
									>{ `Step ${ steIndNum + 1 }` }</span>{ /* What: Step Label Span Element. Why: A small label numbers each step. How: This shows the step's number in teal mono, hidden from screen readers since the list already numbers it. */ }

									<h3 className={ cssModObj.steTitHea }>{ steRecObj.titStr }</h3>{ /* What: Step Title Heading Element. Why: Each step has a short name. How: This shows it as an h3. */ }

									<p className={ cssModObj.steDesPar }>{ steRecObj.desStr }</p>{ /* What: Step Description Paragraph Element. Why: A line explains each step. How: This shows the step's description. */ }


								</li>


							))}


						</ol>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion HomPagCom

// #endregion Components



// #region Exports

export { HomPagCom }; // What: Named Exports. Why: The router's root route renders the home page. How: This exports HomPagCom.

// #endregion Exports


