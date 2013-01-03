(function(window){	var life = {};	life.consts = {		DETAIL_FADEOUT_SPEED:400,		DETAIL_FADEIN_SPEED:400,		GRID_FADEIN_SPEED:300,		GRID_FADEOUT_SPEED:500,		SCROLL_TIMEOUT:false,		CONTENTTEXTMENU:true	}; 	life.utility = function(){		Date.prototype.format = function(){			var s = "";			s = this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDate();			return s;		};				return {			randomColor:function(){						var letters = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];					var c = "#";					for(var i=0;i<6;i++)					{						c += letters[Math.round(Math.random()*15)];					}					return c;			},									keyUp:function(e){				if(e.keyCode == 27){					$("#detail").fadeOut(life.consts.DETAIL_FADEOUT_SPEED);						}			}		};	}();	life.main = function(){		var times = 900;		var dateStart = "1984-11-29";		var dateEnd = new Date().format();		var months1 = parseInt(dateEnd.toString().split("-")[0],10)*12+parseInt(dateEnd.toString().split("-")[1],10);		var months2 = parseInt(dateStart.split("-")[0],10)*12+parseInt(dateStart.split("-")[1],10);		var months = months1-months2;				var showDetail = function(){			var $detail = $("#detail");			$detail.fadeIn(life.consts.DETAIL_FADEIN_SPEED,function(){				$("body").on("mouseup",function(e){							if(e.which == 1){						target = e.target;						if(target.id != "board" && !$.contains($("#board")[0],target))						{							$("body").off("mouseup");							$detail.fadeOut(life.consts.DETAIL_FADEOUT_SPEED);						}					}								});			});				};				var adjustDetail = function(){					};				return {			init:function(){						for(var i=0;i<times;i++){					var section = document.createElement("section");					if(i<months){											$(section).attr("class","grid passed");						$(section).html(i+1);						if(i ==(months-1)){							$this = $(section);							$this.css("background-color","#ffffff");							setInterval(function(){									$this.fadeOut(700,function(){																	$this.css("background-color",life.utility.randomColor());									$this.fadeIn(300);									});																},1000);						}					}					else{											$(section).attr("class","grid");					}					$(section).on("mouseover",function(){						$(this).fadeOut(life.consts.GRID_FADEOUT_SPEED,function(){							$(this).fadeIn(life.consts.GRID_FADEIN_SPEED);						});										});					$(section).on("click",showDetail);					$("#content").append(section);				}				$("#content").append("<div style=\"clear:both;\"></div>");					},			eventBind:function(){				$(document).on("keyup",life.utility.keyUp);				$(document).on("scroll",function(){    					if (life.consts.SCROLL_TIMEOUT){clearTimeout(life.consts.SCROLL_TIMEOUT);}    					life.consts.SCROLL_TIMEOUT = setTimeout(function(){    						var scrolltop = 80+$(document).scrollTop();						$("#detail").animate({top:scrolltop},300);  					},100);    				});				$(document).on("contextmenu",function(){					return life.consts.CONTENTTEXTMENU;				});			}		}	}();	window.life = life;})(window);life.main.init();life.main.eventBind();//alert(window.screen.height);