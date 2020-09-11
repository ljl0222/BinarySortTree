// 计算深度和宽度（共有多少孩子），从而推算位置
this.SetPoint = function () 
{
    var thisMaxLevel = this.Level();
    var childQuanty = Math.pow(2, thisMaxLevel);

    this.Root.nodeLevel = 0;
    this.Root.nodePoint = 0;

    if (this.Root.LeftNode != null)
    {
        setPointsLeft(this.Root.LeftNode, -1 * childQuanty / 2, 0, thisMaxLevel - 1);
    }
    
    if (this.Root.RightNode != null)
    {
        setPointsRight(this.Root.RightNode, childQuanty / 2, 0, thisMaxLevel - 1);
    }
}

function setPointsLeft(node, point, levels, thisMaxLevel) 
{
    levels++;
    node.nodeLevel = levels;
    node.nodePoint = point;

    if (node.LeftNode != null) 
    {
        setPointsLeft(node.LeftNode, point - Math.pow(2, thisMaxLevel - levels), levels, thisMaxLevel);
    }

    if (node.RightNode != null) 
    {
        setPointsLeft(node.RightNode, point + Math.pow(2, thisMaxLevel - levels), levels, thisMaxLevel);
    }
}

function setPointsRight(node, point, levels, thisMaxLevel) 
{
    levels++;
    node.nodeLevel = levels;
    node.nodePoint = point;

    if (node.LeftNode != null) 
    {
        setPointsRight(node.LeftNode, point - Math.pow(2, thisMaxLevel - levels), levels, thisMaxLevel);
    }

    if (node.RightNode != null) 
    {
        setPointsRight(node.RightNode, point + Math.pow(2, thisMaxLevel - levels), levels, thisMaxLevel);
    }
}