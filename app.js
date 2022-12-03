const details = [];
const input_feild = document.querySelector('.input-feild');
const inputName = document.querySelector('#name');
const age = document.querySelector('#age');
const pan = document.querySelector('#pan');
const qualification = document.querySelector('#qualification');
const tableBody = document.querySelector('tbody');
const error = document.querySelector('.error');
let count = 0;



/**------------Adding EventListener---------------- */
input_feild.addEventListener('submit',addDetail);

/**----------------Reset Form-------- */
function resetForm(){
    inputName.value =""
    age.value = ""
    pan.value = ""
    qualification.value = ""

}


function createInfo(todo){
    tableBody.innerHTML += `<tr>
<td>${inputName.value}</td>
<td>${age.value}</td>
<td>${pan.value}</td>
<td>${qualification.value}</td>
</tr>`
}

/**------------------Creating Function for adding details to table--------------------------- */
function addDetail(e){
e.preventDefault();
if(inputName.value=='' ||  age.value=='' || pan.value=='' || qualification.value==''){
error.innerText = "Please Fill Full Details";
error.classList.add("error");
setTimeout(()=>{
    error.innerText="";
},1000);
return;
}else{
    const todo = {
        id: count++,
        text: input_feild.value
    }
    details.push(todo)
    createInfo();
}

resetForm()
}

