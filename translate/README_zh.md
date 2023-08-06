## 前言

随着Dapiya用户数量的逐渐上升，仅有英文和简体中文两个版本已经不再满足大家的需求，对于那些不精通英文和中文的用户来说更是如此。

因此，Dapiya官方团队在广泛招募能够对我们网站进行部分内容翻译的人士，让其他国家或地区的用户能够获得更好的浏览体验。

## 如何翻译我们的网站？

本网站默认语言为英文，因此您只需要将英文版本下载到您的电脑上，进行英文到其他语言的翻译。

翻译前，先将您要翻译的内容先放到对应的文件夹（如韩语为`ko`，日语为`jp`，简体中文为`zh`（繁体中文可分为`hk`、`tw`）等，后续称“语言缩写”）。

翻译工作完成后，可以将该文件夹压缩打包通过站内公示的邮箱发给站长，也可以通过github进行PR。翻译内容将由社区内部进行审核。

> **郑重提醒：**
> 
> **1. 我们不接受机翻！在您的翻译版本推送到仓库之后，将会有本社区内的人进行评估。一切机翻形式的请求将会被拒绝合并到本仓库。**
> 
> **2. 本团队并没有那么多时间帮您debug网页。请您看完本教程后再进行内容的翻译，否则出现跳转失败等问题时，我们将有可能删除您的翻译版本。**

## 需要翻译 / 转换的内容（以翻译语言时所在目录为根目录）

> **站长注：**
> 
> **1. 请善用关键字查找功能（注意需要区分大小写）。**
> 
> **2. 花括号内的内容需要你自行理解并补全（如您翻译的语言为日语，则`{语言缩写}`需要填写为`jp`）。若理解上有问题的，可以提交issue询问。**
> 
> **3. 内容太多了，本人翻译为中文版的时候也存在不少地方并没有翻译的情况。如果您觉得有地方需要翻译的可以自行翻译。**

#### 1. 导航栏部分（后续提及的页面都包含此内容）

此部分为从`<nav class="navbar navbar-default navbar-fixed-top">`至`</nav>`之间包括的所有内容。

* 找到`<a href="/">Current Storms</a>`，并将其内的`Current Storms`翻译为对应语言。
* 找到`aria-expanded="false">Satellite Imagery<span class="caret">`，并将其内的`Satellite Imagery`翻译为对应语言。
* 找到`<a href="/satellite/floater/">Real-time Satellite Imagery</a>`，并将其内的`Real-time Satellite Imagery`翻译为对应语言。
* 找到`target="_blank">Satellite Product</a>`，并将其内的`Satellite Product`翻译为对应语言。
* 找到`target="_blank">ROI Manager Login</a>`，并将其内的`ROI Manager Login`翻译为对应语言。
* 找到`<a href="/model/">Models</a>`，并将其内的`Models`翻译为对应语言。
* 找到`aria-expanded="false">Archive<span class="caret">`，并将其内的`Archive`翻译为对应语言。
* 找到`target="_blank">Active TCs Imagery</a>`，并将其内的`Active TCs Imagery`翻译为对应语言。
* 找到`target="_blank">Cyclone Archive Project</a>`，并将其内的`Cyclone Archive Project`翻译为对应语言。
* 找到`target="_blank">Best Track Archive</a>`，并将其内的`Best Track Archive`翻译为对应语言。
* 找到`target="_blank">Dapiya Discord Server</a>`，并将其内的`Dapiya Discord Server`翻译为对应语言。
* 找到`target="_blank">Dapiya QQ Users Group</a>`，并将其内的`Dapiya QQ Users Group`翻译为对应语言。
* 找到`aria-expanded="false">Language | 语言<span class="caret">`，并将其内的`语言`翻译为对应语言。
* 找到`<li><a href="/">English</a></li>`，键入回车，并打上`<li><a href="/{语言缩写}/">{语言名称}</a></li>`，语言名称需使用本语言填写。

#### 2. `/index.html`（网站首页）

此处不再提及导航栏部分。

* 找到`Current Storm Information and Analysis Tools`，并将其翻译为对应语言。
* 找到`No active storms at this time.`，并将其翻译为对应语言。
* 找到`Images for Analysis - REGIONAL`，并将其翻译为对应语言。
* 找到`Images for Analysis - GLOBAL`，并将其翻译为对应语言。
* 找到`Current Storms Information`，并将其翻译为对应语言。
* 找到`>>> next`，并将其内的`next`翻译为对应语言。

#### 3. `/satellite/floater/index.html`（活跃气旋卫星云图页面）

此处不再提及导航栏部分。

* 找到`Dapiya - Satellite Imagery`，并将其内的`Satellite Imagery`翻译为对应语言。
* 找到`Currently no active storms to watch.`，并将其翻译为对应语言。
* 找到`SELECT STORM NAME`，并将其翻译为对应语言。
* 找到`SATELLITE IMAGE TYPES`，并将其翻译为对应语言。
* 找到`cTM(\'VIS\', \'' + sT + '\')">VISIBLE</button>`，并将其内的`VISIBLE`翻译为对应语言。
* 找到`cTM(\'IR\', \'' + sT + '\')">INFRARED</button>`，并将其内的`INFRARED`翻译为对应语言。
* 找到`cTM(\'WV\', \'' + sT + '\')">WV</button>`，并将其内的`WV`翻译为对应语言。
* 找到`cTM(\'RGB\', \'' + sT + '\')">RGB</button>`，并将其内的`RGB`翻译为对应语言。
* 找到`MODEL TRACK TYPES`，并将其翻译为对应语言。
* 找到`No satellite imagery types to match.`，并将其翻译为对应语言。
* 找到`GIF Generator Options`，并将其翻译为对应语言。
* 找到`GIF Generator Window`，并将其翻译为对应语言。


**（以下部分涉及到代码原理层面，请尽量参考中文翻译）**

* 找到`<ins>GIF Loop</ins>`，并将其内的`GIF Loop`翻译为对应语言。
* 找到`<span class="glyphicon glyphicon-play" aria-hidden="true"></span> Image Loop`，并将其内的`Image Loop`翻译为对应语言。
* 找到`<span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Latest`，并将其内的`Latest`翻译为对应语言。
* 找到`Number of Frames`，并将其翻译为对应语言。
* 找到`Actual Number`，并将其翻译为对应语言。
* 找到`Interval (Second)`，并将其翻译为对应语言。
* 找到`Skip Every`和`Skip Every x Frames`，并将其翻译为对应语言（后者翻译和前者的一致）。
* 找到`Number of Workers`，并将其翻译为对应语言。
* 找到`Preload Images (Recommend)`，并将其翻译为对应语言。
* 找到`Group Preload (Recommend)`，并将其翻译为对应语言。
* 找到`Create GIF`和`Jump to pre-made GIF`，并将其翻译为对应语言。

#### 4. `/model/index.html`（数值预报页面）

此处不再提及导航栏部分。

* 找到`Models Pages`，并将其翻译为对应语言。
* 找到`Data not found.`，并将其翻译为对应语言。
* 找到`Downloading imagery...`，并将其翻译为对应语言。

**（以下部分需要您了解数值预报的含义，可参考中文翻译）**

* 找到`Select FCST Time`，并将其翻译为对应语言（`FCST`为`Forecast`）。
* 找到`data-cf-modified-="">More</button>`，并将其内的`More`翻译为对应语言。
* 找到`Select Model`，并将其翻译为对应语言。
* 找到`Select Runtime`，并将其翻译为对应语言。
* 找到`Select Area`，并将其翻译为对应语言。
* 找到`Select Plot`，并将其翻译为对应语言。
* 找到`<i class="glyphicon glyphicon-save small-icon"></i>UPDATE</button>`，并将其内的`UPDATE`翻译为对应语言。

#### 5. `/model/main.js`（数值预报页面所需JavaScript代码）

* 找到`$("#more").html('More');`，并将其内的`More`翻译为对应语言。
* 找到`Data not found.`，并将其翻译为对应语言。
* 找到`$("#" + boxID + "Title").html("Select Forecast Time");`，并将其内的`Select Forecast Time`翻译为对应语言。
* 找到`id="checkButton">Choose</button>`，并将其内的`Choose`翻译为对应语言。
* 找到`id="uncheckButton">Close</button>`，并将其内的`Close`翻译为对应语言。

#### 6. 站内提及的链接的转换

站内提及的链接，即带有`<a>`（超链接文本标签）标签的链接文本，您只需要修改`herf`属性内的值。

若`herf`属性内的值为`#`，或者该值开头并非为`/`（`//`开头的也不是），则无需进行修改，否则都需要在根目录（链接第一个`/`）前加上`/{语言缩写}`。

> **比如：**
> 
> * `<a href="/">`将改为`<a href="/{语言缩写}/">`、`<a href="/satellite/floater/">`将改为`<a href="/{语言缩写}/satellite/floater/">`；
> 
> * `<li><a href="//roi.dapiya.net:1234/">`内的链接则不需要作任何的修改。

**注意，从`<div class="navbar-brand">`到后续与其对应的`</div>`内的代码不需要做任何修改。**
