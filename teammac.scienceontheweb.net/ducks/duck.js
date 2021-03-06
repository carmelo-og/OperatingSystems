var do_only_once = 0;

		jQuery(document).ready(function(){
				var add = 0;
                var speed = 1800;
                var startspeed = 1800;
                var gameStatus = 0;
                var vertDict = [[30, 40, 40, 20, 30, 10, 10], [40, 40, 50, 30, 30, 20, 20], [50, 40, 30, 10, 30, 50, 30]];
                var horDict = [[50, 10, 20, 90, 70, 80, 30], [20, 50, 10, 80, 40, 30, 20], [10, 20, 40, 30, 50, 70, 10]];
                var moveCursor = 0;
                var level = 0;
                var currentTarget = -1; // Used for focusing on one duck. -1 means no target
                var dropInProgress = [0, 0, 0];
                let highscore = getHighScore();

                var word = [document.getElementById("word1"), document.getElementById("word2"), document.getElementById("word3")];
                var domMod = ["", "", ""];
                var dictionary = ["aa", "ss", "dd", "ff", "gg", "hh", "jj", "kk", "ll", ";;", "fj", "dk", "sl", "a;", "gh", "ty", "ru", "ei", "wo", "qp", "bn", "vm", "c,", "x.", "zz"];
                
                var wordArray = ["a", "s", "d"];
                var keyArray = [102, 100, 115]; //f,d,s
                var wordCursor = [0,0,0];

				function game_over(){
                    if(gameStatus == 1){
                        gameStatus = 0;
                        currentTarget = -1; // Used for focusing on one duck. -1 means no target
                        //jQuery('.duck').stop().animate({'left':'-20%'},300);
                        // jQuery('.scorezone').html('GAME OVER');
                        jQuery('#scorezone').append('<div class="try_again">TRY AGAIN</div>');
                        dictionary = ["aa", "ss", "dd", "ff", "gg", "hh", "jj", "kk", "ll", ";;", "fj", "dk", "sl", "a;", "gh", "ty", "ru", "ei", "wo", "qp", "bn", "vm", "c,", "x.", "zz"];
                        wordArray = ["a", "s", "d"];
                        // fill keyArray with initial word array, TODO load word array from dictionary
                        for(i = 0; i < 3; i++){
                            wordCursor[i] = 0;
                            keyArray[i] = wordArray[i].charCodeAt(wordCursor[i]);
                            word[i].innerHTML = wordArray[i];
                        }
                        if (add > highscore) {
                            localStorage.setItem('duckHighscore', add);
                             highscore = add;
                         }
                         $(".scorezone").css({'z-index':20});
                    }
				}
	
				function start(){
                    gameStatus = 1;
					add = 0;
                    speed = 1800;
                    jQuery('.scorezone').html('Score: ' + add);
                    jQuery('.highscore').html('HighScore: ' + highscore);
                    jQuery('.duck').stop();
                    $(".scorezone").css({'z-index':1});
                    duckFlight('#duck1', '#duckimg1', 0);
                    setTimeout(function(){
                        duckFlight('#duck2', '#duckimg2', 1);
                    },2000);
                    setTimeout(function(){
                        duckFlight('#duck3', '#duckimg3', 2);
                    },4000);
					// jQuery('.duck').animate({'top':'0%'},speed, function(){
					// 	game_over();
					// 	jQuery('.try_again').click(function(){start();});
					// });
				}

                function duckImage(duckImg, vertPrev, horPrev, vert, hor){
                    if(horPrev >= hor){
                        if(vertPrev > vert){
                            if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                            $(duckImg).css({'background-image':'url(duck1.png)', 'transform':'scale(-1,1)'});
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck2.png)', 'transform':'scale(-1,1)'});
                            },speed*(1/3));
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck3.png)', 'transform':'scale(-1,1)'});
                            },speed*(2/3)); 
                        }
                        if(vertPrev <= vert){
                            if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                            $(duckImg).css({'background-image':'url(duck4.png)', 'transform':'scale(-1,1)'});
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck5.png)', 'transform':'scale(-1,1)'});
                            },speed*(1/3));
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck6.png)', 'transform':'scale(-1,1)'});
                            },speed*(2/3)); 
                        }
                    }
                    if(horPrev < hor){
                        if(vertPrev > vert){
                            if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                            $(duckImg).css({'background-image':'url(duck1.png)', 'transform':'scale(1,1)'});
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck2.png)', 'transform':'scale(1,1)'}); 
                            },speed*(1/3));
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck3.png)', 'transform':'scale(1,1)'});
                            },speed*(2/3));
                        }
                        if(vertPrev <= vert){
                            if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                            $(duckImg).css({'background-image':'url(duck4.png)', 'transform':'scale(1,1)'});
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck5.png)', 'transform':'scale(1,1)'});
                            },speed*(1/3));
                            setTimeout(function(){
                                if(dropInProgress[parseInt(duckImg.replace("#duckimg", "")) - 1] == 0)
                                $(duckImg).css({'background-image':'url(duck6.png)', 'transform':'scale(1,1)'});
                            },speed*(2/3)); 
                        }
                    }
                }
                function duckFlight(duckNum, duckImg, num) {
                    // var a = vertDict[num].pop();
                    // vertDict[num].unshift(a);
                    // var b = horDict[num].pop();
                    // horDict[num].unshift(b);
                    var vertical = [[30, 40, 40, 20, 30, 10, 10], [40, 40, 50, 30, 30, 20, 20], [50, 40, 30, 10, 30, 50, 30]];
                    var horizontal = [[50, 10, 20, 90, 70, 80, 30], [20, 50, 10, 80, 40, 30, 20], [10, 20, 40, 30, 50, 70, 10]];
                    for(i = 0; i <= 6; i++){
                        vertical[i] = vertDict[num][(i+moveCursor)%7];
                        horizontal[i] = horDict[num][(i+moveCursor)%7];
                    }
                    moveCursor++;
                    //call translation (animations occur in seperate process) then call image change, both done at 1200ms
                    //for duckImage, 1st call gets current position and compares to destination (array[0]), all other calls compare prev and current dest in array
                    $(duckNum).stop().animate({'top':vertical[0]+'%', 'left':horizontal[0]+'%'},speed, "linear", function(){
                        $(duckNum).stop().animate({'top':vertical[1]+'%', 'left':horizontal[1]+'%'},speed, "linear", function(){
                            $(duckNum).stop().animate({'top':vertical[2]+'%', 'left':horizontal[2]+'%'},speed, "linear", function(){
                                $(duckNum).stop().animate({'top':vertical[3]+'%', 'left':horizontal[3]+'%'},speed, "linear", function(){
                                    $(duckNum).stop().animate({'top':vertical[4]+'%', 'left':horizontal[4]+'%'},speed, "linear", function(){
                                        $(duckNum).stop().animate({'top':vertical[5]+'%', 'left':horizontal[5]+'%'},speed, "linear", function(){
                                            $(duckNum).stop().animate({'top':vertical[6]+'%', 'left':horizontal[6]+'%'},speed, "linear", function(){
                                                duckImage(duckImg, vertical[6], horizontal[6], vertical[6], 0);
                                                jQuery(duckNum).stop().animate({'left':'-10%'}, 1200, "linear", function(){
                                                    game_over();
                                                    jQuery('.try_again').click(function(){start();});
                                                });
                                                duckImage(duckImg, vertical[6], horizontal[6], vertical[6], 0);
                                            });
                                            duckImage(duckImg, vertical[5], horizontal[5], vertical[6], horizontal[6]);
                                        });
                                        duckImage(duckImg, vertical[4], horizontal[4], vertical[5], horizontal[5]);
                                    });
                                    duckImage(duckImg, vertical[3], horizontal[3], vertical[4], horizontal[4]);
                                });
                                duckImage(duckImg, vertical[2], horizontal[2], vertical[3], horizontal[3]);
                            });
                            duckImage(duckImg, vertical[1], horizontal[1], vertical[2], horizontal[2]);
                        });
                        duckImage(duckImg, vertical[0], horizontal[0], vertical[1], horizontal[1]);
                    });
                    duckImage(duckImg, parseFloat(100 * $(duckNum).css("top").replace("px", "")) / parseFloat($(window).height()), 
                        parseFloat(100 * $(duckNum).css("left").replace("px", "")) / parseFloat($(window).width()), vertical[0], horizontal[0]);
                }
                
                
                function wack(duckNum, duckImg, num) {
                    currentTarget = -1;
                    dropInProgress[num] = 1;
                    $(duckImg).css('background-image','url(duck7.png)');
                    $(duckNum).stop().animate({'top':'70%'},1600, function(){

                        add++;
                        $('.scorezone').html('Score: ' + add);
                        $(duckImg).css('background-image','url(duck1.png)');

                        setTimeout(() => {
                            
                            word[num].innerHTML = wordArray[num];
                            dropInProgress[num] = 0;
                            duckFlight(duckNum, duckImg, num);
                        }, 1600);

                        
                    });
                    if(add >= 50 && level == 0 ){
                        level++;
                        speed = startspeed;
                        dictionary = ["fdsa", "jkl;", "asdf", ";lkj", "gfdsa", "hjkl;", "asdfg", ";lkjh", "gfdsa", "hjkl;", "asdfg", ";lkjh", "fdsa", "jkl;", "asdf", ";lkj"];
                
                    }
                    else if (add > 100 && level == 1) {
                        level++;
                        speed = startspeed;
                        dictionary = ["rewq", "uiop", "qwer", "poiu", "trewq", "yuiop", "qwert", "poiuy", "trewq", "yuiop", "qwert", "poiuy", "rewq", "uiop", "qwer", "poiu"];
                
                    }
                    else if (add >= 150 && level == 2) {
                        level++;
                        speed = startspeed;
                        dictionary = ["vcxz", "nm,.", "zxcv", ".,mn", "bvcxz", "nm,.", "zxcvb", ".,mn", "bvcxz", "nm,.", "zxcvb", ".,mn", "vcxz", "m,.", "zxcv", ".,m"];
                    }
                    else if (add >= 200 && level == 3) {
                        level++;
                        speed = startspeed;
                        dictionary = ['hard', 'words', 'are', 'coming', 'get', 'ready', 'go',
                                        'sesquipedalian', 'satellite', 'accoutrements', 'secondary', 'dilapidated', 'linux', 'windows', 'macintosh',
                                        'osculator', 'idiosyncratic', 'equanimity', 'auspicious', 'magnanimous', 'luminescent', 'telemetry', 'destroy',
                                        'surrender', 'onomatopoeia', 'circumlocution', 'cpp'];
                    }
                    if(speed > 500){
                        speed = speed - 30;
                    }        
                }

                // make letteres red up to word cursor amount in wordArray word
                // pass in duck number 0-2 eg duck1=0, duck2=1, duck3=2
                function changeRed(n){
                    domMod[n] = "";
                    for(var a = 0; a < wordArray[n].length; a++){
                        if(a < wordCursor[n]){
                            domMod[n] += '<span style="color: red;">' + wordArray[n].charAt(a) + '</span>';
                        }
                        else{
                            domMod[n] += wordArray[n].charAt(a);
                        }
                    }
                    word[n].innerHTML = domMod[n];
                }

                
                // fill keyArray with initial word array, TODO load word array from dictionary
                for(i = 0; i < 3; i++){
                    keyArray[i] = wordArray[i].charCodeAt(wordCursor[i]);
                }

                // key event listener, TODO implement typo feature to clear word progress (red letters)
                $(document).keypress(function(e) {
                    if(gameStatus == 1){
                        
                        if(e.which == keyArray[0] && (currentTarget == -1 || currentTarget == 0) && dropInProgress[0] == 0) {
			                currentTarget = 0
                            wordCursor[0]++;
                            changeRed(0);
                            if(wordCursor[0] >= wordArray[0].length){
                                wordCursor[0] = 0;
                                if(!(add == 50 || add == 52 || add == 100 ||  add == 101 || add == 102 || add == 150 ||  add == 151 || add == 152 || add == 200 ||  add == 201 || add == 202)){
                                    dictionary.push(wordArray[0]);
                                }
                                wordArray[0] = dictionary.shift();
                                wack("#duck1", "#duckimg1", 0);
                                
                            }
                            keyArray[0] = wordArray[0].charCodeAt(wordCursor[0]);
                        }
                        else if(e.which == keyArray[1] && (currentTarget == -1 || currentTarget == 1) && dropInProgress[1] == 0) {
			                currentTarget = 1;
                            wordCursor[1]++;
                            changeRed(1);
                            if(wordCursor[1] >= wordArray[1].length){
                                wordCursor[1] = 0;
                                if(!(add == 50 || add == 52 || add == 100 ||  add == 101 || add == 102 || add == 150 ||  add == 151 || add == 152 || add == 200 ||  add == 201 || add == 202)){
                                    dictionary.push(wordArray[1]);
                                }
                                wordArray[1] = dictionary.shift();
                                wack("#duck2", "#duckimg2", 1);

                            }
                            keyArray[1] = wordArray[1].charCodeAt(wordCursor[1]);
                        }
                        else if(e.which == keyArray[2] && (currentTarget == -1 || currentTarget == 2) && dropInProgress[2] == 0) {
			                currentTarget = 2;
                            wordCursor[2]++;
                            changeRed(2);
                            if(wordCursor[2] >= wordArray[2].length){
                                wordCursor[2] = 0;
                                if(!(add == 50 || add == 52 || add == 100 ||  add == 101 || add == 102 || add == 150 ||  add == 151 || add == 152 || add == 200 ||  add == 201 || add == 202)){
                                    dictionary.push(wordArray[2]);
                                }
                                wordArray[2] = dictionary.shift();
                                wack("#duck3", "#duckimg3", 2);

                            }
                            keyArray[2] = wordArray[2].charCodeAt(wordCursor[2]);
                        }
                        else{
                            $("#scene").css({"background-color":"red", transition:"0.1s"});
                            $("#scene").animate({'background-color':'red'}, 100, function(){
                                $("#scene").css({"background-color":"#3fbfff", transition:"0.1s"});
                            });
                        }
                    }
                    else{
                        if(e.which == 13) {
                            start();
                        }
                    }
                    $("#"+String.fromCharCode(e.which)).css({fill:"red", transition:"1.0s"});
                    $("#"+String.fromCharCode(e.which)).animate({'fill':'red'}, 1000, function(){
                        $("#"+String.fromCharCode(e.which)).css({fill:"#efefee", transition:"1.0s"});
                    });
                });
            // start game when page loads
			if (do_only_once == 0){
                do_only_once = 1;
                start();
			}
        });
        
        // we can store the previous highscore in the user's browser
        // this is how to access it
        // we set it to zero if the localStorage returns None
        function getHighScore() {
            return localStorage.getItem('duckHighscore') || 0;
        }