var arr = [], inc = document.getElementById("display_income"),exp=0,cat, saving=0,total_income=0,id =0,minus,total_s=0;
function Add_Income(){
    var income = document.getElementById("income");
    if(!isNaN(parseFloat(income.value))){
    saving += parseFloat(income.value)
    updateSaving()
    display_inc_transaction();
    update_totaL_income();
    swal("Income Successfully Added");
    }
    else if (income.value==""){
        swal("Input Should Not Empty");
    }
    else if(isNaN(parseFloat(income.value))){
        swal("Input Should Be A Number")
    }
    setincomevalue()
    income.value="";
}
function display_inc_transaction(){
    var table = document.getElementById("myTable");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<th>"+income.value+"</th>";
    cell2.innerHTML = "<th>"+dateTime+"</th>";
    cell3.innerHTML = "<th><i data-toggle='modal' data-target='#exampleModal2'class='fa fa-edit' style='font-size:36px;color:red'></i></th>";
}
function setincomevalue() {
    var table = document.getElementById('myTable');
    for(var i = 0; i < table.rows.length; i++)
{
    table.rows[i].onclick = function()
    {
      rIndex = this.rowIndex;
      document.getElementById("Edit_income").value = this.cells[0].innerHTML;
      document.getElementById("Edit_time").value = this.cells[1].innerHTML;
      minus=document.getElementById("Edit_income").value;
    };
}
}
function Edit_income(){
    var table = document.getElementById('myTable');
    var income = document.getElementById("Edit_income");
    var time = document.getElementById('Edit_time');
    if(income.value && time.value){
        if(Number(income.value)){
            table.rows[rIndex].cells[0].innerHTML = income.value;
            table.rows[rIndex].cells[1].innerHTML = time.value;
            var inco=parseFloat(income.value)
            var savingElement = document.getElementById("display_income").value; 
            var sum =parseFloat(savingElement)
            var store=(sum-minus);
            saving=store+inco;
            
            updateSaving()
            
            var totalelement =document.getElementById("show_total").value;
            var add=(totalelement-minus)+inco;
            
            totalelement.value=add; 
            setincomevalue()
        }
        else{
            swal("Please Enter A Number")
        } 
    }
    else{
        swal("Please Enter Value")
    }
}
function Delete_income(){
    var table = document.getElementById('myTable');
    table.deleteRow(rIndex);
    document.getElementById("Edit_income").value = "";
    document.getElementById("Edit_time").value = "";
    saving -=minus;
    updateSaving()
    var show = document.getElementById("show_total").value;
    total_income -=minus;
    show=total_income; 
}
function updateSaving() {
            var savingElement = document.getElementById("display_income"); 
            savingElement.value =  saving    
        }
 function update_totaL_income(){
            var show = document.getElementById("show_total");
            total_income+=(parseFloat(income.value)) 
            show.value=total_income;      
        }
function get_expense(){
    for(var j=0;j<arr.length;j++){
        total_s=arr[j].expense;
    }
}
function Add_Expense(){
    var expense = document.getElementById("expense");
    var catagory = document.getElementById("option");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    ++id;
       var exp = new Expense(id,expense.value,catagory.value,dateTime);
       if((expense.value =="") && (catagory.value=="")){
        swal("Input Should Not Empty");
       }
       else if(!Number(expense.value)){
        swal("Input Should Be A Number")
        }
       else if(Number(expense.value) && isNaN(catagory.value)){
        arr.push(exp); 
        get_expense()
        saving -= parseFloat(total_s)
        updateSaving()
        display_Expense();
        swal("Expense Successfully Added");
       }
    else{
        swal("Incorrect Input")
    }
    run();
    expense.value ="";
    catagory.value ="";  
}
function Expense(id,expense,catagory,date){
    this.id =id;
    this.expense = expense;
    this.catagory = catagory;
    this.date = date;   
}
function display_Expense(){
    var expenses_table =document.getElementById("expenses");
    expenses_table.innerHTML=""
    var date;
    for (i = 0; i < arr.length; i++) {
         exp = arr[i].expense;
         cat = arr[i].catagory;
         date = arr[i].date; 
         id= arr[i].id;  
         var row = expenses_table.insertRow(0);
         var e_cell1 = row.insertCell(0);
         var e_cell2 = row.insertCell(1);
         var e_cell3 = row.insertCell(2);
         var e_cell4 = row.insertCell(3);
         var e_cell5 = row.insertCell(4);
         e_cell1.innerHTML = "<th>"+id+"</th>";
         e_cell2.innerHTML = "<th>"+exp+"</th>";
         e_cell3.innerHTML = "<th>"+cat+"</th>";
         e_cell4.innerHTML = "<th>"+date+"</th>";
         e_cell5.innerHTML = "<th><i data-toggle='modal' data-target='#exampleModal' class='fa fa-edit' style='font-size:36px;color:red'></i></th>";
       }
}
function run() {
    var t = document.getElementById('expenses');
    t.onclick = function (event) {

        event = event || window.event; //IE8
        var target = event.target || event.srcElement;
        while (target && target.nodeName != 'TR') { // find TR
            target = target.parentElement;
        }
        var cells = target.cells; 
        if (!cells.length || target.parentNode.nodeName == 'THEAD') {
            return;
        }     
        var f1 = document.getElementById('id');
        var f2 = document.getElementById('edit_expense');
        var f3 = document.getElementById('edit_cat');
        var f4 = document.getElementById('time');
        f1.value = cells[0].innerHTML;
        f2.value = cells[1].innerHTML;
        f3.value = cells[2].innerHTML;
        f4.value = cells[3].innerHTML;
        minus=f2.value;
    };
}
function showFilterExpenses() {
    var filter = document.getElementById("filter").value;
    var expenses_table =document.getElementById("expenses");
    expenses_table.innerHTML = "";
    if(filter === "all") {
        display_Expense();
        return
    }
    for (var i = 0; i < arr.length; i++) {
        if (filter === arr[i].catagory) {
            var row = expenses_table.insertRow(0);
            var e_cell1 = row.insertCell(0);
            var e_cell2 = row.insertCell(1);
            var e_cell3 = row.insertCell(2);
            var e_cell4 = row.insertCell(3);
            var e_cell5 = row.insertCell(4);
            e_cell1.innerHTML = "<th>"+arr[i].id+"</th>";
           e_cell2.innerHTML = "<th>"+arr[i].expense+"</th>";
            e_cell3.innerHTML = "<th>"+arr[i].catagory+"</th>";
            e_cell4.innerHTML = "<th>"+arr[i].date+"</th>";
            e_cell5.innerHTML = "<th><i data-toggle='modal' data-target='#exampleModal'class='fa fa-edit' style='font-size:36px;color:red'></i></th>";
            }
    }
} 
function Edit_Expense(){
    var index;
    var getindex = document.getElementById("id").value;
     index = arr.findIndex(x => x.id ==getindex);
    if(index!=-1){
        var ge_expense = document.getElementById("edit_expense").value;
        var get_cat = document.getElementById("edit_cat").value;
        var get_time = document.getElementById("time").value;
        if(ge_expense=="" && get_cat ==""){
            swal("Input field should not be empty")
                    }
                    else if(!Number(ge_expense)){
            swal("Please Enter A Number")
                }
                else{
                    if(!isNaN(parseFloat(ge_expense))){
                        arr[index].expense= ge_expense;
                        arr[index].catagory= get_cat;
                        arr[index].date= get_time;        
                    }
                else{
                    swal("Please Enter A number")
                }   
        }
    }
    else{
        swal("Object Not found")
    }
    get_expense()
    total_s=total_s-minus;
    saving -= parseFloat(total_s)
    updateSaving()
    display_Expense()
    var getindex = document.getElementById("id").value=""
    var ge_expense = document.getElementById("edit_expense").value=""
    var get_cat = document.getElementById("edit_cat").value=""
    var get_time = document.getElementById("time").value=""
}
function Delete_Expense(){
    var getindex = document.getElementById("id").value;
      var index;
      index = arr.findIndex(x => x.id ==getindex);
      if(index!=-1){
        arr.splice(index,1)
        if(arr.length < 1 || arr == undefined){
          saving=0;
          updateSaving()
          display_Expense()
      }
      else{
        for(var j=0;j<arr.length;j++){
            total_s=arr[j].expense;
        }   saving -= parseFloat(total_s)
          updateSaving()
          display_Expense()
      }
     }
     else{
         swal("Object Not Found")
     }
    display_Expense()   
 }