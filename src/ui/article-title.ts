


/**
 * article-title.ts = Article Title
 *
 * @summary
 * The page title an article shows in browser tabs, search listings, and link
 * previews. The site keeps every title to about 60 characters, so an
 * article's title carries the site's name after it only when both fit within
 * 60, and stands alone otherwise. It's the one place an article's page title
 * is worked out, so the title reads the same wherever it's shown.
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

const SIT_SUF_STR = ' | TechGeek.support'; // What: Site Suffix String. Why: Every page title names the site when there's room. How: This is the suffix added after an article's title.
const TIT_MAX_NUM = 60;                    // What: Title Maximum Number. Why: The site keeps every title to about 60 characters. How: This is the longest a title with the suffix may run.

// #endregion Constants



// #region Helpers

// #region artTitFun

/**
 * artTitFun = Article Title Function
 *
 * @summary
 * Turns an article's title into its page title: the title followed by the
 * site's name when the two fit within 60 characters, or the title alone when
 * they don't.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param titTexStr - Title Text String: The article's title, from its front
 *                    matter.
 *
 * @returns The article's page title.
 *
 * @example
 * ```ts
 * artTitFun('Why Is My Wi-Fi So Slow?')
 * // => 'Why Is My Wi-Fi So Slow? | TechGeek.support'
 * ```
 *
*/

const artTitFun = ( titTexStr : string ) : string => titTexStr.length + SIT_SUF_STR.length <= TIT_MAX_NUM ? titTexStr + SIT_SUF_STR : titTexStr; // What: Article Title Function. Why: A long article title with the site's name would run past the site's 60-character title length. How: This adds the suffix only when the whole fits within the limit.

// #endregion artTitFun

// #endregion Helpers



// #region Exports

export { artTitFun }; // What: Named Export. Why: An article's page title is worked out the same way wherever it's named. How: This exports artTitFun.

// #endregion Exports


