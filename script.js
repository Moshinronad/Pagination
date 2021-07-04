let page = 0;
var req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
req.send();
req.onload = function () {
    var data = JSON.parse(this.response);

    var table = document.createElement("table");
    table.className = "table";
    var thead = document.createElement("thead");
    thead.className = "thead-dark";

    var tr = createtrth('tr');
    var th1 = createtrth('th', 'Id');
    var th2 = createtrth('th', 'Name');
    var th3 = createtrth('th', 'Email');

    tr.append(th1, th2, th3);
    thead.append(tr);
    table.append(thead);
    document.body.append(table);

    var max_data_in_a_page = 10;
    var total_no_of_pages = data.length / max_data_in_a_page;
    createPagination(total_no_of_pages);

    function createPagination(total_no_of_pages) {
        var page_container = document.createElement("div");
        page_container.className = "btn-div";
        document.body.append(page_container);

        var first = document.createElement("button");
        first.className = "btn first";
        first.innerText = 'First';
        page_container.append(first);

        var prev = document.createElement("button");
        prev.className = "btn prev";
        prev.innerText = 'Previous';
        page_container.append(prev);

        for (let p = 0; p < total_no_of_pages; p++) {
            var page = document.createElement("button");
            page.className = `btn ${p}`;
            var id = "page" + p;
            page.setAttribute("id", id);
            page.innerText = p + 1;
            page_container.append(page);
        }
        printTable(); //initially when page is loaded and any botton isn't clicked

        buttons = document.getElementsByClassName('btn');
      
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function (e) {
                
                if (this.textContent === 'First') {
                    page = 1;
                    pageClick(1);
                } else if (this.textContent === 'Previous') {
                    if (page != 1) {
                        page = page - 1;
                        pageClick(page);
                    }
                } else {
                    page = +this.textContent;
                    pageClick(+this.textContent);
                }
            };
        }

        function pageClick(page_no) {
            var start = page_no * 10 - 10;
            var end = (page_no * 10) > data.length ? data.length : page_no * 10;
            if (document.getElementById('tbody'))
                document.getElementById('tbody').remove();
            printTable(start, end);
        }
    }


    function printTable(start = 0, end = 10) {
        var tboady = document.createElement('tbody');
        tboady.id = "tbody";
        table.append(tboady);
        for (let i = start; i < end; i++) {
            var tr = createtrth('tr');
            var td1 = createtrth('td', data[i].id);
            var td2 = createtrth('td', data[i].name);
            var td3 = createtrth('td', data[i].email);
            tr.append(td1, td2, td3);
            tboady.append(tr);
        }
    }

    function createtrth(elementName, value = '') {
        var th = document.createElement(elementName);
        th.innerHTML = value;
        return th;
    }
};