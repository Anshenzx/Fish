	var dive = document.getElementById("dive");
				var divo = document.getElementById("divo");			
				var divd = document.getElementById("divd");
				
				if(window.localStorage){
					
					
					var a = new Array();
					var e = new RegExp("简单模式");
					var r ="<ol>排名如下：";
					for (var i = 0 ; i < localStorage.length;i++) {
							if (e.test(localStorage.key(i))) {
								a.push(localStorage.getItem(localStorage.key(i)));
							}
					}	
					a.sort(function(a,b){return b-a});
						//	console.log(a);
							for (j = 0 ; j < 10 ; j++) {
								if(a[j] >=0){
										r += "<li>"+a[j]+"</li>";
								}	
							}
					r += "</ol>";
						dive.innerHTML = r;
				
					var ao = new Array();
					var o = new RegExp("普通模式");
					var ro ="<ol>排名如下：";
					for (var i = 0 ; i < localStorage.length;i++) {
							if (o.test(localStorage.key(i))) {
								ao.push(localStorage.getItem(localStorage.key(i)));
							}
					}	
					ao.sort(function(a,b){return b-a});
							console.log(ao);
							for (k = 0 ; k < 10 ; k++) {
								if(ao[k] >=0){
										ro += "<li>"+ao[k]+"</li>";
								}	
							}
					ro += "</ol>";
					divo.innerHTML = ro;
						
					var ad = new Array();
					var d = new RegExp("困难模式");
					var rd ="<ol>排名如下：";
					for (var i = 0 ; i < localStorage.length;i++) {
							if (d.test(localStorage.key(i))) {
								ad.push(localStorage.getItem(localStorage.key(i)));
							}
					}	
					ad.sort(function(a,b){return b-a});
							console.log(ad);
							for (k = 0 ; k < 10 ; k++) {
								if(ad[k] >=0){
										rd += "<li>"+ad[k]+"</li>";
								}	
							}
					rd += "</ol>";
						divd.innerHTML = rd;
				}
				
				var s1 = document.getElementById("s1");
				var s2 = document.getElementById("s2");
				var s3 = document.getElementById("s3");
				
				s1.onclick = function(){
					s1.className = "spanborder";
					s2.className = "";
					s3.className = "";
					divo.className = "hide";
					divd.className = "hide";
					dive.className = "";
				}
				s2.onclick = function(){
					s1.className = "";
					s2.className = "spanborder";
					s3.className = "";
					divo.className = "";
					divd.className = "hide";
					dive.className = "hide";
				}
				s3.onclick = function(){
					s1.className = "";
					s2.className = "";
					s3.className = "spanborder";
					divo.className = "hide";
					divd.className = "";
					dive.className = "hide";
				}
			