
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

confirm()
