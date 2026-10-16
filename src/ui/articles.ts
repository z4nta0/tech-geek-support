


// #region Imports

import { parMarFun   } from '../utils/markdown.ts'; // What: Parse Markdown Function. Why: Every article is a Markdown file. How: The catalog reads each one into its front matter and blocks.
import { TOP_REC_ARR } from './topics.ts';          // What: Topic Record Array. Why: Every article belongs to one of the site's topics. How: The catalog checks each article's topic against the list.


import type { BloRecTyp } from '../utils/markdown.ts'; // What: Block Record Type. Why: An article holds its body as blocks. How: This types them.

// #endregion Imports



/**
 * articles.ts = Articles
 *
 * @summary
 * The help article catalog. At build time Vite gathers every
 * src/articles/<slug>/article.md file and every photo or video beside one,
 * and this module turns each article into a record: its address, title,
 * topic, summary, dates, reading time, body blocks, and the built address of
 * each media file it names. Every article is checked as it's read, and a
 * missing field, an unknown topic, or a media file that isn't there stops
 * the build with a message naming the article, so a broken article never
 * ships. The catalog lists the newest articles first.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const ART_TEX_OBJ = import.meta.glob< string >( '../articles/*/article.md', { eager : true, import : 'default', query : '?raw' } ); // What: Article Text Object. Why: Every article's text has to be in the build. How: Vite finds each article.md at build time and inlines its text, keyed by its path.
const MED_URL_OBJ = import.meta.glob< string >( '../articles/*/*.{mp4,webp}', { eager : true, import : 'default' } );               // What: Media URL Object. Why: An article's photos and videos are fingerprinted like every other asset. How: Vite finds each file beside an article and gives its built address, keyed by its path.
const REA_WOR_NUM = 200; // What: Reading Words Number. Why: An article's reading time is estimated from its length. How: This is a relaxed reading pace of 200 words a minute, a little slower than average, suiting the site's readers.

// #endregion Constants



// #region Helpers

type ArtRecTyp = { bloRecArr : BloRecTyp[], ideStr : string, medUrlObj : Record< string, string >, minNum : number, pubStr : string, sumStr : string, titStr : string, topStr : string, updStr : string }; // What: Article Record Type. Why: Every page that shows an article reads the same fields. How: This types the body blocks, the address, the media addresses, the reading minutes, the published date, the summary, the title, the topic, and the updated date, empty when never revised.

// #region artRecFun

/**
 * artRecFun = Article Record Function
 *
 * @summary
 * Builds one article's record from its file's path and text. The article's
 * address is its folder's name. The front matter has to give the title, the
 * topic (one of the site's topic identifiers), the summary, and the
 * published date; anything missing or unknown throws, naming the article.
 * The reading time counts the words in the body's blocks, rounded up to a
 * whole minute. Every media file the body names has to sit in the article's
 * folder, or it throws too.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param filPatStr - File Path String: The article file's path, as Vite's
 *                    glob gives it.
 * @param filTexStr - File Text String: The article file's whole text.
 *
 * @returns The article's record.
 *
 * @example
 * ```ts
 * artRecFun('../articles/why-is-my-wi-fi-so-slow/article.md', filTexStr) // => the Wi-Fi article's record
 * ```
 *
*/

function artRecFun ( filPatStr : string, filTexStr : string ) : ArtRecTyp {


	const ideStr                   = filPatStr.split( '/' ).at( -2 )!; // What: Identifier String. Why: An article's address is its folder's name. How: This takes the path's second-to-last part. // What: Non-Null Note. Why: at() allows undefined for a short array. How: Every glob path ends in a folder and article.md.
	const { bloRecArr, froMatObj } = parMarFun( filTexStr );           // What: Block Record Array And Front Matter Object. Why: The article's fields and body come from its file. How: This reads the file.



	for ( const keyNamStr of [ 'published', 'summary', 'title', 'topic' ] ) { // What: Required Key Loop. Why: Every article needs these four fields to show anywhere. How: This checks each one.


		if ( !froMatObj[ keyNamStr ] ) throw new Error( `Article "${ ideStr }" is missing its ${ keyNamStr } in the front matter.` ); // What: Missing Key Guard. Why: A missing field would show as a blank on the site. How: This stops the build, naming the article and the field.


	}



	if ( !TOP_REC_ARR.some( ( topRecObj ) => topRecObj.ideStr === froMatObj.topic ) ) throw new Error( `Article "${ ideStr }" has an unknown topic, "${ froMatObj.topic }".` ); // What: Unknown Topic Guard. Why: An article with no real topic would never show under a filter. How: This stops the build, naming the article and its topic.



	const medUrlObj : Record< string, string > = {}; // What: Media URL Object. Why: The body names its media by file name, and the page needs each one's built address. How: This collects them.


	for ( const bloRecObj of bloRecArr ) { // What: Media Lookup Loop. Why: Every media block's file has to exist. How: This looks each one up beside the article.


		if ( bloRecObj.kinStr !== 'media' ) continue;



		const medUrlStr = MED_URL_OBJ[ `../articles/${ ideStr }/${ bloRecObj.souStr }` ]; // What: Media URL String. Why: The file's built address comes from Vite's glob. How: This looks it up by its path.


		if ( !medUrlStr ) throw new Error( `Article "${ ideStr }" names ${ bloRecObj.souStr }, which isn't in its folder.` ); // What: Missing Media Guard. Why: A missing photo would show as a broken image. How: This stops the build, naming the article and the file.



		medUrlObj[ bloRecObj.souStr ] = medUrlStr; // What: Media URL Store. Why: The page finds each file's address by its name. How: This stores it.


	}



	const bodTexStr = bloRecArr.map( ( bloRecObj ) => 'iteTokArr' in bloRecObj ? bloRecObj.iteTokArr.flat() : 'inlTokArr' in bloRecObj ? bloRecObj.inlTokArr : [] ).flat().map( ( inlTokObj ) => inlTokObj.texStr ).join( ' ' ); // What: Body Text String. Why: The reading time counts the words a reader reads. How: This gathers the text of every heading, paragraph, tip, and list item.
	const minNum    = Math.max( 1, Math.ceil( bodTexStr.split( /\s+/ ).filter( Boolean ).length / REA_WOR_NUM ) ); // What: Minutes Number. Why: Each article shows how long it takes to read. How: This divides the word count by the reading pace, rounding up to at least a minute.



	return { // What: Article Record Return. Why: Every page reads the article from one record. How: This gathers its fields.


		bloRecArr,                       // What: Block Record Array. Why: The article's page renders the body. How: This is the parsed body's blocks.
		ideStr,                          // What: Identifier String. Why: The article's address is its folder's name. How: This is that name.
		medUrlObj,                       // What: Media URL Object. Why: The body's media need their built addresses. How: This maps each file name to its address.
		minNum,                          // What: Minutes Number. Why: The article shows its reading time. How: This is the estimate in whole minutes.
		pubStr : froMatObj.published,    // What: Published String. Why: The article shows when it was published. How: This is the front matter's published date.
		sumStr : froMatObj.summary,      // What: Summary String. Why: Cards and search listings show the summary. How: This is the front matter's summary.
		titStr : froMatObj.title,        // What: Title String. Why: The article is named everywhere by its title. How: This is the front matter's title.
		topStr : froMatObj.topic,        // What: Topic String. Why: The article is listed under its topic. How: This is the front matter's topic identifier.
		updStr : froMatObj.updated ?? '' // What: Updated String. Why: A revised article shows when it was last updated. How: This is the front matter's updated date, or empty when it was never revised.


	};


}

// #endregion artRecFun



const ART_REC_ARR = Object.entries( ART_TEX_OBJ ).map( ( [ filPatStr, filTexStr ] ) => artRecFun( filPatStr, filTexStr ) ).sort( ( artOneObj, artTwoObj ) => artTwoObj.pubStr.localeCompare( artOneObj.pubStr ) || artOneObj.titStr.localeCompare( artTwoObj.titStr ) ); // What: Article Record Array. Why: The pages list every article, newest first. How: This builds a record from every file and sorts by published date, newest first, then by title.

// #endregion Helpers




// #region Exports

export { ART_REC_ARR, type ArtRecTyp }; // What: Named Exports. Why: Home, the Articles page, and each article's page read the catalog. How: This exports the records and their type.

// #endregion Exports


