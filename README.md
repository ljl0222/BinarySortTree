# 项目说明

## 题目内容

二叉排序树的建立和删除
输入一组关键值，建立相应的二叉排序树，完成结点的查找和删除操作。
要求：
- 可以实现删除根结点、叶子结点以及其它任意结点的功能；
- 可随时显示操作的结果。

## 软件功能

### 功能介绍

- 首先，可以通过“增加节点”的button来添加一个或多个节点，其中多个节点间用空格作分隔即可。在增加节点后，程序会自动通过增加的节点的数值，在二叉排序树中选择一个正确的位置将节点添加进去，并且绘图区域重新生成一个新的二叉排序树的树形结构，并且展示出来。

- 在二叉排序树被绘制之后，可以进行二叉排序树节点的删除。这里利用了container的click()事件，当检测到第一次click()的时候，选中目标节点，这个时候使用金黄色高亮目标节点的数据。当再次点击目标节点时，即可进行删除。若在选中目标节点后，点击别的节点，即可刷新目标节点为最新点击的节点。删除节点后，程序在canvas区域当中重新生成目标结构。

### 可视化实现

- 本程序中，对于二叉排序树的可视化采用了Easel.js的JavaScript库，从而使得html当中的Canvas处理更加简单，从而可以比较好的产生图形化界面。
- 在index.html中，设置了一块canvas区域(ShowTree)，在这个区域中，利用DrawTree.js中产生的树形结构进行填充，并且重设canvas区域的宽高。

## 设计思想

软件的设计思路主要分为前后端分别进行开发。
- 前端方面，主要是html5的原生canvas，再结合JavaScript库Easel.js一起开发。在画树方面，调用了createjs的Graphics()库函数以及Shape()库函数来绘制圆表示节点。利用Text属性添加每个节点的数值。并且，利用了createjs的container属性，为每个节点添加一个事件。在事件中用click()作为触发条件，并且利用其他函数以及一个clear标记来处理是否选中一个节点、删除节点。
- 后端方面，利用了JavaScript实现了二叉排序树后端的功能实现。利用一个function作为封装好的类，在类中内部实现包括Insert，Remove等方法，对外JavaScript自动生成接口，因此可以在前端的实现上方便的实例化一棵树，并且进行操作。
这里给出一个比较具体的算法的例子。二叉排序树中比较复杂的一个算法是二叉排序树节点的删除。当决定选择删除一个节点时，需要首先找到该节点位置的替代者。根据二叉排序树的定义以及大小关系，很容易得到：若原节点无左右子树，直接删除即可；若原节点只有单一子树，将原子树作为节点的替代即可；若原节点既有左子树，又有右子树，则需要选择右子树中最小的节点或者左子树中最大的节点，因此需要引入findMax和findMin方法，对于原子树进行搜索，找到替代的节点后再进行替换。

## 逻辑结构与物理结构

- 该程序的逻辑结构显然是树形结构。一个二叉排序树是特殊的二叉树，而二叉树是特殊的树形结构。所谓树形结构，就是当中的数据元素存在一对多的关系，即各元素以及元素之间的关系组成类似于树状图。作为一棵二叉排序树，我在其节点中定义了Node类，并利用new关键字，使用Node类产生了一棵完整的二叉排序树的结构。
- 在该程序中，其物理结构（即存储结构）显然是链式存储结构。虽然没有使用C/C++语言进行程序的开发。但是在JavaScript中利用了类似了C语言中定义类的方法，封装了var BinarySortTree = function()的二叉排序树结构，并且其节点Node类采用了LeftNode，RightNode，Parent的属性来进行对左右子树和父节点的访问。

## 开发平台

- 操作系统：Windows 10
- 开发语言：JavaScript/HTML/CSS
- 开发环境：npm 6.14.4，Node.js 12.13.0，Electron 8.2.2(在交付的可执行程序中的局部安装的node_mdules的Electron的版本为10.1.1，对此已经在main.js中加以对高版本的限制，在第二个项目的开发中有比较详细的说明)。
- 核心使用集成环境：Node.js
- 核心使用框架：Electron
- 代码编辑工具：Visual Studio Code 1.49.0
在html文件中链接了https://code.createjs.com/easeljs-0.8.2.min.js(Easel.js)


# electron-quick-start官方说明

## electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

### To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

### Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

### License

[CC0 1.0 (Public Domain)](LICENSE.md)
