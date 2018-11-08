chrome.runtime.onMessage.addListener(checkMessage)

function checkMessage (message, sender, sendResponse) {
    if (message.status === 'start') {
        console.log("Starting the SmartCSS.")
        if(document.querySelector('.smartcss-interface')) {
            document.getElementsByTagName('body')[0].removeChild(document.querySelector('.smartcss-interface'))
        }
        var globalCSS = `
            @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600');
            @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
            .smartcss-interface * {
                box-sizing: border-box;
                font-size: 1rem;
            }
            .smartcss-interface button:focus {
                outline: none;
            }
             .smartcss-loader-ellipsis {
                display: inline-block;
                position: relative;
                width: 64px;
                height: 64px;
              }
              .smartcss-loader-ellipsis div {
                position: absolute;
                top: 27px;
                width: 11px;
                height: 11px;
                border-radius: 50%;
                background: #dc0000;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
              }
              .smartcss-loader-ellipsis div:nth-child(1) {
                left: 6px;
                animation: smartcss-loader-ellipsis1 0.6s infinite;
              }
              .smartcss-loader-ellipsis div:nth-child(2) {
                left: 6px;
                animation: smartcss-loader-ellipsis2 0.6s infinite;
              }
              .smartcss-loader-ellipsis div:nth-child(3) {
                left: 26px;
                animation: smartcss-loader-ellipsis2 0.6s infinite;
              }
              .smartcss-loader-ellipsis div:nth-child(4) {
                left: 45px;
                animation: smartcss-loader-ellipsis3 0.6s infinite;
              }
              @keyframes smartcss-loader-ellipsis1 {
                0% {
                  transform: scale(0);
                }
                100% {
                  transform: scale(1);
                }
              }
              @keyframes smartcss-loader-ellipsis3 {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0);
                }
              }
              @keyframes smartcss-loader-ellipsis2 {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(19px, 0);
                }
              }
            .smartcss-interface {
                position: fixed;
                z-index: 99999;
                bottom: 0;
                left: 0;
                height: 250px;
                background-color: #fff;
                padding: 1rem;
                width: 100%;
                color: #999;
                box-sizing: border-box;
                font-family: Montserrat, sans-serif;
                box-shadow: 0 -2px 30px rgba(0,0,0,0.1);
            }
            .smartcss-interface-loader {
                width: 100%;
                height: 100%;
                z-index: 100000;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                transition: all 0.3s ease-in-out;
            }
            .fade-loader{
                opacity: 0;
            }
            .loader{
                width: 200px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .smartcss-interface-toolbar {
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
                border-radius: 25px;
                
            }
            .selected-element-displayer {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
            }
            .selected-element-displayer div:first-child{
                padding: 1rem;
                display: inline-block;
                font-weight: bold;
            }
            .selected-element-displayer div:nth-child(2) {
                padding: 1rem;
                background: #444
                color: #fff;
                display: inline-block;
                color: #dc0000;
            }
            .selected-element > *{
    
            }
            .smartcss-tweaker{
                margin-top: 1rem;
                overflow: auto;
                height: 170px;
                padding: 0.1rem;
            }
            .tweaker-header{
               padding-left: 1rem;
               margin: 1rem 0;
            }
            .smartcss-tweaker > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border-radius: 30px;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
                margin-top: 1rem;
            }
            .smartcss-tweaker > div:first-child{
                margin-top: 0;
            }
            .smartcss-tweaker > div:last-child{
                margin-bottom: 3rem;
            }
            .smartcss-tweaker > div > div {
                display: flex;
                justify-content: space-between;
                width: 25%;
                padding: 0 1rem 0 0;
                align-items: center;       
            }
            .smartcss-tweaker > div > div > label {
                font-weight: bolder;
            }
            .smartcss-tweaker > div > div > span{
                color: #dc0000;
                font-size: 1.2rem;
            }
            .smartcss-slider {
                -webkit-appearance: none;  /* Override default CSS styles */
                appearance: none;
                width: 70%; /* Full-width */
                height: 5px; /* Specified height */
                background: #eee; /* Grey background */
                outline: none; /* Remove outline */
                transition: all .2s;
                border-radius: 10px;
            }
            .smartcss-slider:focus {
                background: #dc0000; /* Fully shown on mouse-over */
            }
            .smartcss-slider::-webkit-slider-thumb {
                -webkit-appearance: none; /* Override default look */
                appearance: none;
                width: 20px; /* Set a specific smartcss-slider handle width */
                height: 20px; /* Slider handle height */
                background: #fff; /* Green background */
                cursor: pointer; /* Cursor on hover */
                border-radius: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            .smartcss-reset-btn{
                height: 25px;
                width: 25px;
                border-radius: 50%;
                color: #888;
                border: none;
                display: flex;
                font-size: 1.4rem;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
            }
            .smartcss-reset-btn::before{
                content: 'Reset to original';
                position: absolute;
                left: 101%;
                top: 0;
                color: #666;
                font-size: 1rem;
                height: 100%;
                width: 120px;
                z-index: 1;
                background: #efefef;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 1;
                border-radius: 30px;
                opacity: 0;
                transition: all 0.2s 0s;
                transform: translateX(-20px) scale(0);
                transform-origin: left;
                pointer-events: none;
            }
            .smartcss-reset-btn:active{
                transform: scale(0.96);
            }
            .smartcss-reset-btn:hover{
                color: #dc0000;
            }
            .smartcss-reset-btn:focus{
                outline: none;
            }
            .smartcss-reset-btn:hover::before{
                opacity: 1;
                transition-delay: 1s;
                transform: translateX(0px) scale(1);
            }
            .actions{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 1rem auto;
            }
            .actions > button {
                border: none;
                background: #dc0000;
                color: #fff;
                width: 100px;
                padding: 1rem 2rem;
                border-radius: 30px;
                margin: 0 0.3rem;
                display: none;
                justify-content: center;
                align-items: center;
            }
            .actions > button > i {
                margin-right: 4px;
            }
            @media only screen and (max-width: 1000px){
                .action {
                    display: flex;
                }
            }
        `
        styleMaker(globalCSS)
        smartCSSInitializer()
    } 
    var defaultValues = {}
    var changedValues = {}
    var selectedElement = ''
    function smartCSSInitializer() {
        var elemToQuery = ['div', 'button', 'a', 'p', 'span', 'img', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h6', 'ul', 'li', 'ol', 'table']
        var totalElems = []
        elemToQuery.forEach((elem) => {
            var elems = Array.prototype.slice.call(document.querySelectorAll(elem), 0)
            if(elems.length > 0) {
                totalElems = totalElems.concat(elems)
            }
        })
        var interface = createUIElements('interface')
        interface.appendChild(createUIElements('loader'))
        document.body.appendChild(interface)
        if(totalElems.length > 0) {
            bindDoubleClick(totalElems)
            var toolbar = createUIElements('toolbar')
            var tweaker= createUIElements('tweaker')
            var actions= createUIElements('actions')
            interface.appendChild(toolbar)
            interface.appendChild(tweaker)
            interface.appendChild(actions)
            document.body.appendChild(interface)
            setTimeout(function () {
                document.querySelector('.smartcss-interface-loader').classList.add('fade-loader')
                setTimeout(function () {
                    document.querySelector('.smartcss-interface').removeChild(document.querySelector('.smartcss-interface-loader'))
                }, 300)
            }, 2000)
        }
        function createUIElements (type) {
            var element = document.createElement('DIV')
            switch (type) {
                case 'interface':
                element.classList.add('smartcss-interface')
                break
                case 'toolbar': 
                element.classList.add('smartcss-interface-toolbar')
                element.innerHTML = `
                    <div class='selected-element-displayer'>
                        <div>
                            Selected element:
                        </div>
                        <div class='selected-element'>
                           'No element selected. Please double click on a element to select it.'
                        </div>
                    </div>
                `
                break
                case 'loader': 
                element.classList.add('smartcss-interface-loader')
                element.innerHTML = `
                    <div class='loader'>
                        <div class="smartcss-loader-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                `
                break
                case 'tweaker':
                element.innerHTML = `
                <h1 class='tweaker-header'>Tweak properties</h1>
                <div class='smartcss-tweaker'>
                   
                </div>
            `
                break
                case 'actions':
                element.innerHTML = `
                <div class='actions'>
                    <button onClick="showTweaker"><i class="fas fa-cog"></i>Tweaker</button>
                    <button onClick="showCSS"><i class="fas fa-pen"></i>CSS</button>
                </div>
            `
                break
            }
            return element
        }
        function bindDoubleClick (totalElems) {
            totalElems.forEach(function (el) {
                el.addEventListener('dblclick', changeElement)
            })
        }
        function changeElement(e) {
            if(selectedElement  !== event.target) {
                selectedElement = event.target
                var htmlString = String(selectedElement.outerHTML)
                if (htmlString.length > 100) htmlString = htmlString.slice(0, 100)+ '...'
                document.querySelector('.selected-element').innerText = htmlString
                makePropertyTweaker(selectedElement)
            }
        }
    }
    var pxProperties = ['width', 'height', 'left', 'right', 'top', 'bottom']
    var absoluteProperties = ['opacity']
    function getSuffix(pName) {
        if(pxProperties.includes(pName)) return 'px'
        if(absoluteProperties.includes(pName)) return ''
    }
    function getMax(pName) {
        if(pxProperties.includes(pName)) return 2000
        if(absoluteProperties.includes(pName)) return 1
    }
    function getStep(pName) {
        if(pxProperties.includes(pName)) return 1
        if(absoluteProperties .includes(pName)) return 0.1
    }
    
    function changePropertyValue (pName,  pValue, elem, valueSpanID) {
        var value = pValue + getSuffix(pName)
        elem.style[pName] = value
        changedValues[pName] = value
        document.getElementById(valueSpanID).innerText = value
    }
    var numericProperty = ['width', 'height', 'left', 'right', 'top', 'bottom', 'opacity']
    var alphabeticProperty = ['position']
    function getPropertyType (pName) {
        if(numericProperty.includes(pName)) return 'numeric'
        if(alphabeticProperty.includes(pName)) return 'alphabetic'
    }
    function getAlphabeticValues (pName) {
        switch (pName) {
            case 'position':
            return ['relative', 'absolute', 'fixed', 'inherit', 'initial', 'sticky', 'unset']
        }
    }
    function makePropertyTweaker(elem) {
        var commonPropertiesPreset = ['height', 'width', 'left', 'top', 'opacity']

        document.querySelector('.smartcss-tweaker').innerHTML = ''
        commonPropertiesPreset.forEach ((property, i) => {
            var propertyName = property
            var propertyValue = window.getComputedStyle(elem, null).getPropertyValue(property)
            defaultValues[property] = propertyValue
            var randomId = makeid()
            var propertyType = getPropertyType(propertyName)
            switch (propertyType) {
                case 'alphabetic':
                let values = getAlphabeticValues(propertyName)
                console.log(values)
                break
                case 'numeric' :
                    let step = getStep(propertyName)
                    var suffix = getSuffix(propertyName)
                    var max = getMax(propertyName)
                    var html = `
                            <div>
                                <label>${propertyName}</label>
                                <span id=${randomId + 'span'}>${propertyValue}</span>
                            </div>
                            <input type="range" class='smartcss-slider' value="${Number(propertyValue.split(suffix)[0])}" data-value-span=${randomId + 'span'} data-propertyname='${propertyName}' id='${randomId}' name="${randomId + propertyName}" min="0" max=${max} step="${step}"/>
                            <button class='smartcss-reset-btn' id="${randomId + 'resetter'}"><i class='fas fa-redo'></i></button> 
                    `
                    var child = document.createElement("DIV")
                    child.innerHTML = html
                    document.querySelector('.smartcss-tweaker').appendChild(child)
                    document.getElementById(randomId + 'resetter').onclick = function () {
                        document.getElementById(randomId).value = Number(defaultValues[propertyName].split(suffix)[0])
                        document.getElementById(randomId + 'span').innerText = defaultValues[propertyName]
                        elem.style[propertyName] = defaultValues[propertyName]
                    }
                    document.getElementById(randomId).oninput = function (e) {
                        changePropertyValue(e.target.getAttribute('data-propertyname'), e.target.value, elem, e.target.getAttribute('data-value-span'))
                    }
                break 
            }
        })
    } 
    function makeid() {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          id += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return id;
      }
      
    function styleMaker (css, mute) {
        if(css) {
            if(mute === '--verbose' || mute === '-v') console.log('Initialising Style Maker', css);
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
        
            style.type = 'text/css';
            if (style.styleSheet){
            // This is required for IE8 and below.
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
             }
            head.appendChild(style);
            if(mute === '--verbose' || mute === '-v') console.log('Style Added');
        } else {
            console.log('Please call StylerMaker with a valid cssText argument');
        }
       
    }
}
