

class Student {
    constructor(id, fullname, age, mathScore, literatureScore) {
        this.id = id;
        this.fullname = fullname;
        this.age = age;
        this.mathScore = mathScore;
        this.literatureScore = literatureScore;
    }
}


const create = () => {
    let fullname = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let mathScore = document.getElementById('toan').value;
    let literatureScore = document.getElementById('van').value;

    let student = new Student(-1, fullname, age, mathScore, literatureScore);

    axios({
        url: "https://61e56cfe595afe00176e55bd.mockapi.io/Student",
        method: "POST",
        data: student
    }).then(
        // thành công
        (response) => {
            document.getElementById('name').value = '';
            document.getElementById('age').value = '';
            document.getElementById('toan').value = '';
            document.getElementById('van').value = '';
            Swal.fire(
                'Thông báo!',
                'Thêm thành công ' + fullname + " vào lớp!",
                'success'
            )
            retrive();
        }
    ).catch(
        // thất bại
        (error) => {
            console.log(error);
        }
    )
}

const retrive = () => {
    axios({
        url: 'https://61e56cfe595afe00176e55bd.mockapi.io/Student',
        method: 'GET'
    }).then((response) => {
        // console.log(response.data);
        renderData(response.data)
    }).catch((error) => {
        console.log(error);
    })
}

const update = () => {
    alert('update')
}

document.getElementById('button').addEventListener('click', () => {
    create();
})

const renderData = (data) => {
    const bodyTag = document.getElementById('body')

    // for (let i = 0; i < data.length; i++) {

    // }

    let bodyInnerHTML = '';

    data.forEach((item) => {
        // destructuring
        let { id, fullname, age, mathScore, literatureScore } = item;

        // Template literals
        let itemHTML = `
            <tr>
                <td>${id}</td>
                <td>${fullname}</td>
                <td>${age}</td>
                <td>${mathScore}</td>
                <td>${literatureScore}</td>
                <td>
                    <i class="far fa-edit btn btn-primary" onclick="update()"></i>
                    <i class="fas fa-trash-alt btn btn-danger"></i>
                </td>
            </tr>
        `;
        bodyInnerHTML += itemHTML;
    })
    bodyTag.innerHTML = bodyInnerHTML;
}



document.getElementById('input-search').addEventListener('input', (e) => {
    let keyWord = e.target.value;
    axios({
        url: 'https://61e56cfe595afe00176e55bd.mockapi.io/Student',
        method: 'GET'
    }).then((response) => {
        let fullData = response.data;
        let dataFilter = fullData.filter(item => item.fullname.toLowerCase().includes(keyWord.toLowerCase()));
        renderData(dataFilter)
    }).catch((error) => {
        console.log(error);
    })
})
retrive();

