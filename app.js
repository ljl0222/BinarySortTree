var gameView = document.getElementById("gameView");
var stage = new createjs.Stage(gameView);


var height = 50;//节点之间的高
var width = 15;//节点之间的宽
var tops = 40;//根节点离顶部的距离
var foot = 40;//树离底部距离
var spacing = 30;//树分别离两边的间距

var tree = new BinaryTree();

// gameView.width = 0;
// gameView.height = 0;



function AddOneNumber()
{
    var numbertext = document.getElementById("numbertext").value;

    var oneNums = numbertext.match(/[1-9][0-9]{0,2}\,?/);
    document.getElementById("numbertext").value = numbertext.replace(/[1-9][0-9]{0,2}\,?/, "");

    var num = (oneNums+"").match(/[1-9][0-9]{0,2}/);
     
    if (num)
    {
        tree.Insert(parseInt(num));
        RenewTreeNode();
    }
}

function AddAllNumber()
{
    while (true) {
        AddOneNumber();
        var numbertext = document.getElementById("numbertext").value;
        if (!/[1-9][0-9]{0,2}/.test(numbertext))
        {
            break;
        }
    }
}

function DeleteNumber(number)
{
    tree.Remove(parseInt(number));
    RenewTreeNode();
}
 
function RenewTreeNode() 
{
    stage.removeAllChildren();
    
    SetCanvasWidthHeight(tree);

    tree.SetPoint();

    tree.PreOrder(SetPreOrder);
}

function SetCanvasWidthHeight(tree) 
{
    var level = tree.Level();
    gameView.height = height * level + tops + foot;
    gameView.width = Math.pow(2, level+1) * width + spacing*2;
}

function SetPreOrder(node) 
{
    var container = CreateNode(
        node,
        node.Data,
        gameView.width / 2 + width * node.nodePoint,
        (node.nodeLevel * height + parseInt(tops)),
        "#4F586B");
    stage.addChild(container);

    if (node.Parent != null) 
    {
        var line = CreateLineTo(
            (gameView.width / 2 + width * node.Parent.nodePoint),
            (node.Parent.nodeLevel * height + parseInt(tops)),
            (node.Data, gameView.width / 2 + width * node.nodePoint),
            (node.nodeLevel * height + parseInt(tops)));
        stage.addChild(line);
    }
    stage.update();
}

//color=gray red yellow blue  black
function CreateNode(node, number, x, y, color) 
{
    var textX = 0;
    if (number < 10) 
    {
        textX = -5;
    } 
    else if (number > 9 && number < 100) 
    {
        textX = -9;
    } 
    else 
    {
        textX = -14;
    }

    var text;
    if (node.isSelected == false)
    {
        text = new createjs.Text(number, "16px Arial", "#DDE2F1");
    }
    else
    {
        text = new createjs.Text(number, "16px Arial", "#F5D040");
    }

    text.x = textX;
    text.y = -8;

    var graphics = new createjs.Graphics();
    graphics.setStrokeStyle(1);
    graphics.beginStroke("#F9ECDF");
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, 15);
    var shape = new createjs.Shape(graphics);

    var container = new createjs.Container();
    container.x = x;
    container.y = y;
    container.addChild(shape, text);

    container.addEventListener("click", function () 
    {
        if (node.isSelected == true)
        {
            DeleteNumber(text.text);
        }
        else
        {
            tree.PreOrder(ClearIsSelected);
            node.isSelected = true;
            RenewTreeNode(number); 
        }
    });

    return container;
}

function CreateLineTo(fatherNodex, fatherNodey, childrenNodex, childrenNodey) 
{
    var sp = new createjs.Shape();
    sp.graphics.s("#8080c0").ss(2).mt(fatherNodex, fatherNodey + 15).lt(childrenNodex, childrenNodey - 15).es();//线
    return sp;
}

function ClearIsSelected(node)
{
    if (node.isSelected == true)
    {
        node.isSelected = false;
    }
}

/*
 *function Scale()
 *{
 *    var copy = gameView.getContext("2d");
 *    copy.scale(0.5,0.5);
 *    gameView = copy;
 *    RenewTreeNode(number); 
 *}
 */