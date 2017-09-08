document.addEventListener("DOMContentLoaded", function () {
    createDeptCheckboxes()

});

const createDeptCheckboxes = () => {
    fetch('http://localhost:8080/deptCodes')
        .then(response => response.json())
        .then(json => json.depts.dept.map(x => x._key))
        .then(arrayOfCodes => $('#checkboxes').selectivity({
            items: arrayOfCodes,
            multiple: true,
            placeholder: 'Search for your department codes here'
        }))
}

