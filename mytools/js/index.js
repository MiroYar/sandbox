function matching(argument, value){
    MYT().branch(
        argument >= value,
        () => {
            console.log('True');
        },
        () => {
            console.log('False');
    });
}

matching(10, 10);

console.log(MYT('#cube').getTransform('y'));

// function branch(bool, doTrue, doFalse){
//     if (bool == true){
//         doTrue();
//     }
//     else if (bool == false){
//         doFalse();
//     }
// }

// function getValueElementInTransformMatrix(element, elemInd){
//     let matrix = window.getComputedStyle(element).transform;
//     matrix = matrix.split(/\(|,\s|\)/).slice(1,7);
//     return matrix[elemInd];
// }

// function createElement(tag, props, ...children){
//     const element = document.createElement(tag);
    
//     Object.keys(props).forEach(key => element[key] = props[key]);
    
//     children.forEach(child => {
//         if (typeof child === 'string'){
//             child = document.createTextNode(child);
//         }
        
//         element.appendChild(child);
//     });
    
//     return element;
// }