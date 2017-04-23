	
	
	
	/*	使用示例
	
	var config = {
		targetElem: document.getElementById("easyInput"),
		width: "300px",
		height: "35px",
		inpDT: "站内搜索",
		btnDT: "确认",
		fn: search
	}
	
	var easyInput = new EasyInput(config);
	easyInput.init();
	function search(){
		alert(easyInput.searchValue);
	}
	
	*/
	
	
	
	function EasyInput(config){
		// 以下是必选字段
		this.targetElem=config.targetElem;	// 目标元素
		this.width=config.width;			// 目标元素宽度, 仅px
		this.height=config.height;			// 目标元素高度, 仅px
		this.inpDT=config.inpDT;			// 输入框提示文字
		this.btnDT=config.btnDT;			// 确认按钮提示文字
		this.fn=config.fn;					// 确认按钮执行方法
		// ！！！返回值, 按下搜索键即可填充input中的值
		this.searchValue="";				// 输入框中的值
		// 以下作为局部变量, 不应被访问
		this.inp=null;
		this.btn=null;
		this.isNothing=true;
	}
	EasyInput.prototype={
		constructor: EasyInput,
		init: function(){
			
			var frag=document.createDocumentFragment(),
				elem=document.createElement("div");
			
			frag.appendChild(elem);
			
			this.inp=document.createElement("input"),
			this.btn=document.createElement("button");
			
			elem.appendChild(this.inp);
			elem.appendChild(this.btn);
			
			this.inp.type="text";
			this.inp.value=this.inpDT;
			this.btn.innerHTML=this.btnDT;
			
			myjs.addClass(elem,"easy-input-box");
			myjs.addClass(this.inp,"easy-input-input");
			myjs.addClass(this.inp,"nothing");
			myjs.addClass(this.btn,"easy-input-button");
			
			myjs.addHandler(this.inp,"focus",this._focus.bind(this));
			myjs.addHandler(this.inp,"blur",this._blur.bind(this));
			myjs.addHandler(this.inp,"keydown",this._keydown.bind(this));
			myjs.addHandler(this.btn,"click",this._click.bind(this));
			
			this.targetElem.style.height=(parseFloat(this.height)-8) + "px";
			this.targetElem.style.padding="4px";
			this.targetElem.style.display="inline-block";
			this.inp.style.width=(parseFloat(this.width)-54) + "px";
			this.targetElem.appendChild(frag);
			
		},
		
		_focus: function(event){
			var e=myjs.getEvent(event),
				t=myjs.getTarget(e);
			if(this.isNothing){
				t.value="";
			}
			myjs.delClass(t,"nothing");
			this.isNothing=false;
		},
		_blur: function(event){
			var e=myjs.getEvent(event),
				t=myjs.getTarget(e);
			if(!t.value.trim()){
				t.value=this.inpDT;
				myjs.addClass(t,"nothing");
				this.isNothing=true;
			}
		},
		_keydown: function(event){
			var e=myjs.getEvent(event),
				t=myjs.getTarget(e);
			if(e.keyCode === 13){
				this._blur(event);
				this._click();
				this._focus();
			}
		},
		_click: function(){
			if(this.isNothing){
				this.searchValue="";
				return ;
			} else{
				this.searchValue=this.inp.value.trim();
				this.fn();
			}
		}
	}
	
	
	
	
	
	
	
	
	