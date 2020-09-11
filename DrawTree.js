/*!
 * 二叉排序树的前端部分相关实现
 * 1851977 李家麟
 * v2.2 (2020-09-07)
 */

/*
 *function Scale()
 *{
 *    var copy = ShowTree.getContext("2d");
 *    copy.scale(0.5,0.5);
 *    ShowTree = copy;
 *    RenewTreeNode(number); 
 *}
 */

// 新建节点
function CreateNode(node, number, x, y, color) 
{
    var textX = 0;
    if (number < 10)  // 一位数
    {
        textX = -5;
    } 
    else if (number > 9 && number < 100) // 二位数
    {
        textX = -9;
    } 
    else // 三位数
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

// 画线
function CreateLineTo(fatherNodex, fatherNodey, childrenNodex, childrenNodey) 
{
    var sp = new createjs.Shape();
    sp.graphics.s("#8080c0").ss(2).mt(
        fatherNodex, 
        fatherNodey + 15
        ).lt(childrenNodex, childrenNodey - 15).es();//线
    return sp;
}

// 讲已选中的效果清空，便于下一步选择
function ClearIsSelected(node)
{
    if (node.isSelected == true)
    {
        node.isSelected = false;
    }
}

// 添加一个节点
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

// 以逗号为分割线，添加所有节点
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

// 删除节点
function DeleteNumber(number)
{
    tree.Remove(parseInt(number));
    RenewTreeNode();
}

// 重新绘画节点(重要函数)
function RenewTreeNode() 
{
    stage.removeAllChildren();
    SetCanvasWidthHeight(tree);
    tree.SetPoint();
    tree.PreOrder(SetPreOrder);
}


// 调整长宽
function SetCanvasWidthHeight(tree) 
{
    var level = tree.Level();
    ShowTree.height = height * level + tops + foot;
    ShowTree.width = spacing * 2 + Math.pow(2, level + 1) * width;
}

// 遍历，建立起树(绘画每个节点，配合先序遍历使用)
function SetPreOrder(node) 
{
    var container = CreateNode(
        node,
        node.Data,
        ShowTree.width / 2 + width * node.nodePoint,
        (node.nodeLevel * height + parseInt(tops)),
        "#4F586B"
        );
    stage.addChild(container);

    if (node.Parent != null) 
    {
        var line = CreateLineTo(
            (ShowTree.width / 2 + width * node.Parent.nodePoint),
            (node.Parent.nodeLevel * height + parseInt(tops)),
            (node.Data, ShowTree.width / 2 + width * node.nodePoint),
            (node.nodeLevel * height + parseInt(tops))
            );
        stage.addChild(line);
    }
    stage.update();
}

