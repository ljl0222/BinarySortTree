/*!
 * 二叉排序树的后端部分相关实现
 * 1851977 李家麟
 * v2.0 (2020-09-04)
 */


// 定义一个节点类
var Node = function (data,parent) 
{
    this.Data = data;
    this.Parent = parent;
    this.LeftNode = null;
    this.RightNode = null;
    this.isSelected = false;
}

// 定义二叉树类
var BinaryTree = function () 
{
    this.Root = null;//根节点

    // Insert方法调用的子函数
    function insert(insertValue, node)
    {
        while (true) 
        {   
            // 左子树
            if (node.Data > insertValue) 
            {
                if (node.LeftNode == null) 
                {
                    node.LeftNode = new Node(insertValue, node);
                    break;
                } 
                else 
                {
                    node = node.LeftNode;
                }
            }
            
            // 右子树
            else if (node.Data < insertValue) 
            {
                if (node.RightNode == null) 
                {
                    node.RightNode = new Node(insertValue, node);
                    break;
                } 
                else 
                {
                    node = node.RightNode;
                }
            }
            
            // 相等（不符合二叉排序树定义，不允许出现键值相等的结点）
            else 
            {
                break;
            }
        }
    }

    // Insert方法，插入节点
    this.Insert = function (insertValue) 
    {
        // 无根节点，就new一个
        if (this.Root == null) 
        {
            this.Root = new Node(insertValue,null);
            return;
        }

        // 从根节点开始向下遍历，插入数值
        var node = this.Root;
        insert(insertValue, node);
        
    };

    // 深度
    this.Level = function () 
    {
        maxLevel = 0;
        level = 0;
        return levels(this.Root) - 1;
    }

    function levels(node)
    {
        // 若只有根节点
        if (node == null)
        {
            return 0;
        }
        
        // 若只有一层节点
        if (node.LeftNode == null && node.RightNode == null)
        {
            return 1;
        }

        // 这里加一是为了带上这一层的结果
        var ldepth = levels(node.LeftNode) + 1;
        var rdepth = levels(node.RightNode) + 1;

        return Math.max(ldepth, rdepth);

    }

    // 找最小子树
    this.FindMin = function ()
    {
        findMin(this.Root);
    }

    function findMin(node)
    {
        if (node.LeftNode == null)
        {
            return node;
        }
        return findMin(node.LeftNode);
    }

    // 找最大子树
    this.FindMax = function ()
    {
        return findMax(this.Root);
    }

    function findMax(node)
    {
        if (node.RightNode == null)
        {
            return node;
        }
        return findMax(node.RightNode);
    }
    
    // 先序遍历，传一个函数参数funs，便于打印结果
    this.PreOrder = function (funs) 
    {
        preOrder(this.Root, funs);
    }

    function preOrder(node, funs) 
    {
        funs(node);

        if (node.LeftNode != null) 
        {
            preOrder(node.LeftNode, funs);
        }

        if (node.RightNode != null) 
        {
            preOrder(node.RightNode, funs);
        }
    }


    // 搜索，拿着data与number比较，利用二叉排序树的性质进行搜索
    this.Search = function (number)
    {
        return search(this.Root, number);;
    }

    function search(node,number)
    {
        if (node == null)
        {
            return null;
        }

        // 对二叉排序树遍历搜索
        if (node.Data>number)
        {
            return search(node.LeftNode,number);
        } 
        else if (node.Data < number) 
        {
            return search(node.RightNode, number);
        } 
        else 
        {
            return node;
        }
    }


    // 删除，先搜索找到目标节点后，再进行删除
    this.Remove = function (number)
    {
        var node = this.Search(number);
        if (node != null)
        {
            remove.call(this,node);
        }
    }

    function remove(node)
    {
        var child, parent;

        // 若左右节点都不空
        if (node.LeftNode != null && node.RightNode != null) 
        {
            // 这里当左右孩子都在的时候，选取右孩子的最小节点作为替代
            // 这里选择左孩子的最大节点也可以，需要有调整
            // 最后调整到了左孩子的最大节点- -

            // var tempNode = findMin(node.RightNode);
            var tempNode = findMax(node.LeftNode);

            if (node.Parent == null) 
            {
                this.Root = tempNode;
            } 
            else 
            {
                if (node.Parent.LeftNode == node) 
                {
                    node.Parent.LeftNode = tempNode;
                } 
                else 
                {
                    node.Parent.RightNode = tempNode;
                }
            }

            // child = tempNode.RightNode;
            child = tempNode.LeftNode;

            parent = tempNode.Parent;

            if (parent.Data == node.Data) 
            {
                parent = tempNode;
            } 
            else 
            {
                if (child != null) 
                {
                    child.Parent = parent;
                }

                // parent.LeftNode = child;
                parent.RightNode = child;

                // tempNode.RightNode = node.RightNode;
                tempNode.LeftNode = node.LeftNode;

                // node.RightNode.Parent = tempNode;
                node.LeftNode.Parent = tempNode;
            }

            tempNode.Parent = node.Parent;

            // tempNode.LeftNode = node.LeftNode;
            tempNode.RightNode = node.RightNode;

            // node.LeftNode.Parent = tempNode;
            node.RightNode.Parent = tempNode;

        } 

        // 左右节点至少有一个为空
        else 
        {
            /*
             * 若左子树存在，右子树不存在，将左子树补上来
             * 若右子树存在，左子树不存在，将右子树补上来
             */

            if (node.LeftNode != null) 
            {
                child = node.LeftNode;
            } 
            else 
            {
                child = node.RightNode;
            }

            parent = node.Parent;

            if (child != null) 
            {
                child.Parent = parent;
            }

            if (parent != null) 
            {
                if (parent.LeftNode!=null && parent.LeftNode.Data == node.Data) 
                {
                    parent.LeftNode = child;
                } 
                else 
                {
                    parent.RightNode = child;
                }
            } 
            // 若删除的是根节点
            else 
            {
                this.Root = child;
            }
        }
        node = null;
    }

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

}