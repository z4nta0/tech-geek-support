


/**
 * markdown.ts = Markdown
 *
 * @summary
 * A small Markdown reader for the few things a help article uses, turning a
 * file's text into its front matter and a list of blocks a page can render
 * as its own elements. It never produces or passes through HTML, so nothing
 * in a file can inject markup. Blocks are headings (## and ###), paragraphs,
 * numbered steps (1.), bullet lists (-), tips (> lines), and a photo or video
 * alone on its line (![alt](file "caption")); inside a line it reads bold
 * (**text**), italic (*text*), and links ([text](address)). An HTML comment
 * on lines of its own is skipped, and anything else reads as plain text.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type InlTokTyp = { hreStr? : string, kinStr : 'bold' | 'italic' | 'link' | 'text', texStr : string }; // What: Inline Token Type. Why: A line of text is a run of plain, bold, italic, and linked pieces. How: This types one piece: its kind, its text, and a link's address.

type BloRecTyp = // What: Block Record Type. Why: An article is a list of blocks of a few kinds. How: This types each kind of block by its kinStr.
	| { inlTokArr : InlTokTyp[], kinStr : 'heading', levNum : 2 | 3 }          // What: Heading Block. Why: Sections are named by headings. How: This holds the heading's level and text.
	| { inlTokArr : InlTokTyp[], kinStr : 'paragraph' }                        // What: Paragraph Block. Why: Most text is paragraphs. How: This holds the paragraph's text.
	| { inlTokArr : InlTokTyp[], kinStr : 'tip' }                              // What: Tip Block. Why: A tip is a paragraph set apart from the steps. How: This holds the tip's text.
	| { iteTokArr : InlTokTyp[][], kinStr : 'ordered' }                        // What: Ordered List Block. Why: Steps are done in order. How: This holds each step's text.
	| { iteTokArr : InlTokTyp[][], kinStr : 'unordered' }                      // What: Unordered List Block. Why: Some points have no order. How: This holds each point's text.
	| { altStr : string, capStr : string, kinStr : 'media', souStr : string }; // What: Media Block. Why: A photo or video stands on its own line. How: This holds its alt text, caption, and file name.

// #endregion Types



// #region Constants

const INL_PAT_REG = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g; // What: Inline Pattern Regular Expression. Why: Bold, italic, and links are the only marks inside a line. How: This matches **bold**, *italic*, or [text](address), capturing each one's parts.
const MED_PAT_REG = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;      // What: Media Pattern Regular Expression. Why: A photo or video sits alone on its line. How: This matches ![alt](file "caption"), the caption optional, capturing all three.

// #endregion Constants



// #region Helpers

// #region parInlFun

/**
 * parInlFun = Parse Inline Function
 *
 * @summary
 * Splits one line of text into its plain, bold, italic, and linked pieces, in
 * order. Text between the marks becomes plain pieces, and a mark that isn't
 * closed stays plain text, asterisks and all.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param texLinStr - Text Line String: The line to split.
 *
 * @returns The line's pieces in order.
 * @see {@link inlTokArr}
 *
 * @example
 * ```ts
 * parInlFun('Press **Restart** now') // => three pieces: text, bold, text
 * ```
 *
*/

function parInlFun ( texLinStr : string ) : InlTokTyp[] {


	const inlTokArr : InlTokTyp[] = []; // What: Inline Token Array. Why: The pieces are collected in order. How: This starts empty.

	let preEndNum = 0; // What: Previous End Number. Why: Plain text runs from the end of one mark to the start of the next. How: This remembers where the last mark ended.


	for ( const matCurObj of texLinStr.matchAll( INL_PAT_REG ) ) { // What: Mark Loop. Why: Every mark in the line becomes its own piece. How: This walks the matches in order.


		const matIndNum = matCurObj.index; // What: Match Index Number. Why: The plain text before the mark ends where it starts. How: This reads where the match begins.


		if ( matIndNum > preEndNum ) inlTokArr.push( { kinStr : 'text', texStr : texLinStr.slice( preEndNum, matIndNum ) } ); // What: Leading Text Push. Why: Text before the mark is plain. How: This adds it as a text piece when there is any.



		if ( matCurObj[ 1 ] !== undefined ) inlTokArr.push( { kinStr : 'bold', texStr : matCurObj[ 1 ] } ); // What: Bold Push. Why: **text** is bold. How: This adds the first group as a bold piece.

		else if ( matCurObj[ 2 ] !== undefined ) inlTokArr.push( { kinStr : 'italic', texStr : matCurObj[ 2 ] } ); // What: Italic Push. Why: *text* is italic. How: This adds the second group as an italic piece.

		else inlTokArr.push( { hreStr : matCurObj[ 4 ], kinStr : 'link', texStr : matCurObj[ 3 ] } ); // What: Link Push. Why: [text](address) is a link. How: This adds the third and fourth groups as a link piece.



		preEndNum = matIndNum + matCurObj[ 0 ].length; // What: Previous End Update. Why: The next plain text starts after this mark. How: This moves past the whole match.


	}



	if ( preEndNum < texLinStr.length ) inlTokArr.push( { kinStr : 'text', texStr : texLinStr.slice( preEndNum ) } ); // What: Trailing Text Push. Why: Text after the last mark is plain. How: This adds it as a text piece when there is any.



	return inlTokArr;


}

// #endregion parInlFun



// #region parMarFun

/**
 * parMarFun = Parse Markdown Function
 *
 * @summary
 * Reads a whole article file: the front matter between the opening and
 * closing --- lines, as key and value pairs, and the body as a list of
 * blocks. A blank line ends a paragraph, list, or tip; consecutive list
 * items of one kind form one list; and an HTML comment, from a line starting
 * with <!-- to the line ending with -->, is skipped entirely. A file with no
 * front matter reads as all body.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param filTexStr - File Text String: The article file's whole text.
 *
 * @returns The front matter and the body's blocks, in a shape the caller
 *          destructures.
 *
 * @example
 * ```ts
 * parMarFun('---\ntitle: Hi\n---\n\nHello') // => { bloRecArr, froMatObj }
 * ```
 *
*/

function parMarFun ( filTexStr : string ) : { bloRecArr : BloRecTyp[], froMatObj : Record< string, string > } {


	const bloRecArr : BloRecTyp[]               = []; // What: Block Record Array. Why: The body's blocks are collected in order. How: This starts empty.
	const froMatObj : Record< string, string > = {};  // What: Front Matter Object. Why: The front matter's keys are looked up by name. How: This starts empty.

	const linTexArr = filTexStr.replace( /\r\n?/g, '\n' ).split( '\n' ); // What: Line Text Array. Why: Markdown is read line by line, whatever line endings the file was saved with. How: This normalizes Windows endings and splits the text into lines.

	let linIndNum = 0; // What: Line Index Number. Why: The reader walks the lines once. How: This points at the line being read.


	if ( linTexArr[ 0 ] === '---' ) { // What: Front Matter Check. Why: Only a file opening with --- has front matter. How: This reads key: value lines until the closing ---.


		linIndNum = 1; // What: Front Matter Start. Why: The opening --- isn't a pair. How: This starts on the line after it.


		while ( linIndNum < linTexArr.length && linTexArr[ linIndNum ] !== '---' ) { // What: Front Matter Loop. Why: Every line up to the closing --- is one pair. How: This reads each in turn.


			const sepIndNum = linTexArr[ linIndNum ].indexOf( ':' ); // What: Separator Index Number. Why: A pair's key ends at its first colon. How: This finds it.


			if ( sepIndNum > 0 ) froMatObj[ linTexArr[ linIndNum ].slice( 0, sepIndNum ).trim() ] = linTexArr[ linIndNum ].slice( sepIndNum + 1 ).trim(); // What: Pair Store. Why: The value may itself hold colons. How: This stores everything after the first colon, trimmed, under the key before it.



			linIndNum += 1; // What: Front Matter Advance. Why: The next pair follows. How: This moves to the next line.


		}



		linIndNum += 1; // What: Front Matter End. Why: The closing --- isn't part of the body. How: This steps past it.


	}



	while ( linIndNum < linTexArr.length ) { // What: Body Loop. Why: Every line of the body belongs to a block or is a gap between blocks. How: This reads one block per pass.


		const curLinStr = linTexArr[ linIndNum ].trim(); // What: Current Line String. Why: Leading and trailing spaces never change what a line means here. How: This trims the line being read.


		if ( curLinStr === '' ) { linIndNum += 1; continue; }



		if ( curLinStr.startsWith( '<!--' ) ) { // What: Comment Check. Why: A comment is a note for whoever edits the file, never shown. How: This skips lines until the one that closes it.


			while ( linIndNum < linTexArr.length && !linTexArr[ linIndNum ].includes( '-->' ) ) linIndNum += 1; // What: Comment Skip. Why: A comment may span several lines. How: This advances to the line holding its closing -->.



			linIndNum += 1; // What: Comment End. Why: The closing line is part of the comment. How: This steps past it.



			continue;


		}



		const heaMatArr = curLinStr.match( /^(#{2,3})\s+(.*)$/ ); // What: Heading Match Array. Why: ## and ### lines are headings. How: This captures the hashes and the heading's text.


		if ( heaMatArr ) { // What: Heading Check. Why: A heading is one line on its own. How: This adds it at the level its hashes give.


			bloRecArr.push( { inlTokArr : parInlFun( heaMatArr[ 2 ] ), kinStr : 'heading', levNum : heaMatArr[ 1 ].length === 2 ? 2 : 3 } ); // What: Heading Push. Why: The page needs the heading's level and text. How: This adds a heading block, level 2 for ## and 3 for ###.

			linIndNum += 1; // What: Heading Advance. Why: The next block starts on the next line. How: This moves past the heading.



			continue;


		}



		const medMatArr = curLinStr.match( MED_PAT_REG ); // What: Media Match Array. Why: A photo or video sits alone on its line. How: This captures its alt text, file, and caption.


		if ( medMatArr ) { // What: Media Check. Why: A media line is a block of its own. How: This adds it with its parts.


			bloRecArr.push( { altStr : medMatArr[ 1 ], capStr : medMatArr[ 3 ] ?? '', kinStr : 'media', souStr : medMatArr[ 2 ] } ); // What: Media Push. Why: The page needs the file, its alt text, and any caption. How: This adds a media block, its caption empty when there is none.

			linIndNum += 1; // What: Media Advance. Why: The next block starts on the next line. How: This moves past the media line.



			continue;


		}



		if ( curLinStr.startsWith( '>' ) ) { // What: Tip Check. Why: Lines starting with > form a tip. How: This joins every consecutive > line into one tip.


			const tipLinArr : string[] = []; // What: Tip Line Array. Why: A tip may span several lines. How: This collects their text.


			while ( linIndNum < linTexArr.length && linTexArr[ linIndNum ].trim().startsWith( '>' ) ) { // What: Tip Line Loop. Why: The tip runs until a line without >. How: This strips each line's > and collects it.


				tipLinArr.push( linTexArr[ linIndNum ].trim().replace( /^>\s?/, '' ) ); // What: Tip Line Push. Why: The tip's text is the line without its marker. How: This drops the > and one space after it.

				linIndNum += 1; // What: Tip Line Advance. Why: The next line may continue the tip. How: This moves to it.


			}



			bloRecArr.push( { inlTokArr : parInlFun( tipLinArr.join( ' ' ) ), kinStr : 'tip' } ); // What: Tip Push. Why: The tip reads as one paragraph. How: This joins its lines with spaces and adds a tip block.



			continue;


		}



		const lisKinStr = /^\d+\.\s/.test( curLinStr ) ? 'ordered' : /^-\s/.test( curLinStr ) ? 'unordered' : ''; // What: List Kind String. Why: A list's first line says whether it's numbered or bulleted. How: This tests for "1. " or "- ", or gives an empty string for neither.


		if ( lisKinStr ) { // What: List Check. Why: Consecutive items of one kind form one list. How: This collects items until a line of another kind.


			const iteTokArr : InlTokTyp[][] = [];                                        // What: Item Token Array. Why: Each item is its own run of pieces. How: This collects them in order.
			const iteMarReg = lisKinStr === 'ordered' ? /^\d+\.\s+(.*)$/ : /^-\s+(.*)$/; // What: Item Marker Regular Expression. Why: Only items of the list's own kind continue it. How: This matches a numbered or a bulleted item, capturing its text.


			let iteMatArr = curLinStr.match( iteMarReg ); // What: Item Match Array. Why: The list's first line is its first item. How: This matches it, and each pass of the loop below matches the next line.


			while ( iteMatArr ) { // What: Item Loop. Why: The list runs until a line that isn't an item of its kind. How: This adds each matching line's text and reads the next line.


				iteTokArr.push( parInlFun( iteMatArr[ 1 ] ) ); // What: Item Push. Why: Each item's text keeps its bold, italic, and links. How: This adds the item's pieces.

				linIndNum += 1; // What: Item Advance. Why: The next line may be another item. How: This moves to it.

				iteMatArr = linTexArr[ linIndNum ]?.trim().match( iteMarReg ) ?? null; // What: Next Item Match. Why: The loop stops at the first line that isn't an item, or past the last line. How: This matches the next line, or gives null past the end.


			}



			bloRecArr.push( lisKinStr === 'ordered' ? { iteTokArr, kinStr : 'ordered' } : { iteTokArr, kinStr : 'unordered' } ); // What: List Push. Why: The page renders the items as one list. How: This adds a numbered or bulleted list block.



			continue;


		}



		const parLinArr : string[] = []; // What: Paragraph Line Array. Why: A paragraph may span several lines. How: This collects them.


		while ( linIndNum < linTexArr.length && linTexArr[ linIndNum ].trim() !== '' && !/^(#{2,3}\s|>|\d+\.\s|-\s|!\[|<!--)/.test( linTexArr[ linIndNum ].trim() ) ) { // What: Paragraph Line Loop. Why: A paragraph runs until a blank line or the start of another kind of block. How: This collects each line until one of those, each operand guarded by the ones before it.


			parLinArr.push( linTexArr[ linIndNum ].trim() ); // What: Paragraph Line Push. Why: The paragraph's lines are joined later. How: This collects the trimmed line.

			linIndNum += 1; // What: Paragraph Line Advance. Why: The next line may continue the paragraph. How: This moves to it.


		}



		bloRecArr.push( { inlTokArr : parInlFun( parLinArr.join( ' ' ) ), kinStr : 'paragraph' } ); // What: Paragraph Push. Why: The lines read as one paragraph. How: This joins them with spaces and adds a paragraph block.


	}



	return { bloRecArr, froMatObj }; // What: Parse Result Return. Why: The caller needs both the front matter and the blocks. How: This hands them back as one object the caller destructures.


}

// #endregion parMarFun

// #endregion Helpers



// #region Exports

export { parMarFun, type BloRecTyp, type InlTokTyp }; // What: Named Exports. Why: The article catalog reads files with the parser, and the article body renders its blocks and pieces. How: This exports the parser and its two types.

// #endregion Exports


