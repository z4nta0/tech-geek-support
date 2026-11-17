


// #region Imports

import { existsSync    } from 'node:fs';                  // What: Exists Sync. Why: Each photo or video an article names has to be in its folder. How: This checks the file is there.
import { fileURLToPath } from 'node:url';                 // What: File URL To Path. Why: The articles folder is found from this file's own location. How: This turns its URL into a path.
import { parMarFun     } from '../src/utils/markdown.ts'; // What: Parse Markdown Function. Why: Each article's details live in its file. How: This reads its front matter and body the same way the site does.
import { readdirSync   } from 'node:fs';                  // What: Read Directory Sync. Why: Every folder under src/articles is one article. How: This lists them.
import { readFileSync  } from 'node:fs';                  // What: Read File Sync. Why: Each article's details are in its article.md. How: This reads the file's text.
import { TOP_REC_ARR   } from '../src/ui/topics.ts';      // What: Topic Record Array. Why: An article's topic has to be one the site lists. How: This lists the topics.

// #endregion Imports



/**
 * article-files.ts = Article Files
 *
 * @summary
 * Lists the published articles for code that runs in Node rather than in the
 * browser, such as the build writing each article's own page. There the site's
 * own catalog (src/ui/articles.ts) can't load, since it gathers the files
 * through Vite's import.meta.glob. It reads each article with the site's own
 * Markdown reader and lists the articles in address order, so the sitemap's
 * order never shifts when an article is added. It also refuses a broken
 * article: a missing field, an unknown topic, or a photo or video that isn't
 * in its folder throws an error naming the article, which stops the build and
 * the dev server before a broken article can ship.
 *
 * Sections:
 *  - Constants
 *  - Module State
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const ART_DIR_STR = fileURLToPath( new URL( '../src/articles/', import.meta.url ) ); // What: Article Directory String. Why: Every article's folder sits in src/articles. How: This resolves that folder from this file's own location.

// #endregion Constants



// #region Module State

type ArtFilTyp = { ideStr : string, pubStr : string, sumStr : string, titStr : string, topStr : string, updStr : string }; // What: Article File Type. Why: Each consumer reads the same handful of an article's details. How: This types its address, its dates, its summary, its title, and its topic.

const ART_FIL_ARR : ArtFilTyp[] = readdirSync( ART_DIR_STR, { withFileTypes : true } ).filter( ( dirEntObj ) => dirEntObj.isDirectory() ).sort( ( dirOneObj, dirTwoObj ) => dirOneObj.name.localeCompare( dirTwoObj.name ) ).map( ( dirEntObj ) => { // What: Article File Array. Why: Each consumer needs every article's details. How: This sorts the article folders by name, their addresses, checks each article, and reads its front matter into a record.


	const { bloRecArr, froMatObj } = parMarFun( readFileSync( `${ ART_DIR_STR }${ dirEntObj.name }/article.md`, 'utf8' ) ); // What: Block Record Array. Why: The article's body names its media. How: This takes the parser's blocks. // What: Front Matter Object. Why: The article's details are its front matter's keys. How: This takes the parser's key and value pairs.


	for ( const keyNamStr of [ 'published', 'summary', 'title', 'topic' ] ) { // What: Required Key Loop. Why: Every article needs these four fields to show anywhere. How: This checks each one.


		if ( !froMatObj[ keyNamStr ] ) throw new Error( `Article "${ dirEntObj.name }" is missing its ${ keyNamStr } in the front matter.` ); // What: Missing Key Guard. Why: A missing field would show as a blank on the site. How: This stops the build, naming the article and the field.


	}



	if ( !TOP_REC_ARR.some( ( topRecObj ) => topRecObj.ideStr === froMatObj.topic ) ) throw new Error( `Article "${ dirEntObj.name }" has an unknown topic, "${ froMatObj.topic }".` ); // What: Unknown Topic Guard. Why: An article with no real topic would never show under a filter. How: This stops the build, naming the article and its topic.



	for ( const bloRecObj of bloRecArr ) { // What: Media Check Loop. Why: Every photo or video an article names has to be in its folder. How: This checks each media block's file.


		if ( bloRecObj.kinStr === 'media' && !existsSync( `${ ART_DIR_STR }${ dirEntObj.name }/${ bloRecObj.souStr }` ) ) throw new Error( `Article "${ dirEntObj.name }" names ${ bloRecObj.souStr }, which isn't in its folder.` ); // What: Missing Media Guard. Why: A missing photo would show as a broken image. How: This stops the build, naming the article and the file.


	}



	return { // What: Article File Return. Why: Each consumer reads the details by name. How: This maps the front matter's keys onto the record's.


		ideStr : dirEntObj.name,         // What: Identifier String. Why: An article's address is its folder's name. How: This is the folder's name.
		pubStr : froMatObj.published,    // What: Published String. Why: The sitemap and the preview tags carry the publication date. How: This is the front matter's published date.
		sumStr : froMatObj.summary,      // What: Summary String. Why: The article's preview describes it with its summary. How: This is the front matter's summary.
		titStr : froMatObj.title,        // What: Title String. Why: The article's page and image are named by its title. How: This is the front matter's title.
		topStr : froMatObj.topic,        // What: Topic String. Why: The article's image shows its topic. How: This is the front matter's topic identifier.
		updStr : froMatObj.updated ?? '' // What: Updated String. Why: A revised article's sitemap entry carries its last change. How: This is the front matter's updated date, or empty.


	};


} );

// #endregion Module State



// #region Exports

export { ART_FIL_ARR, type ArtFilTyp }; // What: Named Exports. Why: Code that runs in Node, such as the build, reads the articles. How: This exports the list and its type.

// #endregion Exports


