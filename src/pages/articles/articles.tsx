


// #region Imports

import cssModObj from './articles.module.css'; // What: CSS Module Object. Why: The Articles page's hero, filter, and list are styled in its own module. How: This maps each class name in articles.module.css to its hashed module class.


import { ART_REC_ARR     } from '../../ui/articles.ts';                   // What: Article Record Array. Why: The page lists every article. How: The page filters and renders it.
import { Link            } from 'react-router';                           // What: Link. Why: Each article and the question form open without a full page load. How: This renders those links.
import { SigRinCom       } from '../../ui/signal-rings.tsx';              // What: Signal Rings Component. Why: The help card beside the list carries the site's motif. How: The page draws the small rings at the card's top.
import { TOP_REC_ARR     } from '../../ui/topics.ts';                     // What: Topic Record Array. Why: The filter offers every topic. How: The page renders one button per topic.
import { TopTagCom       } from '../../ui/topic-tag.tsx';                 // What: Topic Tag Component. Why: Each listed article shows its topic. How: The page renders one tag per article.
import { usePagDesFun    } from 'techgeek-design/ui/page-description.ts'; // What: Use Page Description Function. Why: The page's search description differs from the home page's. How: The page calls it to swap the one description tag's text while it shows.
import { useSearchParams } from 'react-router';                           // What: Use Search Params. Why: The chosen topic lives in the address, so a link can open the page already filtered. How: The page reads and sets the topic parameter through it.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * articles.tsx = Articles
 *
 * @summary
 * The help center: a short hero, a row of topic buttons that filter the
 * list, a line saying how many articles show, and the articles one per row,
 * newest first. The chosen topic lives in the address (/articles?topic=mac),
 * so Home's topic tiles and any shared link open the page already filtered,
 * and choosing a topic replaces the address rather than adding to the
 * history, so Back still leaves the page. A topic with no articles yet
 * invites the visitor to ask instead, and a list of articles ends with the
 * same Still Stuck panel an article does. On a wide screen a help card sits
 * beside the list, staying in view as it scrolls, so a visitor who can't find
 * their problem always sees how to ask.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region ArtLisCom

/**
 * ArtLisCom = Article List Component
 *
 * @summary
 * Renders the Articles page with its own title, description, and canonical
 * address, which leaves out the topic so every filtered view counts as one
 * page. The topic comes from the address's topic parameter, and one that
 * isn't a real topic shows every article. Pressing a topic's button puts it
 * in the address, replacing the current entry; pressing All Topics removes
 * it. The count line is a polite live region, so a screen reader announces
 * the new count after each choice.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's title, canonical link, and wrapper div.
 *
 * @example
 * ```tsx
 * ArtLisCom() // => <ArtLisCom />
 * ```
 *
*/

function ArtLisCom () : JSX.Element {


	usePagDesFun( 'Free, step-by-step help articles for phones, computers, Wi-Fi, smart homes, scams, and more, all written in plain words.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	const [ seaParObj, setSeaParObj ] = useSearchParams(); // What: Search Parameters Object And Setter. Why: The chosen topic lives in the address. How: This reads the address's parameters and sets new ones.

	const rawTopStr = seaParObj.get( 'topic' ) ?? ''; // What: Raw Topic String. Why: The address may name a topic, or nothing. How: This reads the topic parameter, or an empty string.
	const topRecObj = TOP_REC_ARR.find( ( topCurObj ) => topCurObj.ideStr === rawTopStr );                                                                      // What: Topic Record Object. Why: Only a real topic filters the list. How: This finds the topic the address names, or nothing.
	const shoArtArr = topRecObj ? ART_REC_ARR.filter( ( artRecObj ) => artRecObj.topStr === topRecObj.ideStr ) : ART_REC_ARR;                                   // What: Shown Article Array. Why: The list shows only the chosen topic's articles. How: This filters the catalog by the topic, or keeps every article when none is chosen.
	const couTexStr = `Showing ${ shoArtArr.length } ${ shoArtArr.length === 1 ? 'article' : 'articles' }${ topRecObj ? ` about ${ topRecObj.labStr }` : '' }`; // What: Count Text String. Why: The visitor should know how many articles match. How: This counts them, in the right singular or plural, naming the topic when one is chosen.



	return (


		<>{ /* What: Articles Fragment. Why: The page's title, canonical link, and content render side by side. How: This groups them without adding an element. */ }


			<title>Free Tech Help Articles | TechGeek.support</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React 19 moves this title into the document head while the page is shown. */ }

			<link
				href='https://techgeek.support/articles'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every filtered view of the list should count as one page. How: React 19 moves this link into the head, giving the address without its topic. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page fades up into view as it opens. How: This wraps every section and plays the shared entrance. */ }


				<section className={ cssModObj.artHerSec }>{ /* What: Articles Hero Section Element. Why: The page opens by saying what it holds and how to use it. How: This holds the eyebrow, heading, and lead. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The hero's content sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<p className={ cssModObj.secEyePar }>Help articles</p>{ /* What: Section Eyebrow Paragraph Element. Why: A small label names the page. How: This shows it in teal mono capitals. */ }

						<h1 className={ cssModObj.herTitHea }>Step-by-step help, in plain words</h1>{ /* What: Hero Title Heading Element. Why: The heading promises help a visitor can follow. How: This shows the page's h1. */ }

						<p className={ cssModObj.herLeaPar }>Pick a topic to narrow the list. Don't see your problem? <Link className={ cssModObj.herAskAnc } to='/contact'>Ask me</Link>, and I'll answer you directly within 24 hours.</p>{ /* What: Hero Lead Paragraph Element. Why: The lead explains the filter and offers a way out when nothing fits. How: This shows the lead with a link to the question form. */ }


					</div>


				</section>



				<section className={ cssModObj.artLisSec }>{ /* What: Articles List Section Element. Why: The filter and the list belong together. How: This holds the topic buttons, the count, the articles, and the help card beside them on wide screens. */ }


					<div className={ cssModObj.secInnDiv }>{ /* What: Section Inner Div Element. Why: The list sits in the site's centered column. How: This caps and centers it with the side gutter. */ }


						<div
							className={ cssModObj.filRowDiv }

							aria-label='Filter articles by topic'
							role='group'
						>{ /* What: Filter Row Div Element. Why: The topic buttons read as one set of choices. How: This groups them under a label for screen readers, wrapping onto more lines as needed. */ }


							<button
								className={ cssModObj.filPilBut }

								type='button'

								aria-pressed={ !topRecObj }

								onClick={ () => setSeaParObj( {}, { replace : true } ) } // What: All Topics Click. Why: Choosing All should show every article without adding a history entry. How: This clears the address's parameters, replacing the current entry.
							>All topics</button>{ /* What: All Topics Button Element. Why: A visitor can go back to every article. How: This clears the filter, marked pressed when no topic is chosen. */ }

							{ TOP_REC_ARR.map( ( topCurObj ) => ( // What: Topic Button Map Call. Why: Every topic gets a filter button. How: This renders one button per topic.


								<button
									key={ topCurObj.ideStr }

									className={ cssModObj.filPilBut }

									type='button'

									aria-pressed={ topCurObj.ideStr === topRecObj?.ideStr }

									onClick={ () => setSeaParObj( { topic : topCurObj.ideStr }, { replace : true } ) } // What: Topic Click. Why: Choosing a topic should filter the list and keep the choice shareable, without adding a history entry. How: This puts the topic in the address, replacing the current entry.
								>{ topCurObj.labStr }</button> // What: Topic Button Element. Why: A visitor narrows the list to one topic. How: This shows the topic's name, marked pressed while it's chosen.


							))}


						</div>

						<p
							className={ cssModObj.couTexPar }

							aria-live='polite'
						>{ couTexStr }</p>{ /* What: Count Text Paragraph Element. Why: The visitor should see, and hear, how many articles match. How: This shows the count, which a screen reader announces after each change. */ }



						<div className={ cssModObj.lisLayDiv }>{ /* What: List Layout Div Element. Why: On a wide screen the list's right side was empty, so the help card sits there beside it. How: This lays the list and the help card side by side above 1,024px, and leaves the list alone below that. */ }


							{ shoArtArr.length > 0 ? ( // What: Article List Check. Why: A topic may have no articles yet. How: This shows the list when there are articles, and an invitation to ask otherwise.


								<ul className={ cssModObj.artLisUno }>{ /* What: Article List Unordered Element. Why: The articles read as a list, one per row. How: This stacks them with even gaps. */ }


									{ shoArtArr.map( ( artRecObj ) => ( // What: Article Map Call. Why: Every matching article gets a row. How: This renders one list item per article.


										<li key={ artRecObj.ideStr }>{ /* What: Article Item Element. Why: Each article is one item in the list. How: This holds the article's card. */ }


											<Link
												className={ cssModObj.artCarAnc }

												to={ `/articles/${ artRecObj.ideStr }` }
											>{ /* What: Article Card Link. Why: The whole card opens the article. How: This draws a white card with the topic, title, summary, and reading time, lifting on hover. */ }


												<TopTagCom topIdeStr={ artRecObj.topStr } />{ /* What: Topic Tag Component. Why: The card shows which topic the article belongs to. How: This renders the topic's pill. */ }



												<h2 className={ cssModObj.artTitHea }>{ artRecObj.titStr }</h2>{ /* What: Article Title Heading Element. Why: The title is the card's main line. How: This shows it as an h2 under the page's h1. */ }

												<p className={ cssModObj.artSumPar }>{ artRecObj.sumStr }</p>{ /* What: Article Summary Paragraph Element. Why: A line says what the article covers. How: This shows the article's summary. */ }

												<span className={ cssModObj.artMetSpa }>{ `${ artRecObj.minNum } min read` }<span className={ cssModObj.artArrSpa } aria-hidden='true'>→</span></span>{ /* What: Article Meta Span Element. Why: A reader can see how long it takes, and an arrow invites a click. How: This shows the reading time with an arrow that nudges on hover, hidden from screen readers. */ }


											</Link>


										</li>


									))}


								</ul>


							) : ( // What: Empty Topic Branch. Why: A topic with no articles yet still deserves a way forward. How: This shows an invitation to ask instead.


								<div className={ cssModObj.empMesDiv }>{ /* What: Empty Message Div Element. Why: The invitation reads as one calm block. How: This holds the message and the button. */ }


									<p className={ cssModObj.empMesPar }>No articles about this yet, but I'm happy to help directly. Ask your question, and I'll reply within 24 hours.</p>{ /* What: Empty Message Paragraph Element. Why: An empty list shouldn't feel like a dead end. How: This offers to answer directly. */ }



									<Link
										className={ cssModObj.butPriAnc }

										to='/contact'
									>Ask a Question</Link>{ /* What: Ask Question Link. Why: Asking is the way forward when no article fits. How: This routes to the question form as an orange button. */ }


								</div>


							) }



							<aside
								className={ cssModObj.helCarAsi }

								aria-label='Ask the Tech Geek'
							>{ /* What: Help Card Aside Element. Why: A visitor scanning the list who can't find their problem should see how to ask, right where they give up looking. How: This holds the small rings, the invitation, the promise, the button, and a safety note, staying in view as the list scrolls, on wide screens only. */ }


								<SigRinCom
									className={ cssModObj.helRinSvg }

									smaBoo
								/>{ /* What: Signal Rings Component. Why: The site's motif marks the card as a way to reach the Tech Geek, and fills the space with something friendly. How: This draws the small, cropped rings at the card's top. */ }



								<h2 className={ cssModObj.helTitHea }>Can't find your problem?</h2>{ /* What: Help Title Heading Element. Why: The card speaks to the visitor who hasn't found an answer. How: This names the card. */ }

								<p className={ cssModObj.helTexPar }>Ask in plain words. It's free, and I'll reply within 24 hours.</p>{ /* What: Help Text Paragraph Element. Why: The site's promise makes asking feel easy and safe. How: This says it's free and how fast the reply comes. */ }



								<Link
									className={ cssModObj.butPriAnc }

									to='/contact'
								>Ask a Question</Link>{ /* What: Ask Question Link. Why: Asking is the site's main action. How: This routes to the question form as an orange button. */ }



								<p className={ cssModObj.helSafPar }>I'll never ask for your passwords, money, or remote access.</p>{ /* What: Help Safety Paragraph Element. Why: Scammers pose as tech support, and a nervous visitor should know what real help never asks for. How: This states it as a quiet note under the button. */ }


							</aside>


						</div>



						{ shoArtArr.length > 0 && ( // What: Still Stuck Check. Why: An empty topic already shows its own invitation to ask. How: This shows the panel only under a list of articles.


							<aside
								className={ cssModObj.stiStuAsi }

								aria-label='Still stuck'
							>{ /* What: Still Stuck Aside Element. Why: A visitor who scrolled the whole list without finding their problem should know what to do next, and the page's end filled out. How: This draws the same pale teal panel the article page ends with, centered below the list and the help card, named for screen readers apart from the help card. */ }


								<h2 className={ cssModObj.stiTitHea }>Still stuck?</h2>{ /* What: Still Stuck Title Heading Element. Why: The panel names the worry it answers. How: This shows the panel's heading. */ }

								<p className={ cssModObj.stiTexPar }>That's completely okay. Ask me your question, in your own words, and I'll reply by email within 24 hours. It's always free.</p>{ /* What: Still Stuck Text Paragraph Element. Why: The visitor should feel welcome to ask. How: This reassures them and repeats the promise. */ }



								<Link
									className={ cssModObj.butPriAnc }

									to='/contact'
								>Ask a Question</Link>{ /* What: Ask Question Link. Why: Asking is the next step for anyone still stuck. How: This routes to the question form as an orange button. */ }


							</aside>


						) }


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion ArtLisCom

// #endregion Components



// #region Exports

export { ArtLisCom }; // What: Named Exports. Why: The router's articles route renders the page. How: This exports ArtLisCom.

// #endregion Exports


