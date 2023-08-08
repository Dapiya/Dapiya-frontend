## Completed Translations:

1. English
2. Simplified Chinese(简体中文)

## Introduction

As Dapiya gains a bigger user base, the previous mixed Chinese/English webpage is no longer suitable for our users, thus we rolled out multi-language support in July. However, we quickly realized that since our front end is open source anyways, anyone in the community can submit their own translations to any language.

So, if you wish to help us out and bring Dapiya to a wider range of audience that uses your language, please read on.

## How to translate Dapiya

The default language for Dapiya is English. Begin by downloading the English version of the website from the GitHub repository.

Before translating, put the content you want to translate into the corresponding folder (such as Korean for `ko`, Japanese for `jp`, Simplified Chinese for `zh` (Traditional Chinese can be divided into `zh_hk` and `zh_tw`), etc., hereinafter referred to as "language abbreviation").

After the work is completed, you can submit a PR in this repository or sent us the file via Discord or QQ.  We will review your work and apply it to the website.

> **Important Reminder:**
> 
> **1. Don't just Google translate everything! While usage of LLMs and other translation tools are encouraged, please check your work before submitting**
> 
> **2. Please read this document carefully and make sure stuff is done right.**

## Content to be Translated/Converted (with the language directory as the root directory when translating)

> **Tips**
> 
> **1. Ctrl+F is very useful**
> 
> **2. The content in curly braces needs('{}') to be understood and completed by yourself (if the language you are translating is Japanese, then `{language abbreviation}` needs to be filled in as `jp`). If you have any problems understanding it, ask us on Discord/QQ/GitHub repo issues**
> 
> **3. There's too much content, and not absolutely everything needs to be translated, consider based on your experience**

#### 1. Navigation Bar Section (including the content mentioned later)

This section includes all content between `<nav class="navbar navbar-default navbar-fixed-top">` and `</nav>`.

* Find `<a href="/">Current Storms</a>` and translate `Current Storms` into the corresponding language.
* Find `aria-expanded="false">Satellite Imagery<span class="caret">` and translate `Satellite Imagery` into the corresponding language.
* Find `<a href="/satellite/floater/">Real-time Satellite Imagery</a>` and translate `Real-time Satellite Imagery` into the corresponding language.
* Find `target="_blank">Satellite Product</a>` and translate `Satellite Product` into the corresponding language.
* Find `target="_blank">ROI Manager Login</a>` and translate `ROI Manager Login` into the corresponding language.
* Find `<a href="/model/">Models</a>` and translate `Models` into the corresponding language.
* Find `aria-expanded="false">Archive<span class="caret">` and translate `Archive` into the corresponding language.
* Find `target="_blank">Active TCs Imagery</a>` and translate `Active TCs Imagery` into the corresponding language.
* Find `target="_blank">Cyclone Archive Project</a>` and translate `Cyclone Archive Project` into the corresponding language.
* Find `target="_blank">Best Track Archive</a>` and translate `Best Track Archive` into the corresponding language.
* Find `target="_blank">Dapiya Discord Server</a>` and translate `Dapiya Discord Server` into the corresponding language.
* Find `target="_blank">Dapiya QQ Users Group</a>` and translate `Dapiya QQ Users Group` into the corresponding language.
* Find `aria-expanded="false">Language | 语言<span class="caret">` and translate `语言` into the corresponding language.
* Find `<li><a href="/">English</a></li>`, press Enter, and add `<li><a href="/{language abbreviation}/">{language name}</a></li>`. The language name should be filled in with the corresponding language.

#### 2. `/index.html` (Website Homepage)

This section does not mention the navigation bar section.

* Find `Current Storm Information and Analysis Tools` and translate it into the corresponding language.
* Find `No active storms at this time.` and translate it into the corresponding language.
* Find `Images for Analysis - REGIONAL` and translate it into the corresponding language.
* Find `Images for Analysis - GLOBAL` and translate it into the corresponding language.
* Find `Current Storms Information` and translate it into the corresponding language.
* Find `>>> next`, and translate `next` into the corresponding language.

#### 3. `/satellite/floater/index.html` (Active Cyclone Satellite Cloud Map Page)

This section does not mention the navigation bar section.

* Find `Dapiya - Satellite Imagery` and translate `Satellite Imagery` into the corresponding language.
* Find `Currently no active storms to watch.` and translate it into the corresponding language.
* Find `SELECT STORM NAME` and translate it into the corresponding language.
* Find `SATELLITE IMAGE TYPES` and translate it into the corresponding language.
* Find `cTM(\'VIS\', \'' + sT + '\')">VISIBLE</button>` and translate `VISIBLE` into the corresponding language.
* Find `cTM(\'IR\', \'' + sT + '\')">INFRARED</button>` and translate `INFRARED` into the corresponding language.
* Find `cTM(\'WV\', \'' + sT + '\')">WV</button>` and translate `WV` into the corresponding language.
* Find `cTM(\'RGB\', \'' + sT + '\')">RGB</button>` and translate `RGB` into the corresponding language.
* Find `MODEL TRACK TYPES` and translate it into the corresponding language.
* Find `No satellite imagery types to match.` and translate it into the corresponding language.
* Find `GIF Generator Options` and translate it into the corresponding language.
* Find `GIF Generator Window` and translate it into the corresponding language.

**(The following part involves the code principle level, please refer to the Chinese translation as much as possible)**

* Find `<ins>GIF Loop</ins>` and translate `GIF Loop` into the corresponding language.
* Find `<span class="glyphicon glyphicon-play" aria-hidden="true"></span> Image Loop` and translate `Image Loop` into the corresponding language.
* Find `<span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Latest` and translate `Latest` into the corresponding language.
* Find `Number of Frames` and translate it into the corresponding language.
* Find `Actual Number` and translate it into the corresponding language.
* Find `Interval (Second)` and translate it into the corresponding language.
* Find `Skip Every` and `Skip Every x Frames`, and translate them into the corresponding language (the translation of the latter is consistent with the former).
* Find `Number of Workers` and translate it into the corresponding language.
* Find `Preload Images (Recommend)` and translate it into the corresponding language.
* Find `Group Preload (Recommend)` and translate it into the corresponding language.
* Find `Create GIF` and `Jump to pre-made GIF`, and translate them into the corresponding language.

#### 4. `/model/index.html` (Numerical Forecast Page)

This section does not mention the navigation bar section.

* Find `Models Pages` and translate it into the corresponding language.
* Find `Data not found.` and translate it into the corresponding language.
* Find `Downloading imagery...` and translate it into the corresponding language.

**(The following part requires you to understand the meaning of numerical forecasting, you can refer to the Chinese translation)**

* Find `Select FCST Time` and translate it into the corresponding language (`FCST` stands for `Forecast`).
* Find `data-cf-modified-="">More</button>` and translate `More` into the corresponding language.
* Find `Select Model` and translate it into the corresponding language.
* Find `Select Runtime` and translate it into the corresponding language.
* Find `Select Area` and translate it into the corresponding language.
* Find `Select Plot` and translate it into the corresponding language.
* Find `<i class="glyphicon glyphicon-save small-icon"></i>UPDATE</button>` and translate `UPDATE` into the corresponding language.

#### 5. `/model/main.js` (JavaScript code required for the Numerical Forecast page)

* Find `$("#more").html('More');` and translate `More` into the corresponding language.
* Find `Data not found.` and translate it into the corresponding language.
* Find `$("#" + boxID + "Title").html("Select Forecast Time");` and translate `Select Forecast Time` into the corresponding language.
* Find `id="checkButton">Choose</button>` and translate `Choose` into the corresponding language.
* Find `id="uncheckButton">Close</button>n` and translate `Close` into the corresponding language.

#### 6. Conversion of Links Mentioned on the Website

Links mentioned on the website, that is, the link text with the `<a>` (hyperlink text tag) tag, you only need to modify the value of the `herf` attribute.

If the value of the `herf` attribute is `#`, or if the value does not start with `/` (those starting with `//` are not either), no modification is required. Otherwise, you need to add `/{language abbreviation}` before the root directory (the first `/`) of the link.

> **For example:**
> 
> * `<a href="/">` will be changed to `<a href="/{language abbreviation}/">`, and `<a href="/satellite/floater/">` will be changed to `<a href="/{language abbreviation}/satellite/floater/">`;
> * The link in `<li><a href="//roi.dapiya.net:1234/">` does not need to be modified in any way.
> 
> **Note that the code from `<div class="navbar-brand">` to the corresponding `</div>` does not need to be modified in any way.**
