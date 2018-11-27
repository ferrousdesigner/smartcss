chrome.runtime.onMessage.addListener((checkMessage))

function checkMessage (message, sender, sendResponse) {
    if(message === 'stop') {
        stop () 
    } else {
        start(message)
        // return sendResponse({status: 'running'})
    }
 }

function start (message) {
    if (message.status === 'start') {
        console.log("Starting the SmartCSS.")
        if(document.querySelector('.smartcss-interface')) {
            document.getElementsByTagName('body')[0].removeChild(document.querySelector('.smartcss-interface'))
        }
        var globalCSS = `
            @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600');
            @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
            :root{
                font-size: 14px;
            }
            .smartcss-interface * {
                box-sizing: border-box;
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: none;
                background: transparent;
                color: #888;
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
                background: #4838cd;
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
                height: 308px;
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
                transition: all 0.2s ease-in-out;
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
                color: #4838cd;
            }
            .selected-element > *{
    
            }
          
            .smartcss-tweaker{
                overflow: auto;
                height: 208px;
                transition: all 0.2s ease-in-out;
                padding: 0.1rem 1rem;
                margin-top: -2px;
                width: 50%;
                display: inline-block
            }
            .tweaker-header, .chooser-header{
               padding-left: 1rem;
               margin: 1rem 0;
               font-weight: bold;
            }
            .smartcss-tweaker > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                border-radius: 15px;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
                margin-top: 1rem;
            }
            .smartcss-tweaker > div:first-child{
                margin-top: 0;
            }
            .smartcss-tweaker > div:last-child{
                margin-bottom: 3rem;
                position: relative;
            }
            .smartcss-tweaker > div:last-child::before{
                content: 'Tip: Use arrow keys to set a precise value';
                position: absolute;
                left: 50%;
                bottom: 10%;
                color: #666;
                font-size: 1rem;
                height: 30px;
                width: 100%;
                z-index: 7;
                background: #efefef;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 1;
                border-radius: 30px;
                opacity: 0;
                transition: all 0.2s 0s;
                transform: translateX(-50%) translateY(150%);
                transform-origin: left;
                pointer-events: none;
            }
            .smartcss-tweaker > div:last-child:hover::before {
                opacity: 1;
            }
            .smartcss-tweaker > div > div {
                display: flex;
                justify-content: space-between;
                width: 40%;
                align-items: center;       
            }
            .smartcss-tweaker > div > div > label {
                font-weight: bolder;
            }
            .smartcss-tweaker > div > div > span{
                color: #4838cd;
                font-size: 1.2rem;
            }
            .smartcss-slider {
                -webkit-appearance: none;  /* Override default CSS styles */
                appearance: none;
                width: 50%; /* Full-width */
                height: 5px; /* Specified height */
                background: #eee; /* Grey background */
                outline: none; /* Remove outline */
                transition: all .2s;
                border-radius: 10px;
            }
            .smartcss-slider-color {
                height: 35px !important;
                border-radius: 0 !important;
            }
            .smartcss-slider:focus {
                background: #4838cd; /* Fully shown on mouse-over */
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
            .smartcss-properties-catalogue{
                margin-top: 1rem;
                overflow: auto;
                height: 185px;
                padding: 0.1rem;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
                border-radius: 15px;
            }
            .smartcss-property-btn{
                padding: 0.3rem 0.7rem !important;
                font-size: 14px !important;
                color: #888;
                font-weight: bold;
                background: #fff !important;
                border-style: solid;
                border-width: 3px;
                border-color: #ddd;
                box-shadow: none !important;
                margin: 0.1rem !important;
                border-radius: 20px !important;
                transition: all 0.2s ease-in-out !important;
                cursor: pointer !important;
            } 
            .smartcss-property-btn:hover {
                color: #fff !important;
                background: #4838cd !important;
                border-color: transparent !important;
            }
            .smartcss-property-btn.active {
                color: #fff !important;
                background: #4838cd !important;
                border-color: transparent !important;
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
                content: 'Revert Value';
                position: absolute;
                right: 101%;
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
                transform: translateX(20px) scale(0);
                transform-origin: left;
                pointer-events: none;
            }
            
            .smartcss-reset-btn:active{
                transform: scale(0.96);
            }
            .smartcss-reset-btn:hover{
                color: #4838cd;
            }
            .smartcss-reset-btn:focus{
                outline: none;
            }
            .smartcss-reset-btn:hover::before{
                opacity: 1;
                transition-delay: 0.5s;
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
                background: #4838cd;
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
            .smartcss-tweaker-container{
                display: inline-block;
                width: 50%;
                
            }
            .smartcss-property-container {
                display: inline-block;
                width: 50%;
                vertical-align: top;
            }
            .smartcss-chosen-property {
                font-size: 16px;
                margin-left: 5px;
                font-weight: normal;
                color: #4838cd;
            }
            .smartcss-actions-container{
                position: absolute;
                left: 50%;
                padding: 0.4rem 0.4rem 0 0.4rem;
                top: 0;
                transform: translateX(-50%) translateY(-100%);
                width: 120px;
                height: 40px;
                background: white;
                display: flex;
                border-radius: 22px 22px 0 0;
                justify-content: center;
                align-items: center;
                opacity: 0;
                box-shadow: 0 -8px 9px rgba(0,0,0,0.05);      
                transition: all 0.2s ease-in-out;
   
            }
            .smartcss-actions-container > button {
                color: #fff !important;
                background: #4838cd !important;
                border-color: transparent !important;
                width: 100%;
                height: 100%;
                border-radius: 22px;
                font-size: 1.2rem;
                font-weight: bold;
                transition: all 0.2s ease-in-out;
            }
            .smartcss-actions-container > button > i{
                margin-right: 10px;
                color: #fff;
            }
            .smartcss-actions-container > button:hover {
                cursor: pointer;
            }
            smartcss-compound-property-value{
                margin-left: 3px;
                color: #4838cd;
            }
            .smartcss-compound-property {
                width: 100% !important;
                flex-direction:column;
            }
            .smartcss-compound-property-display, .smartcss-compound-property-values {
                width: 100%;
            }
            .smartcss-compound-property-values{
                height: 125px;
                overflow-x: auto;
            }
            .smartcss-compound-property-display{
                margin-bottom: 1rem;
                word-break: keep-all;
                white-space: nowrap;
                overflow-x: auto;
                padding: 0.4rem 0.7rem;
                color: #666;
                background: #4838cd22;
                border-radius: 30px;
            }
            .smartcss-part-container {
                overflow: auto;
                padding: 0rem 0rem;
                height: 181px;
                width: 49%;
                vertical-align: top;
                display: inline-block;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
                padding: 1rem;
                border-radius: 15px;
            }
            .smartcss-part-container > div {
                margin: 0.6rem 0;
            }
            .smartcss-part-container input {
                width: 100%;
            }
            .smartcss-text{
                position: absolute;
                right: 0;
                font-size: 1.2rem;
                top: 0;
                font-weight: bold;
                line-height: 1.5;
                height: 100%;
                width: 100%;
                background: #4838cd;
                padding: 1rem;
                color: #fff !important;
                z-index: 2;
                transition: all 0.2s ease-in-out;
            }
            .smartcss-text-container {
                box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
                position: fixed;
                right: 0;
                font-size: 1.2rem;
                top: 0;
                font-weight: bold;
                line-height: 1.5;
                height: calc(100vh);
                width: 300px;
                background: #4838cd;
                padding: 1rem;
                color: #fff !important;
                z-index: 2;
                transform: translateX(100%);
                transition: all 0.2s ease-in-out;
            }
            .smartcss-text-container > button {
                height: 40px;
                width: 85%;
                border-radius: 30px;
                border: none;
                display: flex;
                font-size: 1.2rem;
                font-weight: bold;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                position: absolute;
                z-index: 5;
                color: #4838cd;
                background: #fff;
                border: 3px solid transparent;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                transition: all 0.2s ease-in-out;
            }
            .smartcss-text-container > button:hover {
                background: #4838cd;
                color: #fff;
                border: 3px solid #fff;
            }
            .smartcss-text::before {
                content: 'Tweaked styles';
                position: absolute;
                left: 4%;
                top: 0;
                width: 100%;
                height: 48px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                z-index: 1;
                font-size: 16px;
                color: #fff;
            }
            .slide-in {
                transform: translateX(0%);
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
    var activeProperty = ''
    var selectedElement = ''
    var activePropertyValues = {}
    var allStyle = {}
    var activecomplexProperties = {

    }
    function updateCSS() {
        let cssString = ''
        let totalStyle = {...changedValues}
        Object.keys(totalStyle).forEach((property, i) => {
            cssString += '<br><span style="color: #fff;">' + property + '</span>: ' + Object.values(totalStyle)[i] + ';'
        })
        document.querySelector('.smartcss-text').innerHTML = cssString
    }
    var supportedProperties = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'opacity', 'position', 'display', 'color', 'background-color', 'justify-content', 'align-items', 'font-size', 'transform', 'border-radius']
    var pxProperties = ['translateX', 'translateY', 'translateZ', 'width', 'height', 'left', 'right', 'top', 'bottom', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'font-size', 'border-radius']
    var absoluteProperties = ['opacity', 'scaleX', 'scaleY', 'scaleZ']
    var numericProperty = ['width', 'height', 'left', 'right', 'top', 'bottom', 'opacity', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'font-size', 'border-radius']
    var alphabeticProperty = ['position', 'display', 'justify-content', 'align-items']
    var radianProperties = ['rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY']
    var complexProperty = ['transform']
    var colorProperties = ['color', 'background-color']
    function smartCSSInitializer() {
        var elemToQuery = ['div', 'button', 'a', 'p', 'span', 'img', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h6', 'ul', 'li', 'ol', 'table']
        var totalElems = []
        document.querySelector('body').style.paddingBottom = '308px'
        elemToQuery.forEach((elem) => {
            var temp = document.querySelectorAll(elem)
            if(['a'].includes(elem)) {
                temp.forEach(a => a.onclick = e => e.preventDefault())
            }
            var elems = Array.prototype.slice.call(temp, 0)
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
            var chooser= createUIElements('chooser')
            var actions= createUIElements('actions')
            var tweaker= createUIElements('tweaker')
            var cssText= createUIElements('css-text')
            var partInterface = createUIElements('part-slider')
            interface.appendChild(cssText)
            interface.appendChild(toolbar)
            interface.appendChild(actions)
            interface.appendChild(chooser)
            interface.appendChild(tweaker)
            document.body.appendChild(interface)
            document.querySelector('.smartcss-tweaker-container').appendChild(partInterface)
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
                           No element selected. Please double click on a element to select it.
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
                case 'css-text': 
                element.classList.add('smartcss-text-container')
                let cssText = document.createElement('DIV')
                cssText.classList.add('smartcss-text')
                element.appendChild(cssText)
                let copyBtn = document.createElement('BUTTON')
                copyBtn.innerText = 'Copy'
                copyBtn.onclick = () => {
                    let ghostInput = document.createElement('TEXTAREA')
                    ghostInput.style.opacity = '0'
                    ghostInput.style.height = '0px'
                    ghostInput.value = document.querySelector('.smartcss-text').innerText
                    document.body.appendChild(ghostInput)
                    ghostInput.select()
                    document.execCommand('copy')
                    document.body.removeChild(ghostInput)
                    copyBtn.innerText = 'Copied!'
                    setTimeout(() =>  {
                        toggleCSS()
                        copyBtn.innerText = 'Copy'
                    }, 1000)
                }
                element.appendChild(copyBtn)
                break
                case 'tweaker':
                element.classList.add('smartcss-tweaker-container')
                element.innerHTML = `
                <h1 class='tweaker-header'>Tweak property: <span class='smartcss-chosen-property'></span></h1>
                <div class='smartcss-tweaker'>
                </div>
                `
                break
                case 'chooser':
                element.classList.add('smartcss-property-container')
                element.innerHTML = `
                <h1 class='chooser-header'>Select a property</h1>
                <div class='smartcss-properties-catalogue'>  
                </div>
                `
                break
                case 'actions':
                element.classList.add('smartcss-actions-container')
                let button = document.createElement('BUTTON')
                button.onclick = function (e) {
                    toggleCSS (e)
                }
                button.innerHTML = `<i class="fas fa-pen"></i>CSS`
                element.appendChild(button)
                break
                case 'part-slider':
                element.classList.add('smartcss-part-container')
                element.style.display = 'none'
                break
            }
            return element
        }
        function toggleCSS (e) {
            if(document.querySelector('.smartcss-text-container').classList.contains('slide-in')) {
                document.querySelector('.smartcss-text-container').classList.remove('slide-in')
                setTimeout(() => document.querySelector('.smartcss-text').innerHTML = '', 300)
                document.querySelector('.smartcss-actions-container > button').innerHTML = `<i class="fas fa-pen"></i>CSS`
            } else {
                document.querySelector('.smartcss-text-container').classList.add('slide-in')
                document.querySelector('.smartcss-actions-container > button').innerHTML = `<i class="fas fa-times"></i>Close`
                updateCSS()
            }
        }
        function bindDoubleClick (totalElems) {
            totalElems.forEach(function (el) {
                el.setAttribute('smartcss-id', makeid())
                el.addEventListener('dblclick', changeElement)
            })
        }
        function changeElement(e) {
            if(selectedElement !== event.target) {
                if(selectedElement && localStorage[selectedElement.getAttribute('smartcss-id')]) {
                    changedValues = JSON.parse(localStorage[selectedElement.getAttribute('smartcss-id')])
                    updateCSS()
                } else if (selectedElement && Object.keys(changedValues).length > 0) {
                    localStorage.setItem(selectedElement.getAttribute('smartcss-id'), JSON.stringify(changedValues))
                    changedValues = {}
                    updateCSS()
                }
                resetTweaker()
                selectedElement = event.target
                var htmlString = String(selectedElement.outerHTML)
                if (htmlString.length > 100) htmlString = htmlString.slice(0, 100)+ '...'
                document.querySelector('.selected-element').innerText = htmlString
                showProperties(selectedElement)
            }
        }
    }

    function resetTweaker () {
        document.querySelector('.smartcss-chosen-property').innerText = ''
        document.querySelector('.smartcss-tweaker').innerText = ''
    }
   
    function getSuffix(pName) {
        if(pxProperties.includes(pName)) return 'px'
        if(absoluteProperties.includes(pName)) return ''
        if(colorProperties.includes(pName)) return ''
    }
    function getMin(pName) {
        if(['translateX', 'translateY', 'translateZ'].includes(pName)) return -1000
        if(pxProperties.includes(pName)) return 0
        if(['scaleX', 'scaleY', 'scaleZ'].includes(pName)) return 0
        if(absoluteProperties.includes(pName)) return 0
        if(radianProperties.includes(pName)) return -360
    }
    function getMax(pName) {
        if(['translateX', 'translateY', 'translateZ'].includes(pName)) return 1000
        if(pxProperties.includes(pName)) return 2000
        if(['scaleX', 'scaleY', 'scaleZ'].includes(pName)) return 10
        if(absoluteProperties.includes(pName)) return 1
        if(radianProperties.includes(pName)) return 360
    }
    function getStep(pName) {
        if(pxProperties.includes(pName)) return 1
        if(absoluteProperties.includes(pName)) return 0.1
        if(radianProperties.includes(pName)) return 1
    }
    function getInitialValues(pName) {
        if(['translateX', 'translateY', 'translateZ'].includes(pName)) return 0
        if(['scaleX', 'scaleY', 'scaleZ'].includes(pName)) return 1
        if(radianProperties.includes(pName)) return 0
    }
    
    function getPropertyType (pName) {
        if(numericProperty.includes(pName)) return 'numeric'
        if(alphabeticProperty.includes(pName)) return 'alphabetic'
        if(complexProperty.includes(pName)) return 'complex'
        if(colorProperties.includes(pName)) return 'color'
    }
    function getAlphabeticValues (pName) {
        switch (pName) {
            case 'position':
            return ['static', 'relative', 'absolute', 'fixed', 'inherit', 'initial', 'sticky', 'unset']
            case 'display':
            return ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'contents', 'inline', 'inline-grid', 'inline-table', 'table', 'list-item', 'run-in', 'table-caption', 'table-column-group', 'table-header-group', 'table-footer-group', 'table-row-group', 'table-cell', 'table-column', 'table-row', 'none', 'initial']
            case 'justify-content':
            case 'align-items':
            return ['flex-start', 'center', 'flex-end', 'baseline', 'space-around', 'space-between']
        }
    }
    function getParts (pName) {
        switch (pName) {
            case 'transform':
            return ['translateX', 'translateY', 'translateZ', 'rotateX', 'scaleX', 'scaleY', 'scaleZ',  'rotateY', 'rotateZ', 'skewX', 'skewY']
        }
    }

    function getUnitForPart (part) {
        if(['rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'].includes(part)) return 'deg'
        if(['translateX', 'translateY', 'translateZ'].includes(part)) return 'px'
        if(['scaleX', 'scaleY', 'scaleZ'].includes(part)) return ''
    }
    function onPropertySelect (e, elem) {
        if(!document.getElementById(e.target.id).classList.contains('active')) {
            document.getElementById(e.target.id).classList.add('active')
            if(document.getElementById('btn-for-' + activeProperty)) {
                document.getElementById('btn-for-' + activeProperty).classList.remove('active')
            }
            activeProperty = e.target.getAttribute('data-property')
            document.querySelector('.smartcss-chosen-property').innerText = activeProperty
            makeControls(elem, activeProperty)
        }
       
    }
    function showProperties(elem) {
        var commonPropertiesPreset = supportedProperties
        document.querySelector('.smartcss-properties-catalogue').innerHTML = ''
        var propertyContainer = document.querySelector('.smartcss-properties-catalogue') 
        commonPropertiesPreset.forEach ((property) => {
          var button = document.createElement("BUTTON")
          button.innerText = property
          var propertyValue = window.getComputedStyle(elem, null).getPropertyValue(property)
          defaultValues[property] = propertyValue
          button.setAttribute('class', 'smartcss-property-btn')
          button.setAttribute('data-property', property)
          button.id = 'btn-for-' + property
          button.onclick = function (e) {
              onPropertySelect(e, elem)
          }
          propertyContainer.appendChild(button)
        })
    } 
    function changePropertyValue (pName,  pValue, elem, valueSpanID) {
        document.querySelector('.smartcss-actions-container').style.opacity = '1'
        var value = pValue + getSuffix(pName)
        elem.style[pName] = value
        changedValues[pName] = value
        document.getElementById(valueSpanID).innerText = value
    }
    function chooseAlphaValues (e, propertyName, elem) {
        document.querySelector('.smartcss-actions-container').style.opacity = '1'
        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active')
            elem.style[propertyName] =  e.target.getAttribute('data-property-value')
            changedValues[propertyName] =  e.target.getAttribute('data-property-value')
            if(Object.keys(activePropertyValues) && activePropertyValues[propertyName]) {
                document.getElementById('btn-for-' + activePropertyValues[propertyName]).classList.remove('active')
            }
            activePropertyValues[propertyName] = e.target.getAttribute('data-property-value')
        }
    }
    
  
    function createPartSlider(elem, propertyName, part) {
        document.querySelector('.smartcss-actions-container').style.opacity = '1'
        var suffix = getUnitForPart(part)
        var randomId = makeid()
        let propertyValue = activecomplexProperties[propertyName][part]
        var max = getMax(part)
        var min = getMin(part)
        var initialValue = propertyValue
        console.log(initialValue)
        var html = `
        <div>
            <div>
                <label>${part}</label>
                (<span id=${randomId + 'span'}>${initialValue + suffix}</span>)
            </div>
            <input type="range" class='smartcss-slider' value="${initialValue}" data-propertyName='${propertyName}'data-value-span=${randomId + 'span'} data-partName='${part}' id='${randomId}' name="${randomId + part}" min="${min}" max=${max} step="${getStep(part)}"/>
        </div>
        `
        var child = document.createElement("DIV")
        child.innerHTML = html
        child.id = part + '-part'
        document.querySelector('.smartcss-part-container').appendChild(child)
        document.getElementById(randomId).oninput = (e) => {
            var part =  e.target.getAttribute('data-partName')
            var propertyName =  e.target.getAttribute('data-propertyName')
            var value = e.target.value
            document.getElementById(randomId + 'span').innerText = value + suffix
            activecomplexProperties[propertyName][part] = value
            changedValues[propertyName] = getComplexStringValue(propertyName)
            updateComplexProperty(elem, propertyName)  
            updateCSS()       
        }
    }

    function appendPart(elem, propertyName, part) {
            switch (propertyName) {
                case 'transform':
                    if( activecomplexProperties[propertyName]) {
                        activecomplexProperties[propertyName][part] = getInitialValues(part)
                        changedValues[propertyName] = getComplexStringValue(propertyName)
                        updateComplexProperty(elem, propertyName)         
                    } else {
                        activecomplexProperties[propertyName] = {}
                        activecomplexProperties[propertyName][part] = getInitialValues(part)
                        changedValues[propertyName] = getComplexStringValue(propertyName)
                        updateComplexProperty(elem, propertyName)       
                    }     
                    createPartSlider(elem, propertyName, part)             
                break;
            }
       
    }
  
    function getComplexStringValue (propertyName) {
        
       let cssString =  ``
       Object.keys(activecomplexProperties[propertyName]).forEach((part) => {
        cssString += `${part}(${activecomplexProperties[propertyName][part] + getUnitForPart(part)}) `
       })
       return cssString
    }
    function updateComplexProperty(elem, propertyName) {
        elem.style[propertyName] = changedValues[(propertyName)]
        document.querySelector('.smartcss-compound-property-value').innerText = changedValues[propertyName]

    }
    function destroyPartSlider (part) {
        document.querySelector('.smartcss-part-container').removeChild(document.getElementById(part+'-part'))
    }
    function removePart(elem, propertyName, part) {
        delete activecomplexProperties[propertyName][part]
        changedValues[propertyName] = getComplexStringValue(propertyName)
        updateComplexProperty(elem, propertyName) 
        destroyPartSlider(part)    
    }
    
    function makeControls(elem, propertyName) {
        document.querySelector('.smartcss-tweaker').innerHTML = ''
        var randomId = makeid()
        let step = getStep(propertyName)
        var propertyValue = window.getComputedStyle(elem, null).getPropertyValue(propertyName)
        var propertyType = getPropertyType(propertyName)
        switch (propertyType) {
            case 'complex' : 
            if(document.querySelector('.smartcss-compound-property') && document.querySelector('.smartcss-compound-property').getAttribute('data-active-complex-property') === `${propertyName}`) {
                return 
            } else if (document.querySelector('.smartcss-compound-property')) {
                document.querySelector('.smartcss-tweaker').removeChild(document.querySelector('.smartcss-compound-property'))
            }
            document.querySelector('.smartcss-part-container').style.display = 'inline-block'
            document.querySelector('.smartcss-tweaker').style.width = '50%'
            let complexDiv = document.createElement("DIV")
            let complex = `
                <div class='smartcss-compound-property' data-active-complex-property='${propertyName}'>
                    <div class='smartcss-compound-property-display'>
                        <span class='smartcss-compound-property-value'>${propertyValue}</span>
                    </div>
                    <div class='smartcss-compound-property-values'>
                    </div>
                </div>
            `
            complexDiv.innerHTML = complex
            document.querySelector('.smartcss-tweaker').appendChild(complexDiv)
            let containerOfParts = document.querySelector('.smartcss-compound-property-values')
            let parts = getParts(propertyName)
            parts.forEach(part => {
                var unit = getUnitForPart(part)
                var partButton = document.createElement('BUTTON')
                partButton.setAttribute('class', 'smartcss-property-btn')
                partButton.setAttribute('data-part', part)
                partButton.innerText = part
                if(propertyValue.includes(part)) {
                    partButton.classList.add('active')
                }
                partButton.onclick = (e) => {
                    if(e.target.classList.contains('active')) {
                        e.target.classList.remove('active')
                        removePart(elem, propertyName, part)
                    } else {
                        e.target.classList.add('active')
                        appendPart(elem, propertyName, part)
                    }
                }
                containerOfParts.appendChild(partButton)
            })
            break
            case 'alphabetic':
            document.querySelector('.smartcss-part-container').style.display = 'none'
            document.querySelector('.smartcss-tweaker').style.width = '100%'
            let values = getAlphabeticValues(propertyName)
            values.forEach(value => {
                let button = document.createElement("BUTTON")
                button.innerText = value
                button.id = 'btn-for-' + value
                button.setAttribute('class', 'smartcss-property-btn')
                if(activePropertyValues[propertyName] === value) {
                    button.classList.add('active')
                }
                if( propertyValue === value) {
                    button.classList.add('active')
                    activePropertyValues[propertyName] = value
                }
                button.setAttribute('data-property-value', value)
                button.onclick = (e) => {
                    chooseAlphaValues(e, propertyName, elem)
                    updateCSS() 
                }
                document.querySelector('.smartcss-tweaker').appendChild(button)
            }) 
            break
            case 'color':
            document.querySelector('.smartcss-part-container').style.display = 'none'
            document.querySelector('.smartcss-tweaker').style.width = '100%'
            var html = `
            <div>
                <span id=${randomId + 'span'}>${propertyValue}</span>
            </div>
            <input type="color" class='smartcss-slider  smartcss-slider-color' value="${propertyValue}" data-value-span=${randomId + 'span'} data-propertyname='${propertyName}' id='${randomId}' name="${randomId + propertyName}" />
            <button class='smartcss-reset-btn' id="${randomId + 'resetter'}"><i class='fas fa-redo'></i></button> 
            `
            var child = document.createElement("DIV")
            child.innerHTML = html
            document.querySelector('.smartcss-tweaker').appendChild(child)
            document.getElementById(randomId + 'resetter').onclick = () => {
                document.getElementById(randomId).value = defaultValues[propertyName]
                document.getElementById(randomId + 'span').innerText = defaultValues[propertyName]
                elem.style[propertyName] = defaultValues[propertyName]
                changedValues[propertyName] = defaultValues[propertyName]
                updateCSS()
            }
            document.getElementById(randomId).oninput = (e) => {
                changePropertyValue(e.target.getAttribute('data-propertyname'), e.target.value, elem, e.target.getAttribute('data-value-span'))
                updateCSS()
            }
           
            break
            case 'numeric' :
            document.querySelector('.smartcss-part-container').style.display = 'none'
            document.querySelector('.smartcss-tweaker').style.width = '100%'
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
                changedValues[propertyName] = defaultValues[propertyName]
                updateCSS()
            }
            document.getElementById(randomId).oninput = (e) => {
                changePropertyValue(e.target.getAttribute('data-propertyname'), e.target.value, elem, e.target.getAttribute('data-value-span'))
                updateCSS()
            }
            break 
        }
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
