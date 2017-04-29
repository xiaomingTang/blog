	
	/*	日历, 示例如下
	var config = {
		date: new Date(),			//	初始化日期
		container: $("calendar"),	//	容器
		selectable: true,			//	顶部月份年份是否可选
		suitable: false,			//	行数是否自适应（或固定6行）
		selectType: 1,				//	主体日期是否可选（0--不可选**1--可选单个日期**2--可选时间段）
	};
	var calendar = new Calendar(config);
	
	calendar.init();
 	*/
	function Calendar(config){
		this.dateObj = config.date;
		var that = this;
		
		this.synchDate=function(date){
			that.time = date.getTime();
			that.year = date.getFullYear();		// 月份  0起
			that.month = date.getMonth();
			that.date = date.getDate();			// 日期  1起
			that.day = date.getDay();			// 星期  0:星期天
			that.hour = date.getHours();
			that.minute = date.getMinutes();
			that.second = date.getSeconds();
			that.millisecond = date.getMilliseconds();
			
			that.pre = new Date(that.year,that.month,1).getDay();
			//	当月天数
			that.num = new Date((new Date(that.year,that.month+1,1)).getTime()-24*60*60*1000).getDate();
			that.suf = (42-that.pre-that.num)%7;
			
			that.isOver = ((42-that.pre-that.num)<=7);	// 日历行数是否超过5行
		};
		
		this.synchDate(config.date);
		
		this.container = config.container;
		this.selectable = config.selectable || false;	// 年份、月份是否可选
		this.suitable = config.suitable || false;		// 日历行数是否自适应
		this.selectType = config.selectType || 1;		// 日期选择模式 0:不可选 1:选择一个日期 2:选择一个时间段
		
		this.selectStart = undefined;
		this.box = null;
		this.elem = null;
		
		this.fn = config.fn;
		/*	specialDates = [	//	数据格式如下
		 *		{
		 *			date: [2017, 4, 21],
		 *			contents: "常用汉字及其unicode编码"
		 *		},
		 *		{
		 *			date: [2017, 4, 23],
		 *			contents: "批量修改文件名"
		 *		}
		 *	];
		 */
		this.specialDates = config.specialDates;
	}
	Calendar.prototype={
		constructor:Calendar,
		
		init: function(){
			this.createHeader();
			this.createBody();
			
			myjs.addHandler(this.container, "click", this.bodyClickHandler.bind(this));
			myjs.addHandler(this.container, "click", this.headerClickHandler.bind(this));
			myjs.addHandler(this.container, "change", this.selectChangeHandler.bind(this));
			
		},
		
		
		createHeader: function(){
			var frag = document.createDocumentFragment();
			var header = myjs.newElem("div", "calendar-header");
			var box = myjs.newElem("div");
			var preMonth = myjs.newElem("div", "calendar-pre-month", "young");
			var nextMonth = myjs.newElem("div", "calendar-next-month", "naive");
			var spanYear = myjs.newElem("span", null, "年");
			var spanMonth = myjs.newElem("span", null, "月");
			
			if(this.selectable){
				var selectYear = myjs.newElem("select", "calendar-select-year");
				var selectMonth = myjs.newElem("select", "calendar-select-month");
				
				for(var i = 2025; i > 1969; i--){
					var optionYear = myjs.newElem("option", null, i);
					if(i == this.year){
						optionYear.selected = "selected";
					}
					selectYear.appendChild(optionYear);
				}
				for(var i = 13; i--; ){
					var optionMonth = myjs.newElem("option", null, i);
					if(i == this.month + 1){
						optionMonth.selected = "selected";
					}
					selectMonth.appendChild(optionMonth);
				}
				
				box.appendChild(selectYear);
				box.appendChild(spanYear);
				box.appendChild(selectMonth);
				box.appendChild(spanMonth);
			} else {
				box.appendChild(myjs.newElem("span",  null, this.year + " 年 " + (this.month + 1) + " 月"));
			}
			
			frag.appendChild(header);
			header.appendChild(box);
			header.appendChild(preMonth);
			header.appendChild(nextMonth);
			this.container.appendChild(frag);
			frag = header = box = preMonth = nextMonth = spanYear = spanMonth = selectYear = selectMonth = null;
		},
		
		createBody: function(){
			var table = myjs.newElem("table", "calendar-content");
			var tbody = myjs.newElem("tbody");
			var tr = myjs.newElem("tr", "calendar-content-header");
			table.appendChild(tbody);
			tbody.appendChild(tr);
			var arr = ["日", "一", "二", "三", "四", "五", "六"];
			for(var i = 0; i < 7; i++){
				var td = myjs.newElem("td", null, arr[i]);
				if(i==0 || i==6){
					td.className = "calendar-header-weekend";
				}
				tr.appendChild(td);
			}
			var total = this.suitable ? this.pre + this.num + this.suf : 42;
			var curDate=new Date();
			var curYear=curDate.getFullYear();
			var curMonth=curDate.getMonth();
			var tempDate= curYear<this.year ? -8 : curYear>this.year ? 40 : curMonth<this.month ? -8 : curMonth>this.month ? 40 : curDate.getDate();
			var specialDate = {};
			
			for(var i = 0, len = this.specialDates.length; i < len; i++){
				if(this.specialDates[i].date[0] == this.year && this.specialDates[i].date[1] == this.month){
					var str = specialDate[this.specialDates[i].date[2] + ""];
					specialDate[this.specialDates[i].date[2] + ""] = str ? str + this.specialDates[i].content + " ; " : this.specialDates[i].content + " ; ";
				}
			}
			
			for(var i = 0; i < total; i++){
				if(i % 7 == 0){
					var tr = myjs.newElem("tr", "calendar-content-body");
					tbody.appendChild(tr);
				}
				if(i < this.pre || i >= this.pre + this.num){
					var td = myjs.newElem("td");
					tr.appendChild(td);
				} else {
					var d = i - this.pre + 1;
					var td = myjs.newElem("td", null, d);
					if(d < tempDate){
						myjs.addClass(td, "calendar-pre-date");
					} else if(d == tempDate){
						myjs.addClass(td, "calendar-cur-date");
					} else {
						myjs.addClass(td, "calendar-next-date");
					}
					if(i % 7 == 0 || i % 7 == 6){
						myjs.addClass(td, "calendar-body-weekend");
					}
					if((d + "") in specialDate){
						myjs.addClass(td, "special-date");
						td.title = specialDate[d + ""];
					}
					tr.appendChild(td);
				}
			}
			
			this.container.appendChild(table);
			table = tbody = tr = td = null;
		},
		
		bodyClickHandler: function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			
			switch(this.selectType){
				case 0:
					break;
				case 1:
					if(myjs.hasClass(t, "special-date")){
						var date=new Date(this.year, this.month, t.innerHTML);
						this.fn(date);
					}
					break;
				case 2:
					if(myjs.hasClass(t, "calendar-pre-date") || myjs.hasClass(t, "calendar-cur-date")){
						if(!this.selectStart){
							this.selectStart = new Date(this.year, this.month, t.innerHTML);
							this.addDateClass([this.year, this.month, parseInt(t.innerHTML), "calendar-selected"]);
						} else {
							var newDate = new Date(this.year, this.month, t.innerHTML);
							if(this.convertToString(this.selectStart) == this.convertToString(newDate)){
								this.selectStart = newDate = null;
								this.selectStart = undefined;
								this.removeDateClass("calendar-selected");
								return ;
							}
							if(this.selectStart > newDate){
								this.fn(newDate, this.selectStart);
							} else{
								this.fn(this.selectStart, newDate);
							}
							this.removeDateClass("calendar-selected");
							newDate = null;
							this.selectStart = undefined;
						}
					}
					break;
				default:
					break;
			}
			return null;
		},
		headerClickHandler: function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			if(myjs.hasClass(t, "calendar-pre-month")){
				var newDate = new Date( this.year, this.month - 1, 1 );
				this.synchDate(newDate);
				this.container.innerHTML = "";
				this.createHeader();
				this.createBody();
				
			} else if (myjs.hasClass(t, "calendar-next-month")){
				var newDate = new Date( this.year, this.month + 1, 1 );
				this.synchDate(newDate);
				this.container.innerHTML = "";
				this.createHeader();
				this.createBody();
				
			}
			
		},
		selectChangeHandler: function(event){
			var e = myjs.getEvent(event);
			var t = myjs.getTarget(e);
			if(myjs.hasClass(t, "calendar-select-year")){
				var newDate = new Date(t.value, this.month, 1 );
				this.synchDate(newDate);
				this.container.innerHTML = "";
				this.createHeader();
				this.createBody();
				
			} else if(myjs.hasClass(t, "calendar-select-month")){
				var newDate = new Date(this.year, t.value - 1, 1 );
				this.synchDate(newDate);
				this.container.innerHTML = "";
				this.createHeader();
				this.createBody();
				
			}
			
		},
		convertToString: function(dateObject){
			var year = dateObject.getFullYear() + "";
			var month = dateObject.getMonth() + 1;
			var date = dateObject.getDate();
			month = month > 9 ? month : "0" + month;
			date = date > 9 ? date : "0" + date;
			return year + "-" + month + "-" + date;
		},
		convertToArray: function(dateObject){
			var year = dateObject.getFullYear() + "";
			var month = dateObject.getMonth() + 1;
			var date = dateObject.getDate();
			month = month > 9 ? month : "0" + month;
			date = date > 9 ? date : "0" + date;
			return [year, month, date];
		},
		addDateClass: function(/*[year, month, date, className]*/){
			for(var i = 0, len = arguments.length; i < len; i++){
				if(arguments[i][0] == this.year && arguments[i][1] == this.month && arguments[i][2] > 0 && date <= 31){
					rowNum = parseInt((arguments[i][2] + this.pre) / 7);
					colNum = (arguments[i][2] + this.pre + 1) % 7;
					var td = document.getElementsByClassName("calendar-content-body")[rowNum].getElementsByTagName("td")[colNum];
					if(td.innerHTML){
						myjs.addClass(td, arguments[i][3]);
					}
				}
			}
		},
		removeDateClass: function(className){
			var table = document.getElementsByClassName("calendar-content")[0];
			var tds = table.getElementsByClassName(className);
			for(var i = 0, len = tds.length; i < len; i++){
				myjs.delClass(tds[i], className);
			}
		},
		
		
	}
	
	
	
	
	
 	
 	
 	
 	
 	
 	
 	
