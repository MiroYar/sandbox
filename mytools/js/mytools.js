(() => {
    const MYT = function MYTools (selector){
        const elements = document.querySelectorAll(selector)

        const obj = {};

        obj.branch = (bool, doTrue, doFalse) => {
            if (bool == true){
                doTrue();
            }
            else if (bool == false){
                doFalse();
            }

            return obj;
        }

        obj.getTransform = (transform, elemInd = 0) => {
            let matrix = window.getComputedStyle(elements[elemInd]).transform;
            matrix = matrix.split(/\(|,\s|\)/).slice(1,7);
            if (transform == 'x'){
                return matrix[4];
            }
            else if (transform == 'y'){
                return matrix[5];
            }
            else if (transform == 'r'){
                let degree = Math.asin(matrix[1]) * (180/Math.PI);
                if(matrix[0] < 0){
                    degree = 180 - degree;
                }
                if(degree < 0){
                    degree = 360 + degree;
                }
                return degree;
            }
            else{
                return matrix;
            }
        }

        obj.createElement = (tag, props, parent, ...children) => {
            const element = document.createElement(tag);
    
            Object.keys(props).forEach(key => element[key] = props[key]);
    
            children.forEach(child => {
                if (typeof child === 'string'){
                    child = document.createTextNode(child);
                }
        
                element.appendChild(child);
            });

            if (parent !== NaN || undefined || 0){
                parent.appendChild(element);
            }
    
            return element;
        }

        obj.formElemFilled = function formElemFilled(e) {
            (e.type == 'checkbox') ? () => {return e.checked} : () => {return e.value != ''};
        }
        
        obj.sendData = function sendData(){
            const CHILDS = elements[0].getElementsByTagName('*');
            const TAGSSENTELEM = ['INPUT', 'TEXTAREA'];
            let data = '';
            let first = true;
        
            for (let i = 0; i < CHILDS.length; i++) {
                const e = CHILDS[i];
                let r = '';
        
                if (TAGSSENTELEM.indexOf(e.tagName) > -1 && this.formElemFilled(e) != false){
                    (first == false) ? r = '&': first = false;
                    data = `${data}${r}${e.name}=${e.value}`;
                }
            }
        
            return data;
        }

        return obj;
    }

    window.MYT = MYT;
})();