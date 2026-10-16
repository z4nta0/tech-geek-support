---
title: Why Won't My Smart Plug or Camera Connect to Wi-Fi?
slug: why-wont-my-smart-plug-or-camera-connect-to-wi-fi
topic: Smart Home
summary: New smart plug, bulb, or camera stuck during setup? The cause is usually your Wi-Fi's 2.4 GHz band. Here's how to fix it.
reading_minutes: 6
researched: 2026-10-16
---

You bought a smart plug, light bulb, or camera, opened the app, and setup keeps failing with a message like "couldn't connect" or "device not found." This is one of the most common smart home headaches, and it's usually not the device's fault.

## The usual cause: two kinds of Wi-Fi

Most home routers (the box that makes your Wi-Fi) send out Wi-Fi on two different **bands**, a bit like two radio stations:

- **2.4 GHz** reaches farther and goes through walls better, but is slower.
- **5 GHz** is faster, but doesn't reach as far.

Most smart plugs, bulbs, and many cameras can **only** use 2.4 GHz. Many newer routers combine both bands under one Wi-Fi name and decide for you which one each device uses. During setup, your phone is often on 5 GHz, and the smart device can't follow it there. That's when setup fails.

> **Tip:** Check the device's box or manual for "2.4 GHz only" or "does not support 5 GHz." If you see it, this article is for you.

## Try the simple things first

1. **Stand close to the router** with both your phone and the smart device during setup. You can move the device to its real spot afterward.
2. **Check your Wi-Fi password.** Type it slowly. Capital letters count.
3. **Turn on Bluetooth and allow permissions.** Many setup apps use Bluetooth, and need permission to find devices on your network. If the app asks for **Location** or **Local Network** permission, choose **Allow**. These let the app find the device; they aren't used to track you.
4. **Turn off any VPN** app on your phone during setup. (A VPN is an app that routes your internet through another company. If you don't know whether you have one, you probably don't.)
5. **Put the device back into setup mode.** If you've tried before, the device may need a reset. Each brand does this differently, usually by holding a button for several seconds until a light blinks. The app or the manual will tell you how.

Then try setup again.

## If it still fails: give the device a 2.4 GHz network

If your router uses one Wi-Fi name for both bands, you have a few options. The exact names of these settings depend on your router or internet company. Look for words like **Smart Connect**, **band steering**, or **split bands** in your router's app or settings.

> **Before you start:** Changing router settings can briefly disconnect everything in your home. Write down any settings before you change them. If you rent your router from your internet company, their app or support line can often do this for you.

**Option A: Give each band its own name (best long-term).**

1. Open your router's app (or your internet company's app).
2. Find the Wi-Fi settings and turn off the setting that combines the bands (often called **Smart Connect** or **band steering**).
3. Give the 2.4 GHz network a different name, for example "SmithHome-2.4."
4. On your phone, connect to that 2.4 GHz network.
5. Set up the smart device, choosing the 2.4 GHz network.
6. Afterward, connect your phone back to your normal network.

**Option B: Turn off 5 GHz for a few minutes.** Some routers let you switch off the 5 GHz band. Turn it off, set up the device, then turn 5 GHz back on. Some devices keep working fine afterward; if yours keeps dropping off, use Option A instead.

[Image: A router app's Wi-Fi settings screen with "Smart Connect" switched off and two network names shown]

## Other things that can block setup

- **Guest networks.** Set the device up on your main network, not a guest network. Guest networks often block devices from talking to each other.
- **Too many devices.** Some routers have a limit on how many devices can connect. Restarting the router can help.
- **Hidden Wi-Fi name.** If your network doesn't show up in the app, look for an option like **Other Network** to type the name in yourself.

## If that didn't work

- **Restart your router** (unplug it for a minute, then plug it back in) and try once more.
- **Try a different phone** if someone in the house has one. Phone settings sometimes get in the way.
- **Contact the device maker.** Their support team knows their own setup quirks.

Not comfortable digging into router settings? Tell us your device and your internet company at TechGeek.support and we'll walk you through it, free, within 24 hours.

---

## Research notes (not published)

- **Why this problem**: The 2.4 GHz versus 5 GHz setup failure is the single most repeated smart home setup problem across ISP and router forums (TELUS, Bell, Netgear Orbi, Sky) and vendor support pages. Mesh routers and ISP gateways increasingly combine both bands under one name, which makes it worse.
- **Where it was found**:
  - [TELUS Community: "Smart device and 2.4 GHZ"](https://forum.telus.com/t5/Home-Services/Smart-device-and-2-4-GHZ/td-p/133875): user whose Meross plug drops when steering is re-enabled.
  - [Bell Community: Split 2.4 GHz and 5 GHz bands on the Home Hub](https://forum.bell.ca/t5/Internet/Split-2-4-Ghz-and-5-Ghz-bands-on-the-Bell-Home-Hub-3000-4000/m-p/56554)
  - [Netgear Community: Smart plug not connecting to Orbi mesh](https://community.netgear.com/discussions/Orbi/smart-plug-not-connecting-to-orbi-mesh-rbr50---main-and-satellite/1678375)
  - [Netgear Community: Smart plugs won't connect](https://community.netgear.com/discussions/Orbi/smart-plugs-wont-connect/1706065/replies/1706108)
  - [Sky Help Forum: Amazon Smart plug not connecting](https://helpforum.sky.com/t5/Broadband/Amazon-Smart-plug-not-connecting-to-my-wifi/m-p/5273629)
  - Limitation: no r/smarthome threads surfaced in search; evidence is ISP and router forums.
- **Sources for the steps**:
  - [TP-Link: What if I fail to configure the Tapo Smart Plug?](https://www.tp-link.com/us/support/faq/2615/): verified 2.4 GHz only, move closer to router, Rescan / "Other Network" for hidden networks, reboot router, router device limits and guest networks, factory reset if LED abnormal, try another phone.
  - [TP-Link: Kasa not connecting? Fix setup issues](https://www.tp-link.com/us/support/faq/2229/) and [Tapo configuration FAQ](https://www.tp-link.com/us/support/faq/2875/): seen via search summary only: giving 5 GHz a different name or turning it off temporarily, turning off Smart Connect, disabling phone VPNs, Local Network permission on iPhone.
  - [Amazon: Alexa can't discover your Amazon Smart Plug](https://www.amazon.com/gp/help/customer/display.html?nodeId=GL3P6DWMQB5Z6PC2) and [Amazon: Troubleshoot Alexa not discovering devices](https://www.amazon.com/gp/help/customer/display.html?nodeId=G4BFSQTR4A8HZZFF): via search summary: connect smart home devices on 2.4 GHz; try the other network name if bands are separate; reset by holding the button (12 seconds for Amazon's plug).
- **Version notes**: Router menus are not standardized; the article deliberately names only common setting names (Smart Connect, band steering) and tells readers to look for them, rather than giving exact menu paths. Wi-Fi 6E/7 routers add a 6 GHz band; the same advice applies. Newer Matter-over-Thread devices don't use Wi-Fi at all and aren't covered. The claim that Location permission isn't used for tracking during setup is a general explanation (Android requires location permission for Wi-Fi/Bluetooth scanning), not taken from a vendor page.
- **Media suggestions**: Simple diagram of one router with two "radio stations" (2.4 and 5 GHz); screenshot of a common router app (e.g. Xfinity, Eero, or TP-Link Deco) showing where to split bands; a short video of putting a plug into pairing mode.
