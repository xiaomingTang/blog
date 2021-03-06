
!!function(){
	"use strict";
	/* 红黑树
	 * 1. 红黑红黑，要么是红，要么是黑；
	 * 2. 根结点是黑；
	 * 3. 每个叶结点是黑；
	 * 4. 一个红结点，它的俩个儿子必然都是黑的；
	 * 5. 每一条路径上，黑结点的数目等同。
	 * 
	 * - 参考	http://blog.csdn.net/yang_yulei/article/details/26066409	一颗红黑树的构造全过程
	 * - 参考	https://zhuanlan.zhihu.com/p/24795143?refer=dreawer	【深入理解Java集合框架】史上最清晰的红黑树讲解（上）
	 * 
	 * # 原创，权利归属: https://xiaomingTang.github.io/blog/ #
	 * (有一个小bug，可是这里空白太小，写不下。)
	 */
	
	//	节点构造函数
	function Node(n){
		this.value = n;
		this.color = 1;	//	0: 黑色, 1: 红色
		this.parent = null;
		this.left = null;
		this.right = null;
	}
	//	节点原型
	Node.prototype = {
		constructor: Node,
		
		//	返回该节点（调用该方法的节点）的所处的关系地位: "left"、"right"、"root"
		standing: function(){
			return this.parent ?
				this.parent.left === this ?
					"left"	:
					"right"	:
				"root";
		},

		brother: function(){
			return this.parent ?
				this.parent.left === this ?
					this.parent.right :
					this.parent.left :
				null;
		},

		uncle: function(){
			return this.parent.brother();
		}
		
	}
	//	树构造函数，用于构造初始化根节点，及定义红色、黑色局部变量。
	function RBTree(n){
		this.root = new Node(n);
		this.black = 0;
		this.red = 1;
		this.root.color = this.black;
	}

	RBTree.prototype = {
		constructor: RBTree,
		
		//	将n插入p子树下
		insert: function(n, p){
			var temp = null;
			if(n < p.value){
				if(!p.left){
					temp = new Node(n);
					p.left = temp;
					temp.parent = p;
				} else{
					temp = this.insert(n, p.left);
				}
			} else{
				if(!p.right){
					temp = new Node(n);
					p.right = temp;
					temp.parent = p;
				} else{
					temp = this.insert(n, p.right);
				}
			}
			return temp;
		},
		//	将p节点左转
		leftRotate: function(p){
			var _parent = p.parent;
			var grandparent = p.parent.parent;
			if(grandparent){
				p.parent = grandparent;
				grandparent[_parent.standing()] = p;
				
				p.left && (p.left.parent = _parent);
				_parent.right = p.left;
				
				_parent.parent = p;
				p.left = _parent;
			} else{
				var _parent = p.parent;
				this.root = p;
				p.left = _parent;
				_parent.parent = p;
				_parent.right = null;
				p.parent = null;
			}
			p.color = this.black;
			p.left && (p.left.color = this.red);
			p.right && (p.right.color = this.red);
		},
		//	将p节点右转
		rightRotate: function(p){
			var _parent = p.parent;
			var grandparent = p.parent.parent;
			if(grandparent){
				p.parent = grandparent;
				grandparent[_parent.standing()] = p;
				
				p.right && (p.right.parent = _parent);
				_parent.left = p.right;
				
				_parent.parent = p;
				p.right = _parent;
			} else{
				var _parent = p.parent;
				this.root = p;
				p.right = _parent;
				_parent.parent = p;
				_parent.left = null;
				p.parent = null;
			}
			p.color = this.black;
			p.left && (p.left.color = this.red);
			p.right && (p.right.color = this.red);
		},
		//	
		get: function(n, p){
			if(n == p.value){
				return p;
			} else if(n < p.value){
				return p.left ? this.get(n, p.left) : null;
			} else if(n > p.value){
				return p.right ? this.get(n, p.right) : null;
			}
		},
		//	处理p节点
		handle: function(p){
			if(p === this.root || p.parent === this.root){
				return this;
			}
			if(p.color === this.red){	//	其为红
				if(p.parent && p.parent.color === this.red){	//	其父存在且为红
					if(!p.uncle() || p.uncle().color === this.black){	//	叔父不存在或为黑
						switch(p.parent.standing()){
							case "left":
								this.rightRotate(p.parent);
								break;
							case "right":
								this.leftRotate(p.parent);
								break;
							default: 
								break;
						}
					} else{	//	叔父为红
						p.parent.parent !== this.root && (p.parent.parent.color = this.red);
						p.parent.color = p.uncle().color = this.black;
						this.handle(p.parent.parent);
					}
				}
				return this;	//	其父为黑，则返回
			}
			return this;	//	其为黑，则返回
		},
		
	}

	//	生成长度为1000，大小为0-2000的互不相同的数组
	var temp = myjs.randomDiffNumArr(1000, 0, 2000);
	
	myjs.$("array").innerHTML = temp.join(", ");
	
	//	生成红黑树
	var tree = new RBTree(temp[0]);
	for(var i = 1, len = temp.length; i < len; i++){
		tree.handle(tree.insert(temp[i], tree.root));
	}
	
	//	先根遍历以验证树的有效性
	var tempArray = [];
	!!function print(p){
		if(p.left){
			print(p.left);
		}
		tempArray.push(p.value);
		if(p.right){
			print(p.right);
		}
	}(tree.root);
	myjs.$("preorder").innerHTML = tempArray.join(", ");
}();
	
	
	