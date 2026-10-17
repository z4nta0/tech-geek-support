


// #region Imports

import react from '@vitejs/plugin-react'; // What: React. Why: Vite needs the React plugin to compile JSX. How: This is called first in the plugins array.


import { ART_FIL_ARR  } from './scripts/article-files.ts'; // What: Article File Array. Why: Every article gets its own page carrying its title, description, and link preview, and a sitemap entry. How: The article pages plugin writes one per row.
import { artTitFun    } from './src/ui/article-title.ts';  // What: Article Title Function. Why: An article's own page has to carry the title its React page shows. How: artTagFun names each page through it.
import { defineConfig } from 'vite';                       // What: Define Config. Why: Vite's config helper passes the config through with its types. How: This wraps VIT_CON_OBJ.
import { mkdir        } from 'node:fs/promises';           // What: Make Directory. Why: The article pages go in their own folder of the build. How: This creates it.
import { readFile     } from 'node:fs/promises';           // What: Read File. Why: The article pages are copies of the built page, and the sitemap and rewrite rules gain the articles. How: This reads the built index.html, _redirects, and sitemap.xml, and the sitemap's source for the dev server.
import { resolve      } from 'node:path';                  // What: Resolve. Why: The article pages are written beside the built index.html. How: This joins the build folder with each file name.
import { TOP_REC_ARR  } from './src/ui/topics.ts';         // What: Topic Record Array. Why: An article's preview tags name its topic. How: artTagFun looks the label up by the article's topic identifier.
import { writeFile    } from 'node:fs/promises';           // What: Write File. Why: Each article's page, the rewrite rules, and the sitemap are files in the build. How: This writes them.


import type { ArtFilTyp } from './scripts/article-files.ts'; // What: Article File Type. Why: An article's page is written from its details. How: This types the article artTagFun reads.
import type { Plugin    } from 'vite';                       // What: Plugin. Why: The page minifier and the article pages are Vite plugins. How: This types their returns, which types their hooks.

// #endregion Imports



/**
 * vite.config.ts = Vite Config
 *
 * @summary
 * The build and dev server config. It compiles React, reads CSS module class
 * names as camelCase keys, and, for production builds only, compacts
 * index.html, which Vite processes but never minifies, so the page's comments
 * and indentation stay out of what visitors download. It also gives every
 * article a page of its own, a copy of index.html carrying the article's
 * title, description, link preview, and structured data, since link scrapers
 * read only a page's raw HTML, and lists every article in the sitemap: the
 * dev server serves both that way, and the build writes the copies, the
 * rewrite rules that serve them, and the fuller sitemap. Every other setting
 * stays at Vite's default, including copying the files in public/ (the icons,
 * the social images, the crawler files, and Netlify's _headers and
 * _redirects) into the build untouched.
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

const LIV_URL_STR = 'https://techgeek.support/'; // What: Live URL String. Why: Link preview tags, structured data, and the sitemap need absolute addresses. How: Each article's address and image are built on the live site's root.

// #endregion Constants



// #region Helpers

const htmEscFun = ( rawTexStr : string ) : string => rawTexStr.replace( /&/g, '&amp;' ).replace( /"/g, '&quot;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ); // What: HTML Escape Function. Why: An article's text goes into double-quoted attributes, and some holds apostrophes and could hold quotes. How: This escapes the characters that would break out of the attribute.



// #region artTagFun

/**
 * artTagFun = Article Tag Function
 *
 * @summary
 * Rewrites the home page's head for one article: the title, the description,
 * and every Open Graph and Twitter tag that names the page, its address, or
 * its image, with og:type set to article. Each tag is found by its name or
 * property, whichever quotes it uses and whether or not the page has been
 * compacted, and replaced whole, so the result is the same in the dev
 * server's page and the built one. It then adds the article's publication
 * date, its topic, and its own Article structured data, naming z4nta0 as its
 * author, just before the head closes. An article's link preview image is its
 * own PNG in public/social/, named after its address. The canonical link
 * stays with the article's page in React.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param htmTexStr - HTML Text String: The home page's HTML.
 * @param artFilObj - Article File Object: {@link ArtFilTyp}
 *
 * @returns The page's HTML with the article's tags in place of the home
 *          page's.
 *
 * @example
 * ```ts
 * artTagFun(htmTexStr, artFilObj) // => the article's page
 * ```
 *
*/

const artTagFun = ( htmTexStr : string, artFilObj : ArtFilTyp ) : string => { // What: Article Tag Function. Why: Each article's page has to name the article to link scrapers. How: This swaps each of the home page's tags for the article's and adds its own.


	const topLabStr = TOP_REC_ARR.find( ( topRecObj ) => topRecObj.ideStr === artFilObj.topStr )?.labStr ?? ''; // What: Topic Label String. Why: The article's preview tags name its topic. How: This looks the label up by the article's topic identifier.
	const artAltStr = htmEscFun( `The title ${ artFilObj.titStr } under its topic, ${ topLabStr }, above the TechGeek.support wordmark, between soft teal signal rings.` ); // What: Article Alternative String. Why: The preview image needs a description. How: This describes what the article's image shows and escapes it.
	const artDesStr = htmEscFun( artFilObj.sumStr );                                                            // What: Article Description String. Why: The article's summary is its search description and its preview's summary. How: This escapes it for an attribute.
	const artImaStr = `${ LIV_URL_STR }social/${ artFilObj.ideStr }.png`;                                       // What: Article Image String. Why: Each article's preview shows its own image. How: This is its PNG's absolute address.
	const artTitStr = htmEscFun( artTitFun( artFilObj.titStr ) );                                               // What: Article Title String. Why: The page's title and preview title match the article page's own title. How: This builds and escapes it.
	const artUrlStr = `${ LIV_URL_STR }articles/${ artFilObj.ideStr }`;                                         // What: Article URL String. Why: The preview links to the article's own address. How: This is its absolute address.


	const tagRowArr : [ string, string ][] = [ // What: Tag Row Array. Why: Every tag the article changes is found and replaced the same way. How: Each row pairs a tag's name or property with its article value.


		[ 'description', artDesStr ],         // What: Description Row. Why: Search listings and many previews read the plain description. How: This sets the article's.
		[ 'og:description', artDesStr ],      // What: Open Graph Description Row. Why: Most previews show this summary. How: This sets the article's.
		[ 'og:image', artImaStr ],            // What: Open Graph Image Row. Why: Most previews show this picture. How: This points at the article's own image.
		[ 'og:image:alt', artAltStr ],        // What: Open Graph Image Alt Row. Why: The picture needs a description. How: This sets the article's alt text.
		[ 'og:title', artTitStr ],            // What: Open Graph Title Row. Why: Most previews lead with this title. How: This sets the article's.
		[ 'og:type', 'article' ],             // What: Open Graph Type Row. Why: Sites shape a preview for an article differently from a whole website. How: This marks the page as an article.
		[ 'og:url', artUrlStr ],              // What: Open Graph URL Row. Why: The preview points at the article's address. How: This sets it.
		[ 'twitter:description', artDesStr ], // What: Twitter Description Row. Why: X shows this summary. How: This sets the article's.
		[ 'twitter:image', artImaStr ],       // What: Twitter Image Row. Why: X shows this picture. How: This points at the article's own image.
		[ 'twitter:image:alt', artAltStr ],   // What: Twitter Image Alt Row. Why: X describes the picture with this. How: This sets the article's alt text.
		[ 'twitter:title', artTitStr ]        // What: Twitter Title Row. Why: X leads with this title. How: This sets the article's.


	];


	const artLdjObj = { // What: Article Linked-Data-JSON Object. Why: Search engines read an article's headline, dates, and author from its structured data. How: This describes the article as the page shows it, naming the same person and site as index.html's data.


		'@context'    : 'https://schema.org',                       // What: Context. Why: Search engines read the keys by schema.org's vocabulary. How: This names it.
		'@type'       : 'Article',                                  // What: Type. Why: The page is one article. How: This marks the node as an Article.
		author        : { '@id' : 'https://techgeek.dev/#person' }, // What: Author. Why: z4nta0 writes every article. How: This points at the Person node TechGeek.dev and index.html describe.
		dateModified  : artFilObj.updStr || artFilObj.pubStr,       // What: Date Modified. Why: Search engines show how fresh an article is. How: This is its updated date, or its publication date when it hasn't been revised.
		datePublished : artFilObj.pubStr,                           // What: Date Published. Why: Search engines show when an article was written. How: This is its publication date.
		description   : artFilObj.sumStr,                           // What: Description. Why: The data describes the article as its page does. How: This is its summary.
		headline      : artFilObj.titStr,                           // What: Headline. Why: The data names the article as its page does. How: This is its title, without the site's name.
		image         : artImaStr,                                  // What: Image. Why: Search results can show an article's picture. How: This is its preview image.
		inLanguage    : 'en-US',                                    // What: In Language. Why: Every article is written in US English. How: This names the language.
		isPartOf      : { '@id' : `${ LIV_URL_STR }#website` },     // What: Is Part Of. Why: The article belongs to this site. How: This points at the WebSite node in index.html's data.
		url           : artUrlStr                                   // What: URL. Why: The data names the article's own address. How: This is its canonical address.


	};


	const metAddStr = [ // What: Meta Additions String. Why: An article's preview can also carry when it was published and what it's about, which the home page has no use for. How: This joins the extra tags and the structured data into the text added before the head closes.


		`<meta property="article:published_time" content="${ artFilObj.pubStr }" />`,                                   // What: Published Time Row. Why: Some previews and crawlers show when an article was written. How: This gives its publication date.
		...( artFilObj.updStr ? [ `<meta property="article:modified_time" content="${ artFilObj.updStr }" />` ] : [] ), // What: Modified Time Row. Why: A revised article should say when it last changed. How: This gives its updated date, only when it has one.
		`<meta property="article:section" content="${ htmEscFun( topLabStr ) }" />`,                                    // What: Section Row. Why: An article's topic tells a reader what it's about before they tap. How: This gives its topic's label.
		`<script type='application/ld+json'>${ JSON.stringify( artLdjObj ).replace( /</g, '\\u003c' ) }</script>`       // What: Structured Data Row. Why: Search engines read the article's details from JSON-LD. How: This writes the object on one line, with every < escaped so no text can close the script early.


	].join( '\n' );



	return tagRowArr.reduce( ( curHtmStr, [ tagKeyStr, tagValStr ] ) => curHtmStr.replace( new RegExp( `<meta\\s+(name|property)=['"]${ tagKeyStr.replace( /:/g, '\\:' ) }['"][^>]*>` ), `<meta $1="${ tagKeyStr }" content="${ tagValStr }" />` ), htmTexStr.replace( /<title>[^<]*<\/title>/, `<title>${ artTitStr }</title>` ).replace( '</head>', `${ metAddStr }\n</head>` ) ); // What: Tagged Page Return. Why: The page's title and every listed tag carry the article's values, with its own extras added. How: This replaces the title, adds the extras before the head closes, then replaces each tag in turn, keeping whether it used name or property.


};

// #endregion artTagFun



// #region sitXmlFun

/**
 * sitXmlFun = Sitemap XML Function
 *
 * @summary
 * Adds every article to the sitemap. The site's own pages are listed by hand
 * in public/sitemap.xml, while the articles come and go with the files in
 * src/articles, so each one gets an entry here, with its last change (its
 * updated date, or its publication date) for crawlers deciding when to come
 * back. The entries go just before the sitemap closes, after the site's pages,
 * in address order.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param xmlTexStr - XML Text String: The sitemap as written in public/.
 *
 * @returns The sitemap with an entry for every article.
 *
 * @example
 * ```ts
 * sitXmlFun(xmlTexStr) // => the sitemap with the articles listed
 * ```
 *
*/

const sitXmlFun = ( xmlTexStr : string ) : string => xmlTexStr.replace( /\n*<\/urlset>/, `\n\n${ ART_FIL_ARR.map( ( artFilObj ) => `\t<url><loc>${ LIV_URL_STR }articles/${ artFilObj.ideStr }</loc><lastmod>${ artFilObj.updStr || artFilObj.pubStr }</lastmod></url>` ).join( '\n' ) }\n\n\n</urlset>` ); // What: Sitemap XML Function. Why: Crawlers should find every article without the sitemap being edited by hand. How: This adds one entry per article before the closing tag.

// #endregion sitXmlFun



// #region artPagFun

/**
 * artPagFun = Article Pages Function
 *
 * @summary
 * Builds the Vite plugin that gives every article a page of its own and a
 * sitemap entry. On the dev server it rewrites the page it serves for an
 * article's address and serves the sitemap with the articles added, so the
 * SEO suite can read both raw. After a production build it writes one copy of
 * the built index.html per article, as articles/<address>.html, through
 * artTagFun, puts a rewrite rule for each article's address ahead of the
 * site's catch-all in _redirects, so Netlify serves the article's own page
 * while every other path still loads index.html, and adds the articles to
 * the built sitemap.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param void - This function takes no parameters.
 *
 * @returns The plugin object, for the config's plugins array.
 *
 * @example
 * ```ts
 * artPagFun() // => the plugin object
 * ```
 *
*/

const artPagFun = () : Plugin => { // What: Article Pages Function. Why: Link scrapers read only a page's raw HTML, so each article needs a page of its own. How: This returns a plugin that serves and writes them.


	let buiRecObj = { buiBoo : false, outStr : '', rooStr : '' }; // What: Build Record Object. Why: The pages are written only after a production build, into its output folder, and the dev server reads the sitemap from the project. How: This holds whether the run is a build, where it writes, and the project's root, once Vite has resolved its config.



	return { // What: Plugin Return. Why: Vite runs each hook at its own stage. How: This returns the plugin's hooks.


		name : 'article-pages', // What: Name. Why: Vite reports a plugin's warnings and errors under its name. How: This names the plugin.

		closeBundle : async () => { // What: Close Bundle Hook. Why: The article pages copy the built page, which exists only once the build is written. How: This writes each article's page, its rewrite rules, and the fuller sitemap after the build.


			if ( !buiRecObj.buiBoo ) return; // What: Build Guard. Why: The dev server writes nothing. How: This returns early outside a build.



			const indHtmStr = await readFile( resolve( buiRecObj.outStr, 'index.html' ), 'utf8' );                                                               // What: Index HTML String. Why: Every article page starts from the built page, bundle tags and all. How: This reads it.
			const redPatStr = resolve( buiRecObj.outStr, '_redirects' );                                                                                         // What: Redirects Path String. Why: The rewrite rules go into the built copy of _redirects. How: This is its path.
			const redTexStr = await readFile( redPatStr, 'utf8' );                                                                                               // What: Redirects Text String. Why: The article rules go ahead of the site's existing rules. How: This reads the built copy.
			const artRulStr = ART_FIL_ARR.map( ( artFilObj ) => `/articles/${ artFilObj.ideStr }    /articles/${ artFilObj.ideStr }.html    200` ).join( '\n' ); // What: Article Rules String. Why: Each article's address has to serve its own page rather than index.html. How: This writes a rewrite rule per article.
			const sitPatStr = resolve( buiRecObj.outStr, 'sitemap.xml' );                                                                                        // What: Sitemap Path String. Why: The articles go into the built copy of the sitemap. How: This is its path.


			await mkdir( resolve( buiRecObj.outStr, 'articles' ), { recursive : true } ); // What: Articles Folder Creation. Why: The article pages sit under articles/, matching their addresses. How: This creates the folder in the build.

			await Promise.all( ART_FIL_ARR.map( ( artFilObj ) => writeFile( resolve( buiRecObj.outStr, 'articles', `${ artFilObj.ideStr }.html` ), artTagFun( indHtmStr, artFilObj ) ) ) ); // What: Article Pages Write. Why: Each article needs its own page. How: This writes one tagged copy of the built page per article.

			await writeFile( redPatStr, `# What: Article Page Rules. Why: Each article's address serves its own page, which carries its link preview. How: These rewrite each article's address to its page, ahead of the catch-all.\n${ artRulStr }\n\n\n\n${ redTexStr }` ); // What: Redirects Write. Why: The article rules must come before the catch-all, which would otherwise answer every article's address. How: This writes them ahead of the existing rules.

			await writeFile( sitPatStr, sitXmlFun( await readFile( sitPatStr, 'utf8' ) ) ); // What: Sitemap Write. Why: Crawlers should find every article. How: This rewrites the built sitemap with the articles added.


		},

		configResolved : ( conResObj ) => { // What: Config Resolved Hook. Why: The pages are written only after a build, into its output folder. How: This records the run's kind, its output folder, and the project's root once Vite has resolved its config.


			buiRecObj = { // What: Build Record Assignment. Why: The other hooks need these. How: This stores whether this is a build, its output folder, and the root.


				buiBoo : conResObj.command === 'build',                     // What: Build Boolean. Why: The dev server writes nothing. How: This is true only for a production build.
				outStr : resolve( conResObj.root, conResObj.build.outDir ), // What: Output String. Why: The pages are written beside the built index.html. How: This is the build's resolved output folder.
				rooStr : conResObj.root                                     // What: Root String. Why: The dev server reads the sitemap from public/. How: This is the project's root.


			};


		},

		configureServer : ( serInsObj ) => { // What: Configure Server Hook. Why: The dev server should serve the sitemap the build writes, so the SEO suite can check it. How: This answers the sitemap's address itself, ahead of Vite's own file serving.


			serInsObj.middlewares.use( async ( reqInsObj, resInsObj, nexMidFun ) => { // What: Sitemap Middleware. Why: The sitemap in public/ lists only the site's own pages. How: This answers the sitemap's address with the articles added, as XML, and passes every other request on.


				if ( reqInsObj.url !== '/sitemap.xml' ) return nexMidFun(); // What: Other Request Guard. Why: Only the sitemap is answered here. How: This hands any other request on to Vite.



				resInsObj.setHeader( 'Content-Type', 'application/xml' ); // What: Content Type Header. Why: Crawlers and the suite read the sitemap as XML. How: This marks the reply.

				resInsObj.end( sitXmlFun( await readFile( resolve( buiRecObj.rooStr, 'public', 'sitemap.xml' ), 'utf8' ) ) ); // What: Sitemap Reply. Why: The reply carries every page and article. How: This sends the fuller sitemap.


			} );


		},

		transformIndexHtml : ( htmTexStr, cotIndObj ) => { // What: Transform Index HTML Hook. Why: On the dev server, an article's address should serve the article's own tags, as the built site does. How: This rewrites the page for an article's address and leaves every other page alone.


			const reqPatStr = new URL( cotIndObj.originalUrl ?? '/', LIV_URL_STR ).pathname;                        // What: Requested Path String. Why: The requested address names the article, if any. How: This reads the path without its query.
			const artFilObj = ART_FIL_ARR.find( ( artCurObj ) => `/articles/${ artCurObj.ideStr }` === reqPatStr ); // What: Article File Object. Why: Only an article's address gets an article's tags. How: This finds the article, if the address names one.



			return artFilObj ? artTagFun( htmTexStr, artFilObj ) : htmTexStr; // What: Page Return. Why: Every other page keeps the home page's tags. How: This returns the article's page or the page as it was.


		}


	};


};

// #endregion artPagFun



// #region minHtmFun

/**
 * minHtmFun = Minify HTML Function
 *
 * @summary
 * Builds the Vite plugin that compacts the shipped index.html. Vite injects
 * the bundle's script and stylesheet tags into the page but otherwise ships
 * it as written, with every comment and indentation level the formatting
 * rules give it. For production builds only, this re-serializes any JSON-LD
 * the page holds on one line, which also fails the build if that JSON is ever
 * invalid, strips the page's HTML comments and the comment inside its
 * external script tag, trims every line, and drops blank lines. The newlines
 * between lines are kept, so text wrapped across lines keeps the space
 * between its words. It runs after Vite's own transforms, so the tags Vite
 * injects are compacted too. The dev server serves the page as written.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param void - This function takes no parameters.
 *
 * @returns The plugin object, for the config's plugins array.
 *
 * @example
 * ```ts
 * minHtmFun() // => { apply, name, transformIndexHtml }
 * ```
 *
*/

const minHtmFun = () : Plugin => ({ // What: Minify HTML Function. Why: index.html ships as written unless something minifies it. How: This returns a build-only Vite plugin that does.


	apply : 'build',               // What: Apply. Why: The dev server should serve the page as written. How: This runs the plugin only during npm run build.
	name  : 'minify-shipped-page', // What: Name. Why: Vite reports a plugin's warnings and errors under its name. How: This names the plugin.

	transformIndexHtml : { // What: Transform Index HTML Hook. Why: Vite processes index.html but doesn't minify it. How: This compacts the page after Vite's own changes.


		order : 'post', // What: Order. Why: The page should be compacted only after Vite has injected the bundle's script and stylesheet tags. How: This runs after Vite's own transforms.

		handler : ( htmTexStr ) => { // What: Handler. Why: This is the plugin's actual work. How: This compacts any structured data, strips comments, then drops indentation and blank lines.


			return htmTexStr                                                                               // What: Compacted Page Return. Why: Vite writes whatever this returns as the shipped page. How: This chains each compaction over the page's text.
				.replace( /(?<=<script type='application\/ld\+json'>)[\s\S]*?(?=<\/script>)/g, ( jsoTexStr ) => JSON.stringify( JSON.parse( jsoTexStr ) ) ) // What: JSON-LD Compaction. Why: Structured data reads the same without its indentation, and invalid JSON should stop the build rather than ship. How: This parses each JSON-LD script's contents and writes them back on one line.
				.replace( /(<script\b[^>]*\bsrc=[^>]*>)\s*(?:\/\*[\s\S]*?\*\/\s*)+(<\/script>)/g, '$1$2' ) // What: External Script Comment Strip. Why: An external script's only content is its comment. How: This empties the tag.
				.replace( /<!--[\s\S]*?-->/g, '' )                                                         // What: HTML Comment Strip. Why: Comments mean nothing to the browser. How: This removes every HTML comment.
				.split( '\n' )                                                                             // What: Line Split. Why: Indentation and blank lines are dropped line by line. How: This splits the page into lines.
				.map( ( linTexStr ) => linTexStr.trim() )                                                  // What: Indentation Trim. Why: Indentation means nothing to the browser. How: This trims each line.
				.filter( Boolean )                                                                         // What: Blank Line Filter. Why: Blank lines mean nothing to the browser. How: This drops every empty line.
				.join( '\n' );                                                                             // What: Line Join. Why: The page has to be one string again. How: This rejoins the remaining lines with newlines, which keep the spaces between words in wrapped text.


		}


	}


});

// #endregion minHtmFun



const VIT_CON_OBJ = defineConfig({ // What: Vite Config Object. Why: Vite reads its whole configuration from this file's default export. How: This builds the config, including the minHtmFun and artPagFun plugins above.


	css     : { modules : { localsConvention : 'camelCaseOnly' } }, // What: CSS. Why: CSS modules expose each class name as a camelCase key only, so every module reads the same way, per the CSS modules rules. How: This sets the locals convention.
	plugins : [ react(), minHtmFun(), artPagFun() ]                 // What: Plugins. Why: Vite builds the site through these plugins, in this order. How: This lists React, the page minifier, and the article pages, which copy the page after the minifier has compacted it.


});

// #endregion Helpers



// #region Exports

export default VIT_CON_OBJ; // What: Default Export. Why: Vite reads its config from this file's default export. How: This exports VIT_CON_OBJ.

// #endregion Exports


