


// #region Imports

import cssModObj from './not-found.module.css'; // What: CSS Module Object. Why: The 404 page's layout and buttons are styled in its own module. How: This maps each class name in not-found.module.css to its hashed module class.


import { Link      } from 'react-router';             // What: Link. Why: The ways onward move without a full page load. How: This renders them as router links.
import { SigRinCom } from '../../ui/signal-rings.tsx'; // What: Signal Rings Component. Why: The page carries the site's calm motif, so a wrong turn still feels like the same friendly place. How: The page draws it above the message.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * not-found.tsx = Not Found
 *
 * @summary
 * The 404 page every unknown address shows, inside the site's bar and
 * footer: the signal rings, a calm message that the page isn't here, and
 * three ways onward, home, the articles, and the question form. Its own
 * title and a noindex robots tag keep search engines from indexing it under
 * every mistyped address. The router's catch-all route renders it, and so
 * does an article address naming no article.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region NotFouCom

/**
 * NotFouCom = Not Found Component
 *
 * @summary
 * Renders the 404 page's title and its noindex robots tag, which React moves
 * into the document head, and the page itself. The rings are decoration,
 * hidden from screen readers, since the heading already says the page
 * wasn't found. Asking a question is the main way onward, as on every page,
 * so its button is the orange one.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The 404 page's title, robots tag, and its section.
 *
 * @example
 * ```tsx
 * NotFouCom() // => <NotFouCom />
 * ```
 *
*/

function NotFouCom () : JSX.Element {


	return (


		<>{ /* What: Not Found Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>Page Not Found | TechGeek.support</title>{ /* What: Page Title Element. Why: A visitor's tab and history should say the address they tried doesn't exist. How: React 19 moves this title into the document head while the page is shown. */ }

			<meta
				name='robots'

				content='noindex'
			/>{ /* What: Robots Meta Element. Why: A single-page app's host answers every unknown address, so search engines would otherwise index this page under each one. How: React 19 moves this noindex tag into the document head while the page is shown. */ }



			<section className={ cssModObj.notFouSec }>{ /* What: Not Found Section Element. Why: The page is one calm, centered message. How: This holds the rings, the text, and the ways onward. */ }


				<SigRinCom className={ cssModObj.notRinSvg } />{ /* What: Signal Rings Component. Why: The site's motif makes a wrong turn feel familiar. How: This draws the rings above the message, sized by the page. */ }



				<p className={ cssModObj.notCodPar }>Error 404</p>{ /* What: Not Found Code Paragraph Element. Why: Some visitors look for the error number. How: This shows it as a small teal label. */ }

				<h1 className={ cssModObj.notTitHea }>That page isn't here</h1>{ /* What: Not Found Title Heading Element. Why: The heading says plainly what happened. How: This shows the page's h1. */ }

				<p className={ cssModObj.notTexPar }>The address may have a typo, or the page may have moved. Nothing's broken on your end. Here are a few good places to go instead.</p>{ /* What: Not Found Text Paragraph Element. Why: A nervous visitor should know it isn't their fault and where to go. How: This explains and reassures. */ }

				<div className={ cssModObj.notActDiv }>{ /* What: Not Found Actions Div Element. Why: The three ways onward sit together. How: This sets them in a centered row that wraps. */ }


					<Link
						className={ cssModObj.butPriAnc }

						to='/contact'
					>Ask a Question</Link>{ /* What: Ask Question Link. Why: Whatever the visitor came for, asking is the surest way to get it. How: This routes to the question form as an orange button. */ }



					<Link
						className={ cssModObj.butSecAnc }

						to='/articles'
					>Browse Articles</Link>{ /* What: Browse Articles Link. Why: The visitor may have been looking for an article. How: This routes to the Articles page as an outlined button. */ }



					<Link
						className={ cssModObj.butSecAnc }

						to='/'
					>Go Home</Link>{ /* What: Go Home Link. Why: The home page is the safe place to start over. How: This routes to the root as an outlined button. */ }


				</div>


			</section>


		</>


	);


}

// #endregion NotFouCom

// #endregion Components



// #region Exports

export { NotFouCom }; // What: Named Exports. Why: The router's catch-all route and the article page render the 404 page. How: This exports NotFouCom.

// #endregion Exports


