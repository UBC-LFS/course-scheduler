document.addEventListener("DOMContentLoaded", function () {
    createDeptCheckboxes()
    handleSubmit()
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

const handleSubmit = () => {
    document.getElementById('submit').addEventListener('click', function() {
        const data = $('#checkboxes').selectivity('data')
        const codes = data.map(x => x.id)
        fetch('http://localhost:8080/sections?codes='+codes.join('+'))
            .then(x => x.text())
            .then(url => {
                document.getElementById('download').innerHTML = '<h2>'  + 'Download from here!' + '</h2>'
                document.getElementById('download').innerHTML = '<a href="' + url + '">' + url + '</a>'
                spinner.stop()
            })
        const spinner = new Spinner().spin()
        document.getElementById('spin').appendChild(spinner.el)
    })
}