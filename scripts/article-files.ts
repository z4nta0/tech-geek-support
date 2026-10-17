


// #region Imports

import { fileURLToPath } from 'node:url';                 // What: File URL To Path. Why: The articles folder is found from this file's own location. How: This turns its URL into a path.
import { parMarFun     } from '../src/utils/markdown.ts'; // What: Parse Markdown Function. Why: Each article's details live in its file's front matter. How: This reads the front matter the same way the site does.
import { readdirSync   } from 'node:fs';                  // What: Read Directory Sync. Why: Every folder under src/articles is one article. How: This lists them.
import { readFileSync  } from 'node:fs';                  // What: Read File Sync. Why: Each article's front matter is in its article.md. How: This reads the file's text.

// #endregion Imports



/**
 * article-files.ts = Article Files
 *
 * @summary
 * Lists the published articles for code that runs in Node rather than in the
 * browser, where the site's own catalog (src/ui/articles.ts) can't load,
 * since it gathers the files through Vite's import.meta.glob. The build
 * reads it to write each article's own page and add the articles to the
 * sitemap, the preview image script reads it to draw each article's image,
 * and the SEO suite reads it to check every article. It reads only the front
 * matter, with the site's own Markdown reader, and lists the articles in
 * address order, so the sitemap's order never shifts when an article is
 * added.
 *
 * Sections:
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const ART_DIR_STR = fileURLToPath( new URL( '../src/articles/', import.meta.url ) ); // What: Article Directory String. Why: Every article's folder sits in src/articles. How: This resolves that folder from this file's own location.



type ArtFilTyp = { ideStr : string, pubStr : string, sumStr : string, titStr : string, topStr : string, updStr : string }; // What: Article File Type. Why: Each consumer reads the same handful of an article's details. How: This types its address, its dates, its summary, its title, and its topic.

const ART_FIL_ARR : ArtFilTyp[] = readdirSync( ART_DIR_STR, { withFileTypes : true } ).filter( ( dirEntObj ) => dirEntObj.isDirectory() ).sort( ( dirOneObj, dirTwoObj ) => dirOneObj.name.localeCompare( dirTwoObj.name ) ).map( ( dirEntObj ) => { // What: Article File Array. Why: Each consumer needs every article's details. How: This sorts the article folders by name, their addresses, and reads each one's front matter into a record.


	const { froMatObj } = parMarFun( readFileSync( `${ ART_DIR_STR }${ dirEntObj.name }/article.md`, 'utf8' ) ); // What: Front Matter Object. Why: The article's details are its front matter's keys. How: This reads the file and keeps only its front matter.



	return { // What: Article File Return. Why: Each consumer reads the details by name. How: This maps the front matter's keys onto the record's.


		ideStr : dirEntObj.name,         // What: Identifier String. Why: An article's address is its folder's name. How: This is the folder's name.
		pubStr : froMatObj.published,    // What: Published String. Why: The sitemap and the preview tags carry the publication date. How: This is the front matter's published date.
		sumStr : froMatObj.summary,      // What: Summary String. Why: The article's preview describes it with its summary. How: This is the front matter's summary.
		titStr : froMatObj.title,        // What: Title String. Why: The article's page and image are named by its title. How: This is the front matter's title.
		topStr : froMatObj.topic,        // What: Topic String. Why: The article's image shows its topic. How: This is the front matter's topic identifier.
		updStr : froMatObj.updated ?? '' // What: Updated String. Why: A revised article's sitemap entry carries its last change. How: This is the front matter's updated date, or empty.


	};


} );

// #endregion Constants



// #region Exports

export { ART_FIL_ARR, type ArtFilTyp }; // What: Named Exports. Why: The build, the preview image script, and the SEO suite read the articles. How: This exports the list and its type.

// #endregion Exports


