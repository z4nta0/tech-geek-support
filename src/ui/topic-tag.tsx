


// #region Imports

import cssModObj from './topic-tag.module.css'; // What: CSS Module Object. Why: The tag's pill is styled in its own module. How: This maps each class name in topic-tag.module.css to its hashed module class.


import { TOP_REC_ARR } from './topics.ts'; // What: Topic Record Array. Why: The tag shows its topic's name. How: The tag looks the name up by the topic's identifier.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * topic-tag.tsx = Topic Tag
 *
 * @summary
 * A small pale teal pill naming an article's topic, shown on the Articles
 * page's list and above an article's title. It takes the topic's identifier
 * and shows its name from the topic list.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type TtcProTyp = { topIdeStr : string }; // What: Topic-Tag-Component Props Type. Why: The tag names one topic. How: This types the topic's identifier.

// #region TopTagCom

/**
 * TopTagCom = Topic Tag Component
 *
 * @summary
 * Renders the topic's name in a teal pill. An identifier with no topic shows
 * the identifier itself, though the article catalog already refuses an
 * article with an unknown topic.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.topIdeStr - Topic Identifier String: The topic's identifier,
 *                          such as internet-wi-fi.
 *
 * @returns The tag's span.
 *
 * @example
 * ```tsx
 * TopTagCom({topIdeStr: 'internet-wi-fi'}) // => <TopTagCom />
 * ```
 *
*/

function TopTagCom ( { topIdeStr } : TtcProTyp ) : JSX.Element {


	return (


		<span className={ cssModObj.topTagSpa }>{ TOP_REC_ARR.find( ( topRecObj ) => topRecObj.ideStr === topIdeStr )?.labStr ?? topIdeStr }</span> // What: Topic Tag Span Element. Why: The pill names the topic. How: This shows the topic's name, found by its identifier.


	);


}

// #endregion TopTagCom

// #endregion Components



// #region Exports

export { TopTagCom }; // What: Named Exports. Why: The Articles page and each article show their topic. How: This exports TopTagCom.

// #endregion Exports


