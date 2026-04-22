import { useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import styles from './MothersDayCard.module.css';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/all';
import { GSDevTools } from "gsap/GSDevTools";
import { useEffect } from 'react';
import thankYouIllus from '../assets/mothers-day-thank-you.mp4';
import tasksIllus from '../assets/mothers-day-tasks.mp4';
import littleThingsIllus from '../assets/mothers-day-little-things.mp4';
import unnoticedThingsIllus from '../assets/mothers-day-unnoticed-things.mp4';


gsap.registerPlugin(TextPlugin, SplitText, useGSAP, GSDevTools);

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeartDef {
  id: string;
  d: string;
  fill: string;
  strokeWidth: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────


const HEART_DEFS: HeartDef[] = [
  { id: 'h1',  fill: '#E05070', strokeWidth: '2.665', d: 'M52 47.9669C52 39.4373 49.1568 33.7509 43.4704 30.9077C34.9408 28.0645 30.676 30.9077 30.676 39.4373C30.676 47.9669 37.784 57.2073 52 67.1585C66.216 57.2073 73.324 47.9669 73.324 39.4373C73.324 30.9077 69.0592 28.0645 60.5296 30.9077C54.8432 33.7509 52 39.4373 52 47.9669Z' },
  { id: 'h2',  fill: '#E05070', strokeWidth: '2.665', d: 'M272 47.9669C272 39.4373 269.157 33.7509 263.47 30.9077C254.941 28.0645 250.676 30.9077 250.676 39.4373C250.676 47.9669 257.784 57.2073 272 67.1585C286.216 57.2073 293.324 47.9669 293.324 39.4373C293.324 30.9077 289.059 28.0645 280.53 30.9077C274.843 33.7509 272 39.4373 272 47.9669Z' },
  { id: 'h3',  fill: '#E87090', strokeWidth: '2.144', d: 'M190 28.0413C190 20.8927 187.498 15.8886 182.494 13.0291C175.345 10.1697 171.771 12.3143 171.771 19.4629C171.771 26.6116 177.847 34.4751 190 43.0535C202.153 34.4751 208.229 26.6116 208.229 19.4629C208.229 12.3143 204.655 10.1697 197.506 13.0291C192.502 15.8886 190 20.8927 190 28.0413Z' },
  /*{ id: 'h4',  fill: '#E87090', strokeWidth: '2.144', d: 'M400 268.041C400 260.893 397.498 255.889 392.494 253.029C385.345 250.17 381.771 252.314 381.771 259.463C381.771 266.612 387.847 274.475 400 283.054C412.153 274.475 418.229 266.612 418.229 259.463C418.229 252.314 414.655 250.17 407.506 253.029C402.502 255.889 400 260.893 400 268.041Z' },*/
  { id: 'h5',  fill: '#E05070', strokeWidth: '2.775', d: 'M580 54.9449C580 46.0625 577.039 40.1409 571.118 37.1801C562.235 34.2193 557.794 37.1801 557.794 46.0625C557.794 54.9449 565.196 64.5675 580 74.9303C594.804 64.5675 602.206 54.9449 602.206 46.0625C602.206 37.1801 597.765 34.2193 588.882 37.1801C582.961 40.1409 580 46.0625 580 54.9449Z' },
  { id: 'h6',  fill: '#E05070', strokeWidth: '2.775', d: 'M400 114.945C400 106.062 397.039 100.141 391.118 97.1801C382.235 94.2193 377.794 97.1801 377.794 106.062C377.794 114.945 385.196 124.567 400 134.93C414.804 124.567 422.206 114.945 422.206 106.062C422.206 97.1801 417.765 94.2193 408.882 97.1801C402.961 100.141 400 106.062 400 114.945Z' },
  { id: 'h7',  fill: '#E87090', strokeWidth: '2.010', d: 'M655 30.0021C655 24.6416 653.325 20.9562 649.975 18.946C644.614 16.9358 641.934 18.611 641.934 23.9715C641.934 29.332 646.289 35.0276 655 41.0582C663.711 35.0276 668.066 29.332 668.066 23.9715C668.066 18.611 665.386 16.9358 660.026 18.946C656.675 20.9562 655 24.6416 655 30.0021Z' },
  { id: 'h8',  fill: '#E87090', strokeWidth: '2.010', d: 'M585 180.002C585 174.642 583.325 170.956 579.975 168.946C574.614 166.936 571.934 168.611 571.934 173.972C571.934 179.332 576.289 185.028 585 191.058C593.711 185.028 598.066 179.332 598.066 173.972C598.066 168.611 595.386 166.936 590.026 168.946C586.675 170.956 585 174.642 585 180.002Z' },
  { id: 'h9',  fill: '#E87090', strokeWidth: '2.010', d: 'M475 50.0021C475 44.6416 473.325 40.9562 469.975 38.946C464.614 36.9358 461.934 38.611 461.934 43.9715C461.934 49.332 466.289 55.0276 475 61.0582C483.711 55.0276 488.066 49.332 488.066 43.9715C488.066 38.611 485.386 36.9358 480.026 38.946C476.675 40.9562 475 44.6416 475 50.0021Z' },
  { id: 'h10', fill: '#E05070', strokeWidth: '2.846', d: 'M38 174.931C38 165.822 34.9638 159.749 28.8912 156.713C19.7824 153.677 15.228 156.713 15.228 165.822C15.228 174.931 22.8187 184.799 38 195.425C53.1814 184.799 60.772 174.931 60.772 165.822C60.772 156.713 56.2176 153.677 47.1088 156.713C41.0363 159.749 38 165.822 38 174.931Z' },
  { id: 'h11', fill: '#E05070', strokeWidth: '2.708', d: 'M168 214.931C168 205.822 164.964 199.749 158.891 196.713C149.782 193.677 145.228 196.713 145.228 205.822C145.228 214.931 152.819 224.799 168 235.425C183.181 224.799 190.772 214.931 190.772 205.822C190.772 196.713 186.218 193.677 177.109 196.713C171.036 199.749 168 205.822 168 214.931Z' },
  { id: 'h12', fill: '#E05070', strokeWidth: '2.708', d: 'M662 187.87C662 177.759 658.75 171.258 652.249 168.369C642.138 165.48 637.082 169.091 637.082 179.203C637.082 189.315 645.388 200.149 662 211.705C678.612 200.149 686.918 189.315 686.918 179.203C686.918 169.091 681.862 165.48 671.751 168.369C665.25 171.258 662 177.759 662 187.87Z' },
  { id: 'h13', fill: '#E05070', strokeWidth: '2.708', d: 'M532 127.87C532 117.759 528.75 111.258 522.249 108.369C512.138 105.48 507.082 109.091 507.082 119.203C507.082 129.315 515.388 140.149 532 151.705C548.612 140.149 556.918 129.315 556.918 119.203C556.918 109.091 551.862 105.48 541.751 108.369C535.25 111.258 532 117.759 532 127.87Z' },
  { id: 'h14', fill: '#E05070', strokeWidth: '2.708', d: 'M482 207.87C482 197.759 478.75 191.258 472.249 188.369C462.138 185.48 457.082 189.091 457.082 199.203C457.082 209.315 465.388 220.149 482 231.705C498.612 220.149 506.918 209.315 506.918 199.203C506.918 189.091 501.862 185.48 491.751 188.369C485.25 191.258 482 197.759 482 207.87Z' },
  { id: 'h15', fill: '#E87090', strokeWidth: '2.002', d: 'M55 285.001C55 278.327 52.6641 273.655 47.9923 270.985C41.3183 268.316 37.9813 270.318 37.9813 276.992C37.9813 283.666 43.6542 291.007 55 299.016C66.3458 291.007 72.0187 283.666 72.0187 276.992C72.0187 270.318 68.6817 268.316 62.0077 270.985C57.3359 273.655 55 278.327 55 285.001Z' },
  { id: 'h16', fill: '#E87090', strokeWidth: '2.002', d: 'M275 285.001C275 278.327 272.664 273.655 267.992 270.985C261.318 268.316 257.981 270.318 257.981 276.992C257.981 283.666 263.654 291.007 275 299.016C286.346 291.007 292.019 283.666 292.019 276.992C292.019 270.318 288.682 268.316 282.008 270.985C277.336 273.655 275 278.327 275 285.001Z' },
  { id: 'h17', fill: '#E87090', strokeWidth: '2.194', d: 'M648 295.055C648 287.741 645.44 282.622 640.32 279.696C633.006 276.77 629.349 278.965 629.349 286.279C629.349 293.593 635.566 301.638 648 310.415C660.434 301.638 666.651 293.593 666.651 286.279C666.651 278.965 662.994 276.77 655.68 279.696C650.56 282.622 648 287.741 648 295.055Z' },
  { id: 'h18', fill: '#E87090', strokeWidth: '2.194', d: 'M538 265.055C538 257.741 535.44 252.622 530.32 249.696C523.006 246.77 519.349 248.965 519.349 256.279C519.349 263.593 525.566 271.638 538 280.415C550.434 271.638 556.651 263.593 556.651 256.279C556.651 248.965 552.994 246.77 545.68 249.696C540.56 252.622 538 257.741 538 265.055Z' },
  { id: 'h19', fill: '#E87090', strokeWidth: '2.194', d: 'M468 315.055C468 307.741 465.44 302.622 460.32 299.696C453.006 296.77 449.349 298.965 449.349 306.279C449.349 313.593 455.566 321.638 468 330.415C480.434 321.638 486.651 313.593 486.651 306.279C486.651 298.965 482.994 296.77 475.68 299.696C470.56 302.622 468 307.741 468 315.055Z' },
  { id: 'h20', fill: '#E05070', strokeWidth: '2.866', d: 'M80 371.927C80 362.753 76.9421 356.637 70.8264 353.579C61.6528 350.522 57.066 353.579 57.066 362.753C57.066 371.927 64.7106 381.865 80 392.567C95.2893 381.865 102.934 371.927 102.934 362.753C102.934 353.579 98.3472 350.522 89.1736 353.579C83.0578 356.637 80 362.753 80 371.927Z' },
  { id: 'h21', fill: '#E05070', strokeWidth: '2.866', d: 'M300 371.927C300 362.753 296.942 356.637 290.826 353.579C281.653 350.522 277.066 353.579 277.066 362.753C277.066 371.927 284.711 381.865 300 392.567C315.289 381.865 322.934 371.927 322.934 362.753C322.934 353.579 318.347 350.522 309.174 353.579C303.058 356.637 300 362.753 300 371.927Z' },
  { id: 'h22', fill: '#E87090', strokeWidth: '2.122', d: 'M200 358.096C200 351.021 197.877 346.068 193.632 343.238C186.557 340.408 183.019 342.531 183.019 349.606C183.019 356.681 188.679 363.757 200 370.832C211.32 363.757 216.981 356.681 216.981 349.606C216.981 342.531 213.443 340.408 206.368 343.238C202.123 346.068 200 351.021 200 358.096Z' },
  /*{ id: 'h23', fill: '#E87090', strokeWidth: '2.122', d: 'M350 208.096C350 201.021 347.877 196.068 343.632 193.238C336.557 190.408 333.019 192.531 333.019 199.606C333.019 206.681 338.679 213.757 350 220.832C361.32 213.757 366.981 206.681 366.981 199.606C366.981 192.531 363.443 190.408 356.368 193.238C352.123 196.068 350 201.021 350 208.096Z' },*/
  { id: 'h24', fill: '#E05070', strokeWidth: '2.511', d: 'M610 375C610 367 607.333 361.667 602 359C594 356.333 590 359 590 367C590 375 596.667 383.667 610 393C623.333 383.667 630 375 630 367C630 359 626 356.333 618 359C612.667 361.667 610 367 610 375Z' },
  { id: 'h25', fill: '#E05070', strokeWidth: '2.511', d: 'M530 355C530 347 527.333 341.667 522 339C514 336.333 510 339 510 347C510 355 516.667 363.667 530 373C543.333 363.667 550 355 550 347C550 339 546 336.333 538 339C532.667 341.667 530 347 530 355Z' },
  { id: 'h26', fill: '#E05070', strokeWidth: '2.511', d: 'M430 395C430 387 427.333 381.667 422 379C414 376.333 410 379 410 387C410 395 416.667 403.667 430 413C443.333 403.667 450 395 450 387C450 379 446 376.333 438 379C432.667 381.667 430 387 430 395Z' },
  { id: 'h27', fill: '#E05070', strokeWidth: '1.888', d: 'M118 98.0469C118 93.1497 116.251 89.6517 112.753 87.5529C107.856 85.4541 105.407 86.8533 105.407 91.7505C105.407 96.6477 109.605 101.895 118 107.492C126.395 101.895 130.593 96.6477 130.593 91.7505C130.593 86.8533 128.144 85.4541 123.247 87.5529C119.749 89.6517 118 93.1497 118 98.0469Z' },
  { id: 'h28', fill: '#E05070', strokeWidth: '1.888', d: 'M288 128.047C288 123.15 286.251 119.652 282.753 117.553C277.856 115.454 275.407 116.853 275.407 121.751C275.407 126.648 279.605 131.895 288 137.492C296.395 131.895 300.593 126.648 300.593 121.751C300.593 116.853 298.144 115.454 293.247 117.553C289.749 119.652 288 123.15 288 128.047Z' },

];

const ZOOM_DUR  = 1;
const WORD_SPEED = 80;
//const heartIds = ['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12'];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MothersDayCard() {

  // Refs for final screen
  const finalRef    = useRef<HTMLDivElement | null>(null);
  const typedHappy  = useRef<HTMLSpanElement | null>(null);
  const typedMothers = useRef<HTMLSpanElement | null>(null);
  const typedDay    = useRef<HTMLSpanElement | null>(null);
  const heartRefs   = useRef<Record<string, SVGPathElement | null>>({});

  // ── Helpers ──────────────────────────────────────────────────────────────

  const typeWord = useCallback((el: HTMLSpanElement, text: string, onDone: () => void): void => {
    let i = 0;
    const next = () => {
      el.textContent = text.slice(0, i);
      if (i++ <= text.length) setTimeout(next, WORD_SPEED);
      else onDone();
    };
    next();
  }, []);


  const drawHearts = useCallback((onDone: () => void): void => {
    let delay = 0;
    HEART_DEFS.forEach(({ id }, idx) => {
      const el = heartRefs.current[id];
      if (!el) return;
      setTimeout(() => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)',
            onComplete: idx === HEART_DEFS.length - 1 ? onDone : undefined }
        );
      }, delay);
      delay += 180;
    });
  }, []);

  const pulseHearts = useCallback((): void => {
    HEART_DEFS.forEach(({ id }, idx) => {
      const el = heartRefs.current[id];
      if (!el) return;
      gsap.to(el, {
        scale: 1.15, transformOrigin: '50% 50%',
        duration: 0.9 + idx * 0.05, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: idx * 0.18,
      });
    });
  }, []);

  const runFinalScene = useCallback((): void => {
    const finalEl = finalRef.current;
    if (!finalEl || !typedHappy.current || !typedMothers.current || !typedDay.current) return;

    gsap.to(finalEl, { opacity: 1, duration: ZOOM_DUR, ease: 'power2.out', onComplete: () => {
      typeWord(typedHappy.current!, 'Happy', () => {
        setTimeout(() => {
          typeWord(typedMothers.current!, "Mother's", () => {
            setTimeout(() => {
              typeWord(typedDay.current!, 'Day', () => {
                setTimeout(() => {
                  drawHearts(() => {
                    setTimeout(pulseHearts, 300);
                  });
                }, 400);
              });
            }, 200);
          });
        }, 200);
      });
    }});
  }, [typeWord, drawHearts, pulseHearts]);


let gsaTimIns : GSAPTimeline;

  useGSAP(() => {

    //reset();



    const texArr = [
        "Thank you, mothers!",
        "For everything that you do for us...",
        "Especially the little things...",
        "Even more importantly, the many things that we'll never even know about...",
        "A mother's love is a special thing indeed!",
        "We will never be able to fully understand the sacrifices that you make for us.",
        "And you definitely deserve more than one day of celebration.",
        "So it is our responsibility to make the most of this one day.",
        "You are loved (even when we don't show it).",
        "And you are appreciated (even when we don't give it).",
        "So please never get discouraged, because we need you in our lives.",
        "On behalf of the rest of us..."
    ];



    gsaTimIns  = gsap.timeline( { paused: true } );

    const wrapper = document.getElementById('wrapper') as HTMLSpanElement;
    const cursor = document.getElementById('cursor') as HTMLSpanElement;
    const thankYouVideo = document.getElementById('thankYouVideo') as HTMLVideoElement;
    const tasksVideo = document.getElementById('tasksVideo') as HTMLVideoElement;
    const littleThingsVideo = document.getElementById('littleThingsVideo') as HTMLVideoElement;
    const unnoticedThingsVideo = document.getElementById('unnoticedThingsVideo') as HTMLVideoElement;
    const heartPath = document.getElementById('heartPath') as SVGSVGElement | HTMLElement;
    const thankYouSVG = document.getElementById('thankYouSVG') as SVGAElement | HTMLElement;
    //const thankYouImage = document.getElementById('thankYouImage') as HTMLImageElement | HTMLElement;

    //const typSplIns : SplitText = TextPlugin.create( '.typewriter', { type : 'chars' } );



    gsap.set(wrapper, { opacity: 0, visibility: 'visible' });

    gsaTimIns.to(wrapper, {
        opacity: 1,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.add('cursor-blink');

    gsaTimIns.to('.typewriter', {
        text : texArr[0],
        duration: (texArr[0].length * 1) / 15,
        //slow then speeds up easing
        ease :  'none',
    });

    //gsaTimIns.pause('test');

    gsaTimIns.to(wrapper, {
        delay: 1.5,
        opacity: 0,
        duration: 1,
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.remove('cursor-blink');

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    gsaTimIns.to(thankYouSVG, {
        autoAlpha: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            thankYouVideo.style.visibility = 'inherit';
            thankYouVideo.style.opacity = '1';

        },
    });

    //gsaTimIns.pause('test');

    gsaTimIns.to(heartPath, {
        scale: 5,
        transformOrigin: '50% 50%',
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => thankYouVideo.play(),
        
    });

    gsaTimIns.add( () => {}, '+=8' );

    gsaTimIns.to(heartPath, {
        //autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 1,
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            thankYouVideo.style.visibility = 'hidden';
            thankYouVideo.style.opacity = '0';

        },
    });

    //gsaTimIns.pause('test');

    gsaTimIns.to(wrapper, {
        opacity: 1,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.add('cursor-blink');

    gsaTimIns.to('.typewriter', {
        text : texArr[1],
        duration: (texArr[1].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in'
    });

    gsaTimIns.to(wrapper, {
        delay: 1.5,
        opacity: 0,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.remove('cursor-blink');

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    gsaTimIns.to(thankYouSVG, {
        autoAlpha: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            tasksVideo.style.visibility = 'inherit';
            tasksVideo.style.opacity = '1';

        },
    });

    gsaTimIns.to(heartPath, {
        scale: 5,
        transformOrigin: '50% 50%',
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => tasksVideo.play(),
        
    });

    //gsaTimIns.pause('test');

    gsaTimIns.add( () => {}, '+=11' );

    gsaTimIns.to(heartPath, {
        //autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 2, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            tasksVideo.style.visibility = 'hidden';
            tasksVideo.style.opacity = '0';

        },
    });

    gsaTimIns.to(wrapper, {
        opacity: 1,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.add('cursor-blink');

    gsaTimIns.to('.typewriter', {
        text : texArr[2],
        duration: (texArr[2].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in'
    });

    gsaTimIns.to(wrapper, {
        delay: 1.5,
        opacity: 0,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.remove('cursor-blink');

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    gsaTimIns.to(thankYouSVG, {
        autoAlpha: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            littleThingsVideo.style.visibility = 'inherit';
            littleThingsVideo.style.opacity = '1';

        },
    });

    gsaTimIns.to(heartPath, {
        scale: 5,
        transformOrigin: '50% 50%',
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => littleThingsVideo.play(),
        
    });

    gsaTimIns.add( () => {}, '+=15' );

    gsaTimIns.to(heartPath, {
        //autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 2, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            littleThingsVideo.style.visibility = 'hidden';
            littleThingsVideo.style.opacity = '0';

        },
    });

    gsaTimIns.to(wrapper, {
        opacity: 1,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.add('cursor-blink');

    //gsaTimIns.play('test');

    gsaTimIns.to('.typewriter', {
        text : texArr[3],
        duration: (texArr[3].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in'
    });

    gsaTimIns.to(wrapper, {
        delay: 1.5,
        opacity: 0,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.remove('cursor-blink');

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    gsaTimIns.to(thankYouSVG, {
        autoAlpha: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            unnoticedThingsVideo.style.visibility = 'inherit';
            unnoticedThingsVideo.style.opacity = '1';

        },
    });

    gsaTimIns.to(heartPath, {
        scale: 5,
        transformOrigin: '50% 50%',
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => unnoticedThingsVideo.play(),
        
    });

    //gsaTimIns.pause('test');

    gsaTimIns.add( () => {}, '+=15' );

    gsaTimIns.to(heartPath, {
        //autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
        duration: 2, 
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => {

            unnoticedThingsVideo.style.visibility = 'hidden';
            unnoticedThingsVideo.style.opacity = '0';

        },
    });

    gsaTimIns.to(wrapper, {
        opacity: 1,
        duration: 1, 
        //slow then speeds up easing
        ease: 'power1.in'
    });

    cursor.classList.add('cursor-blink');

    //gsaTimIns.play('test');

    gsaTimIns.to('.typewriter', {
        text : texArr[4],
        duration: (texArr[4].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[5],
        duration: (texArr[5].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[6],
        duration: (texArr[6].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[7],
        duration: (texArr[7].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[8],
        duration: (texArr[8].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[9],
        duration: (texArr[9].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    gsaTimIns.to('.typewriter', {
        text : texArr[10],
        duration: (texArr[9].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        repeat: 1,
        yoyo: true,
        yoyEase: 'none',
        repeatDelay: 1.5,
    });

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    gsaTimIns.to('.typewriter', {
        text : texArr[11],
        duration: (texArr[10].length * 1) / 15,
        //slow then speeds up easing
        ease: 'power1.in',
        onComplete: () => gsap.delayedCall(1.5, runFinalScene),
    });

    gsaTimIns.set('.typewriter', { text: '' });

    //gsaTimIns.play('test');

    //GSDevTools.create();

  }, []);

  const [isFullscreen, setIsFullscreen] = useState(true);

  function toggleFullscreen() {

    const maiConDiv = document.getElementById('maiConDiv') as HTMLDivElement;

    if (isFullscreen === true) {

        maiConDiv.style.overflow = 'auto';
        maiConDiv.style.position = 'relative';

        document.body.style.overflow = 'auto';



        setIsFullscreen(false);

    } else {

        maiConDiv.style.overflow = 'hidden';
        maiConDiv.style.position = 'fixed';

        document.body.style.overflow = 'hidden';



        setIsFullscreen(true);

    }

  }



function resetTimeline() {

    gsap.set('#final-screen', { opacity: 0 });

    const typedIds = ['typed-happy','typed-mothers','typed-day'];
    
    for (const word of typedIds) {

        const typeWord : HTMLElement | null = document.getElementById(word);
        if (typeWord !== null) typeWord.textContent = '';

    };

    for (const heart of HEART_DEFS) {

        gsap.set(`#${heart.id}`, { opacity: 0, scale: 1, transformOrigin: '50% 50%' });

    };



    const finalScene = document.getElementById('finalScene');
    if (finalScene !== null) finalScene.style.visibility = 'hidden';


    gsaTimIns.restart();

};



  useEffect(() => {

    const orientationType = screen.orientation.type;
    console.log("Current orientation:", orientationType);

    if (orientationType.includes('portrait')) {

        alert('For the best experience, please view this card in landscape mode by rotating your device.');

        gsaTimIns.restart();

    }

    else {

        gsaTimIns.restart();

    }

  }, []);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Caveat:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9e8ec; overflow: hidden; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .mdc-cursor.blinking { animation: blink 0.6s linear infinite; }
      `}</style>

      <div id='maiConDiv' className={` ${ styles.mainContainerDiv } ${ isFullscreen ? styles.enterFullscreen : styles.exitFullscreen }` } >


        <div id='wrapper' className={ styles.wrapper }>


            <p><span id="typewriter" className={ `${ styles.typewriter }  typewriter` }></span><span id='cursor' className={ `${ styles.cursor }   cursor-blink` }>|</span></p>


        </div>



        <div className={ styles.videoContainer }>


            <svg id='thankYouSVG' className={ styles.thankYouSVG } style={{ visibility: 'hidden', opacity: 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">


                <defs>


                    <clipPath id="heartClip">


                        <path id="heartPath" className={ styles.heartPath } fillRule="evenodd" clipRule="evenodd" d="M 862.896 270 C 845.516 270 825.881 271.831 807.096 278.226 C 693.938 315.183 657.57 436.031 689.543 535.636 L 689.684 536.061 L 689.825 536.456 C 707.459 585.977 735.855 630.937 772.785 667.891 L 772.98 668.086 L 773.205 668.311 C 825.856 718.791 883.181 762.822 945.238 801.02 L 959.828 810 L 974.503 801.19 C 1036.7 763.832 1095.13 718.596 1147.13 668.511 L 1147.3 668.371 L 1147.47 668.201 C 1184.71 631.157 1213.1 585.892 1230.48 536.341 L 1230.62 535.916 L 1230.76 535.496 C 1262.11 436.115 1225.92 315.129 1113.55 278.705 C 1095.15 272.593 1076.17 270 1057.61 270 C 1015.86 270 984.954 287.494 960.023 305.298 C 935.262 287.606 904.167 270 862.896 270 Z"></path>


                    </clipPath>

                </defs>



                <foreignObject width="1920" height="1080">


                    <div className={ styles.videoContainer }>


                        <video id='thankYouVideo' className={ styles.videos } muted playsInline style={{ width: '1920px', height: '1080px', clipPath: 'url(#heartClip)' }}>

                            <source src={thankYouIllus} type="video/mp4" />

                        </video>



                        <video id='tasksVideo' className={ styles.videos } muted playsInline style={{ width: '1920px', height: '1080px', clipPath: 'url(#heartClip)' }}>

                            <source src={tasksIllus} type="video/mp4" />

                        </video>



                        <video id='littleThingsVideo' className={ styles.videos } muted playsInline style={{ width: '1920px', height: '1080px', clipPath: 'url(#heartClip)' }}>

                            <source src={littleThingsIllus} type="video/mp4" />

                        </video>



                        <video id='unnoticedThingsVideo' className={ styles.videos } muted playsInline style={{ width: '1920px', height: '1080px', clipPath: 'url(#heartClip)' }}>

                            <source src={unnoticedThingsIllus} type="video/mp4" />

                        </video>


                    </div>


                </foreignObject>



                {/* <rect width="1920" height="1080" style="stroke: rgb(0, 0, 0); fill: rgb(249, 232, 236); clip-path: url(#clip-0);"></rect> */}


            </svg>


        </div>



        {/* ── Final illustration screen ── */}
        <div id='finalScene'
          ref={finalRef}
          style={{
            position: 'absolute', inset: 0, opacity: 0, zIndex: 3,
            background: '#f9e8ec', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Hearts SVG */}
          <svg id='heartsSVG'
            viewBox="0 0 700 420"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
          >
            {HEART_DEFS.map(h => (
              <path
                id={h.id}
                key={h.id}
                ref={el => { heartRefs.current[h.id] = el; }}
                d={h.d}
                fill={h.fill}
                stroke="#c03050"
                strokeWidth={h.strokeWidth}
                opacity="0"
              />
            ))}
          </svg>

          {/* Happy Mother's Day text */}
          <div id='hmdTextDiv'
            style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              zIndex: 2, pointerEvents: 'none',
            }}
          >
            {(['Happy', "Mother's", 'Day'] as const).map((word, i) => (
              <div
                key={word}
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '112px',
                  color: '#8b2a3a',
                  lineHeight: 1.05,
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span id={`typed-${word.replaceAll("'", "").toLowerCase()}`} ref={i === 0 ? typedHappy : i === 1 ? typedMothers : typedDay} />
              </div>
            ))}
          </div>
        </div>

        <div id='butConDiv' className={ styles.buttonContainerDiv } >

            {/* Replay button */}
            <button id='repAniBut'
                onClick={resetTimeline}
                style={{
                padding: '8px 28px', fontSize: '13px', letterSpacing: '0.08em', marginRight: '12px',
                cursor: 'pointer', borderRadius: '20px', border: '1px solid #c08060',
                background: '#fdeee4', color: '#a05040', fontFamily: 'sans-serif', width: '180px',
                }}
            >
                Replay
            </button>

            {/* Fullscreen button */}
            <button id='fulScrBut'
                onClick={() => toggleFullscreen()}
                style={{
                padding: '8px 28px', fontSize: '13px', letterSpacing: '0.08em', marginLeft: '12px',
                cursor: 'pointer', borderRadius: '20px', border: '1px solid #c08060',
                background: '#fdeee4', color: '#a05040', fontFamily: 'sans-serif', width: '180px',
                }}
            >
                Toggle Fullscreen
            </button>

        </div>

      </div>
    </>
  );
}


