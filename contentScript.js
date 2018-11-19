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
            :root{
                font-size: 14px;
            }
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
                background: #5dcb8b;
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
                height: 320px;
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
                color: #5dcb8b;
            }
            .selected-element > *{
    
            }
          
            .smartcss-tweaker{
                margin-top: 1rem;
                overflow: auto;
                height: 185px;
                padding: 1rem;
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
                width: 40%;
                padding: 0 1rem 0 0;
                align-items: center;       
            }
            .smartcss-tweaker > div > div > label {
                font-weight: bolder;
            }
            .smartcss-tweaker > div > div > span{
                color: #5dcb8b;
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
            .smartcss-slider:focus {
                background: #5dcb8b; /* Fully shown on mouse-over */
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
                font-size: 12px !important;
                color: #888;
                background: #fff !important;
                border-style: solid;
                border-width: 1px;
                border-color: #ddd;
                box-shadow: none !important;
                margin: 0.1rem !important;
                border-radius: 20px !important;
                transition: all 0.2s ease-in-out !important;
                cursor: pointer !important;
            } 
            .smartcss-property-btn:hover {
                color: #fff !important;
                background: #5dcb8b !important;
                border-color: transparent !important;
            }
            .smartcss-property-btn.active {
                color: #fff !important;
                background: #5dcb8b !important;
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
                color: #5dcb8b;
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
                background: #5dcb8b;
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
            }
            .smartcss-chosen-property {
                font-size: 16px;
                margin-left: 5px;
                font-weight: normal;
                color: #5dcb8b;
            }
            .smartcss-actions-container{
                position: absolute;
                left: 50%;
                padding: 0.6rem;
                top: 0;
                transform: translateX(-50%) translateY(-100%);
                width: 180px;
                height: 43px;
                background: white;
                display: flex;
                border-radius: 25px 25px 0 0;
                justify-content: center;
                align-items: center;
                box-shadow: 0 -8px 9px rgba(0,0,0,0.05);            
            }
            .smartcss-actions-container > button {
                width: 50%;
                border: 1px solid #ddd;
                color: #888;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem 0.8rem;
               
            }
            .smartcss-actions-container > button:first-child{
                border-radius: 30px 0 0 30px;
                border-right: none;
            }
            .smartcss-actions-container > button:last-child {
                border-radius: 0px 30px 30px 0px;
            }
            .smartcss-actions-container > button > i{
                margin-right: 3px;
                color: #5dcb8b;
            }
            smartcss-compound-property-value{
                margin-left: 3px;
                color: #5dcb8b;
            }
            .smartcss-compound-property {
                width: 100% !important;
                flex-direction:column;
            }
            .smartcss-compound-property-display, .smartcss-compound-property-values {
                width: 100%;
            }
            .smartcss-compound-property-display{
                margin-bottom: 1rem;
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
    var pxProperties = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom']
    var absoluteProperties = ['opacity']
    var numericProperty = ['width', 'height', 'left', 'right', 'top', 'bottom', 'opacity', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom']
    var alphabeticProperty = ['position', 'display']
    var complexProperty = ['transform']
    function smartCSSInitializer() {
        var elemToQuery = ['div', 'button', 'a', 'p', 'span', 'img', 'section', 'article', 'h1', 'h2', 'h3', 'h4', 'h6', 'ul', 'li', 'ol', 'table']
        var totalElems = []
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
            interface.appendChild(toolbar)
            interface.appendChild(actions)
            interface.appendChild(chooser)
            interface.appendChild(tweaker)
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
                element.innerHTML = `
                    <button onClick="showTweaker"><i class="fas fa-cog"></i>Tweaker</button>
                    <button onClick="showCSS"><i class="fas fa-pen"></i>CSS</button>
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
                showProperties(selectedElement)
            }
        }
    }
   
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
    
    function getPropertyType (pName) {
        if(numericProperty.includes(pName)) return 'numeric'
        if(alphabeticProperty.includes(pName)) return 'alphabetic'
        if(complexProperty.includes(pName)) return 'complex'
    }
    function getAlphabeticValues (pName) {
        switch (pName) {
            case 'position':
            return ['static', 'relative', 'absolute', 'fixed', 'inherit', 'initial', 'sticky', 'unset']
            case 'display':
            return ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'contents', 'inline', 'inline-grid', 'inline-table', 'table', 'list-item', 'run-in', 'table-caption', 'table-column-group', 'table-header-group', 'table-footer-group', 'table-row-group', 'table-cell', 'table-column', 'table-row', 'none', 'initial']
        }
    }
    function getParts (pName) {
        switch (pName) {
            case 'transform':
            return ['translateX', 'translateY', 'translateZ', 'rotateX', 'scaleX', 'scaleY', 'scaleZ',  'rotateY', 'rotateZ', 'skewX', 'skewY', 'perspective', 'initial', 'inherit']
        }
    }

    function getUnitForPart (part) {
        if(['rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'].includes(part)) return 'deg'
        if(['translateX', 'translateY', 'translateZ', 'perspective'].includes(part)) return 'px'
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
    function checkPropertyHasValue(value) {
        let str = value.replace(/ /g,'').split('')
        let hasValue = false
        str.forEach((c) => {
            if(!['p', 'x', '0', 'a', 'u', 't', 'o', 'n', 'e'].includes(c)) {
                hasValue = true
            }
        })
       return hasValue
    }
    function showProperties(elem) {
        var commonPropertiesPreset = pxProperties.concat(absoluteProperties, alphabeticProperty, complexProperty)
        document.querySelector('.smartcss-properties-catalogue').innerHTML = ''
        var propertyContainer = document.querySelector('.smartcss-properties-catalogue') 
        commonPropertiesPreset.forEach ((property) => {
          var button = document.createElement("BUTTON")
          button.innerText = property
          var propertyValue = window.getComputedStyle(elem, null).getPropertyValue(property)
          var hasValue = checkPropertyHasValue(propertyValue)
          button.style.borderColor = hasValue ? '#5dcb8b' : '#ddd'
          button.style.color = hasValue ? '#5dcb8b' : '#888'
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
        var value = pValue + getSuffix(pName)
        elem.style[pName] = value
        changedValues[pName] = value
        document.getElementById(valueSpanID).innerText = value
    }
    function chooseAlphaValues (e, propertyName, elem) {
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
    function getAppliedString (propertyName) {
        if(defaultValues[propertyName]) {
            return defaultValues[propertyName]
        } else {
            'No transform'
        }
    }
    function appendPart(elem, propertyName, part) {
        switch (propertyName) {
            case 'transform':
                let currentValues =  activecomplexProperties[propertyName] || null
                console.log(currentValues)
                if(currentValues) {
                    console.log(Object.keys(activecomplexProperties[propertyName]))
                } else {
                    activecomplexProperties[propertyName] = {}
                    activecomplexProperties[propertyName][part] = 0
                    let newValue =  activecomplexProperties[propertyName][part] + getUnitForPart(part)
                    changedValues[propertyName] = `${part}(${newValue})`
                    updateComplexProperty(elem, propertyName)
                }
                
            break;
        }
    }
    function updateComplexProperty(elem, propertyName) {
        elem.style[propertyName] = changedValues[(propertyName)]
        document.querySelector('.smartcss-compound-property-value').innerText = changedValues[propertyName]

    }
    function removePart(elem, propertyName, e) {
        switch (propertyName) {
            case 'transform':
                let currentValue =  changedValues[propertyName] || defaultValues[propertyName]
                console.log(currentValue)
                if(checkPropertyHasValue(currentValue)) {
                   let subParts = currentValue.split('')
                   console.log(subParts)
                } else {
                    var part 
                }
            break;
        }
    }
    function createPartSlider(elem, e) {
        
    }
    function makeControls(elem, propertyName) {
        document.querySelector('.smartcss-tweaker').innerHTML = ''
        var randomId = makeid()
        let step = getStep(propertyName)
        var propertyValue = window.getComputedStyle(elem, null).getPropertyValue(propertyName)
        defaultValues[propertyName] = propertyValue
        var propertyType = getPropertyType(propertyName)
        switch (propertyType) {
            case 'complex' : 
            console.log(propertyValue)
            if(document.querySelector('.smartcss-compound-property') && document.querySelector('.smartcss-compound-property').getAttribute('data-active-complex-property') === `${propertyName}`) {
                return 
            } else if (document.querySelector('.smartcss-compound-property')) {
                document.querySelector('.smartcss-tweaker').removeChild(document.querySelector('.smartcss-compound-property'))
            }
            let complexDiv = document.createElement("DIV")
            let complex = `
                <div class='smartcss-compound-property' data-active-complex-property='${propertyName}'>
                    <div class='smartcss-compound-property-display'>
                        ${propertyName} : <span class='smartcss-compound-property-value'>${propertyValue}</span>
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
                }
                document.querySelector('.smartcss-tweaker').appendChild(button)
            }) 
            break
            case 'numeric' :
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
