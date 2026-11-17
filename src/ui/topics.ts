


/**
 * topics.ts = Topics
 *
 * @summary
 * The help topics every article belongs to, in the order the site lists
 * them: the devices first, then the everyday problems, then the "What is...?"
 * questions. The places that list the topics, such as a filter, read this
 * list, so a topic added or renamed changes in one place.
 *
 * Sections:
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

type TopRecTyp = { hinStr : string, ideStr : string, labStr : string }; // What: Topic Record Type. Why: Every topic has the same three fields. How: This types the hint, the identifier, and the label.

// #region TOP_REC_ARR

/**
 * TOP_REC_ARR = Topic Record Array
 *
 * @summary
 * One row per topic. Every row shares one shape, so its fields carry no
 * comments of their own:
 *
 * - `hinStr` (String): Hint String, a few examples of what the topic covers,
 *   shown under its name on Home's tiles.
 *
 * - `ideStr` (String): Identifier String, the topic's identifier, used in
 *   the Articles page's address (/articles?topic=windows) and on every
 *   article.
 *
 * - `labStr` (String): Label String, the topic's name as the site shows it.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const TOP_REC_ARR : TopRecTyp[] = [ // What: Topic Record Array. Why: The site lists the same topics everywhere, in the same order. How: Each row names one topic.


	{ hinStr : 'Updates, slow PCs, printers', ideStr : 'windows',            labStr : 'Windows'            }, // What: Windows Topic Row. Why: Many people use Windows computers at home. How: This lists the "Windows" topic.
	{ hinStr : 'Storage, passwords, backups', ideStr : 'mac',                labStr : 'Mac'                }, // What: Mac Topic Row. Why: Mac computers have their own menus and habits. How: This lists the "Mac" topic.
	{ hinStr : 'Storage, iCloud, settings',   ideStr : 'iphone',             labStr : 'iPhone'             }, // What: iPhone Topic Row. Why: The iPhone is many people's main device. How: This lists the "iPhone" topic.
	{ hinStr : 'Apps, updates, sharing',      ideStr : 'ipad',               labStr : 'iPad'               }, // What: iPad Topic Row. Why: The iPad differs enough from the iPhone to have its own topic. How: This lists the "iPad" topic.
	{ hinStr : 'Battery, storage, Google',    ideStr : 'android',            labStr : 'Android'            }, // What: Android Topic Row. Why: Android phones and tablets come from many makers. How: This lists the "Android" topic.
	{ hinStr : 'Getting started, apps',       ideStr : 'linux',              labStr : 'Linux'              }, // What: Linux Topic Row. Why: Some people try Linux on an older computer. How: This lists the "Linux" topic.
	{ hinStr : 'Speakers, lights, cameras',   ideStr : 'smart-home',         labStr : 'Smart Home'         }, // What: Smart Home Topic Row. Why: Smart speakers, plugs, and cameras confuse many people. How: This lists the "Smart Home" topic.
	{ hinStr : 'Slow or dropping Wi-Fi',      ideStr : 'internet-wi-fi',     labStr : 'Internet & Wi-Fi'   }, // What: Internet And Wi-Fi Topic Row. Why: A device that goes online depends on the connection. How: This lists the "Internet & Wi-Fi" topic.
	{ hinStr : 'Passwords, sign-in, spam',    ideStr : 'email-accounts',     labStr : 'Email & Accounts'   }, // What: Email And Accounts Topic Row. Why: Many people worry about getting locked out of an account. How: This lists the "Email & Accounts" topic.
	{ hinStr : 'Is this message real?',       ideStr : 'scams-safety',       labStr : 'Scams & Safety'     }, // What: Scams And Safety Topic Row. Why: Many people want to check whether a message is a scam. How: This lists the "Scams & Safety" topic.
	{ hinStr : 'AI, the cloud, and more',     ideStr : 'understanding-tech', labStr : 'Understanding Tech' }  // What: Understanding Tech Topic Row. Why: Some questions are about what something is, not a problem to fix. How: This lists the "Understanding Tech" topic.


];

// #endregion TOP_REC_ARR

// #endregion Constants



// #region Exports

export { TOP_REC_ARR, type TopRecTyp }; // What: Named Exports. Why: The topics are listed and named from one place. How: This exports the list and its type.

// #endregion Exports


