document.addEventListener("DOMContentLoaded", function () {
    createDeptCheckboxes()
    
});

const createDeptCheckboxes = () => {
    fetch('http://localhost:8080/deptCodes')
        .then(response => response.json())
        .then(json => json.depts.dept.map(x => {
            const code = x._key
            const checkboxes = document.getElementById('checkboxes')
            checkboxes.innerHTML += '<label>' + '<input id="' + code + '" type="checkbox">' + code + '</label>'
        }))
}