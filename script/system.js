$.extend({
	'bannerShow' : function(bo){
		if(this == $) {
			if(!$(bo).length) return;
			return new $.bannerShow(bo, index);
		}
		var _this = this, index = 0, timeout = null;
		var o = $(bo);
		var cbo = $(bo + ' .content');
		var bbo = $(bo + " .titBg");
		var tbo = $(bo + " .tit");
		var cot = cbo.find('li').length;
		var ibo = $(Array(cot + 1).join('<a/>')).appendTo(bo + ' .count');
		$(bo + ' .count').css({'marginTop' : o.height() - 22 + 'px'});
		ibo.on('click', function(){
			index = $(this).index();
			return _this.pause().start().Mar();
		});
		cbo.on('mouseenter', function(e){
			_this.pause();
			return false;
		}).on('mouseleave', function(e){
			_this.start();
			return false;
		});
		$(bo + ' .prev').click(function(){
			if(index == 1) index = cot - 1;
			else index -= 2;
			return _this.pause().start().Mar();
		});
		$(bo + ' .next').click(function(){
			if(index == cot) index = 0;
			return _this.pause().start().Mar();
		});
		this.pause = function(){
			if(timeout) clearInterval(timeout);
			timeout = null;
			return _this;
		}
		this.start = function(){
			if(!timeout) timeout = setInterval(_this.Mar, 3000);
			return _this;
		}
		this.Mar = function() {
			if(index >= cot) index = 0;
			tbo.text(cbo.find('li').eq(index).data('tit'));
			ibo.not(ibo.eq(index).css('backgroundColor', '#fff')).css('backgroundColor', '#000');
			var ol = - index * 100 + '%';
			bbo.css({'height' : '180px'});
			tbo.css({'font-size' : index % 2 ? '1px' : '90px', 'line-height' : '160px'});
			cbo.animate({'marginLeft' : ol}, function(){
				bbo.css({'height' : '80px'});
			});
			tbo.animate({'font-size' : '46px', 'line-height' : '70px'});
			index ++;
		}
		this.start();
		return this.Mar();
	},
	'proShow' : function(po) {
		if(this == $) {
			if(!$(po).length) return;
			return new $.proShow(po);
		}
		var _this = this, timeout = null;
		var uo = $(po + ' ul');
		var ow = uo.find('li').length * (uo.find('li').width() + 9);
		uo.append(uo.find('li').clone());
		this.Mar = function(){ 
			timeout = setInterval(function(){
				var lt = parseInt(uo.css('marginLeft')) - 1;
				if(Math.abs(lt) >= ow) lt = 0;
				uo.css('marginLeft', lt + "px");
			}, 10);
		}
		this.Mar();
		uo.mouseenter(function(){
			clearInterval(timeout);
		}).mouseleave(function(){
			_this.Mar();
		});
	},
	'fullPage' : function(o){
		var o = $(o)
		, el = document.documentElement
		, rfs = el.requestFullScreen
			 || el.webkitRequestFullScreen
			 || el.mozRequestFullScreen
			 || el.msRequestFullScreen
		, efs = document.exitFullscreen
			 || document.webkitExitFullscreen
			 || document.mozCancelFullScreen
		;
		if(typeof rfs!="undefined" && rfs){
			if(o.text() == '全屏浏览') {
				rfs.call(el);
				o.text('退出全屏');
			} else {
				efs.call(document);
				o.text('全屏浏览');
			}
		}
	}
});
$(function(){
	var amt = $('#main').find('.tit,.content,.news,.help,.msglink li,.imageslist dt').not('.msglink').add('#bannerchird,#banner');
	$.bannerShow('#banner');
	$.proShow('#prolist');
	$('#menu li').eq($('#menu').data('index')).addClass('hover');
	$('marquee').mouseenter(function(){
		this.stop();
	}).mouseleave(function(){
		this.start();
	});
	$('#tools .top').click(function(){
		$(window).scrollTop(0);
	});
	$(window).on('load resize', function(){
		if($('body').width() < 1330) {
			$('#tools').hide();
		} else {
			$('#tools').show();
		}
	}).on('load resize scroll', function(){
		var c = $(window).scrollTop() + window.innerHeight;
		amt.each(function(){
			var o = $(this);
			if(o.css('visibility') == 'hidden' && c - o.offset().top > 0) {
				amt = amt.not(o.css({
					'visibility': 'visible', 
					'animation': 'loadDiv' + Math.floor(Math.random() * 6) + ' 1s'
				}));
			}
		});
		var toolTop = $('#tools .top');
		if(toolTop.not(':visible') && $(window).scrollTop() > 1) {
			$('#tools').css('margin-bottom', -128);
			toolTop.show();
		}
		if(toolTop.is(':visible') && $(window).scrollTop() < 1) {
			$('#tools').css('margin-bottom', -96);
			toolTop.hide();
		}
	});
});