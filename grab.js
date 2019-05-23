const addCode = function(code){
    try {
        console.log(`###添加特权码:${code}###`)
        document.querySelector('#privilege_val').value = code
        sleep(400).then(()=>{
            document.getElementsByClassName('privilege_sub')[0].click()
        })
    } catch (e) {
        console.log(e)
    }
}

sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const confirm = function() {
    console.log("###开始确认订单###")
    const url = chrome.runtime.getURL('user.json')
    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then(item => {
            console.log("###选择购票人###")
            document.getElementsByClassName('next-checkbox')[0].children[1].click() //默认勾选首位购票人
            sleep(1000).then(()=>{
                // if (!item.delivery){
                //     console.log("###选择自取###")
                //     document.getElementsByClassName('self')[0].click() // 选择自取
                //     sleep(1000).then(()=>{
                //         console.log("###输入取票人信息###", item.name, item.mobile)
                //         document.getElementsByClassName('next-input-single')[0].children[0].value=item.name
                //         sleep(500).then(()=>{
                //             document.getElementsByClassName('next-input-single')[1].children[0].value=item.mobile
                //             sleep(500).then(()=> {
                //                 console.log("###确认购买###")
                //                 document.getElementsByClassName('submit-wrapper')[0].children[0].click()
                //             })
                //         })
                //     })
                // }else{
                document.getElementsByClassName('express')[0].click() // 选择自取
                sleep(2000).then(()=> {
                    if (document.title === "确认订单") {
                        console.log("###选择购票人###")
                        if (!document.getElementsByClassName('next-checkbox')[0].classList.contains('checked')){
                            document.getElementsByClassName('next-checkbox')[0].children[1].click() //默认勾选首位购票人
                        }
                        //document.getElementsByClassName('next-checkbox')[0].children[1].click() //默认勾选首位购票人
                        sleep(500).then(()=> {
                            console.log("###确认购买###")
                            document.getElementsByClassName('submit-wrapper')[0].children[0].click()
                        })
                    }
                })
                //}
            })
        })
}

const grab = function(){
    const url = chrome.runtime.getURL('user.json')

    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then(item => {
            console.log(item,'item')
            console.log('###开始抢票###')
            addCode(item.code)
            console.log(`###选择场次:${item.series}###`)
            document.getElementsByClassName('select_right_list_item')[Number(item.series)-1].click()
            sleep(1000).then(()=>{
                const button = document.getElementsByClassName('buybtn')[0]
                if (button.textContent === "即将开抢") {
                    console.log('###抢票未开始，刷新页面###')
                    setTimeout(()=>{
                        window.location.reload()
                    }, 1000)
                }else{
                    console.log('###跳转到确认订单页面###')
                    document.getElementsByClassName('buybtn')[0].click()
                }
                sleep(1000).then(()=>{
                    if (document.title==="确认订单"){
                        console.log('###确认订单###')
                        confirm()
                    }
                })
            })
        })
}

grab();
