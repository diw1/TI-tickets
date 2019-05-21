var grab = function() {
    var date = new Date();
    var pri = 'xxxxxxx';
	document.querySelector('#privilege_val').placeholder = pri
    if (date.getHours() >= 12) {
        var button = document.querySelector('body > div.perform > div > div.flex1 > div.hd > div > div.order > div.perform__order__box > div:nth-child(11) > div');
        if (button._prevClass == "buybtn") {
			document.querySelector('body > div.perform > div > div.flex1 > div.hd > div > div.order > div.perform__order__box > div.privilege > div.privilege__int > button')
			var btn_priv = document.querySelector('body > div.perform > div > div.flex1 > div.hd > div > div.order > div.perform__order__box > div.privilege > div.privilege__int > button')
			if (btn_priv._prevClass == "privilege_sub") {
				btn_priv.click();
			} else {
				setTimeout(function() {
					window.location.reload();
				}, 500);
			}
			var cc3 = document.querySelector('body > div.perform > div > div.flex1 > div.hd > div > div.order > div.perform__order__box > div.perform__order__select.perform__order__select__performs > div.select_right > div > div:nth-child(3)')
			cc3.click()
            button.click();
        } else {
            setTimeout(function() {
                window.location.reload();
            }, 500);
        }
    } else {
        setTimeout('grab()', 1000);
    }
}
grab();