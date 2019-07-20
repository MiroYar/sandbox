<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AJAX запрос</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>

<button id="btn"> Button</button>

<script>
    let btn = document.getElementById("btn");
    btn.addEventListener("click", () => {

        /** GET **/
        /*let id_product = 321;
        let qty_product = 2;

        const request = new XMLHttpRequest();

        const url = "ajax_quest.php?id_product=" + id_product + "&qty_product=" + qty_product;

        request.open('GET', url);

        request.setRequestHeader('Content-Type', 'application/x-www-form-url');

        request.addEventListener("readystatechange", () => {

             if (request.readyState === 4 && request.status === 200) { 

                console.log(request.responseText);
             }
        });
        request.send();*/

        /** POST **/
            // Данные для передачи на сервер допустим id товаров и его количество
        let id_product = 321;
        let qty_product = 2;

        const request = new XMLHttpRequest();

        const url = "ajax_quest.php";

        const params = "id_product=" + id_product + "&qty_product=" + qty_product;

        request.open("POST", url);

        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        });
        request.send(params);

        /** JSON **/
        /*let id_product = 321;
        let qty_product = 2;

        const request = new XMLHttpRequest();

        const url = "ajax_quest.php";
        const params = "id_product=" + id_product + "&qty_product=" + qty_product;

         request.responseType = "json";

         request.open("POST", url);

         request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

         request.addEventListener("readystatechange", () => {
             if (request.readyState === 4 && request.status === 200) {
                 let obj = request.response;
                 console.log(obj);
                 console.log(obj.id_product); // Здесь мы можем обращаться к свойству объекта и получать его значение
                 console.log(obj.qty_product);
             }
         });
        request.send(params);*/


        /*** JQ ***/
/*        $(document).ready(function () {

            let id_product = 321;
            let qty_product = 2;

            $.ajax({
                url: "ajax_quest.php",
                method: "POST", // Что бы воспользоваться POST методом, меняем строку на POST
                data: {"id_product": id_product, "qty_product": qty_product},
                success: function (data) {
                    console.log(data);
                }
            });

        });*/

        /*** Fetch GET ***/
       /* let id_product = 321;
        let qty_product = 2;

        fetch("ajax_quest.php?" + "id_product=" + id_product + "&qty_product=" + qty_product,
            {headers: {"content-type": "application/x-www-form-url"}})
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.text()
            })
            .then(i => console.log(i))
            .catch(() => console.log('ошибка'));*/

        /*** Fetch POST ***/

       /* let id_product = 321;
        let qty_product = 2;
        let data = "id_product=" + id_product + "&qty_product=" + qty_product;

        fetch("ajax_quest.php",
            {
                method: "POST",
                body: data,
                headers: {"content-type": "application/x-www-form-urlencoded"}
            })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.text()
            })
            .then(i => console.log(i))
            .catch(() => console.log('ошибка'));*/

        /*** Fetch JSON GET ***/

       /* let id_product = 321;
        let qty_product = 2;

        fetch("ajax_quest.php?id_product=" + id_product + "&qty_product=" + qty_product, {
            headers: {"Content-type": "application/json"}
        })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(i => console.log(i))
            .catch(() => console.log('ошибка'));*/


        /*** FETCH + JSON  + POST ***/
        /*let id_product = 321;
        let qty_product = 2;
        let data = {
            "id_product": id_product,
            "qty_product": qty_product
        };

        data = JSON.stringify(data);

        fetch("ajax_quest.php", {
            method: "POST",
            body: data,
            headers: {"Content-type": "application/json"}
        })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(i => console.log(i))
            .catch(() => console.log('ошибка'));*/
        /************************************************************/
/*        let id_product = 321;
        let qty_product = 2;

        let upload = {
            "id_product": id_product,
            "qty_product": qty_product
        };
        let data = new FormData();
        data.append("json", JSON.stringify(upload));

        fetch("ajax_quest.php",
            {
                method: "POST",
                body: data
            })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(function (data) {
                console.log(JSON.stringify(data))
            })
            .catch(() => console.log('ошибка'));*/


        // fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        //     .then(response => {
        //         if (response.status >= 400) {
        //             return Promise.reject();
        //         }
        //         return response.json()
        //     })
        //     .then(i => console.log(i[22].name))
        //     .catch(() => console.log('ошибка'));

    });
// response.status >= 400
</script>

</body>
</html>