


// #region Imports

import cssModObj from './article.module.css'; // What: CSS Module Object. Why: The article's header, body, and closing panel are styled in its own module. How: This maps each class name in article.module.css to its hashed module class.


import { ART_REC_ARR  } from '../../ui/articles.ts';                   // What: Article Record Array. Why: The page shows one article from the catalog. How: The page finds it by its address.
import { artTitFun    } from '../../ui/article-title.ts';              // What: Article Title Function. Why: The article's page title has to match the one its own HTML page and link preview carry. How: The view names the page through it.
import { Link         } from 'react-router';                           // What: Link. Why: The back link, the closing panel, and links inside articles move without a full page load. How: This renders those links.
import { NotFouCom    } from '../not-found/not-found.tsx';             // What: Not Found Component. Why: An address naming no article should land on the 404 page. How: The page renders it when no article matches.
import { TopTagCom    } from '../../ui/topic-tag.tsx';                 // What: Topic Tag Component. Why: The article shows its topic above its title. How: The header renders it.
import { usePagDesFun } from 'techgeek-design/ui/page-description.ts'; // What: Use Page Description Function. Why: Each article's search description is its own summary. How: The view calls it to swap the one description tag's text while it shows.
import { useParams    } from 'react-router';                           // What: Use Params. Why: The article's address names it. How: The page reads the slug parameter.


import type { ArtRecTyp } from '../../ui/articles.ts';    // What: Article Record Type. Why: The view takes one article. How: This types its prop.
import type { InlTokTyp } from '../../utils/markdown.ts'; // What: Inline Token Type. Why: The body renders each line's pieces. How: This types them.
import type { JSX       } from 'react';                   // What: JSX. Why: The components declare the elements they return. How: This types their returns as JSX elements.
import type { ReactNode } from 'react';                   // What: React Node. Why: A line's pieces render as a mix of text and elements. How: This types them.

// #endregion Imports



/**
 * article.tsx = Article
 *
 * @summary
 * One help article at its own address (/articles/<slug>): a back link to the
 * list, the topic, the title, and the reading time and dates, then the body
 * rendered from the article's Markdown blocks as the page's own elements,
 * then a calm panel inviting a question for anyone still stuck, and links to
 * other articles on the same topic. An address naming no article shows the
 * 404 page.
 *
 * Sections:
 *  - Helpers
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

// #region datForFun

/**
 * datForFun = Date Format Function
 *
 * @summary
 * Turns an article's date from its front matter (2026-10-16) into words
 * (October 16, 2026). The date is read as a calendar day in UTC, so it never
 * shifts to the day before in a visitor's time zone.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param isoDatStr - ISO Date String: The date as year, month, and day.
 *
 * @returns The date in words.
 *
 * @example
 * ```ts
 * datForFun('2026-10-16') // => 'October 16, 2026'
 * ```
 *
*/

function datForFun ( isoDatStr : string ) : string {


	return new Date( `${ isoDatStr }T00:00:00Z` ).toLocaleDateString( 'en-US', { day : 'numeric', month : 'long', timeZone : 'UTC', year : 'numeric' } ); // What: Formatted Date Return. Why: Dates read best in words. How: This reads the day at midnight UTC and formats it in American English, in UTC.


}

// #endregion datForFun



// #region renInlFun

/**
 * renInlFun = Render Inline Function
 *
 * @summary
 * Turns one line's pieces into what the page shows: plain text as text, bold
 * as strong, italic as em, and links as links. A link to the site itself
 * (starting with /) moves through the router, and any other address is a
 * plain link that opens in the same tab. Each piece is keyed by its place in
 * the line.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param inlTokArr - Inline Token Array: The line's pieces, in order.
 *
 * @returns The line's text and elements, in order.
 *
 * @example
 * ```ts
 * renInlFun(inlTokArr) // => ['Press ', <strong>Restart</strong>, ' now']
 * ```
 *
*/

function renInlFun ( inlTokArr : InlTokTyp[] ) : ReactNode[] {


	return inlTokArr.map( ( inlTokObj, tokIndNum ) => { // What: Piece Render Map. Why: Each piece renders by its kind. How: This turns each into text or an element.


		if ( inlTokObj.kinStr === 'bold' ) return <strong key={ tokIndNum }>{ inlTokObj.texStr }</strong>; // What: Bold Piece Return. Why: Bold marks a label to look for on screen. How: This renders it as strong.



		if ( inlTokObj.kinStr === 'italic' ) return <em key={ tokIndNum }>{ inlTokObj.texStr }</em>; // What: Italic Piece Return. Why: Italic marks a word to stress. How: This renders it as em.



		if ( inlTokObj.kinStr === 'link' && inlTokObj.hreStr?.startsWith( '/' ) ) return ( // What: Site Link Piece Return. Why: A link to another page of the site shouldn't reload it. How: This renders a router link.


			<Link
				key={ tokIndNum }

				className={ cssModObj.bodLinAnc }

				to={ inlTokObj.hreStr }
			>{ inlTokObj.texStr }</Link> // What: Body Site Link. Why: A link inside the article's text can lead to another page of the site. How: This routes there without a reload, styled as a body link.


		);



		if ( inlTokObj.kinStr === 'link' ) return ( // What: Outside Link Piece Return. Why: A link to another site is a plain link. How: This renders an anchor that opens in the same tab.


			<a
				key={ tokIndNum }

				className={ cssModObj.bodLinAnc }

				href={ inlTokObj.hreStr }
			>{ inlTokObj.texStr }</a> // What: Body Link Anchor Element. Why: A link inside the article's text can lead to another site. How: This opens the address in the same tab, styled as a body link.


		);



		return inlTokObj.texStr; // What: Text Piece Return. Why: Plain text needs no element. How: This returns the text itself.


	} );


}

// #endregion renInlFun

// #endregion Helpers



// #region Components

type AvcProTyp = { artRecObj : ArtRecTyp }; // What: Article-View-Component Props Type. Why: The view shows one article. How: This types the article it's given.

// #region ArtVieCom

/**
 * ArtVieCom = Article View Component
 *
 * @summary
 * Renders one found article with its own title, description, and canonical
 * address: the header, the body blocks as headings, paragraphs, numbered
 * steps, bullet lists, tips, photos, and videos, then the closing panel and
 * up to three other articles on the same topic. It's split from ArtPagCom so
 * the description hook runs only for a real article, unconditionally, as
 * React's hooks require.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.artRecObj - Article Record Object: The article to show.
 *
 * @returns The page's title, canonical link, and wrapper div.
 *
 * @example
 * ```tsx
 * ArtVieCom({artRecObj}) // => <ArtVieCom />
 * ```
 *
*/

function ArtVieCom ( { artRecObj } : AvcProTyp ) : JSX.Element {


	usePagDesFun( artRecObj.sumStr ); // What: Page Description Call. Why: Search listings should describe this article. How: This swaps the one description tag's text for the article's summary while it shows.



	const relArtArr = ART_REC_ARR.filter( ( artCurObj ) => artCurObj.topStr === artRecObj.topStr && artCurObj.ideStr !== artRecObj.ideStr ).slice( 0, 3 ); // What: Related Article Array. Why: A reader may want more help on the same topic. How: This picks up to three other articles with the same topic, newest first.



	return (


		<>{ /* What: Article Fragment. Why: The page's title, canonical link, and content render side by side. How: This groups them without adding an element. */ }


			<title>{ artTitFun( artRecObj.titStr ) }</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the article. How: React 19 moves this title, with the site's name when it fits within 60 characters, into the document head while the article is shown. */ }

			<link
				href={ `https://techgeek.support/articles/${ artRecObj.ideStr }` }
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Search engines should treat every address that reaches this article as one page. How: React 19 moves this link into the head. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page fades up into view as it opens. How: This wraps the article and plays the shared entrance. */ }


				<article className={ cssModObj.artBodArt }>{ /* What: Article Body Article Element. Why: The article is one self-contained piece. How: This holds its header, body, and closing panel in a reading column. */ }


					<header className={ cssModObj.artHeaHed }>{ /* What: Article Header Header Element. Why: The way back, the topic, the title, and the details sit together above the body. How: This stacks them. */ }


						<Link
							className={ cssModObj.bacLinAnc }

							to={ `/articles?topic=${ artRecObj.topStr }` } // What: Back Link Address. Why: A reader going back most likely wants more of the same topic. How: This opens the list filtered to the article's topic.
						><span aria-hidden='true'>←</span> More articles</Link>{ /* What: Back Link. Why: A reader should always see the way back to the list. How: This routes to the Articles page filtered to this topic, its arrow hidden from screen readers so the link reads as its words. */ }



						<TopTagCom topIdeStr={ artRecObj.topStr } />{ /* What: Topic Tag Component. Why: The reader sees which topic this belongs to. How: This renders the topic's pill. */ }



						<h1 className={ cssModObj.artTitHea }>{ artRecObj.titStr }</h1>{ /* What: Article Title Heading Element. Why: The article's title is the page's one h1. How: This shows it. */ }

						<p className={ cssModObj.artMetPar }>{ `${ artRecObj.minNum } min read · Published ${ datForFun( artRecObj.pubStr ) }${ artRecObj.updStr ? ` · Updated ${ datForFun( artRecObj.updStr ) }` : '' }` }</p>{ /* What: Article Meta Paragraph Element. Why: A reader can see how long it takes and how current it is. How: This shows the reading time, the published date, and the updated date when there is one, joined by dots. */ }


					</header>



					<div className={ cssModObj.bodTexDiv }>{ /* What: Body Text Div Element. Why: The article's body is long-form prose, styled as a whole. How: This holds every block, which the module styles through their tags. */ }


						{ artRecObj.bloRecArr.map( ( bloRecObj, bloIndNum ) => { // What: Block Map Call. Why: Each block renders as its own element. How: This picks the element by the block's kind, keyed by its place in the body.


							if ( bloRecObj.kinStr === 'heading' && bloRecObj.levNum === 2 ) return <h2 key={ bloIndNum }>{ renInlFun( bloRecObj.inlTokArr ) }</h2>; // What: Section Heading Return. Why: ## starts a section. How: This renders an h2.



							if ( bloRecObj.kinStr === 'heading' ) return <h3 key={ bloIndNum }>{ renInlFun( bloRecObj.inlTokArr ) }</h3>; // What: Subsection Heading Return. Why: ### starts a subsection. How: This renders an h3.



							if ( bloRecObj.kinStr === 'paragraph' ) return <p key={ bloIndNum }>{ renInlFun( bloRecObj.inlTokArr ) }</p>; // What: Paragraph Return. Why: Most of the body is paragraphs. How: This renders a p.



							if ( bloRecObj.kinStr === 'tip' ) return ( // What: Tip Return. Why: A tip stands apart from the steps. How: This renders an aside the module draws as a pale teal panel.


								<aside
									key={ bloIndNum }

									className={ cssModObj.tipBloAsi }
								>{ renInlFun( bloRecObj.inlTokArr ) }</aside> // What: Tip Block Aside Element. Why: A tip reads as its own calm note between the steps. How: This holds the tip's text in a pale teal panel.


							);



							if ( bloRecObj.kinStr === 'ordered' ) return <ol key={ bloIndNum }>{ bloRecObj.iteTokArr.map( ( iteTokArr, iteIndNum ) => <li key={ iteIndNum }>{ renInlFun( iteTokArr ) }</li> ) }</ol>; // What: Steps Return. Why: Numbered steps are done in order. How: This renders an ol, one li per step.



							if ( bloRecObj.kinStr === 'unordered' ) return <ul key={ bloIndNum }>{ bloRecObj.iteTokArr.map( ( iteTokArr, iteIndNum ) => <li key={ iteIndNum }>{ renInlFun( iteTokArr ) }</li> ) }</ul>; // What: List Return. Why: Some points have no order. How: This renders a ul, one li per point.



							return ( // What: Media Return. Why: The only kind left is a photo or video. How: This renders a figure with the file and its caption.


								<figure
									key={ bloIndNum }

									className={ cssModObj.medFigFig }
								>{ /* What: Media Figure Figure Element. Why: A photo or video sits apart from the text with its caption. How: This holds the media and the caption. */ }


									{ bloRecObj.souStr.endsWith( '.mp4' ) ? ( // What: Video Check. Why: An .mp4 file is a video, anything else a photo. How: This picks the element by the file's ending.


										<video
											controls
											preload='metadata'
											src={ artRecObj.medUrlObj[ bloRecObj.souStr ] }

											aria-label={ bloRecObj.altStr }
										/> // What: Media Video Element. Why: A short video shows steps a photo can't. How: This plays the file with the browser's controls, loading only its details until played, named by its alt text.


									) : ( // What: Photo Branch. Why: Any other file is a photo. How: This shows it with its alt text.


										<img
											loading='lazy'
											src={ artRecObj.medUrlObj[ bloRecObj.souStr ] }

											alt={ bloRecObj.altStr }
										/> // What: Media Image Element. Why: A photo shows what to look for on screen. How: This shows the file lazily, since most photos start below the fold, with its alt text.


									) }

									{ bloRecObj.capStr && <figcaption>{ bloRecObj.capStr }</figcaption> }{ /* What: Media Caption Check. Why: Only some media have a caption. How: This shows the caption when there is one. */ }


								</figure>


							);


						} ) }


					</div>



					<aside className={ cssModObj.stiStuAsi }>{ /* What: Still Stuck Aside Element. Why: A reader the article didn't help should know what to do next. How: This draws a pale teal panel with an invitation and a button. */ }


						<h2 className={ cssModObj.stiTitHea }>Still stuck?</h2>{ /* What: Still Stuck Title Heading Element. Why: The panel names the worry it answers. How: This shows the panel's heading. */ }

						<p className={ cssModObj.stiTexPar }>That's completely okay. Ask me your question, in your own words, and I'll reply by email within 24 hours. It's always free.</p>{ /* What: Still Stuck Text Paragraph Element. Why: The reader should feel welcome to ask. How: This reassures them and repeats the promise. */ }



						<Link
							className={ cssModObj.butPriAnc }

							to='/contact'
						>Ask a Question</Link>{ /* What: Ask Question Link. Why: Asking is the next step for anyone still stuck. How: This routes to the question form as an orange button. */ }


					</aside>



					{ relArtArr.length > 0 && ( // What: Related Articles Check. Why: Only a topic with other articles has more to show. How: This shows the section when there's at least one.


						<nav
							className={ cssModObj.relArtNav }

							aria-label='More articles on this topic'
						>{ /* What: Related Articles Nav Element. Why: Other articles on the same topic are a natural next read. How: This holds the heading and the links. */ }


							<h2 className={ cssModObj.relTitHea }>More on this topic</h2>{ /* What: Related Title Heading Element. Why: The links need a heading. How: This shows it. */ }


							<ul className={ cssModObj.relLisUno }>{ /* What: Related List Unordered Element. Why: The links read as a short list. How: This stacks them. */ }


								{ relArtArr.map( ( relArtObj ) => ( // What: Related Map Call. Why: Each related article gets a link. How: This renders one list item per article.


									<li key={ relArtObj.ideStr }>{ /* What: Related Item Element. Why: Each link is one item. How: This holds it. */ }


										<Link
											className={ cssModObj.relLinAnc }

											to={ `/articles/${ relArtObj.ideStr }` }
										>{ relArtObj.titStr }</Link>{ /* What: Related Article Link. Why: The reader can open the related article. How: This routes to it, named by its title. */ }


									</li>


								))}


							</ul>


						</nav>


					) }


				</article>


			</div>


		</>


	);


}

// #endregion ArtVieCom



// #region ArtPagCom

/**
 * ArtPagCom = Article Page Component
 *
 * @summary
 * The article route's page: finds the article the address names and shows
 * it through ArtVieCom, or shows the 404 page when no article has that
 * address.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The article's view, or the 404 page.
 *
 * @example
 * ```tsx
 * ArtPagCom() // => <ArtPagCom />
 * ```
 *
*/

function ArtPagCom () : JSX.Element {


	const { slug : artSluStr } = useParams(); // What: Article Slug String. Why: The address names the article. How: This reads the route's slug parameter, the router's name for it, under the article's own.

	const artRecObj = ART_REC_ARR.find( ( artCurObj ) => artCurObj.ideStr === artSluStr ); // What: Article Record Object. Why: The page shows the article the address names. How: This finds it in the catalog, or nothing.



	return artRecObj ? <ArtVieCom artRecObj={ artRecObj } /> : <NotFouCom />; // What: Article Or Not Found Return. Why: An unknown address should land on the 404 page. How: This shows the article when it exists and the 404 page otherwise.


}

// #endregion ArtPagCom

// #endregion Components



// #region Exports

export { ArtPagCom }; // What: Named Exports. Why: The router's article route renders the page. How: This exports ArtPagCom.

// #endregion Exports


