function trow_head(){
    var tr = document.createElement("tr")
    var th1 =document.createElement("th")
    th1.innerHTML = "Id"
    var th2 =document.createElement("th")
    th2.innerHTML = "Name"
    var th3 = document.createElement("th")
    th3.innerHTML = "Email"
    tr.append(th1,th2,th3)

    return tr;
}


//xmlreq

var request = new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")

request.send();
request.onload = function(){

    var data = JSON.parse(this.response);
    var container = document.createElement("div")
    container.setAttribute("class","container")
    var table = document.createElement("table")
    table.className ="table"
    var thead = document.createElement("thead")
    thead.className = "thead-light"
    var thead_row = trow_head();
    var tbody = document.createElement("tbody")
    tbody.id = "body"
    let button_div = document.createElement("div")
    button_div.id = "buttons"
    button_div.className ="pagination"
    let currentpage = 1;
    let rows = 10;
    let page_count = Math.ceil(data.length/rows);
    table.append(thead)
    thead.append(thead_row)
    container.append(table)
    table.append(tbody)
    container.append(button_div)
    document.body.append(container)

    let list_element = document.getElementById("body")
    let pagination_element = document.getElementById("buttons");
    
    function Displaylist(items,list_element,rows_per_page,page){
        list_element.innerHTML ="";
        page--;
        let from = page * rows_per_page;
        let to = from + rows_per_page;
        let paginated_items = items.slice(from, to);

        for (let i = 0; i < paginated_items.length; i++) {
            let item = paginated_items[i];
            let itemelement = document.createElement("tr")
            let itemelement1 = document.createElement("td")
            let itemelement2 = document.createElement("td")
            let itemelement3 = document.createElement("td")
            itemelement.setAttribute("class", "item");
            itemelement1.innerHTML = item.id;
            itemelement2.innerHTML = item.name;
            itemelement3.innerHTML = item.email;
            itemelement.appendChild(itemelement1)
            itemelement.appendChild(itemelement2)
            itemelement.appendChild(itemelement3)
            tbody.appendChild(itemelement);
          }
    }

    function setup_pagination(items, pagination_element) {
        pagination_element.innerHTML = "";
        for (let i = 1; i <= page_count; i++) {
          let btn = paginationbutton(i, items);
          pagination_element.appendChild(btn);
        }
      }
    
    function paginationbutton(page, items) {

        let button = document.createElement("button");
        button.innerText = page;
        if (currentpage == page) {
          button.classList.add("active")
        }
      
        button.addEventListener("click", () => {
          currentpage = page;
          Displaylist(items, list_element, rows, currentpage)
      
          let current_btn = document.querySelector(".pagination button.active");
          current_btn.classList.remove("active");
          button.classList.add("active")
        })
      
        return button;
      }
    Displaylist(data,list_element,rows,currentpage)
    setup_pagination(data, pagination_element, rows);
    
}








