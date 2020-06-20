function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('Meow', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('What have you copied?? Meow~ ', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Meow~ Friend from <span style="color:#0099cc;">' + referrer.hostname + '</span> !';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hi！ Friend from Baidu!<br>Welcome!<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span> Meow~';
        }else if (domain == 'google') {
            text = 'Hi！ Friend from Google!<br>Welcome!<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span> Meow~';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = 'Quick sleep!! Meowwww';
            } else if (now > 5 && now <= 7) {
                text = 'Morning~ Meowwww';
            } else if (now > 7 && now <= 11) {
                text = 'Have a good day~ Meowwww';
            } else if (now > 11 && now <= 14) {
                text = 'Lunch time!! Meowwww';
            } else if (now > 14 && now <= 17) {
                text = 'Take a nap~ Meowwww';
            } else if (now > 17 && now <= 19) {
                text = 'Take a look at the sunset~ Meowwww';
            } else if (now > 19 && now <= 21) {
                text = 'Had dinner? Meowwww';
            } else if (now > 21 && now <= 23) {
                text = 'Rest earlier~ Meowwww';
            } else {
                text = 'Play with me~ Meowwww';
            }
        }else {
            text = 'Enjoy reading <span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>  ! Meow~';
        }
    }
    showMessage(text, 12000);
})();

window.setInterval(showHitokoto,30000);

function showHitokoto(){
    showMessage('Meowwwww', 5000);
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.hide-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        $('.hide-button').fadeOut(600)
    })
}
initLive2d ();
