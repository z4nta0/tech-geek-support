---
title: How to Install Apps on Linux Mint
slug: how-to-install-apps-on-linux-mint
topic: Linux
summary: New to Linux Mint? Learn the safe, easy way to find and install apps with a few clicks, and why to skip download websites.
reading_minutes: 5
researched: 2026-10-16
---

Many people are trying Linux for the first time, often to give an older computer a second life. **Linux Mint** is one of the friendliest versions of Linux, and one of the first things people ask is: "How do I install a program?"

On Windows, you usually search the web, download a file, and run it. Linux Mint works differently, and honestly, more like a phone. It has its own app store, called the **Software Manager**, where you can search for an app and install it with one click. It's free, and the apps in it are checked, which makes it safer than downloading from random websites.

> **Before you start:** You'll need an internet connection, and you'll need the password you use to log in to the computer.

## Open the Software Manager

1. Click the **Menu** button in the bottom-left corner of the screen (it looks like the Linux Mint logo).
2. Type **Software Manager**.
3. Click **Software Manager** in the results.

You can also find it in the Menu under **Administration**.

[Image: The Linux Mint menu open with "Software Manager" typed in the search box]

## Find and install an app

1. In the Software Manager, click the search box at the top.
2. Type the name of the app you want, such as **VLC** (a popular video player), and press **Enter**.
3. Click the app in the results to open its page. You'll see a description, pictures, and reviews.
4. Click the **Install** button.
5. If a box asks for your password, type the password you use to log in and click to continue. (Linux asks for it whenever something is being installed, as a safety check.)
6. Wait for the install to finish. The button will change to **Launch** and **Remove**.

Click **Launch** to open the app right away. From now on, you'll also find it in the **Menu**.

> **Tip:** Not sure what to look for? Browse the categories on the Software Manager's front page, like **Internet**, **Office**, or **Sound and video**. It's a nice way to discover free apps.

## Some apps you may already have

Linux Mint comes with a lot built in, so check the **Menu** before installing anything. You'll usually find:

- **Firefox** for the web
- **LibreOffice** for documents and spreadsheets (it can open Microsoft Word and Excel files)
- **Thunderbird** for email
- Apps for photos, music, and videos

## What if I see a warning about "unverified" apps?

The Software Manager hides apps whose makers haven't been confirmed, unless you change a setting to show them. Linux Mint marks those as not recommended. For everyday use, stick with what shows up normally.

## Should I download programs from websites?

Usually, no. Programs you download for Windows (files ending in **.exe**) won't run on Linux. Some companies do offer Linux downloads, but the Software Manager is the safer first stop, and apps installed from it get updated automatically along with the rest of your system through the **Update Manager** (the shield icon near the clock).

## How to remove an app

1. Open the **Software Manager** and search for the app.
2. Click the app to open its page.
3. Click **Remove**, and type your password if asked.

## Using Ubuntu instead?

Ubuntu, another popular version of Linux, has its own store called **App Center**. It works the same way: open **App Center**, search for the app, click it, and click **Install**.

## If that didn't work

- **Can't find the app?** Some programs, like Microsoft Office, don't make a Linux version. Search for the kind of app you need (for example, "spreadsheet") to find a free alternative.
- **Install button not working?** Check that you're connected to the internet, then close the Software Manager and open it again.

Need a hand finding the right app? Ask me at TechGeek.support. It's free, and I'll reply within 24 hours.

---

## Research notes (not published)

- **Why this problem**: "How do I install programs?" is the first question nearly every Windows switcher asks, and switching to Linux Mint has been widely recommended for older PCs since Windows 10 reached end of support (October 2025). Q&A and forum threads repeatedly cover it, and the answer (use the built-in Software Manager, not random downloads) is a genuine safety win for beginners.
- **Where it was found**:
  - [Q&A thread: "How do I install programs on Linux Mint?"](https://yomotherboard.com/question/how-do-i-install-programs-on-linux-mint/): new-user question with the standard "use the package manager / Software Manager" answer.
  - [OMG! Ubuntu: Linux Mint will hide unverified Flatpaks](https://www.omgubuntu.co.uk/2024/06/linux-mint-will-hide-unverified-flatpaks) and [Phoronix coverage](https://www.phoronix.com/news/Linux-Mint-Unverified-Flatpaks): Software Manager behavior.
  - Limitation: web search did not surface specific r/linux4noobs threads; I did not gather counts. The owner may want to check that subreddit directly.
- **Sources for the steps**:
  - [Linux Mint Blog: Monthly News, April 2024](https://blog.linuxmint.com/?p=4675): official statement that the Software Manager hides unverified Flatpaks by default as an opt-in.
  - [Linux Mint 22.3 "What's new"](https://www.linuxmint.com/rel_zena_cinnamon_whatsnew.php): confirms 22.3 is an LTS release supported until 2029; it does not describe the Software Manager.
  - [Linux Mint User Guide](https://linuxmint-user-guide.readthedocs.io/en/latest/) and [Installation Guide](https://linuxmint-installation-guide.readthedocs.io/en/latest/): checked; neither has a Software Manager page. The installation guide uses the "Menu ‣ Administration ‣ ..." pattern (for Driver Manager), which supports the Administration location but does not confirm it for Software Manager.
  - [OMG! Ubuntu: Ubuntu App Center deb management (March 2026)](https://www.omgubuntu.co.uk/2026/03/ubuntu-app-center-deb-management/amp): App Center in Ubuntu 26.04. help.ubuntu.com returned HTTP 503 during research, so Ubuntu steps were not checked against official docs.
  - **Not verified against an official source**: the exact Software Manager labels (Install, Launch, Remove), the password prompt wording, the category names (Internet, Office, Sound and video), that Software Manager sits under Administration in the menu, the pre-installed app list, and that Software Manager installs are updated through Update Manager's shield icon. These match Linux Mint 21 and 22 as commonly documented, but the owner should confirm them on a Mint 22.3 machine (or a live USB) before publishing.
- **Version notes**: Written for Linux Mint 22.3 "Zena" (Cinnamon edition, January 2026, based on Ubuntu 24.04). Linux Mint 23 is reportedly due around December 2026 on Ubuntu 26.04; the Software Manager is expected to remain but labels should be rechecked then. MATE and Xfce editions have a different-looking menu but the same Software Manager. Ubuntu's App Center applies to Ubuntu 23.10 and later, including 26.04 LTS.
- **Media suggestions**: Screenshot of the Software Manager front page; screenshot of an app page with the Install button; a 45-second video of installing VLC from search to Launch.
